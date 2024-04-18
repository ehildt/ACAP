import { Container } from '@/layouts/container/Container';
import { Line } from '@/layouts/line/Line';
import { YmlViewer } from '@/widgets/yml-viewer/YmlViewer';

import { FaCompress } from 'react-icons/fa';
import { FaDatabase, FaGears, FaResolving, FaServicestack } from 'react-icons/fa6';
import { GiBullHorns } from 'react-icons/gi';
import { SiApple, SiIobroker, SiMongodb, SiMqtt, SiRedis, SiSecurityscorecard, SiSwagger } from 'react-icons/si';
import useSWR from 'swr';
import { Popup } from '../popup/Popup';

// this actually is a view
const fetcher = async (url: string) => {
  return (await fetch(url)).json();
};

export function AcapConfigViewer() {
  const { isLoading, data, error } = useSWR('http://localhost:3001/api/v1/metae/acap', fetcher);
  return (
    <>
      <Popup isOpen={error}>{error?.message}</Popup>
      {data && (
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <div>
            <Container innerStyle={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
              <FaGears size={'1.5rem'} color="yellowgreen" />
              <h1>App</h1>
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <SiApple size={'1.2rem'} color="magenta" />
                <h3>APP</h3>
              </Line>
              <hr />
              <YmlViewer data={data?.app} />
            </Container>
          </div>
          <div>
            <Container innerStyle={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
              <FaDatabase size={'1.5rem'} color="yellowgreen" />
              <h1>Databases</h1>
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <SiRedis size={'1.2rem'} color="magenta" />
                <h3>Redis</h3>
              </Line>
              <hr />
              <YmlViewer data={data?.databases.redis} />
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <SiMongodb size={'1.2rem'} color="lime" />
                <h3>MongoDB</h3>
              </Line>
              <hr />
              <YmlViewer data={data?.databases.mongo} />
            </Container>
          </div>
          <div>
            <Container innerStyle={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
              <SiIobroker size={'1.5rem'} color="orange" />
              <h1>Brokers</h1>
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <SiMqtt size={'1.2rem'} color={data.app.brokers.useMQTT ? 'lime' : 'red'} />
                <h3>MQTT</h3>
              </Line>
              <hr />
              <YmlViewer data={data?.services.mqtt.options} />
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <GiBullHorns size={'1.2rem'} color={data.app.brokers.useBullMQ ? 'lime' : 'red'} />
                <h3>bullMQ</h3>
              </Line>
              <hr />
              <YmlViewer data={data?.services.bullMQ.connection} />
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <SiRedis size={'1.2rem'} color={data.app.brokers.useRedisPubSub ? 'lime' : 'red'} />
                <h3>Redis PubSub</h3>
              </Line>
              <hr />
              <YmlViewer data={data?.services.PubSub.options} />
            </Container>
          </div>
          <div>
            <Container innerStyle={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
              <FaServicestack size={'1.5rem'} color="skyblue" />
              <h1>Services</h1>
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <SiSwagger size={'1.2rem'} color={data.app.startSwagger ? 'lime' : 'red'} />
                <h3>Swagger</h3>
              </Line>
              <hr />
              <YmlViewer data={{ startSwagger: data?.app.startSwagger }} />
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <SiSecurityscorecard size={'1.2rem'} color={data.app.crypto.secret ? 'lime' : 'red'} />
                <h3>Crypto</h3>
              </Line>
              <hr />
              <YmlViewer data={data?.app.crypto} />
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <FaCompress size={'1.2rem'} color={data.app.realm.gzipThreshold ? 'lime' : 'red'} />
                <h3>GZIP</h3>
              </Line>
              <hr />
              <YmlViewer data={{ gzipThreshold: data?.app.realm.gzipThreshold }} />
            </Container>
            <Container outerStyle={{ marginBlock: '0.3rem' }}>
              <Line style={{ marginBlock: '0.3rem' }}>
                <FaResolving size={'1.2rem'} color={data.app.realm.resolveEnv ? 'lime' : 'red'} />
                <h3>EnvVars</h3>
              </Line>
              <hr />
              <YmlViewer data={{ resolveEnv: data?.app.realm.resolveEnv }} />
            </Container>
          </div>
        </div>
      )}
    </>
  );
}
