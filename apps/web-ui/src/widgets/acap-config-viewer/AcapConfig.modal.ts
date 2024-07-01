import { CSSProperties, ReactNode } from 'react';

export type AcapConfigContainerProps = {
  label: string;
  color: string;
  size: string;
  children: ReactNode;
  icon: ReactNode;
  style?: CSSProperties;
};

export type AcapConfigItemProps = {
  children: ReactNode;
  label: string;
};
