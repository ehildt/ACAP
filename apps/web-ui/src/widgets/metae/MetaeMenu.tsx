import { useEffect, useState } from 'react';

import { useACAPApi } from '@/api/acap/acap-api.hook';
import { PageSwitcher, SelectBox } from '@/atomics';

import { Scrollbar } from '../scrollbar/Scrollbar';
import { MetaeMenuProps } from './Metae.modal';
import style from './Metae.module.scss';
import { MetaeItem } from './MetaeItem';

export function MetaeMenu(props: MetaeMenuProps) {
  const { skip, take, source } = props;
  const [count, setCount] = useState<number>(0);
  const [metae, setMetae] = useState<Record<string, any>>();
  const acapAPI = useACAPApi({ baseUrl: 'http://localhost:3001' });

  useEffect(() => {
    // TODO: fetch-retention
    acapAPI
      .getMeta('realms', take, skip)
      .then((data) => data?.json())
      .then(({ data, count }) => {
        setMetae(data);
        setCount(count);
      });
  }, [take, skip, source]);

  return (
    <nav className={style.metaeMenu}>
      <ul className={style.metaeMenuIcons}>
        <li>
          <SelectBox
            defaultIndex={0}
            onClick={props.onSourceChange}
            items={[
              { name: 'Realms', value: 'realms' },
              { name: 'Schemas', value: 'schemas' },
            ]}
          />
        </li>
        <li>
          <SelectBox
            defaultIndex={0}
            onClick={props.onTakeChange}
            customInput
            items={[
              { name: 'Take 3', value: 3 },
              { name: 'Take 5', value: 5 },
              { name: 'Take 8', value: 8 },
            ]}
          />
        </li>
        <li>
          <PageSwitcher
            onLeftIconClick={props.onLeftIconClick}
            onRightIconClick={props.onRightIconClick}
            skip={skip}
            take={take}
            count={count}
          />
        </li>
      </ul>
      <div className={style.metaeMenuList}>
        {count && metae ? (
          <Scrollbar overflow="y" behavior="smooth" style={{ height: '60vh', width: '100%', gap: '0.3rem' }}>
            <MetaeItem metae={metae} />
          </Scrollbar>
        ) : (
          <div
            style={{
              margin: 'auto',
              userSelect: 'none',
              height: '60vh',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            No Metae Available.
          </div>
        )}
      </div>
    </nav>
  );
}
