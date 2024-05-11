import { createStoreWithImmer } from 'libs';

import { CalculatedFile } from './FileImporter';

type Data = {
  selectedFile?: CalculatedFile;
  files?: Array<File>;
  toggleTreeView: boolean;
  toggleLeafNodeValues: boolean;
};

type Mutations = {
  setSelectedFile: (file: CalculatedFile) => Promise<void>;
  selectFiles: (files: FileList | null) => Promise<void>;
  setToggleTreeView: () => Promise<void>;
  setToggleLeafNodeValues: () => Promise<void>;
};

export const useFileImporterImmerStore = createStoreWithImmer<Data & Mutations>((set) => ({
  selectedFile: undefined,
  files: [],
  toggleLeafNodeValues: false,
  toggleTreeView: false,
  setSelectedFile: async (file) => {
    set((store) => {
      store.selectedFile = file;
    });
  },
  setToggleTreeView: async () => {
    set((store) => {
      store.toggleTreeView = !store.toggleTreeView;
    });
  },
  setToggleLeafNodeValues: async () => {
    set((store) => {
      store.toggleLeafNodeValues = !store.toggleLeafNodeValues;
    });
  },
  selectFiles: async (files) =>
    set((store) => {
      if (files) store.files = store.files?.concat(Array.from(files));
    }),
}));
