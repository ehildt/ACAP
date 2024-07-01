import cn from 'classnames';
import { useState } from 'react';

import { ExtendedCSSProperties, PulseProps } from './Pulse.modal';
import style from './Pulse.module.scss';

export function Pulse(props: PulseProps) {
  const [highlight, setHighlight] = useState(false);
  const extendedStyle: ExtendedCSSProperties = {
    '--animation-pulse-speedMS': props.ms ? `${props.ms}ms` : undefined,
    '--animation-pulse-delay': props.delay ? `${props.delay}ms` : undefined,
    '--animation-pulse-from': props.from,
    '--animation-pulse-to': props.to,
  };

  return (
    <div className={style.pulse} style={props.style}>
      <div
        style={extendedStyle}
        className={cn({
          [style.pulseActive]: props.mode === 'active',
          [style.pulseDefault]: !highlight,
          [style.pulsePassive]: highlight,
        })}
        onMouseEnter={() => props.mode === 'passive' && setHighlight(true)}
        onMouseLeave={() => props.mode === 'passive' && setHighlight(false)}
      >
        {props.children}
      </div>
    </div>
  );
}
