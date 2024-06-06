import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "@/layouts/container/Container";

import { Scale } from "./Scale";

export default {
  title: "effects/transform/scale",
  component: Scale,
  decorators: (render) => <div style={{ width: "300px" }}>{render()}</div>,
} satisfies Meta<typeof Scale>;

export const ScaleSamples = {
  render: () => (
    <>
      <Scale x={1} y={1} x2={1} y2={-1} ms2={500}>
        <Container>one</Container>
      </Scale>
      <Scale x={1} y={-1} x2={0.7} y2={0.7}>
        <Container>two</Container>
      </Scale>
      <Scale x={-1} y={-1} x2={1} y2={1} ms2={500}>
        <Container>three</Container>
      </Scale>
      <Scale x={-1} y={1}>
        <Container>four</Container>
      </Scale>
    </>
  ),
} satisfies StoryObj<typeof Scale>;
