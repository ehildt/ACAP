import { Container } from '@/layouts/container/Container';

import { AcapConfigContainerProps } from './AcapConfig.modal';
import { AcapConfigItem } from './AcapConfigItem';

export function AcapConfigContainer(props: AcapConfigContainerProps) {
  return (
    <div style={props.style}>
      <AcapConfigItem label={props.label}>{props.icon}</AcapConfigItem>
      <Container
        outerStyle={{ marginBlock: '0.3rem' }}
        innerStyle={{ display: 'flex', gap: '0.3rem', flexDirection: 'column' }}
      >
        {props.children}
      </Container>
    </div>
  );
}
