import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FaPoop } from 'react-icons/fa6';

import { Button } from '..';
import { Popup } from './Popup';

export default {
  title: 'popups/popup',
  component: Popup,
} satisfies Meta<typeof Popup>;

export const DefaultPopup = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} iconBefore={<FaPoop />}>
          open
        </Button>
        {isOpen && <Popup onClose={() => setIsOpen(false)}>clickMe</Popup>}
      </>
    );
  },
} satisfies StoryObj<typeof Popup>;
