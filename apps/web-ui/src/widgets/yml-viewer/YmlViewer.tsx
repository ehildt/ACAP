import { useEffect, useState } from 'react';

import { Container } from '@/layouts/container/Container';

import { YmlViewerProps } from './YmlViewer.model';
import { YmlViewerRow } from './YmlViewerRow';

export function YmlViewer(props: YmlViewerProps) {
  const [kvPair, setKvPair] = useState<any>();

  useEffect(() => {
    setKvPair({ value: props.data });
  }, [props.data]);

  return (
    kvPair && (
      <Container>
        <div style={props.style}>
          <YmlViewerRow kvPair={kvPair} />
        </div>
      </Container>
    )
  );
}
