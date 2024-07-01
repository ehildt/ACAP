import cn from 'classnames';
import { useState } from 'react';

import { FileCard } from '@/atomics/file-card/FileCard';
import { FlickerText } from '@/effects';
import { Line } from '@/layouts';
import { Container } from '@/layouts/container/Container';

import { MetaeItemProps } from './Metae.modal';
import style from './Metae.module.scss';
import { MetaeSubListItemHeader } from './MetaeSubListItemHeader';

export function MetaeItem(props: MetaeItemProps) {
  const keys = Object.keys(props.metae);
  const [realmKey, setRealmKey] = useState<string>();

  return (
    <>
      <div // this is the realm list
        className={cn([style.metaeMenuListItem, { [style.metaeMenuListItemVisible]: !realmKey }])}
      >
        {keys.map((key, index) => (
          <div onClick={() => setRealmKey(key)}>
            <Container
              key={`${key}_${index}`}
              fadeInOutMS={100 * index}
              innerStyle={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                userSelect: 'none',
              }}
              outerStyle={{ padding: '1rem', cursor: 'pointer' }}
            >
              <Line>
                <FlickerText
                  text={key}
                  letterSpacing="1px"
                  repeatFlickerText="1"
                  repeatFlickerTextFaulty="2"
                  color="yellowgreen"
                />
                <h1 style={{ marginLeft: 'auto' }}>{props.metae?.[key].length}</h1>
              </Line>
            </Container>
          </div>
        ))}
      </div>

      <div // this is the realm content list
        className={cn([style.metaeMenuListItem, { [style.metaeMenuListItemVisible]: realmKey }])}
      >
        <MetaeSubListItemHeader text={realmKey} onClick={() => setRealmKey(undefined)} />
        {realmKey &&
          props.metae?.[realmKey]?.map((item: any, idx: any) => {
            const { id, hasSchema, hasRealm, createdAt, updatedAt, value } = item;

            return (
              <Container fadeInOutMS={100 * idx} key={`${item.id}_${idx}`}>
                <FileCard
                  id={id}
                  fileRef={value[0].cuid2}
                  filename={value[0].name}
                  lastModified={updatedAt}
                  size={value[0].size}
                  extension={value[0].extension}
                />
              </Container>
            );
          })}
      </div>
    </>
  );
}
