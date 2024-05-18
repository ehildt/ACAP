import cn from "classnames";
import { BsPlay } from "react-icons/bs";
import ReactPlayer from "react-player/lazy";

import { MediaPlayerProps } from "./MediaPlayer.modal";
import style from "./MediaPlayer.module.scss";

export function MediaPlayer({ file, playerProps }: MediaPlayerProps) {
  return (
    file && (
      <div className={style.mediaPlayer}>
        <ReactPlayer
          className={cn([
            style.mediaPlayerOverwrite,
            { [style.mediaPlayerAudio]: file?.type?.startsWith("audio") },
          ])}
          url={URL.createObjectURL(file)}
          light="true"
          playIcon={<BsPlay size={"5rem"} color="violet" />}
          controls
          loop
          playing
          width={"100%"}
          height={"100%"}
          {...playerProps}
        />
      </div>
    )
  );
}
