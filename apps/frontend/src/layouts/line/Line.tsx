import cn from 'classnames';
import { CSSProperties, ReactNode } from 'react';

import style from './Line.module.scss';

type LineProps = {
  children?: ReactNode;
  style?: CSSProperties;
  vertical?: boolean;
};

export function Line(props: LineProps) {
  return (
    <div className={cn([style.line, { [style.lineOrientationVertical]: props.vertical }])} style={props.style}>
      {props.children}
    </div>
  );
}
