import { CSSProperties, ReactNode } from "react";

// TODO separate between components
export type ExtendedCSSProperties = {
  "--clr-flicker-glow"?: string;
  "--ms-flicker-border"?: string;
  "--ms-flicker-border-delay"?: string;
  "--ms-flicker-text"?: string;
  "--ms-flicker-text-delay"?: string;
  "--ms-flicker-text-faulty"?: string;
  "--font-flicker-letter-spacing"?: string;
  "--ms-flicker-text-faulty-delay"?: string;
  "--mode-flicker-text-faulty"?: string;
  "--mode-flicker-text"?: string;
  "--mode-flicker-border"?: string;
} & CSSProperties;

export type FlickerTextProps = {
  style?: CSSProperties;
  text: string;
  color?: string;
  faulty?: Array<number>;
  minFaulty?: number;
  maxFaulty?: number;
  letterSpacing?: string;
  flickerTextMS?: number;
  flickerTextDelayMS?: number;
  flickerTextFaultyMS?: number;
  flickerTextFaultyDelayMS?: number;
  repeatFlickerTextFaulty?: string;
  repeatFlickerText?: string;
};

export type FlickerContainerProps = {
  color?: string;
  style?: CSSProperties;
  children?: ReactNode;
  flickerBorderMS?: number;
  repeatFlickerBorder?: string;
  flickerBorderDelayMS?: number;
};
