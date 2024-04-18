import { CSSProperties, ReactNode } from 'react';

import style from './DesktopLayout.module.scss';

type DesktopLayoutProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export function DesktopLayout(props: DesktopLayoutProps) {
  return (
    <div className={style.desktopLayout} style={props.style}>
      {props.children}
    </div>
  );
}
