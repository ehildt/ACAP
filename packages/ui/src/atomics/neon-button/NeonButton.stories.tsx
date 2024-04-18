import { Source, Story, Subheading, Subtitle, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { NeonButton } from './NeonButton';

const meta = {
  includeStories: ['Primary'],
  title: 'atomics/neon-button',
  component: NeonButton,
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
} satisfies Meta<typeof NeonButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'save',
    faulty: [1, 3],
  },
  render: (args) => <NeonButton {...args}>colors</NeonButton>,
};
