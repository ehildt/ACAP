import { SUPPORTED_ICONS } from './FileCard.constants';

export const useIcon = (extension?: string, size = '2rem') => {
  if (!extension) return SUPPORTED_ICONS.default(size);
  return SUPPORTED_ICONS[extension.toLowerCase()]?.(size) ?? SUPPORTED_ICONS.default(size);
};
