import { createStoreWithImmer } from '@/store/create-with-immer.store';
import { FileMetadata } from './FileImporter.modal';

type Data = {
  selectedFile?: FileMetadata;
  files: Array<File>;
  showTreeView: boolean;
};

type Mutations = {
  setSelectedFile: (file: FileMetadata) => void;
  selectFiles: (files: Array<File>) => void;
  setShowTreeView: (status: boolean) => void;
};

export const useFileImporterImmerStore = createStoreWithImmer<Data & Mutations>((immer) => ({
  selectedFile: undefined,
  files: [],
  showTreeView: false,
  setSelectedFile: (file) => {
    immer((store) => {
      if (!store.selectedFile) {
        store.selectedFile = file;
        return;
      }

      const { name, extension } = store.selectedFile;
      if (file.name !== `${name}.${extension}`) store.selectedFile = file;
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
}));
