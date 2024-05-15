import cn from 'classnames';
import { BsPlay } from 'react-icons/bs';
import ReactPlayer from 'react-player';

import { MediaPlayerProps } from './MediaPlayer.modal';
import style from './MediaPlayer.module.scss';

export function MediaPlayer({ buffer, mimetype, playerProps }: MediaPlayerProps) {
  return (
    <div className={style.mediaPlayer}>
      <ReactPlayer
        className={cn([style.mediaPlayerOverwrite, { [style.mediaPlayerAudio]: mimetype?.startsWith('audio') }])}
        url={URL.createObjectURL(new Blob([buffer], { type: mimetype }))}
        light="true"
        playIcon={<BsPlay size={'5rem'} color="violet" />}
        controls
        loop
        playing
        width={'100%'}
        height={'100%'}
        {...playerProps}
      />
    </div>
  );
}
