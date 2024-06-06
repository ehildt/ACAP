import { ExtendedCSSProperties, FlickerTextProps } from "./Flicker.modal";
import { useAnimatedText } from "./FlickerText.hooks";
import style from "./FlickerText.module.scss";

export function FlickerText(props: FlickerTextProps) {
  const flickerTextMS =
    props.flickerTextMS ?? Math.floor(Math.random() * 1000) + 2000;
  const flickerTextDelayMS =
    props.flickerTextDelayMS ?? Math.floor(Math.random() * 3000) + 1000;
  const flickerTextFaultyMS =
    props.flickerTextFaultyMS ?? Math.floor(Math.random() * 3000) + 1000;
  const flickerTextFaultyDelayMS =
    props.flickerTextFaultyDelayMS ?? Math.floor(Math.random() * 3000) + 1000;
  const animatedText = useAnimatedText(props);
  const extendedStyle: ExtendedCSSProperties = {
    // TODO separate text-shadow and color
    // TODO set default otherwise they will be overwritten with undefined
    "--clr-flicker-glow": props.color,
    "--ms-flicker-text": `${flickerTextMS}ms`,
    "--ms-flicker-text-delay": `${flickerTextDelayMS}ms`,
    "--ms-flicker-text-faulty": `${flickerTextFaultyMS}ms`,
    "--ms-flicker-text-faulty-delay": `${flickerTextFaultyDelayMS}ms`,
    "--font-flicker-letter-spacing": props.letterSpacing ?? "0.3rem",
    "--mode-flicker-text-faulty": props.repeatFlickerTextFaulty ?? "infinite",
    "--mode-flicker-text": props.repeatFlickerText ?? "infinite",
  };
  return (
    <label
      className={style.flickerText}
      style={{ ...props.style, ...extendedStyle }}
    >
      {animatedText}
    </label>
  );
}
