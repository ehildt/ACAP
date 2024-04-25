import { AcapConfigViewer } from '@/widgets/acap-config-viewer/AcapConfig';
import { FileImporter } from '@/widgets/file-importer/FileImporter';
import { useTabMenuImmerStore } from './DesktopLayoutHeaderMenu.store';
import style from './DesktopLayoutMain.module.scss';

export function DesktopLayoutMain() {
  const { tab } = useTabMenuImmerStore();
  return (
    <main className={style.desktopLayoutMain}>
      {tab === 'home' && <AcapConfigViewer />}
      {tab === 'importer' && <FileImporter />}
    </main>
  );
}
