import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FaDragon, FaPoop, FaShield } from 'react-icons/fa6';

import { Button } from '@/atomics/button/Button';
import { Tooltip } from '@/atomics/tooltip/Tooltip';
import { Pulse } from '@/effects/animate/pulse/Pulse';
import { Container } from '@/layouts/container/Container';
import { GiSwordSlice } from 'react-icons/gi';
import { ImageViewer } from '../image-viewer/ImageViewer';
import { base64, mimeType } from '../image-viewer/base64.jpg';
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
          isOpen={isOpen}
          onCancel={() => setIsOpen(false)}
          onClick={() => confirm('saved')}
          title="Slay the dragon.."
          infoBar={
            <>
              <Tooltip tooltip={'the dragon slayer'}>
                <Pulse to={1.2} ms={750} mode="passive">
                  <GiSwordSlice color="silver" size={'1.4rem'} />
                </Pulse>
              </Tooltip>
              <Tooltip tooltip={'resists dragon attacs'}>
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
          <Container outerStyle={{ width: '25dvw', margin: 'auto' }} highlight>
            <ImageViewer base64={base64} mimeType={mimeType} />
          </Container>
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
        <Popup title="I love cookies!" ms={1000} isOpen={isOpen} onCancel={() => setIsOpen(false)}>
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
          onCancel={() => setIsOpen(false)}
        >
          clickMe
        </Popup>
      </>
    );
  },
} satisfies StoryObj<typeof Popup>;
