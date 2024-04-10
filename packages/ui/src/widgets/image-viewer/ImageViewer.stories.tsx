import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '@/wireframes/container/Container';
import { ImageViewer } from './ImageViewer';
import { base64 } from './base64.jpg';

export default {
  title: 'widgets/image-viewer',
  component: ImageViewer,
} satisfies Meta<typeof ImageViewer>;

export const Default = {
  render: () => (
    <Container outerStyle={{ width: '40dvh' }} highlight>
      <ImageViewer mimeType="image/jpeg" base64={base64} />
    </Container>
  ),
} satisfies StoryObj<typeof ImageViewer>;
