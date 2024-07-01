import { PiArrowFatLinesLeftFill } from 'react-icons/pi';

import { FlickerText } from '@/effects';
import { Line } from '@/layouts';
import { Container } from '@/layouts/container/Container';

type MetaeItemHeaderProps = {
  text?: string;
  onClick?: () => void;
};

export function MetaeSubListItemHeader({ text, onClick }: MetaeItemHeaderProps) {
  return (
    text && (
      <Container innerStyle={{ padding: '0.3rem', cursor: 'pointer' }} onClick={onClick}>
        <Line style={{ width: '100%' }}>
          {
            <FlickerText
              text={text}
              color="crimson"
              repeatFlickerText="1"
              repeatFlickerTextFaulty="2"
              letterSpacing="1px"
            />
          }
          <PiArrowFatLinesLeftFill size={'1.5rem'} style={{ marginLeft: 'auto' }} />
        </Line>
      </Container>
    )
  );
}
