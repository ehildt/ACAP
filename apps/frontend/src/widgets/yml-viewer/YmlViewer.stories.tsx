import type { Meta, StoryObj } from '@storybook/react';

import { YmlViewer } from './YmlViewer';
import { YmlViewerMenu } from './YmlViewerMenu';

export default {
  title: 'widgets/yml-viewer',
  component: YmlViewer,
  decorators: [(story) => <>{story()}</>],
} satisfies Meta<typeof YmlViewer>;

export const DefaultYmlViewer = {
  render: () => (
    <>
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
    </>
  ),
} satisfies StoryObj<typeof YmlViewer>;

export const YmlViewerHighlighted = {
  render: () => (
    <>
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
    </>
  ),
} satisfies StoryObj<typeof YmlViewer>;
