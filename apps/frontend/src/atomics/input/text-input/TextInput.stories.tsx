import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from '@/atomics/tooltip/Tooltip';

import { TextInput } from './TextInput';

export default {
  title: 'atomics/input',
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export const Primary = {
  render: () => (
    <div style={{ width: '200px' }}>
      <Tooltip tooltip={'the name is required'}>
        <TextInput label="name" onChange={(e) => console.log(e)} />
      </Tooltip>
    </div>
  ),
} satisfies StoryObj<typeof TextInput>;
