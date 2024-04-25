import { ExtendedCSSProperties, FlickerTextProps } from './Flicker.modal';
import style from './Flicker.module.scss';
import { useAnimatedText } from './FlickerText.hooks';

export function FlickerText(props: FlickerTextProps) {
  const flickerTextMS = props.flickerTextMS ?? Math.floor(Math.random() * 1000) + 2000;
  const flickerTextDelayMS = props.flickerTextDelayMS ?? Math.floor(Math.random() * 3000) + 1000;
  const flickerTextFaultyMS = props.flickerTextFaultyMS ?? Math.floor(Math.random() * 3000) + 1000;
  const flickerTextFaultyDelayMS = props.flickerTextFaultyDelayMS ?? Math.floor(Math.random() * 3000) + 1000;
  const animatedText = useAnimatedText(props);
  const extendedStyle: ExtendedCSSProperties = {
    // TODO separate text-shadow and color
    '--clr-flicker-glow': props.color,
    '--ms-flicker-text': `${flickerTextMS}ms`,
    '--ms-flicker-text-delay': `${flickerTextDelayMS}ms`,
    '--ms-flicker-text-faulty': `${flickerTextFaultyMS}ms`,
    '--ms-flicker-text-faulty-delay': `${flickerTextFaultyDelayMS}ms`,
    '--font-flicker-letter-spacing': props.letterSpacing,
  };
  return (
    <label className={style.flickerText} style={{ ...props.style, ...extendedStyle }}>
      {animatedText}
    </label>
  );
}
