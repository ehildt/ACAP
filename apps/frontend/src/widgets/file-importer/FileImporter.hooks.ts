import { Buffer } from 'buffer';
import bytes from 'bytes';
import { useEffect, useState } from 'react';

import { SUPPORTED_ICONS } from './FileImporter.constants';
import { FileMetadata } from './FileImporter.modal';
import { useFileImporterImmerStore } from './FileImporter.store';

export function useIsFileSizeExceeded(maxFileSize: number, files?: Array<File>) {
  return Boolean(files?.filter(({ size }) => size > maxFileSize).length);
}

export function useLoadFileContents(files: Array<File>) {
  const uploadedOn = new Date();
  const [metadata, setMetadata] = useState<Array<FileMetadata>>();
  const store = useFileImporterImmerStore();

  useEffect(() => {
    if (files?.length) {
      const promises = files.map(async (file) => {
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
          size: bytes.format(file.size),
        };
      });
      Promise.all(promises).then(setMetadata);
    }
  }, [store.files]);

  return metadata;
}

export const useIcon = (fileType?: string, size = '2rem') => {
  if (!fileType) return SUPPORTED_ICONS.default(size);
  return SUPPORTED_ICONS[fileType.toLowerCase()]?.(size) ?? SUPPORTED_ICONS.default(size);
};
