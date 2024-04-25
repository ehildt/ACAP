import { Tooltip } from '@/atomics/tooltip/Tooltip';
import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

export default {
  title: 'atomics/input',
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export const Primary = {
  render: () => (
    <div style={{ width: '200px' }}>
      <Tooltip tooltip={'the name is required'}>
        <TextInput label="name" />
      </Tooltip>
    </div>
  ),
} satisfies StoryObj<typeof TextInput>;
