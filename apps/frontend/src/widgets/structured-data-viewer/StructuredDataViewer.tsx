import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import { parse } from 'yaml';

import { useFileImporterImmerStore } from '../file-importer/FileImporter.store';
import { JsonViewer } from '../json-viewer/JsonViewer';
import { TreeViewer } from '../tree-viewer/TreeViewer';
import { YmlViewer } from '../yml-viewer/YmlViewer';

type StructuredDataViewerProps = {
  file?: File;
};

export function StructuredDataViewer({ file }: StructuredDataViewerProps) {
  const { showTreeView } = useFileImporterImmerStore();
  const [buffer, setBuffer] = useState<Buffer>();

  useEffect(() => {
    if (file) {
      file.arrayBuffer().then((ab) => setBuffer(Buffer.from(ab)));
    }
  }, [file]);

  if (!buffer) return;

  if (file?.type?.endsWith('json')) {
    const data = JSON.parse(buffer.toString());
    return showTreeView ? <TreeViewer data={data} /> : <JsonViewer data={data} style={{ width: '100%' }} />;
  }

  const data = parse(buffer.toString());
  return showTreeView ? <TreeViewer data={data} /> : <YmlViewer data={data} style={{ width: '100%' }} />;
}
