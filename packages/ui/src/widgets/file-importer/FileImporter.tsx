import './FileImporter.scss';

import { FileSelector } from '@/atomics';
import { useIsFileSizeExceeded } from './FileImporter.hooks';
import { useFileImporterImmerStore } from './FileImporter.store';
import { FileImporterPreview } from './FileImporterPreview';

export type CalculatedFile = {
  uploadedOn: Date;
  extension: string | undefined;
  name: string;
  mimeType: string;
  lastModified: number;
  buffer: Buffer;
  size: string;
};

export function FileImporter() {
  const fileSlice = useFileImporterImmerStore();
  const isFileSizeExceeded = useIsFileSizeExceeded(50_000_000, fileSlice.files);

  // instead provide the components which should render the files
  // or use the importer just to select and load files
  // then in other components use the file store to display them
  return (
    <div className="file-importer">
      <FileSelector />
      <FileImporterPreview />
    </div>
  );
}
