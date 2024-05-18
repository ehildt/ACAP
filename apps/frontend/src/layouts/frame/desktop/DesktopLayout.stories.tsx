import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { DesktopLayout } from "./DesktopLayout";
import { DesktopLayoutFooter } from "./DesktopLayoutFooter";
import { DesktopLayoutHeader } from "./DesktopLayoutHeader";
import { DesktopLayoutMain } from "./DesktopLayoutMain";

export default {
  title: "layouts/frame/desktop",
  component: DesktopLayout,
} satisfies Meta<typeof DesktopLayout>;

export const Home = {
  render: () => {
    const [tab] = useState<"home">("home");
    return (
      <DesktopLayout>
        <DesktopLayoutHeader />
        <DesktopLayoutMain />
        <DesktopLayoutFooter />
      </DesktopLayout>
    );
  },
} satisfies StoryObj<typeof DesktopLayout>;

export const FileImporter = {
  render: () => {
    const [tab] = useState<"file-importer">("file-importer");

    return (
      <DesktopLayout>
        <DesktopLayoutHeader />
        <DesktopLayoutMain />
        <DesktopLayoutFooter />
      </DesktopLayout>
    );
  },
} satisfies StoryObj<typeof DesktopLayout>;
