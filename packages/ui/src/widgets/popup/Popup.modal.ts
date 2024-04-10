import { CSSProperties, ReactElement, ReactNode } from 'react';

export type CSSCustomVariables = {
  '--time-popup--fadeOut'?: string;
  '--size-popup--width'?: string;
  '--size-popup--height'?: string;
} & CSSProperties;

export type PopupProps = {
  onClick?: () => void;
  onClose?: () => void;
  onCloseIcon?: ReactElement;
  isOpen: boolean;
  ms?: number;
  title?: string;
  width?: string;
  height?: string;
  children: ReactNode;
};
