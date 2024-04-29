import { useDimensionsWithStyle } from '@/hooks/use-dimensions-with-style';
import { CSSProperties, useRef } from 'react';

import { FlickerText } from '@/effects';
import style from './TextInput.module.scss';

type TextInputProps = {
  label: string;
  style?: CSSProperties;
  onChange: (value: string) => void;
};

export function TextInput(props: TextInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { width } = useDimensionsWithStyle(props, ref);

  return (
    <div className={style.textInput} style={{ width }}>
      <input
        ref={ref}
        type="text"
        placeholder=""
        style={{ width }}
        onChange={({ target }) => props.onChange(target.value)}
      />
      <FlickerText text={props.label} color="#ccc" maxFaulty={0.3} letterSpacing={'0.1rem'} style={{ width }} />
    </div>
  );
}
