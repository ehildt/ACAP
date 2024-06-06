import { ExtendedCSSProperties, FlickerContainerProps } from "./Flicker.modal";
import style from "./FlickerContainer.module.scss";

export function FlickerContainer(props: FlickerContainerProps) {
  const flickerBorderMS =
    props.flickerBorderMS ?? Math.floor(Math.random() * 3000) + 1000;
  const flickerBorderDelayMS =
    props.flickerBorderDelayMS ?? Math.floor(Math.random() * 2000) + 1000;
  const extendedStyle: ExtendedCSSProperties = {
    "--clr-flicker-glow": props.color,
    "--ms-flicker-border": `${flickerBorderMS}ms`,
    "--ms-flicker-border-delay": `${flickerBorderDelayMS}ms`,
    "--mode-flicker-border": props.repeatFlickerBorder ?? "infinite",
  };

  return (
    <div
      className={style.flickerContainer}
      style={{ ...props.style, ...extendedStyle }}
    >
      {props.children}
    </div>
  );
}
