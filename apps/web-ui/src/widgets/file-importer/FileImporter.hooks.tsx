import { FILE_RENDERERS } from './FileImporter.constants';

export function useIsFileSizeExceeded(maxFileSize: number, files?: Array<File>) {
  return Boolean(files?.filter(({ size }) => size > maxFileSize).length);
}

export function useFileRenderer(file?: File) {
  const extension = file?.name.split('.').pop();
  return file && extension && FILE_RENDERERS[extension](file);
}
