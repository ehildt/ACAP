import { ChangeEvent, ReactNode } from 'react';

export type ProxyOnChange = (props: {
  files: FileList | null;
  target: HTMLInputElement;
  element: ChangeEvent<HTMLInputElement>;
}) => Promise<void>;

export type FileSelectorProps = {
  label: string;
  accept?: string;
  children?: ReactNode;
  onChange?: ProxyOnChange;
};
