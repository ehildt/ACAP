import './PdfViewer.overwrite.scss';

import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { Container } from '@/layouts/container/Container';

import style from './PdfViewer.module.scss';
import { usePdfViewImmerStore } from './PdfViewer.store';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfViewerProps = {
  file?: File;
  scale?: number;
  formatter?: (currentPage: number, totalPages: number) => string;
};

export function PdfViewer(props: PdfViewerProps) {
  const { setPages, currentPage, setCurrentPage } = usePdfViewImmerStore();
  const [buffer, setBuffer] = useState<Buffer>();

  useEffect(() => {
    if (props.file) {
      props.file.arrayBuffer().then((ab) => setBuffer(Buffer.from(ab)));
    }
  }, [props.file]);

  return (
    <div className={style.pdfViewer}>
      <div className={style.pdfViewerContainer}>
        <Document
          file={`data:application/pdf;base64,${buffer?.toString('base64')}`}
          onLoadSuccess={({ numPages }) => {
            setCurrentPage(1);
            setPages(numPages);
          }}
          onLoadError={(e) => console.error(e)}
        >
          <Container>
            <Page pageNumber={currentPage} />
          </Container>
        </Document>
      </div>
    </div>
  );
}
