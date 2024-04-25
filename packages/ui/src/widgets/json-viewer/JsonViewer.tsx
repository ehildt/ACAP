import { JsonViewerProps } from './JsonViewer.model';
import { JsonViewerRow } from './JsonViewerRow';

export function JsonViewer(props: JsonViewerProps) {
  return (
    <div style={props.style}>
      <JsonViewerRow kvPair={{ value: JSON.parse(props.json) }} />
    </div>
  );
}
