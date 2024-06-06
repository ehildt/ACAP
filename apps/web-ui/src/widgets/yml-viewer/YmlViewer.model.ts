import { CSSProperties } from "react";

export type RowProps = {
  className?: string;
  kvPair: { key?: string; value: any };
  separate?: boolean;
};

export type YmlViewerProps = {
  data: Record<any, any>;
  style?: CSSProperties;
};
