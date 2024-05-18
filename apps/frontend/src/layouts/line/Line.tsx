import cn from "classnames";
import { CSSProperties, ReactNode } from "react";

import style from "./Line.module.scss";

type LineProps = {
  children?: ReactNode;
  style?: CSSProperties;
  vertical?: boolean;
  onClick?: () => void;
};

export function Line(props: LineProps) {
  return (
    <div
      className={cn([
        style.line,
        { [style.lineOrientationVertical]: props.vertical },
      ])}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
