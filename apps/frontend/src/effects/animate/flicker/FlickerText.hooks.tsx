import { ExtendedCSSProperties, FlickerTextProps } from "./Flicker.modal";
import style from "./FlickerText.module.scss";

function createFaultySet(props: FlickerTextProps) {
  if (props.faulty?.length) return new Set(props.faulty);
  const selectedChars: Set<number> = new Set();
  const maxLength = Math.floor(props.text.length * (props.maxFaulty ?? 0.7));
  const minLength = Math.ceil(props.text.length * (props.minFaulty ?? 0.3));
  const targetLength = Math.max(
    minLength,
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength,
  );
  while (selectedChars.size < targetLength) {
    const randomIndex = Math.floor(Math.random() * props.text.length);
    selectedChars.add(randomIndex);
  }

  return selectedChars;
}

export function useAnimatedText(props: FlickerTextProps) {
  return Array.from(props.text, (value, index) => {
    const flickerTextFaultyMS = Math.floor(Math.random() * 2000) + 1000;
    const flickerTextFaultyDelayMS = Math.floor(Math.random() * 3000) + 1000;
    const faultySet = createFaultySet(props);
    return Array.from(faultySet)?.includes(index) ? (
      <span
        key={`${value}_${index}`}
        className={style.flickerTextFaulty}
        style={
          {
            "--ms-flicker-text-faulty": `${flickerTextFaultyMS}ms`,
            "--ms-flicker-text-faulty-delay": `${flickerTextFaultyDelayMS}ms`,
            "--mode-flicker-text-faulty":
              props.repeatFlickerTextFaulty ?? "infinite",
          } as ExtendedCSSProperties
        }
      >
        {value}
      </span>
    ) : (
      <span key={`${value}_${index}`}>{value}</span>
    );
  });
}
