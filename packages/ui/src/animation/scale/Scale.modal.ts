import { CSSProperties, ReactNode } from 'react';

export type ExtendedCSSProperties = {
  '--animation-scale-speedMS'?: string;
  '--animation-scale-speedMS2'?: string;
  '--animation-scaleX'?: number;
  '--animation-scaleY'?: number;
  '--animation-scaleX2'?: number;
  '--animation-scaleY2'?: number;
} & CSSProperties;

export type ScaleProps = {
  children: ReactNode;
  style?: CSSProperties;
  ms?: number;
  ms2?: number;
  x?: number;
  y?: number;
  x2?: number;
  y2?: number;
};
