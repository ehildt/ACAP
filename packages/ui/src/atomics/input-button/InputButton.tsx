import { useRef } from 'react';

import { useChangeEventProxy } from './InputButton.hooks';
import { InputButtonProps } from './InputButton.modal';
import style from './InputButton.module.scss';

export function InputButton(props: InputButtonProps) {
  const inputRef = useRef<any>(null);

  return (
    <div className={style.inputButton} onClick={() => inputRef.current?.click()} tabIndex={0}>
      <input
        style={{ display: props.type === 'button' || props.type === 'file' ? 'none' : 'block' }}
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
