import type { Meta, StoryObj } from '@storybook/react';

import { JsonViewer } from './JsonViewer';

export default {
  title: 'widgets/json-viewer',
  component: JsonViewer,
  decorators: [(story) => <>{story()}</>],
} satisfies Meta<typeof JsonViewer>;

export const DefaultJsonViewer = {
  render: () => (
    <JsonViewer
      data={{
        name: 'eugen',
        isSexy: false,
        addresses: [{ city: 'bukarest' }, { city: 'moenchengladbach' }],
      }}
    />
  ),
} satisfies StoryObj<typeof JsonViewer>;
