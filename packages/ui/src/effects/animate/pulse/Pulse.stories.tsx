import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '@/layouts/container/Container';
import { Rotate } from '../../transform/rotate/Rotate';
import { Pulse } from './Pulse';

export default {
  title: 'effects/animate/pulse',
  component: Pulse,
  decorators: (render) => <div style={{ width: '300px' }}>{render()}</div>,
} satisfies Meta<typeof Pulse>;

export const PulseActive = {
  render: () => (
    <Pulse to={0.9} from={1} ms={500} mode="active">
      <Container>one</Container>
    </Pulse>
  ),
} satisfies StoryObj<typeof Pulse>;

export const PulsePassive = {
  render: () => (
    <Pulse to={0.9} from={1} ms={500} mode="passive">
      <Container>one</Container>
    </Pulse>
  ),
} satisfies StoryObj<typeof Pulse>;

export const PulseActiveRotate = {
  render: () => (
    <Rotate z="5turn" x="5turn">
      <Pulse to={0.9} from={1} ms={500} mode="active">
        <Container>one</Container>
      </Pulse>
    </Rotate>
  ),
} satisfies StoryObj<typeof Pulse>;

export const PulsePassiveRotate = {
  render: () => (
    <Rotate z="5turn" x="5turn">
      <Pulse to={0.9} from={1} ms={500} mode="passive">
        <Container>one</Container>
      </Pulse>
    </Rotate>
  ),
} satisfies StoryObj<typeof Pulse>;
