import type { Meta, StoryObj } from '@storybook/react';

import { Container } from './Container';

export default {
  title: 'layouts/container',
  component: Container,
  decorators: [
    (story) => (
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '25dvw',
        }}
      >
        {story()}
      </div>
    ),
  ],
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
    <>
      <Container innerStyle={{ backgroundColor: 'grey', color: 'black' }}>
        <span>some content</span>
      </Container>
      <Container innerStyle={{ backgroundColor: 'lime', color: 'black' }}>
        <span>some content</span>
      </Container>
      <Container innerStyle={{ backgroundColor: 'skyblue', color: 'black' }}>
        <span>some content</span>
      </Container>
      <Container outerStyle={{ backgroundColor: 'grey' }}>
        <span>some content</span>
      </Container>
      <Container outerStyle={{ backgroundColor: 'limegreen' }}>
        <span>some content</span>
      </Container>
      <Container outerStyle={{ backgroundColor: 'pink' }}>
        <span>some content</span>
      </Container>
    </>
  ),
} satisfies StoryObj<typeof Container>;

export const ContainersWithHighlight = {
  render: () => (
    <>
      <Container innerStyle={{ backgroundColor: 'skyblue', color: 'black' }} highlightColor="skyblue">
        <span>some content</span>
      </Container>
      <Container
        innerStyle={{ backgroundColor: 'coal', color: 'ghostwhite' }}
        outerStyle={{ backgroundColor: 'yellowgreen' }}
        highlightAccentColor="gold"
      >
        <span>some content</span>
      </Container>
      <Container outerStyle={{ backgroundColor: 'plum' }} highlightAccentColor="gold" highlightColor="orange">
        <span>some content</span>
      </Container>
    </>
  ),
} satisfies StoryObj<typeof Container>;
