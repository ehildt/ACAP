import { CSSProperties, ReactNode } from 'react';

export type ContainerProps = {
  children: ReactNode;
  outerStyle?: CSSProperties;
  innerStyle?: CSSProperties;
  highlight?: boolean;
};
