import { useMouseEventProxy } from './NeonButton.hooks';
import { ExtendedCSSProperties, NeonButtonProps } from './NeonButton.modal';
import style from './NeonButton.module.scss';

export function NeonButton(props: NeonButtonProps) {
  const onClick = useMouseEventProxy(props.onClick);
  const textFlicker = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
  const textFaultyFlicker = Math.floor(Math.random() * (7000 - 2000 + 1)) + 2000;
  const borderFlicker = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;

  const extendedStyle: ExtendedCSSProperties = {
    '--clr-tooltip-neon-glow': props.neonColor,
    '--ms-tooltip-border-flicker': `${borderFlicker}ms`,
    '--ms-tooltip-text-flicker': `${textFlicker}ms`,
    '--ms-tooltip-text-faulty-flicker': `${textFaultyFlicker}ms`,
  };

  const animatedText = Array.from(props.text, (value, index) =>
    Array.from(new Set(props.faulty))?.includes(index) ? (
      <span key={`${value}_${index}`} className={style.neonButtonTextFaulty}>
        {value}
      </span>
    ) : (
      <span key={`${value}_${index}`}>{value}</span>
    ),
  );

  return (
    <button onClick={onClick} className={style.neonButton} disabled={props.disabled} style={{ ...extendedStyle }}>
      <span className={style.neonButtonText}>{animatedText}</span>
    </button>
  );
}
