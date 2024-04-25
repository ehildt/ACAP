import { FaFile, FaFileCsv, FaFileExcel, FaFilePdf, FaFileWord, FaRegFileImage } from 'react-icons/fa6';
import { parse } from 'yaml';

import { TreeViewer } from '@/widgets/tree-viewer/TreeViewer';
import { YmlViewer } from '@/widgets/yml-viewer/YmlViewer';

import { Container } from '@/layouts/container/Container';
import { ImageViewer } from '../image-viewer/ImageViewer';
import { JsonViewer } from '../json-viewer/JsonViewer';
import { PdfViewer } from '../pdf-viewer/PdfViewer';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { useFileImporterImmerStore } from './FileImporter.store';

type SUPPORTED_EXTENSIONS = 'pdf' | 'csv' | 'xlsx' | 'odt' | 'docx' | 'jpg' | 'png';

const SUPPORTED_ICONS = {
  pdf: <FaFilePdf size={'1.8rem'} />,
  csv: <FaFileCsv size={'1.8rem'} />,
  xlsx: <FaFileExcel size={'1.8rem'} />,
  odt: <FaFileWord size={'1.8rem'} />,
  docx: <FaFileWord size={'1.8rem'} />,
  jpg: <FaRegFileImage size={'1.8rem'} />,
  png: <FaRegFileImage size={'1.8rem'} />,
};

function mapFileExtensionToIcon(extension: SUPPORTED_EXTENSIONS) {
  const icon = SUPPORTED_ICONS[extension];
  if (icon) return icon;
  return <FaFile size={'1.8rem'} />;
}

type PropsFileImporterContentList = {
  files: Array<any>;
};

export function FileImporterContentList(props: PropsFileImporterContentList) {
  const fileSlice = useFileImporterImmerStore();

  const items = props.files?.map((f, idx) => {
    return (
      <Container key={idx}>
        <div className="file-card" onClick={async () => await fileSlice.setSelectedFile(f)}>
          <div data-icon>{mapFileExtensionToIcon(f.extension)}</div>
          <div data-content>
            <span data-name="filename">{f.name}</span>
            <span>{f.size}</span>
            <span>{f.lastModified}</span>
          </div>
        </div>
      </Container>
    );
  });

  return (
    <div className="file-importer-content">
      <div className="file-importer-content-list">
        <Scrollbar behavior="smooth" overflow="y" direction="rtl" style={{ height: '80dvh' }}>
          <div style={{ display: 'flex', gap: '0.2rem', flexDirection: 'column' }}>{items}</div>
        </Scrollbar>
      </div>
      <div className="file-importer-content-preview">
        <Scrollbar>
          {fileSlice.selectedFile?.extension === 'json' && fileSlice.toggleTreeView && (
            <Container outerStyle={{ height: '100%' }}>
              <TreeViewer data={JSON.parse(fileSlice.selectedFile.buffer.toString())} />
            </Container>
          )}
          {fileSlice.selectedFile?.extension === 'yml' && fileSlice.toggleTreeView && (
            <Container outerStyle={{ height: '100%' }}>
              <TreeViewer data={parse(fileSlice.selectedFile.buffer.toString())} />
            </Container>
          )}
          {fileSlice.selectedFile?.extension === 'json' && !fileSlice.toggleTreeView && (
            <Container>
              <JsonViewer json={fileSlice.selectedFile.buffer.toString()} style={{ width: '100%' }} />
            </Container>
          )}
          {fileSlice.selectedFile?.extension === 'yml' && !fileSlice.toggleTreeView && (
            <Container>
              <YmlViewer data={parse(fileSlice.selectedFile.buffer.toString())} style={{ width: '100%' }} highlight />
            </Container>
          )}
          {fileSlice.selectedFile?.extension === 'pdf' && (
            <Container>
              <PdfViewer base64={fileSlice.selectedFile.buffer.toString('base64')} />
            </Container>
          )}
          {fileSlice.selectedFile?.extension === 'jpg' && (
            <Container>
              <ImageViewer
                base64={fileSlice.selectedFile.buffer.toString('base64')}
                mimeType={fileSlice.selectedFile.mimeType}
              />
            </Container>
          )}
          {fileSlice.selectedFile?.extension === 'png' && (
            <Container>
              <ImageViewer
                base64={fileSlice.selectedFile.buffer.toString('base64')}
                mimeType={fileSlice.selectedFile.mimeType}
              />
            </Container>
          )}
        </Scrollbar>
      </div>
    </div>
  );
}
