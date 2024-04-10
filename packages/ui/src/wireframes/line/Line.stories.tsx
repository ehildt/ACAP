import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '../container/Container';
import { Line } from './Line';

export default {
  title: 'wireframes/line',
  component: Line,
} satisfies Meta<typeof Line>;

export const HorizontalLine = {
  render: () => (
    <Line>
      <Container>one</Container>
      <Container>two</Container>
      <Container>three</Container>
    </Line>
  ),
} satisfies StoryObj<typeof Line>;

export const VerticalLine = {
  render: () => (
    <Line vertical>
      <Container>one</Container>
      <Container>two</Container>
      <Container>three</Container>
    </Line>
  ),
} satisfies StoryObj<typeof Line>;
