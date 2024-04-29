import { createStoreWithImmer } from '@/store/create-with-immer.store';

type TAB = 'home' | 'importer';

type Data = {
  tab?: TAB;
};

type Mutations = {
  setTab: (tab: TAB) => void;
};

export const useTabMenuImmerStore = createStoreWithImmer<Data & Mutations>((set) => ({
  tab: 'home',
  setTab: (tab) =>
    set((store) => {
      store.tab = tab;
    }),
}));
