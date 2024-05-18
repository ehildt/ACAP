import { useEffect, useState } from "react";

import { Container } from "@/layouts/container/Container";

import { JsonViewerProps } from "./JsonViewer.model";
import { JsonViewerRow } from "./JsonViewerRow";

export function JsonViewer(props: JsonViewerProps) {
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
          <JsonViewerRow kvPair={kvPair} />
        </div>
      </Container>
    )
  );
}
