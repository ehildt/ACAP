import { AcapConfigViewer } from '@/widgets/acap-config-viewer/AcapConfig';
import { FileImporter } from '@/widgets/file-importer/FileImporter';
import style from './DesktopLayoutMain.module.scss';

type DesktopLayoutMainTabs = 'home' | 'file-importer' | 'editor';

type DesktopLayoutMainProps = {
  tab?: DesktopLayoutMainTabs;
};

export function DesktopLayoutMain({ tab }: DesktopLayoutMainProps) {
  return (
    <main className={style.desktopLayoutMain}>
      {tab === 'home' && <AcapConfigViewer />}
      {tab === 'editor' && <div />}
      {tab === 'file-importer' && <FileImporter />}
    </main>
  );
}
