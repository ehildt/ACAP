import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import { useMouseMove } from './Container.hooks';
import { CSSCustomVariables, ContainerProps } from './Container.modal';
import style from './Container.module.scss';

export function Container(props: ContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const highlight = props.highlightAccentColor ?? props.highlightColor;
  const cssCustomVariables: CSSCustomVariables = {
    '--clr-container-highlight-accent': props.highlightAccentColor,
    '--clr-container-highlight': props.highlightColor,
  };

  const onMouseMoveCallback = useCallback((e: MouseEvent) => {
    if (ref.current) useMouseMove(ref, e);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mousemove', onMouseMoveCallback);
      return () => ref.current?.removeEventListener('mousemove', onMouseMoveCallback);
    }
  }, [onMouseMoveCallback]);

  return (
    <div
      ref={ref}
      style={{ ...props.outerStyle, ...cssCustomVariables }}
      className={classNames([
        style.container,
        {
          [style.containerHighlight]: highlight,
          [style.containerHighlightRadialGradient]: highlight,
        },
      ])}
    >
      <div className={style.containerContent} style={props.innerStyle}>
        {props.children}
      </div>
    </div>
  );
}
