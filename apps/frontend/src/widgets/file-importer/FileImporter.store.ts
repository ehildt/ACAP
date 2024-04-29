import { createStoreWithImmer } from '@/store/create-with-immer.store';
import { FileMetadata } from './FileImporter.modal';

type Data = {
  selectedFile?: FileMetadata;
  files: Array<File>;
  toggleTreeView: boolean;
};

type Mutations = {
  setSelectedFile: (file: FileMetadata) => void;
  selectFiles: (files: Array<File>) => void;
  showTreeViewer: (status: boolean) => void;
};

export const useFileImporterImmerStore = createStoreWithImmer<Data & Mutations>((immer) => ({
  selectedFile: undefined,
  files: [],
  toggleTreeView: false,
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
  showTreeViewer: (status) => {
    immer((store) => {
      store.toggleTreeView = status;
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
