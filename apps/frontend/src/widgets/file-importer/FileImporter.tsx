import './FileImporter.scss';

import { useIsFileSizeExceeded } from './FileImporter.hooks';
import { useFileImporterImmerStore } from './FileImporter.store';
import { FileImporterMenu } from './FileImporterMenu';
import { FileImporterPreview } from './FileImporterPreview';

export function FileImporter() {
  const fileSlice = useFileImporterImmerStore();

  // TODO: move to backend config
  const isFileSizeExceeded = useIsFileSizeExceeded(import.meta.env.VITE_MAX_FILE_SIZE, fileSlice.files);

  return (
    <div className="file-importer">
      <FileImporterMenu accept="*/*" label="Select File(s)" />
      <FileImporterPreview />
    </div>
  );
}
