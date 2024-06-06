import { createStoreWithImmer } from "@/store/create-with-immer.store";

type Data = {
  selectedFile?: File;
  files: Array<File>;
  showTreeView: boolean;
};

type Mutations = {
  setSelectedFile: (file: File) => void;
  selectFiles: (files: Array<File>) => void;
  setShowTreeView: (status: boolean) => void;
};

export const useFileImporterImmerStore = createStoreWithImmer<Data & Mutations>(
  (immer) => ({
    selectedFile: undefined,
    files: [],
    showTreeView: false,
    setSelectedFile: (file) => {
      immer((store) => {
        store.selectedFile = file;
      });
    },
    setShowTreeView: (showTreeView) => {
      immer((store) => {
        store.showTreeView = showTreeView;
      });
    },
    selectFiles(files) {
      immer((store) => {
        const normalized = new Set(store.files);
        files.forEach((file) => !normalized.has(file) && normalized.add(file));
        store.files = Array.from(normalized);
      });
    },
  }),
);
