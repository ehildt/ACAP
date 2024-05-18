import { CSSProperties, ReactNode } from "react";

export type ExtendedCSSProperties = {
  "--animation-pulse-speedMS"?: string;
  "--animation-pulse-delay"?: string;
  "--animation-pulse-from"?: number;
  "--animation-pulse-to"?: number;
} & CSSProperties;

export type PulseProps = {
  children: ReactNode;
  style?: CSSProperties;
  mode?: "passive" | "active";
  ms?: number;
  delay?: number;
  from?: number;
  to?: number;
};
