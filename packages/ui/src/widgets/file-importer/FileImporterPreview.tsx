import { parse } from 'yaml';

import { TreeViewer } from '@/widgets/tree-viewer/TreeViewer';
import { YmlViewer } from '@/widgets/yml-viewer/YmlViewer';

import { Container } from '@/layouts/container/Container';
import { ImageViewer } from '../image-viewer/ImageViewer';
import { JsonViewer } from '../json-viewer/JsonViewer';
import { PdfViewer } from '../pdf-viewer/PdfViewer';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { useFileImporterImmerStore } from './FileImporter.store';

export function FileImporterPreview() {
  const fileSlice = useFileImporterImmerStore();

  return (
    <div className="file-importer-preview">
      <Scrollbar direction="rtl">
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
  );
}
