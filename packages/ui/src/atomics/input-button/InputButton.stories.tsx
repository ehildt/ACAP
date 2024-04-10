import type { Meta, StoryObj } from '@storybook/react';
import { FaPencil, FaUpload } from 'react-icons/fa6';

import { InputButton } from './InputButton';

export default {
  title: 'atomics/input',
  component: InputButton,
} satisfies Meta<typeof InputButton>;

export const TextInputButton = {
  render: () => (
    <InputButton type="text" onChange={({ target }) => console.log('InputButton clicked!', target.value)}>
      <FaPencil size={'2rem'} color="skyblue" onClick={() => {}} />
    </InputButton>
  ),
} satisfies StoryObj<typeof InputButton>;

export const DefaultInputButton = {
  render: () => (
    <InputButton type="file" onChange={() => confirm('InputButton clicked!')}>
      <FaUpload size={'2rem'} color="skyblue" />
    </InputButton>
  ),
} satisfies StoryObj<typeof InputButton>;
