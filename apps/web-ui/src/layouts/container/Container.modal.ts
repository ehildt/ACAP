import { CSSProperties, ReactNode } from "react";

export type CSSCustomVariables = {
  "--clr-container-highlight-accent"?: string;
  "--clr-container-highlight"?: string;
} & CSSProperties;

export type ContainerProps = {
  children: ReactNode;
  outerStyle?: CSSProperties;
  innerStyle?: CSSProperties;
  highlightColor?: string;
  highlightAccentColor?: string;
  fadeInOutMS?: number;
  onClick?: () => void;
};
