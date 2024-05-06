import { TreeViewer } from '@/widgets/tree-viewer/TreeViewer';
import { YmlViewer } from '@/widgets/yml-viewer/YmlViewer';
import { parse } from 'yaml';
import { ImageViewer } from '../image-viewer/ImageViewer';
import { JsonViewer } from '../json-viewer/JsonViewer';
import { PdfViewer } from '../pdf-viewer/PdfViewer';
import { FileMetadata } from './FileImporter.modal';
import { useFileImporterImmerStore } from './FileImporter.store';

export function FileImporterPreview() {
  const { selectedFile, showTreeView } = useFileImporterImmerStore();

  const renderers: { [key: string]: (buffer: Buffer, mimeType?: string) => JSX.Element } = {
    pdf: (buffer) => <PdfViewer base64={buffer.toString('base64')} />,
    jpg: (buffer, mimeType) => <ImageViewer base64={buffer.toString('base64')} mimeType={mimeType} />,
    png: (buffer, mimeType) => <ImageViewer base64={buffer.toString('base64')} mimeType={mimeType} />,
    json: (buffer) => {
      const data = JSON.parse(buffer.toString());
      return showTreeView ? <TreeViewer data={data} /> : <JsonViewer data={data} style={{ width: '100%' }} />;
    },
    yml: (buffer) => {
      const data = parse(buffer.toString());
      return showTreeView ? <TreeViewer data={data} /> : <YmlViewer data={data} style={{ width: '100%' }} />;
    },
  };

  const component = (file?: FileMetadata) => {
    if (!file || !file.extension) return null;
    const { buffer, mimeType, extension } = file;
    return renderers[extension]?.(buffer, mimeType);
  };

  return <div className="file-importer-preview">{component(selectedFile)}</div>;
}
