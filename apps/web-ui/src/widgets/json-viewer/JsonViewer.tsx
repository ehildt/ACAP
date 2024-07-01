import { useEffect, useState } from 'react';

import { Container } from '@/layouts/container/Container';

import { JsonViewerProps } from './JsonViewer.model';
import { JsonViewerRow } from './JsonViewerRow';

export function JsonViewer(props: JsonViewerProps) {
  const [kvPair, setKvPair] = useState<any>();

  useEffect(() => {
    setKvPair({ value: props.data });
  }, [props.data]);

  return (
    kvPair && (
      <Container>
        <div style={props.style}>
          <JsonViewerRow kvPair={kvPair} />
        </div>
      </Container>
    )
  );
}
