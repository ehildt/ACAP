import { challengeTraverseObject } from './challenge-traverse-object.helper';

const ENV_CACHE = new Map();

export function challengeContentValue(value: any, resolveEnv: boolean) {
  const result = challengeTraverseObject(value, (val: unknown) => {
    if (typeof val !== 'string' || !resolveEnv) return val;
    const env = val.startsWith('$ENV_') ? val.slice(5) : val;
    if (ENV_CACHE.has(env)) return ENV_CACHE.get(env);
    ENV_CACHE.set(env, process.env[env]);
    return ENV_CACHE.get(env);
  });

  try {
    return JSON.parse(result);
  } catch (error) {
    return result;
  }
}
