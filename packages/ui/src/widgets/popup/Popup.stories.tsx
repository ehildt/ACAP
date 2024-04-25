import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FaDragon, FaPoop, FaShield } from 'react-icons/fa6';

import { Button } from '@/atomics/button/Button';
import { TextInput } from '@/atomics/input/text-input/TextInput';
import { Tooltip } from '@/atomics/tooltip/Tooltip';
import { Pulse } from '@/effects/animate/pulse/Pulse';
import { GiSwordSlice } from 'react-icons/gi';
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
        <Popup
          contentStyle={{ display: 'flex', alignItems: 'center', padding: '5rem' }}
          isOpen={isOpen}
          title="Slay the dragon.."
          onClose={() => setIsOpen(false)}
          onCancel={() => confirm('canceled')}
          onClick={() => confirm('submitted')}
          infoBar={
            <>
              <Tooltip tooltip={'the dragon slayer'}>
                <Pulse to={1.2} ms={750} mode="passive">
                  <GiSwordSlice color="silver" size={'1.4rem'} />
                </Pulse>
              </Tooltip>
              <Tooltip tooltip={'resists dragon attacks'}>
                <Pulse to={1.2} ms={750} mode="passive">
                  <FaShield color="bronze" size={'1.4rem'} />
                </Pulse>
              </Tooltip>
              <Tooltip tooltip={'a black dragon appeared'}>
                <Pulse to={1.2} ms={750} mode="passive">
                  <FaDragon color="red" size={'1.4rem'} />
                </Pulse>
              </Tooltip>
            </>
          }
        >
          <TextInput label="Please enter a configuration name" style={{ width: '100%' }} />
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
        <Popup
          title="I love cookies!"
          ms={1000}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCancel={() => confirm('canceled')}
          onClick={() => confirm('submitted')}
          hideXButton
        >
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
          onClose={() => setIsOpen(false)}
          onCancel={() => confirm('canceled')}
          onClick={() => confirm('submitted')}
        >
          clickMe
        </Popup>
      </>
    );
  },
} satisfies StoryObj<typeof Popup>;
