import { SUPPORTED_ICONS } from './FileCard.constants';

export const useIcon = (fileType?: string, size = '2rem') => {
  if (!fileType) return SUPPORTED_ICONS.default(size);
  return SUPPORTED_ICONS[fileType.toLowerCase()]?.(size) ?? SUPPORTED_ICONS.default(size);
};
