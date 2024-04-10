import './FileSelector.scss';

import { useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa6';

import { InputButton } from '@/atomics/input-button/InputButton';

import { JsonViewerMenu } from '@/widgets/json-viewer/JsonViewerMenu';
import { YmlViewerMenu } from '@/widgets/yml-viewer/YmlViewerMenu';

import { PdfViewerMenu } from '@/widgets/pdf-viewer/PdfViewerMenu';
import { Popup, useFileImporterImmerStore } from '../..';
import { FileSelectorProps } from './FileSelector.modal';

export function FileSelector(props: FileSelectorProps) {
  const fileSlice = useFileImporterImmerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: introduce a global store for setting the popup content and behavior
  return (
    <div className="file-selector">
      <div className="file-selector-menu">
        {fileSlice.selectedFile?.extension === 'pdf' && <PdfViewerMenu formatter={(p, t) => `${p} / ${t}`} />}
        {fileSlice.selectedFile?.extension === 'json' && <JsonViewerMenu />}
        {fileSlice.selectedFile?.extension === 'yml' && <YmlViewerMenu />}
        <FaSave size={'2rem'} color="orange" onClick={() => setIsModalOpen(true)} />
        <FaEdit size={'2rem'} color="yellow" />
        <InputButton multiple onChange={props.onChange} accept={props.accept} type="file">
          <FaUpload size={'2rem'} color="skyblue" />
        </InputButton>
        <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h1>{'jojoj'}</h1>
        </Popup>
      </div>
    </div>
  );
}

FileSelector.defaultProps = {
  label: 'Select File(s)',
  accept: '*/*',
} satisfies FileSelectorProps;
