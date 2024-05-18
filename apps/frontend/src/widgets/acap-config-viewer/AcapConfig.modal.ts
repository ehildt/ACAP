import { ReactNode } from "react";

export type AcapConfigContainerProps = {
  data: Record<any, any>;
  label: string;
  color: string;
  size: string;
  children: ReactNode;
  icon: ReactNode;
};

export type AcapConfigItemProps = {
  children: ReactNode;
  label: string;
};
