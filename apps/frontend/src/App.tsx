import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DesktopLayout, DesktopLayoutFooter, DesktopLayoutHeader, DesktopLayoutMain } from 'ui';

import { useCacheImmerStore } from './store/cache';

export function App() {
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const { tab, setTab } = useCacheImmerStore();
  const { t } = useTranslation();

  return (
    // switch default layout if needed
    <DesktopLayout>
      <DesktopLayoutHeader></DesktopLayoutHeader>
      <DesktopLayoutMain tab={tab}></DesktopLayoutMain>
      <DesktopLayoutFooter></DesktopLayoutFooter>
    </DesktopLayout>
  );
}
