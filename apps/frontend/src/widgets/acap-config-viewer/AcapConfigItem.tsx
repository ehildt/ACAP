import { Button } from "@/atomics";
import { Container } from "@/layouts/container/Container";

import { AcapConfigItemProps } from "./AcapConfig.modal";

export function AcapConfigItem(props: AcapConfigItemProps) {
  return (
    <Container
      innerStyle={{ padding: "0.3rem" }}
      outerStyle={{ cursor: "pointer" }}
      highlightColor="gray"
    >
      <Button>
        {props.children}
        <h3 style={{ userSelect: "none" }}>{props.label}</h3>
      </Button>
    </Container>
  );
}
