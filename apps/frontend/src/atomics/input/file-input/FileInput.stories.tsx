import type { Meta, StoryObj } from "@storybook/react";
import { FaUpload } from "react-icons/fa6";

import { FileInput } from "./FileInput";

export default {
  title: "atomics/input",
  component: FileInput,
} satisfies Meta<typeof FileInput>;

export const FileInputWithIcon = {
  render: () => (
    <FileInput type="file" onChange={() => confirm("FileInput clicked!")}>
      <FaUpload size={"2rem"} color="skyblue" />
    </FileInput>
  ),
} satisfies StoryObj<typeof FileInput>;
