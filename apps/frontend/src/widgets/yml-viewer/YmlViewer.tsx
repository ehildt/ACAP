import { Container } from '@/layouts/container/Container';
import { useEffect, useState } from 'react';
import { YmlViewerProps } from './YmlViewer.model';
import { YmlViewerRow } from './YmlViewerRow';

export function YmlViewer(props: YmlViewerProps) {
  const [key, setKey] = useState(0);
  const [kvPair, setKvPair] = useState<any>();

  // We force re-rendering due to reacts optimization issue
  // breaking the update whenever props.data changes
  useEffect(() => {
    setKey((val) => val + 1);
  }, [props.data]);

  useEffect(() => {
    setKvPair({ value: props.data });
  }, [key]);

  return (
    kvPair && (
      <Container key={key}>
        <div style={props.style}>
          <YmlViewerRow kvPair={kvPair} />
        </div>
      </Container>
    )
  );
}
