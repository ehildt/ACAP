import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '@/layouts/container/Container';
import { Scrollbar } from './Scrollbar';

export default {
  title: 'widgets/scrollbar',
  component: Scrollbar,
  decorators: [(story) => <div style={{ width: '20dvw' }}>{story()}</div>],
} satisfies Meta<typeof Scrollbar>;

export const ScrollbarLtr = {
  render: () => (
    <Scrollbar style={{ maxHeight: '20dvh', gap: '0.3rem' }}>
      <Container>element 1</Container>
      <Container>element 2</Container>
      <Container>element 3</Container>
      <Container>element 4</Container>
      <Container>element 5</Container>
      <Container>element 6</Container>
    </Scrollbar>
  ),
} satisfies StoryObj<typeof Scrollbar>;

export const ScrollbarRtl = {
  render: () => (
    <Scrollbar direction="rtl" style={{ maxHeight: '20dvh', gap: '0.3rem' }}>
      <Container>element 1</Container>
      <Container>element 2</Container>
      <Container>element 3</Container>
      <Container>element 4</Container>
      <Container>element 5</Container>
      <Container>element 6</Container>
    </Scrollbar>
  ),
} satisfies StoryObj<typeof Scrollbar>;
