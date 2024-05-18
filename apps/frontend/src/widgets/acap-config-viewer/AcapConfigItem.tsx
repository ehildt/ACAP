import { Line } from "@/layouts";
import { Container } from "@/layouts/container/Container";

import { AcapConfigItemProps } from "./AcapConfig.modal";

export function AcapConfigItem(props: AcapConfigItemProps) {
  return (
    <Container innerStyle={{ padding: "0.3rem" }}>
      <Line
        style={{
          marginBlock: "0.3rem",
          width: "100%",
          paddingInline: "0.5rem",
        }}
      >
        {props.children}
        <h3 style={{ userSelect: "none" }}>{props.label}</h3>
      </Line>
    </Container>
  );
}
