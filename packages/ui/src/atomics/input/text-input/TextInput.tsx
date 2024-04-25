import { FlickerText } from '@/effects';
import { useDimensionsWithStyle } from 'libs';
import { CSSProperties, useRef } from 'react';
import style from './TextInput.module.scss';

type TextInputProps = {
  label: string;
  style?: CSSProperties;
};

export function TextInput(props: TextInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { width } = useDimensionsWithStyle(props, ref);

  return (
    <div className={style.textInput} style={{ width }}>
      <input ref={ref} type="text" placeholder="" style={{ width }} />
      <FlickerText text={props.label} color="#ccc" maxFaulty={0.3} letterSpacing={'0.1rem'} style={{ width }} />
    </div>
  );
}
