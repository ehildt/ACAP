import { formatDistanceToNow } from 'date-fns';

import { useIcon } from './FileCard.hooks';
import style from './FileCard.module.scss';

type FileCardProps = {
  onClick?: () => void;
  filename: string;
  extension?: string;
  lastModified: number;
  size: string;
};

export function FileCard(props: FileCardProps) {
  return (
    <div className={style.fileCard} onClick={props.onClick}>
      <div data-icon>{useIcon(props.extension)}</div>
      <div data-content>
        <span data-filename>{props.filename}</span>
        <span>{props.size}</span>
        <span>{formatDistanceToNow(new Date(props.lastModified), { addSuffix: true })}</span>
      </div>
    </div>
  );
}
