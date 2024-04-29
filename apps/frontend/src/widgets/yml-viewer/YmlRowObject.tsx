import cn from 'classnames';

import { RowProps } from './YmlViewer.model';
import { YmlViewerRow } from './YmlViewerRow';
import style from './YmlViewerRow.module.scss';

export function YmlRowObject(props: RowProps) {
  const keys = Object.keys(props.kvPair.value);

  const ymlViewRows = keys.map((innerKey, index) => (
    <YmlViewerRow
      key={`${innerKey?.toString()}_${index}`}
      kvPair={{ key: innerKey.toString(), value: props.kvPair.value[innerKey] }}
      separate={true}
    />
  ));

  return (
    <div
      className={cn([props.className, style.ymlViewerRowRed])}
      key={props.kvPair.key}
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(JSON.stringify(props.kvPair, null, 4));
      }}
    >
      {props.kvPair.key && <span style={{ color: 'red' }}>{props.kvPair.key}</span>}
      {props.separate && <span>:</span>}
      {ymlViewRows}
    </div>
  );
}
