import { lazy, Suspense } from 'react';
import { FaHome } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa6';
import { RiListSettingsLine } from 'react-icons/ri';

import { Button } from '@/atomics';
import { Line } from '@/layouts/line/Line';

import { FlickerContainer, FlickerText } from '../../../effects';
import { useTabMenuImmerStore } from './DesktopLayoutHeaderMenu.store';
import style from './DesktopLayoutMain.module.scss';

const Metae = lazy(() => import('@/widgets/metae/Metae'));
const FileImporter = lazy(() => import('@/widgets/file-importer/FileImporter'));
const AcapConfigViewer = lazy(() => import('@/widgets/acap-config-viewer/AcapConfig'));

export function DesktopLayoutMain() {
  // TODO: replace for a router
  const { tab, setTab } = useTabMenuImmerStore();

  return (
    <main className={style.desktopLayoutMain}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Line
          style={{
            flexDirection: 'row-reverse',
            borderImage: 'linear-gradient(to left, gray, transparent) 1',
            borderBottom: '0.2rem solid gray',
            transition: 'border-bottom-color 0.3s ease',
            gap: '0px',
            width: '15vw',
            marginLeft: 'auto',
            position: 'sticky',
            top: '50px',
          }}
        >
          <FlickerContainer color="transparent" repeatFlickerBorder="1">
            <Button onClick={() => setTab('metae')} style={{ padding: '0px' }}>
              <RiListSettingsLine size={'2rem'} color="orange" />
            </Button>
          </FlickerContainer>
          <FlickerContainer color="transparent" repeatFlickerBorder="1">
            <Button onClick={() => setTab('importer')} style={{ padding: '0px' }}>
              <FaUpload size={'2rem'} color="yellowgreen" />
            </Button>
          </FlickerContainer>
          <FlickerContainer color="transparent" repeatFlickerBorder="1">
            <Button onClick={() => setTab('home')} style={{ padding: '0px' }}>
              <FaHome size={'2.3rem'} color="skyblue" />
            </Button>
          </FlickerContainer>
          <FlickerContainer color="transparent" repeatFlickerBorder="0">
            <FlickerText
              text="ACAP"
              style={{ fontSize: '2.5rem' }}
              color="crimson"
              minFaulty={0.25}
              repeatFlickerText="3"
              repeatFlickerTextFaulty="3"
            />
          </FlickerContainer>
        </Line>
        {tab === 'metae' && (
          <Suspense>
            <Metae />
          </Suspense>
        )}
        {tab === 'home' && (
          <Suspense>
            <AcapConfigViewer />
          </Suspense>
        )}
        {tab === 'importer' && (
          <Suspense>
            <FileImporter />
          </Suspense>
        )}
      </div>
    </main>
  );
}
