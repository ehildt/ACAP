import { useState } from 'react';

import { METAE_SOURCE } from '@/api/acap/acap-api.model';

import { MetaeProps } from './Metae.modal';
import style from './Metae.module.scss';
import { MetaeMenu } from './MetaeMenu';

export function Metae(props: MetaeProps) {
  const [take, setTake] = useState<number>(3);
  const [skip, setSkip] = useState<number>(0);
  const [source, setSource] = useState<METAE_SOURCE>('realms');

  return (
    <div className={style.metae}>
      <MetaeMenu
        skip={skip}
        take={take}
        source={source}
        onLeftIconClick={() => setSkip((skip) => (skip >= take ? skip - take : skip))}
        onRightIconClick={() => setSkip((skip) => skip + take)}
        onSourceChange={(value) => {
          setSkip(() => 0);
          setSource(() => value as METAE_SOURCE);
        }}
        onTakeChange={(value) => {
          setSkip(() => 0);
          setTake(() => parseInt(value, 10));
        }}
      />
      <div className={style.metaePreview}></div>
    </div>
  );
}
