export type RowProps = {
  className?: string;
  kvPair: { key?: string; value: any };
  separate?: boolean;
  highlight?: boolean;
};

export type YmlViewerProps = {
  data: any;
  highlight?: boolean;
};
