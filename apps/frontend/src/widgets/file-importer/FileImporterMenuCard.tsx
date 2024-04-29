import { Container } from '@/layouts/container/Container';
import { useIcon, useLoadFileContents } from './FileImporter.hooks';
import { useFileImporterImmerStore } from './FileImporter.store';
import style from './FileImporterMenuCard.module.scss';

export function FileImporterMenuCard() {
  const fileSlice = useFileImporterImmerStore();
  const metadata = useLoadFileContents(fileSlice.files)?.map((f, idx) => {
    return (
      <Container key={idx} fadeInOutMS={250 + 100 * idx}>
        <div
          className={style.card}
          onClick={() => {
            fileSlice.showTreeViewer(false);
            fileSlice.setSelectedFile(f);
          }}
        >
          <div data-icon>{useIcon(f.extension)}</div>
          <div data-content>
            <span data-name="filename">{f.name}</span>
            <span>{f.size}</span>
            <span>{f.lastModified}</span>
          </div>
        </div>
      </Container>
    );
  });

  return metadata ? (
    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>{metadata}</div>
  ) : (
    <div style={{ margin: 'auto', userSelect: 'none' }}>No Files Selected.</div>
  );
}
