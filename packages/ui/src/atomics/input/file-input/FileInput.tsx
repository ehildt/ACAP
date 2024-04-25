import { useRef } from 'react';

import { useChangeEventProxy } from './FileInput.hooks';
import { FileInputProps } from './FileInput.modal';
import style from './FileInput.module.scss';

export function FileInput(props: FileInputProps) {
  const inputRef = useRef<any>(null);

  return (
    <div style={props.style} className={style.fileInput} onClick={() => inputRef.current?.click()} tabIndex={0}>
      <input
        ref={inputRef}
        type={props.type}
        accept={props.accept}
        multiple={props.multiple}
        onChange={useChangeEventProxy(props.onChange)}
      />
      {props.children}
    </div>
  );
}
