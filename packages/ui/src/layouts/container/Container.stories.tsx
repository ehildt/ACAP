import type { Meta, StoryObj } from '@storybook/react';

import { Container } from './Container';

export default {
  title: 'layouts/container',
  component: Container,
  decorators: [(story) => <div style={{ width: '20dvw' }}>{story()}</div>],
} satisfies Meta<typeof Container>;

export const DefaultContainer = {
  render: () => (
    <Container>
      <span onClick={() => confirm('clicked')}>some content</span>
    </Container>
  ),
} satisfies StoryObj<typeof Container>;

export const ContainersWithStyle = {
  render: () => (
    <div style={{ textAlign: 'center' }}>
      <Container innerStyle={{ backgroundColor: 'grey', color: 'black' }} outerStyle={{ margin: '0.5rem' }}>
        <span>some content</span>
      </Container>
      <Container innerStyle={{ backgroundColor: 'lime', color: 'black' }} outerStyle={{ margin: '0.5rem' }}>
        <span>some content</span>
      </Container>
      <Container innerStyle={{ backgroundColor: 'skyblue', color: 'black' }} outerStyle={{ margin: '0.5rem' }}>
        <span>some content</span>
      </Container>
      <Container outerStyle={{ backgroundColor: 'grey', margin: '0.5rem' }}>
        <span>some content</span>
      </Container>
      <Container outerStyle={{ backgroundColor: 'limegreen', margin: '0.5rem' }}>
        <span>some content</span>
      </Container>
      <Container outerStyle={{ backgroundColor: 'pink', margin: '0.5rem' }}>
        <span>some content</span>
      </Container>
    </div>
  ),
} satisfies StoryObj<typeof Container>;

export const ContainersWithHighlight = {
  render: () => (
    <div style={{ textAlign: 'center' }}>
      <Container
        innerStyle={{ backgroundColor: 'skyblue', color: 'black' }}
        outerStyle={{ margin: '0.5rem' }}
        highlight
      >
        <span>some content</span>
      </Container>
      <Container
        innerStyle={{ backgroundColor: 'coal', color: 'ghostwhite' }}
        outerStyle={{ margin: '0.5rem', backgroundColor: 'yellowgreen' }}
        highlight
      >
        <span>some content</span>
      </Container>
      <Container outerStyle={{ backgroundColor: 'plum', margin: '0.5rem' }} highlight>
        <span>some content</span>
      </Container>
    </div>
  ),
} satisfies StoryObj<typeof Container>;
