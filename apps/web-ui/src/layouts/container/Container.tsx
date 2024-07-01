import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { useMouseMove } from './Container.hooks';
import { ContainerProps, CSSCustomVariables } from './Container.modal';
import style from './Container.module.scss';

export function Container(props: ContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const highlight = props.highlightAccentColor ?? props.highlightColor;
  const cssCustomVariables: CSSCustomVariables = {
    '--clr-container-highlight-accent': props.highlightAccentColor,
    '--clr-container-highlight': props.highlightColor,
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), props.fadeInOutMS ?? 250);
    if (ref.current) {
      ref.current.addEventListener('mousemove', (e) => useMouseMove(ref, e));
      return () => ref.current?.removeEventListener('mousemove', (e) => useMouseMove(ref, e));
    }
  }, [props.fadeInOutMS]);

  return (
    <div
      onClick={props.onClick}
      ref={ref}
      style={{ ...props.outerStyle, ...cssCustomVariables }}
      className={classNames([
        style.container,
        {
          [style.containerHighlight]: highlight,
          [style.containerHighlightRadialGradient]: highlight,
          [style.containerVisible]: isVisible,
        },
      ])}
    >
      <div className={style.containerContent} style={props.innerStyle}>
        {props.children}
      </div>
    </div>
  );
}
