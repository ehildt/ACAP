import { ExtendedCSSProperties, FlickerContainerProps } from './Flicker.modal';
import style from './Flicker.module.scss';

export function FlickerContainer(props: FlickerContainerProps) {
  const flickerBorderMS = props.flickerBorderMS ?? Math.floor(Math.random() * 7000) + 3000;
  const flickerBorderDelayMS = props.flickerBorderDelayMS ?? Math.floor(Math.random() * 2000) + 1000;
  const extendedStyle: ExtendedCSSProperties = {
    '--clr-flicker-glow': props.color,
    '--ms-flicker-border': `${flickerBorderMS}ms`,
    '--ms-flicker-border-delay': `${flickerBorderDelayMS}ms`,
  };

  return (
    <div className={style.flicker} style={{ ...props.style, ...extendedStyle }}>
      {props.children}
    </div>
  );
}
