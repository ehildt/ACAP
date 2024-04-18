import cn from 'classnames';
import { useDimensionsWithStyle } from 'libs';
import { CSSProperties, ReactNode, useRef } from 'react';
import style from './Tooltip.module.scss';

type TooltipProps = {
  children?: ReactNode;
  tooltip: ReactNode;
  style?: CSSProperties;
};

export function Tooltip(props: TooltipProps) {
  const refTooltip = useRef(null);
  const { width, height } = useDimensionsWithStyle(props, refTooltip);

  return (
    <div className={cn(style.tooltip)}>
      <div ref={refTooltip} className={cn(style.tooltipContentWrapper)}>
        {props.children}
      </div>
      <div className={cn(style.tooltipElement)}>{props.tooltip}</div>
    </div>
  );
}
