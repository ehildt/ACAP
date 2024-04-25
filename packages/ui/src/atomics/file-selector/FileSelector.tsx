import { Buffer } from 'buffer';

import { useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa6';

import { JsonViewerMenu } from '@/widgets/json-viewer/JsonViewerMenu';
import { YmlViewerMenu } from '@/widgets/yml-viewer/YmlViewerMenu';
import {
  BsFile,
  BsFiletypeCsv,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypeJpg,
  BsFiletypeJson,
  BsFiletypePdf,
  BsFiletypePng,
  BsFiletypeXlsx,
  BsFiletypeYml,
} from 'react-icons/bs';

import { Container } from '@/layouts/container/Container';
import { CalculatedFile } from '@/widgets/file-importer/FileImporter';
import { PdfViewerMenu } from '@/widgets/pdf-viewer/PdfViewerMenu';
import { FileInput, Popup, useFileImporterImmerStore } from '../..';
import { FileSelectorProps } from './FileSelector.modal';

type SUPPORTED_EXTENSIONS = 'pdf' | 'csv' | 'xlsx' | 'odt' | 'docx' | 'jpg' | 'png' | 'json' | 'yml';

const SUPPORTED_ICONS = {
  pdf: <BsFiletypePdf size={'2rem'} />,
  csv: <BsFiletypeCsv size={'2rem'} />,
  xlsx: <BsFiletypeXlsx size={'2rem'} />,
  odt: <BsFiletypeDoc size={'2rem'} />,
  docx: <BsFiletypeDocx size={'2rem'} />,
  jpg: <BsFiletypeJpg size={'2rem'} />,
  png: <BsFiletypePng size={'2rem'} />,
  json: <BsFiletypeJson size={'2rem'} />,
  yml: <BsFiletypeYml size={'2rem'} />,
};

function mapFileExtensionToIcon(extension: SUPPORTED_EXTENSIONS) {
  return SUPPORTED_ICONS[extension] ?? <BsFile size={'2rem'} />;
}

function loadFileContents(files: Array<File>): Array<Promise<CalculatedFile>> {
  const uploadedOn = new Date();
  return files?.map(async (file) => {
    const words = file.name.split('.');
    const extension = words.pop();
    const name = words.toString();
    return {
      uploadedOn,
      extension,
      name,
      mimeType: file.type,
      lastModified: file.lastModified,
      buffer: Buffer.from(await file.arrayBuffer()),
      size:
        file.size < 1000000
          ? `${parseFloat((file.size / 1024).toFixed(2))} KB`
          : `${parseFloat((file.size / 1024 ** 2).toFixed(2))} MB`,
    };
  });
}

// This belongs to the FileImporter!
export function FileSelector(props: FileSelectorProps) {
  const [files, setFiles] = useState<any>();
  const fileSlice = useFileImporterImmerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (fileSlice.files?.length)
      Promise.all(loadFileContents(fileSlice.files)).then((list) => {
        setFiles(
          list?.map((f, idx) => {
            return (
              <Container key={idx}>
                <div className="file-card" onClick={async () => await fileSlice.setSelectedFile(f)}>
                  <div data-icon>{mapFileExtensionToIcon(f.extension as any)}</div>
                  <div data-content>
                    <span data-name="filename">{f.name}</span>
                    <span>{f.size}</span>
                    <span>{f.lastModified}</span>
                  </div>
                </div>
              </Container>
            );
          }),
        );
      });
  }, [fileSlice.files]);

  // TODO: introduce a global store for setting the popup content and behavior
  return (
    <>
      <div className="file-importer-menu">
        {fileSlice.selectedFile?.extension === 'pdf' && <PdfViewerMenu formatter={(p, t) => `${p} / ${t}`} />}
        {fileSlice.selectedFile?.extension === 'json' && <JsonViewerMenu />}
        {fileSlice.selectedFile?.extension === 'yml' && <YmlViewerMenu />}
        <FileInput multiple onChange={props.onChange} accept={props.accept} type="file">
          <FaUpload size={'2rem'} color="skyblue" />
        </FileInput>
        <FaSave size={'2rem'} color="orange" onClick={() => setIsModalOpen(true)} />
        <FaEdit size={'2rem'} color="yellow" />
        <Popup
          isOpen={isModalOpen}
          title={fileSlice.selectedFile?.name}
          onCancel={() => setIsModalOpen(false)}
          onClick={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        ></Popup>
      </div>
      <div className="file-importer-list">
        <Scrollbar behavior="smooth" overflow="y" direction="rtl" style={{ height: '80dvh' }}>
          <div style={{ display: 'flex', gap: '0.2rem', flexDirection: 'column' }}>{files}</div>
        </Scrollbar>
      </div>
    </>
  );
}

FileSelector.defaultProps = {
  label: 'Select File(s)',
  accept: '*/*',
} as FileSelectorProps;
