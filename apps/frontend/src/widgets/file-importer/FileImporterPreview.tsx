import { FILE_RENDERERS } from "./FileImporter.constants";
import { useFileImporterImmerStore } from "./FileImporter.store";

export function FileImporterPreview() {
  const { selectedFile } = useFileImporterImmerStore();
  const extension = selectedFile?.name.split(".").pop() ?? "error";
  const renderer = FILE_RENDERERS[extension]?.(selectedFile);
  return <div className="file-importer-preview">{renderer}</div>;
}
