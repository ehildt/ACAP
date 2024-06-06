export type State = Data & Mutations;

export type Data = {
  tab: "home" | "editor" | "file-importer";
};

export type Mutations = {
  setTab: (tab: "home" | "editor" | "file-importer") => void;
};
