import { FaCompress, FaDatabase, FaResolving, FaServicestack } from 'react-icons/fa6';
import { SiIobroker, SiMongodb, SiMqtt, SiRedis, SiSecurityscorecard, SiSwagger } from 'react-icons/si';
import useSWR from 'swr';
import style from './AcapConfig.module.scss';
import { AcapConfigContainer, ServiceItem } from './AcapConfigContainer';

const fetcher = async (url: string) => (await fetch(url)).json();

function getColor(condition: boolean, enabled: string, disabled: string) {
  return condition ? enabled : disabled;
}

export function AcapConfigViewer() {
  const { isLoading, data, error } = useSWR('http://localhost:3001/api/v1/metae/acap', fetcher);

  return (
    data && (
      <div className={style.acapConfig}>
        <AcapConfigContainer
          data={data}
          label="Databases"
          color="orange"
          size="1.2rem"
          icon={<FaDatabase size={'1.5rem'} color="orchid" />}
        >
          <ServiceItem label="Redis">
            <SiRedis size={'1.2rem'} color={getColor(data?.databases.redis, 'gold', 'crimson')} />
          </ServiceItem>
          <ServiceItem label="MongoDB">
            <SiMongodb size={'1.2rem'} color={getColor(data?.databases.mongo, 'yellowgreen', 'crimson')} />
          </ServiceItem>
        </AcapConfigContainer>

        <AcapConfigContainer
          data={data}
          label="Brokers"
          color="orange"
          size="1.2rem"
          icon={<SiIobroker size={'1.5rem'} color="orange" />}
        >
          <ServiceItem label="MQTT">
            <SiMqtt size={'1.2rem'} color={getColor(data.app.brokers.useMQTT, 'yellowgreen', 'crimson')} />
          </ServiceItem>
          <ServiceItem label="bullMQ">
            <SiSecurityscorecard
              size={'1.2rem'}
              color={getColor(data.app.brokers.useBullMQ, 'yellowgreen', 'crimson')}
            />
          </ServiceItem>
          <ServiceItem label="Redis PubSub">
            <FaCompress size={'1.2rem'} color={getColor(data.app.brokers.useRedisPubSub, 'yellowgreen', 'crimson')} />
          </ServiceItem>
        </AcapConfigContainer>

        <AcapConfigContainer
          data={data}
          label="Services"
          color="skyblue"
          size="1.2rem"
          icon={<FaServicestack size={'1.5rem'} color="skyblue" />}
        >
          <ServiceItem label="Swagger">
            <SiSwagger size={'1.2rem'} color={getColor(data.app.startSwagger, 'yellowgreen', 'crimson')} />
          </ServiceItem>
          <ServiceItem label="Crypto">
            <SiSecurityscorecard size={'1.2rem'} color={getColor(data.app.crypto.secret, 'yellowgreen', 'crimson')} />
          </ServiceItem>
          <ServiceItem label="GZIP">
            <FaCompress size={'1.2rem'} color={getColor(data.app.realm.gzipThreshold, 'yellowgreen', 'crimson')} />
          </ServiceItem>
          <ServiceItem label="EnvVars">
            <FaResolving size={'1.2rem'} color={getColor(data.app.realm.resolveEnv, 'yellowgreen', 'crimson')} />
          </ServiceItem>
        </AcapConfigContainer>
      </div>
    )
  );
}
