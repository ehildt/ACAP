import { Source, Story, Subheading, Subtitle, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

const meta = {
  title: 'atomics/tooltip',
  component: Tooltip,
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
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const H1Tooltip: Story = {
  args: {
    tooltip: 'some tooltip that describes some content',
  },
  render: (args) => (
    <Tooltip {...args} style={{ width: '100px' }}>
      <h1>some content</h1>
    </Tooltip>
  ),
};
