import { ExtendedCSSProperties, ScaleProps } from "./Scale.modal";
import style from "./Scale.module.scss";

export function Scale(props: ScaleProps) {
  const extendedStyle: ExtendedCSSProperties = {
    "--animation-scale-speedMS": props.ms ? `${props.ms}ms` : undefined,
    "--animation-scale-speedMS2": props.ms2 ? `${props.ms2}ms` : undefined,
    "--animation-scaleX": props.x,
    "--animation-scaleY": props.y,
    "--animation-scaleX2": props.x2,
    "--animation-scaleY2": props.y2,
  };
  return (
    <div className={style.scale} style={props.style}>
      <div className={style.scaleContent} style={extendedStyle}>
        {props.children}
      </div>
    </div>
  );
}
