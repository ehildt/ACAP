import { useRef } from 'react';

import classNames from 'classnames';
import { useMouseMove } from './Container.hooks';
import { ContainerProps } from './Container.modal';
import style from './Container.module.scss';

export function Container(props: ContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={classNames([style.container, { [style.containerHighlight]: props.highlight }])}
      style={props.outerStyle}
      onMouseMove={(e) => useMouseMove(ref, e)}
      onClick={props.onClick}
    >
      <div className={style.containerContent} style={props.innerStyle}>
        {props.children}
      </div>
    </div>
  );
}
