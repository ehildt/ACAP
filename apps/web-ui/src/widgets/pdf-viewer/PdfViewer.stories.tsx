import type { Meta, StoryObj } from '@storybook/react';
import { Buffer } from 'buffer';

import { pdfBase64Example } from './base64.pdf';
import { PdfViewer } from './PdfViewer';

export default {
  title: 'widgets/pdf-viewer',
  component: PdfViewer,
  decorators: [(renderer) => <div>{renderer()}</div>],
} satisfies Meta<typeof PdfViewer>;

const BUFFER = new Uint8Array(Buffer.from(pdfBase64Example, 'base64'));
const BLOB = new Blob([BUFFER], { type: 'application/pdf' });
const FILE = new File([BLOB], 'example.pdf', { type: BLOB.type });

export const DefaultPdfViewer = {
  render: () => (
    <PdfViewer
      file={FILE}
      formatter={(currentPageNumber, totalPageCount) => `Page ${currentPageNumber} of ${totalPageCount}`}
    />
  ),
} satisfies StoryObj<typeof PdfViewer>;
