import { useState } from 'react';
import { FaSave } from 'react-icons/fa';

import { JsonViewerMenu } from '@/widgets/json-viewer/JsonViewerMenu';
import { YmlViewerMenu } from '@/widgets/yml-viewer/YmlViewerMenu';

import { FaFileCirclePlus } from 'react-icons/fa6';

import { PdfViewerMenu } from '@/widgets/pdf-viewer/PdfViewerMenu';

import { FileInput, Tooltip } from '@/atomics';
import { TextInput } from '@/atomics/input/text-input/TextInput';
import { FlickerContainer, Pulse } from '@/effects';
import { RiShieldFlashFill } from 'react-icons/ri';
import { Popup } from '../popup/Popup';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { FileImporterMenuProps } from './FileImporter.modal';
import { useFileImporterImmerStore } from './FileImporter.store';
import { FileImporterMenuCard } from './FileImporterMenuCard';

export function FileImporterMenu(props: FileImporterMenuProps) {
  const [configName, setConfigName] = useState<string>();
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
            onChange={({ files, element }) => {
              files && fileSlice.selectFiles(Array.from(files));
              element.target.files = null;
            }}
            accept={props.accept}
            type="file"
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
          onClick={() => setIsModalOpen(false)}
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
          <TextInput label="Please enter a configuration name" style={{ width: '100%' }} onChange={setConfigName} />
        </Popup>
      )}
    </div>
  );
}
