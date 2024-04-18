import type { Meta, StoryObj } from '@storybook/react';
import { FaUpload } from 'react-icons/fa6';

import { GiPencil } from 'react-icons/gi';
import { InputButton } from './InputButton';

export default {
  title: 'atomics/input',
  component: InputButton,
} satisfies Meta<typeof InputButton>;

export const TextInput = {
  render: () => (
    <InputButton type="text" onChange={({ target }) => console.log('InputButton clicked!', target.value)}>
      <GiPencil size={'2rem'} color="skyblue" onClick={() => {}} />
    </InputButton>
  ),
} satisfies StoryObj<typeof InputButton>;

export const FileInput = {
  render: () => (
    <InputButton type="file" onChange={() => confirm('InputButton clicked!')}>
      <FaUpload size={'2rem'} color="skyblue" />
    </InputButton>
  ),
} satisfies StoryObj<typeof InputButton>;
