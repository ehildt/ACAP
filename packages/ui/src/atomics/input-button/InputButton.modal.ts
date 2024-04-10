import { ChangeEvent, ReactNode } from 'react';

export type onChangeProxy = (props: {
  files: FileList | null;
  target: HTMLInputElement;
  element: ChangeEvent<HTMLInputElement>;
}) => Promise<unknown> | unknown;

type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export type InputButtonProps = {
  type?: InputType;
  accept?: string;
  children?: ReactNode;
  multiple?: boolean;
  onChange?: onChangeProxy;
};
