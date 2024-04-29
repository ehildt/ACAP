import './FileImporter.scss';

import { useIsFileSizeExceeded } from './FileImporter.hooks';
import { useFileImporterImmerStore } from './FileImporter.store';
import { FileImporterMenu } from './FileImporterMenu';
import { FileImporterPreview } from './FileImporterPreview';

export function FileImporter() {
  const fileSlice = useFileImporterImmerStore();
  const isFileSizeExceeded = useIsFileSizeExceeded(50_000_000, fileSlice.files);

  return (
    <div className="file-importer">
      <FileImporterMenu accept="*/*" label="Select File(s)" />
      <FileImporterPreview />
    </div>
  );
}
