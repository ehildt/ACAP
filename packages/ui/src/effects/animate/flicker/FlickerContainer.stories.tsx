import { Source, Story, Subheading, Subtitle, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { FlickerContainer } from './FlickerContainer';
import { FlickerText } from './FlickerText';

const meta = {
  title: 'effects/animate/flicker',
  component: FlickerContainer,
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
} satisfies Meta<typeof FlickerContainer>;

export default meta;

type ContainerStory = StoryObj<typeof meta>;

export const Container: ContainerStory = {
  args: {
    color: 'crimson',
    style: { padding: '0.5rem' },
  },
  render: (args) => (
    <FlickerContainer {...args}>
      <FlickerText text="violet senpai in crimson flicker container" color="violet" />
    </FlickerContainer>
  ),
};
