import { FileCard } from '@/atomics/file-card/FileCard';
import { Container } from '@/layouts/container/Container';

import { sizeof } from './Metae.hooks';
import { MetaeItemProps } from './Metae.modal';
import style from './Metae.module.scss';

export function MetaeItem(props: MetaeItemProps) {
  const keys = Object.keys(props.metae);

  return keys.map((key, index) => (
    <Container
      fadeInOutMS={250 + 100 * index}
      innerStyle={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}
      outerStyle={{ padding: '0.3rem' }}
    >
      <h2 className={style.metaeItemTitle}>
        {key} ({props.metae?.[key].length}) {sizeof(props.metae?.[key])}
      </h2>

      {props.metae?.[key]?.map((item: any, idx: any) => {
        const { id, hasSchema, hasRealm, createdAt, updatedAt, value } = item;
        return (
          <Container fadeInOutMS={250 + 100 * idx}>
            <FileCard
              filename={`${id} ${value.name}`}
              lastModified={updatedAt}
              size={value.size}
              extension={value.extension}
            />
          </Container>
        );
      })}
    </Container>
  ));
}
