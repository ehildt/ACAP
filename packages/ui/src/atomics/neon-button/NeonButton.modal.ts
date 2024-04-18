import { CSSProperties, ReactNode } from 'react';

export type ProxyFunc = (target: HTMLElement, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

export type ExtendedCSSProperties = {
  '--clr-tooltip-neon-glow'?: string;
  '--ms-tooltip-border-flicker'?: string;
  '--ms-tooltip-text-flicker'?: string;
  '--ms-tooltip-text-faulty-flicker'?: string;
} & CSSProperties;

export type NeonButtonProps = {
  onClick?: ProxyFunc;
  children?: ReactNode;
  text: string;
  faulty?: Array<number>;
  disabled?: boolean;
  neonColor?: string;
};
