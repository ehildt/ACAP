import { ReactNode } from "react";

export type MetaeProps = {
  children?: ReactNode;
};

export type MetaeMenuProps = {
  source: string;
  skip: number;
  take: number;
  onSourceChange: (value: string) => void;
  onTakeChange: (value: string) => void;
  onLeftIconClick: () => void;
  onRightIconClick: () => void;
};

export type MetaeItemProps = {
  metae: Record<string, any>;
};
