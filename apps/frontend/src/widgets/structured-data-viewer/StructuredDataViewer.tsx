import { parse } from 'yaml';

import { useFileImporterImmerStore } from '../file-importer/FileImporter.store';
import { JsonViewer } from '../json-viewer/JsonViewer';
import { TreeViewer } from '../tree-viewer/TreeViewer';
import { YmlViewer } from '../yml-viewer/YmlViewer';

type StructuredDataViewerProps = {
  buffer: Buffer;
  mimetype?: string;
};

export function StructuredDataViewer({ buffer, mimetype }: StructuredDataViewerProps) {
  const { showTreeView } = useFileImporterImmerStore();

  if (mimetype?.endsWith('json')) {
    const data = JSON.parse(buffer.toString());
    return showTreeView ? <TreeViewer data={data} /> : <JsonViewer data={data} style={{ width: '100%' }} />;
  }

  const data = parse(buffer.toString());
  return showTreeView ? <TreeViewer data={data} /> : <YmlViewer data={data} style={{ width: '100%' }} />;
}
