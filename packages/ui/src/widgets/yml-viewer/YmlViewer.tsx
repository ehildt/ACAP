import { YmlViewerProps } from './YmlViewer.model';
import { YmlViewerRow } from './YmlViewerRow';

export function YmlViewer(props: YmlViewerProps) {
  return (
    <div style={props.style}>
      <YmlViewerRow kvPair={{ value: props.data }} highlight={props.highlight} />
    </div>
  );
}
