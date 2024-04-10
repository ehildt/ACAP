import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FaCircleRadiation, FaPoop } from 'react-icons/fa6';

import { Button } from '@/atomics/button/Button';
import { Popup } from './Popup';

export default {
  title: 'widgets/popup',
  component: Popup,
} satisfies Meta<typeof Popup>;

export const Default = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} iconBefore={<FaPoop />}>
          popup
        </Button>
        <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
          clickMe
        </Popup>
      </>
    );
  },
} satisfies StoryObj<typeof Popup>;

export const WithMS = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} iconBefore={<FaPoop />}>
          popup
        </Button>
        <Popup title="I love cookies!" ms={1000} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          clickMe
        </Popup>
      </>
    );
  },
} satisfies StoryObj<typeof Popup>;

export const WithWidthHeight = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} iconBefore={<FaPoop />}>
          popup
        </Button>
        <Popup
          title="I love cookies!"
          ms={500}
          width="200px"
          height="150px"
          isOpen={isOpen}
          onCloseIcon={<FaCircleRadiation color="red" size={'1.2rem'} />}
          onClose={() => setIsOpen(false)}
        >
          clickMe
        </Popup>
      </>
    );
  },
} satisfies StoryObj<typeof Popup>;
