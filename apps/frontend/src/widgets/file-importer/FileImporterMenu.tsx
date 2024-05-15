import { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { GoFileBinary } from 'react-icons/go';
import { RiShieldFlashFill } from 'react-icons/ri';

import { post, uPost } from '@/api/fetcher.api';
import { FileInput, Tooltip } from '@/atomics';
import { TextInput } from '@/atomics/input/text-input/TextInput';
import { FlickerContainer, Pulse } from '@/effects';
import { Line } from '@/layouts';
import { UnstructuredDataViewerMenu } from '@/widgets/json-viewer/JsonViewerMenu';
import { PdfViewerMenu } from '@/widgets/pdf-viewer/PdfViewerMenu';

import { Popup } from '../popup/Popup';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { FileImporterMenuProps } from './FileImporter.modal';
import { useFileImporterImmerStore } from './FileImporter.store';
import { FileImporterMenuCard } from './FileImporterMenuCard';

export function FileImporterMenu(props: FileImporterMenuProps) {
  const [realm, setRealm] = useState<string>();
  const [configId, setConfigId] = useState<string>();
  const [forceBlob, setForceBlob] = useState<boolean>(false);
  const fileSlice = useFileImporterImmerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedFileExtension = fileSlice.selectedFile?.extension;

  return (
    <div className="file-importer-menu">
      <div className="file-importer-menu-icons">
        {selectedFileExtension === 'pdf' && <PdfViewerMenu formatter={(p, t) => `${p} / ${t}`} />}
        {(selectedFileExtension === 'json' || selectedFileExtension === 'yml' || selectedFileExtension === 'yaml') && (
          <UnstructuredDataViewerMenu />
        )}
        {(fileSlice.selectedFile?.extension === 'json' ||
          fileSlice.selectedFile?.extension === 'yml' ||
          fileSlice.selectedFile?.extension === 'yaml') && (
            <FlickerContainer color="transparent" repeatFlickerBorder="1">
              <GoFileBinary
                size={'2rem'}
                color={!forceBlob ? 'gray' : 'crimson'}
                onClick={() => setForceBlob((toggle) => !toggle && Boolean(fileSlice.selectedFile))}
                style={{ cursor: 'pointer' }}
              />
            </FlickerContainer>
          )}
        <FlickerContainer color="transparent" repeatFlickerBorder="1">
          <FaSave
            size={'2rem'}
            color={!fileSlice.selectedFile ? 'gray' : 'orange'}
            onClick={() => setIsModalOpen(Boolean(fileSlice.selectedFile))}
            style={{ cursor: 'pointer' }}
          />
        </FlickerContainer>
        <FlickerContainer color="transparent" repeatFlickerBorder="1">
          <FileInput
            multiple
            type="file"
            accept={props.accept}
            onChange={({ files }) => {
              if (files) fileSlice.selectFiles(Array.from(files));
            }}
          >
            <FaFileCirclePlus size={'2rem'} color="skyblue" />
          </FileInput>
        </FlickerContainer>
      </div>
      <div className="file-importer-menu-list">
        <Scrollbar
          behavior="smooth"
          overflow="y"
          style={{
            maxHeight: '60vh',
            height: fileSlice.files?.length ? 'auto' : '60vh',
            width: '25vw',
            padding: '5px',
          }}
        >
          <FileImporterMenuCard />
        </Scrollbar>
      </div>
      {fileSlice.selectedFile && (
        <Popup
          width="30vw"
          closeGlyphColer="crimson"
          closeGlyphSize="1.4rem"
          isOpen={isModalOpen}
          title={fileSlice.selectedFile?.name && `${fileSlice.selectedFile?.name}.${fileSlice.selectedFile?.extension}`}
          onCancel={() => setIsModalOpen(false)}
          onClick={() => {
            if (!(realm && configId)) return;
            const extension = fileSlice.selectedFile?.extension;
            // TODO: a field if you want to upload these files in minio
            if (extension === 'json' || extension === 'yml' || (extension === 'yaml' && !forceBlob)) {
              post([
                `http://localhost:3001/api/v1/contents/${realm}`,
                {
                  body: JSON.stringify([
                    {
                      id: configId,
                      value: {
                        data: JSON.parse(fileSlice.selectedFile?.buffer.toString()!),
                        name: fileSlice.selectedFile?.name,
                        extension: fileSlice.selectedFile?.extension,
                        mimetype: fileSlice.selectedFile?.mimetype,
                        size: fileSlice.selectedFile?.size,
                      },
                    },
                  ]),
                },
              ])
                .catch(console.error)
                .then(() => setIsModalOpen(false));
            } else {
              const form = new FormData();
              const blob = new Blob([fileSlice.selectedFile?.buffer!], { type: 'application/octet-stream' });
              form.append('file', blob, `${fileSlice.selectedFile?.name}.${fileSlice.selectedFile?.extension}`);
              uPost(['http://localhost:3001/api/v1/objects', { body: form }])
                .catch(console.error)
                .then((data) => {
                  post([
                    `http://localhost:3001/api/v1/contents/${realm}`,
                    {
                      body: JSON.stringify([
                        {
                          id: configId,
                          value: {
                            ref: data.cuid2,
                            name: fileSlice.selectedFile?.name,
                            extension: fileSlice.selectedFile?.extension,
                            mimetype: fileSlice.selectedFile?.mimetype,
                            size: fileSlice.selectedFile?.size,
                          },
                        },
                      ]),
                    },
                  ])
                    .catch(console.error)
                    .then(() => setIsModalOpen(false));
                });
            }
          }}
          onClose={() => setIsModalOpen(false)}
          contentStyle={{ display: 'flex', alignItems: 'center', padding: '5rem' }}
          infoBar={
            <Tooltip tooltip={'four eyes recommended'}>
              <Pulse to={1.2} ms={750} mode="passive">
                <RiShieldFlashFill color="skyblue" size={'1.5rem'} />
              </Pulse>
            </Tooltip>
          }
        >
          <Line vertical style={{ width: '100%', gap: '30px' }}>
            <TextInput label="realm" style={{ width: '100%' }} onChange={setRealm} />
            <TextInput label="config-id" style={{ width: '100%' }} onChange={setConfigId} />
          </Line>
        </Popup>
      )}
    </div>
  );
}
