import type { Meta, StoryObj } from "@storybook/react";

import { Sidebar } from "./Sidebar";

export default {
  title: "widgets/sidebar",
  component: Sidebar,
  decorators: [(story) => <div style={{ width: "20dvw" }}>{story()}</div>],
} satisfies Meta<typeof Sidebar>;

export const SidebarExample = {
  render: () => <Sidebar />,
} satisfies StoryObj<typeof Sidebar>;
