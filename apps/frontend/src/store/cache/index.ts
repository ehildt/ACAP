import { createStoreWithImmer } from 'libs';

import { State } from './model';

export const useCacheImmerStore = createStoreWithImmer<State>((set) => ({
  tab: 'home',
  setTab: (tab) =>
    set((state) => {
      state.tab = tab;
    }),
}));
