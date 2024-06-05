import type { Meta, StoryObj } from "@storybook/react";
import { Buffer } from "buffer";

import { base64, mimetype } from "./base64.jpg";
import { ImageViewer } from "./ImageViewer";

export default {
  title: "widgets/image-viewer",
  component: ImageViewer,
} satisfies Meta<typeof ImageViewer>;

const BUFFER = new Uint8Array(Buffer.from(base64, "base64"));
const BLOB = new Blob([BUFFER], { type: mimetype });
const FILE = new File([BLOB], "example.jpg", { type: BLOB.type });

export const Default = {
  render: () => (
    <div style={{ width: "40dvh" }}>
      <ImageViewer file={FILE} />
    </div>
  ),
} satisfies StoryObj<typeof ImageViewer>;
