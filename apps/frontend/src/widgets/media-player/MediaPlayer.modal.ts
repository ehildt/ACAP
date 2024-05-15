import { ReactPlayerProps } from 'react-player';

export type MediaPlayerProps = {
  buffer: Buffer;
  mimetype?: string;
  playerProps?: ReactPlayerProps;
};
