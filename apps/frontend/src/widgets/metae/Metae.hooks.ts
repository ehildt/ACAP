import Bytes from 'bytes';

export function sizeof(object?: Record<any, any>) {
  if (!object) return 'N/A';
  const str = JSON.stringify(object);
  return Bytes.format(new Blob([str]).size);
}
