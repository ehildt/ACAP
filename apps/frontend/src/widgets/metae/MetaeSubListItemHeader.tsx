import { PiArrowFatLinesLeftFill } from "react-icons/pi";

import { FlickerText } from "@/effects";
import { Line } from "@/layouts";
import { Container } from "@/layouts/container/Container";

type MetaeItemHeaderProps = {
  text?: string;
  onClick?: () => void;
};

export function MetaeSubListItemHeader({
  text,
  onClick,
}: MetaeItemHeaderProps) {
  return (
    text && (
      <Container innerStyle={{ padding: "0.3rem" }}>
        <Line style={{ width: "100%" }}>
          {
            <FlickerText
              text={text?.toUpperCase()}
              color="crimson"
              repeatFlickerText="1"
              repeatFlickerTextFaulty="2"
            />
          }
          <PiArrowFatLinesLeftFill
            onClick={onClick}
            size={"1.5rem"}
            style={{ marginLeft: "auto", cursor: "pointer" }}
          />
        </Line>
      </Container>
    )
  );
}
