import { Base64 } from 'js-base64';
import { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { RiShieldFlashFill } from 'react-icons/ri';

import { post } from '@/api/fetcher.api';
import { FileInput, Tooltip } from '@/atomics';
import { TextInput } from '@/atomics/input/text-input/TextInput';
import { FlickerContainer, Pulse } from '@/effects';
import { Line } from '@/layouts';
import { JsonViewerMenu } from '@/widgets/json-viewer/JsonViewerMenu';
import { PdfViewerMenu } from '@/widgets/pdf-viewer/PdfViewerMenu';
import { YmlViewerMenu } from '@/widgets/yml-viewer/YmlViewerMenu';

import { Popup } from '../popup/Popup';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { FileImporterMenuProps } from './FileImporter.modal';
import { useFileImporterImmerStore } from './FileImporter.store';
import { FileImporterMenuCard } from './FileImporterMenuCard';

export function FileImporterMenu(props: FileImporterMenuProps) {
  const [realm, setRealm] = useState<string>();
  const [configId, setConfigId] = useState<string>();
  const fileSlice = useFileImporterImmerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedFileExtension = fileSlice.selectedFile?.extension;

  return (
    <div className="file-importer-menu">
      <div className="file-importer-menu-icons">
        {selectedFileExtension === 'pdf' && <PdfViewerMenu formatter={(p, t) => `${p} / ${t}`} />}
        {selectedFileExtension === 'json' && <JsonViewerMenu />}
        {selectedFileExtension === 'yml' && <YmlViewerMenu />}
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
        <FlickerContainer color="transparent" repeatFlickerBorder="1">
          <FaSave
            size={'2rem'}
            color={!fileSlice.selectedFile ? 'gray' : 'orange'}
            onClick={() => setIsModalOpen(Boolean(fileSlice.selectedFile))}
            style={{ cursor: 'pointer' }}
          />
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

            const body = JSON.stringify([
              {
                id: configId,
                value: {
                  data: fileSlice.selectedFile?.buffer && Base64.fromUint8Array(fileSlice.selectedFile?.buffer, true),
                  name: fileSlice.selectedFile?.name,
                  extension: fileSlice.selectedFile?.extension,
                  mimeType: fileSlice.selectedFile?.mimeType,
                  size: fileSlice.selectedFile?.size,
                },
              },
            ]);

            post([`http://localhost:3001/api/v1/contents/${realm}`, { body }])
              .catch(console.error)
              .then(() => setIsModalOpen(false));
            /* const { isLoading, data, error } = useSWR(
              [
                `http://localhost:3001/api/v1/contents/${realm}`,
                {
                  method: 'post',
                  body: JSON.stringify({
                    id: fileSlice.selectedFile?.name,
                    value: fileSlice.selectedFile,
                  }),
                } as RequestInit,
              ],
              ([url, init]) => fetcher([url, init]),
            ); */
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
