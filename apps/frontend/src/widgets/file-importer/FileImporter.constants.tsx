import { ImageViewer } from "../image-viewer/ImageViewer";
import { MediaPlayer } from "../media-player/MediaPlayer";
import { PdfViewer } from "../pdf-viewer/PdfViewer";
import { StructuredDataViewer } from "../structured-data-viewer/StructuredDataViewer";
import { FileImporterRenderer } from "./FileImporter.modal";

export const FILE_RENDERERS: FileImporterRenderer = {
  pdf: (file) => <PdfViewer file={file} />,
  mp4: (file) => <MediaPlayer file={file} />,
  mp3: (file) => <MediaPlayer file={file} />,
  wav: (file) => <MediaPlayer file={file} />,
  mov: (file) => <MediaPlayer file={file} />,
  webm: (file) => <MediaPlayer file={file} />,
  ogv: (file) => <MediaPlayer file={file} />,
  jpg: (file) => <ImageViewer file={file} />,
  png: (file) => <ImageViewer file={file} />,
  json: (file) => <StructuredDataViewer file={file} />,
  yml: (file) => <StructuredDataViewer file={file} />,
  yaml: (file) => <StructuredDataViewer file={file} />,
  error: (file) => <div>preview not available: {file?.name}</div>,
};
