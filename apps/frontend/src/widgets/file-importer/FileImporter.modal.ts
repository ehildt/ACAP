import { ChangeEvent, ReactNode } from 'react';

export type FileMetadata = {
  uploadedOn: Date;
  extension?: string;
  name: string;
  mimetype: string;
  lastModified: number;
  buffer: Buffer;
  size: string;
};

type ProxyOnChange = (props: {
  files: FileList | null;
  target: HTMLInputElement;
  element: ChangeEvent<HTMLInputElement>;
}) => Promise<void>;

export type FileImporterMenuProps = {
  label: string;
  accept?: string;
  children?: ReactNode;
  onChange?: ProxyOnChange;
};

export type FileImporterRenderer = { [key: string]: (buffer: Buffer, mimetype?: string) => JSX.Element };
