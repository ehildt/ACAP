import { Source, Story, Subheading, Subtitle, Title } from "@storybook/blocks";
import type { Meta, StoryObj } from "@storybook/react";

import { FlickerText } from "./FlickerText";

const meta = {
  title: "effects/animate/flicker",
  component: FlickerText,
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
} satisfies Meta<typeof FlickerText>;

export default meta;

type FlickerStory = StoryObj<typeof meta>;

export const Text: FlickerStory = {
  args: {
    color: "crimson",
    text: "save me crimson senpai",
  },
  render: (args) => <FlickerText {...args} />,
};
