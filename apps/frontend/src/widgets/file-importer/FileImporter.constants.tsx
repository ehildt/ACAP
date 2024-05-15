import { ImageViewer } from '../image-viewer/ImageViewer';
import { MediaPlayer } from '../media-player/MediaPlayer';
import { PdfViewer } from '../pdf-viewer/PdfViewer';
import { StructuredDataViewer } from '../structured-data-viewer/StructuredDataViewer';
import { FileImporterRenderer } from './FileImporter.modal';

export const FILE_RENDERERS: FileImporterRenderer = {
  pdf: (buffer) => <PdfViewer buffer={buffer} />,
  mp4: (buffer, mimetype) => <MediaPlayer buffer={buffer} mimetype={mimetype} />,
  mp3: (buffer, mimetype) => <MediaPlayer buffer={buffer} mimetype={mimetype} />,
  wav: (buffer, mimetype) => <MediaPlayer buffer={buffer} mimetype={mimetype} />,
  mov: (buffer, mimetype) => <MediaPlayer buffer={buffer} mimetype={mimetype} />,
  webm: (buffer, mimetype) => <MediaPlayer buffer={buffer} mimetype={mimetype} />,
  ogv: (buffer, mimetype) => <MediaPlayer buffer={buffer} mimetype={mimetype} />,
  jpg: (buffer, mimetype) => <ImageViewer buffer={buffer} mimetype={mimetype} />,
  png: (buffer, mimetype) => <ImageViewer buffer={buffer} mimetype={mimetype} />,
  json: (buffer, mimetype) => <StructuredDataViewer buffer={buffer} mimetype={mimetype} />,
  yml: (buffer, mimetype) => <StructuredDataViewer buffer={buffer} mimetype={mimetype} />,
  yaml: (buffer, mimetype) => <StructuredDataViewer buffer={buffer} mimetype={mimetype} />,
};
