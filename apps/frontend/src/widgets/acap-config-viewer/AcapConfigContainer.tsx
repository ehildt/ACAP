import { Line } from '@/layouts';
import { Container } from '@/layouts/container/Container';
import { CSSProperties, ReactNode } from 'react';

type AcapConfigContainerProps = {
  data: Record<any, any>;
  label: string;
  color: string;
  size: string;
  children: ReactNode;
  icon: ReactNode;
};

type ServiceItemProps = {
  children: ReactNode;
  label: string;
};

const lineStyle = { marginBlock: '0.3rem', width: '100%', paddingInline: '0.5rem' };
const textStyle: CSSProperties = { userSelect: 'none' };

export function ServiceItem(props: ServiceItemProps) {
  return (
    <Container>
      <Line style={lineStyle}>
        {props.children}
        <h3 style={textStyle}>{props.label}</h3>
      </Line>
    </Container>
  );
}

export function AcapConfigContainer(props: AcapConfigContainerProps) {
  return (
    <div>
      <ServiceItem label={props.label}>{props.icon}</ServiceItem>
      <Container
        outerStyle={{ marginBlock: '0.3rem' }}
        innerStyle={{ display: 'flex', gap: '0.3rem', flexDirection: 'column' }}
      >
        {props.children}
      </Container>
    </div>
  );
}
