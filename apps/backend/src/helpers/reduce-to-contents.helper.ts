import { challengeContentValue } from "./challenge-content-source.helper";

export function reduceToContents(
  resolveEnv: boolean,
  entities?: Array<any> | Record<string, unknown>,
) {
  if (Array.isArray(entities))
    return entities?.reduce((acc, { id, value }) => {
      let parsedValue: string | Record<string, unknown>;

      try {
        parsedValue = JSON.parse(value);
      } catch (error) {
        parsedValue = value;
      }

      return {
        ...acc,
        [id]: id && value && challengeContentValue(parsedValue, resolveEnv),
      };
    }, {});

  return challengeContentValue(entities, resolveEnv);
}
