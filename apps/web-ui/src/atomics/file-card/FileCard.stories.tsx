import { Source, Story, Subheading, Subtitle, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '@/layouts/container/Container';

import { FileCard } from './FileCard';

const meta = {
  title: 'atomics/file-card',
  component: FileCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Subheading />
          <Story />
          <Source />
        </>
      ),
    },
  },
} satisfies Meta<typeof FileCard>;

export default meta;

export const PNG = {
  args: {
    filename: 'tea-party',
    extension: 'png',
    onClick: () => confirm('clicked'),
    lastModified: Date.now(),
    size: '1.74MB',
  },
  render: (args) => (
    <Container outerStyle={{ width: 'fit-content' }}>
      <FileCard {...args} />
    </Container>
  ),
} satisfies StoryObj<typeof FileCard>;

export const JPG = {
  args: {
    filename: 'tea-party',
    extension: 'jpg',
    onClick: () => confirm('clicked'),
    lastModified: Date.now(),
    size: '1.17MB',
  },
  render: (args) => (
    <Container outerStyle={{ width: 'fit-content' }}>
      <FileCard {...args} />
    </Container>
  ),
} satisfies StoryObj<typeof FileCard>;

export const JSON = {
  args: {
    filename: 'tea-party',
    extension: 'json',
    onClick: () => confirm('clicked'),
    lastModified: Date.now(),
    size: '3KB',
  },
  render: (args) => (
    <Container outerStyle={{ width: 'fit-content' }}>
      <FileCard {...args} />
    </Container>
  ),
} satisfies StoryObj<typeof FileCard>;
