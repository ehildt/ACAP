import Bytes from 'bytes';
import { formatDistanceToNow } from 'date-fns';

import { useIcon } from './FileCard.hooks';
import style from './FileCard.module.scss';

type FileCardProps = {
  onClick?: () => void;
  filename: string;
  extension?: string;
  lastModified: number;
  size: string;
  fileRef?: string;
  id?: string;
};

export function FileCard({ id, fileRef, filename, lastModified, size, extension, onClick }: FileCardProps) {
  return (
    <div className={style.fileCard} onClick={onClick}>
      <div data-icon>{useIcon(extension)}</div>
      <div data-content>
        <span data-filename>{filename}</span>
        <span>{formatDistanceToNow(new Date(lastModified), { addSuffix: true })}</span>
        <span>{Bytes(size)}</span>
        {fileRef && <span>{fileRef}</span>}
      </div>
    </div>
  );
}
