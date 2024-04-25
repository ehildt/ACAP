import { ChangeEvent } from 'react';

import { onChangeProxy } from './FileInput.modal';

export function useChangeEventProxy(callback?: onChangeProxy) {
  return async (e: ChangeEvent<HTMLInputElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    await callback?.({ element: e, target: e.target, files: e.target.files });
  };
}
