import cn from "classnames";

import { RowProps } from "./JsonViewer.model";
import { JsonViewerRow } from "./JsonViewerRow";
import style from "./JsonViewerRow.module.scss";

export function JsonRowArray(props: RowProps) {
  const length = props.kvPair.value.length;

  const jsonViewerRows = props.kvPair.value.map((item: any, index: number) => (
    <JsonViewerRow
      key={`${index.toString()}_${index}`}
      kvPair={{ key: index.toString(), value: item }}
      separate={length - 1 > index}
    />
  ));

  return (
    <div
      className={cn([props.className, style.jsonViewerRowPurple])}
      key={props.kvPair.key}
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(JSON.stringify(props.kvPair, null, 4));
      }}
    >
      {props.kvPair.key && (
        <span style={{ color: "magenta" }}>{props.kvPair.key} : </span>
      )}
      <span style={{ color: "magenta" }}>{"["}</span>
      {jsonViewerRows}
      <span style={{ color: "magenta" }}>{"]"}</span>
      {props.separate && ","}
    </div>
  );
}
