import './PdfViewer.overwrite.scss';

import { Document, Page, pdfjs } from 'react-pdf';

import { Container } from '@/layouts/container/Container';

import style from './PdfViewer.module.scss';
import { usePdfViewImmerStore } from './PdfViewer.store';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type PdfViewerProps = {
  base64: string;
  scale?: number;
  formatter?: (currentPage: number, totalPages: number) => string;
};

export function PdfViewer(props: PdfViewerProps) {
  const { setPages, currentPage, setCurrentPage } = usePdfViewImmerStore();

  return (
    <div className={style.pdfViewer}>
      <div className={style.pdfViewerContainer}>
        <Document
          file={`data:application/pdf;base64,${props.base64}`}
          onLoadSuccess={({ numPages }) => {
            setCurrentPage(1);
            setPages(numPages);
          }}
        >
          <Container>
            <Page pageNumber={currentPage} renderAnnotationLayer={false} />
          </Container>
        </Document>
      </div>
    </div>
  );
}
