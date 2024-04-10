import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '@/wireframes/container/Container';
import { YmlViewer } from './YmlViewer';
import { YmlViewerMenu } from './YmlViewerMenu';

export default {
  title: 'widgets/yml-viewer',
  component: YmlViewer,
  decorators: [(story) => <>{story()}</>],
} satisfies Meta<typeof YmlViewer>;

export const DefaultYmlViewer = {
  render: () => (
    <Container>
      <YmlViewerMenu />
      <hr />
      <YmlViewer
        data={{
          name: 'eugen',
          isSexy: false,
          addresses: [{ city: 'bukarest' }, { city: 'moenchengladbach' }],
          magic: { firebolt: 'lvl2', type: 'fire' },
        }}
      />
    </Container>
  ),
} satisfies StoryObj<typeof YmlViewer>;

export const YmlViewerHighlighted = {
  render: () => (
    <Container>
      <YmlViewerMenu />
      <hr />
      <YmlViewer
        highlight
        data={{
          name: 'eugen',
          isSexy: false,
          addresses: [{ city: 'bukarest' }, { city: 'moenchengladbach' }],
          magic: { firebolt: 'lvl2', type: 'fire' },
        }}
      />
    </Container>
  ),
} satisfies StoryObj<typeof YmlViewer>;
