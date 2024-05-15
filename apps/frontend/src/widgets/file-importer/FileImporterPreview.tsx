import { useRenderer } from './FileImporter.hooks';
import { useFileImporterImmerStore } from './FileImporter.store';

export function FileImporterPreview() {
  const { selectedFile } = useFileImporterImmerStore();
  const renderer = useRenderer(selectedFile);
  return <div className="file-importer-preview">{renderer}</div>;
}
