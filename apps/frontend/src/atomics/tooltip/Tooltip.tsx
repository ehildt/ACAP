import cn from 'classnames';
import { CSSProperties, ReactNode, useRef } from 'react';

import style from './Tooltip.module.scss';

type TooltipProps = {
  children?: ReactNode;
  tooltip: ReactNode;
  offset?: number;
};

export function Tooltip(props: TooltipProps) {
  const refTooltip = useRef(null);
  const extendedStyle = {
    '--percent-toolbar-offset': `${props.offset ?? 0}px`,
  } as CSSProperties;

  return (
    <div className={cn(style.tooltip)}>
      <div ref={refTooltip} className={cn(style.tooltipContentWrapper)}>
        {props.children}
      </div>
      <div className={cn(style.tooltipElement)} style={extendedStyle}>
        {props.tooltip}
      </div>
    </div>
  );
}
