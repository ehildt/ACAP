import { FaCompress, FaDatabase, FaResolving, FaServicestack } from 'react-icons/fa6';
import { SiIobroker, SiMinio, SiMongodb, SiMqtt, SiRedis, SiSecurityscorecard, SiSwagger } from 'react-icons/si';
import useSWR from 'swr';

import { get } from '@/api/fetcher.api';

import style from './AcapConfig.module.scss';
import { AcapConfigContainer } from './AcapConfigContainer';
import { AcapConfigItem } from './AcapConfigItem';

function getColor(condition: boolean, enabled: string, disabled: string) {
  return condition ? enabled : disabled;
}

export function AcapConfigViewer() {
  const { isLoading, data, error } = useSWR(['http://localhost:3001/api/v1/metae/acap'], get);

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
          <AcapConfigItem label="Redis">
            <SiRedis size={'1.2rem'} color={getColor(data?.databases.redis, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
          <AcapConfigItem label="MongoDB">
            <SiMongodb size={'1.2rem'} color={getColor(data?.databases.mongo, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
          <AcapConfigItem label="Minio">
            <SiMinio size={'1.2rem'} color={getColor(data?.databases.minio, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
        </AcapConfigContainer>

        <AcapConfigContainer
          data={data}
          label="Brokers"
          color="orange"
          size="1.2rem"
          icon={<SiIobroker size={'1.5rem'} color="orange" />}
        >
          <AcapConfigItem label="MQTT">
            <SiMqtt size={'1.2rem'} color={getColor(data.brokers.mqtt, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
          <AcapConfigItem label="bullMQ">
            <SiSecurityscorecard size={'1.2rem'} color={getColor(data.brokers.bullMQ, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
          <AcapConfigItem label="Redis PubSub">
            <FaCompress size={'1.2rem'} color={getColor(data.brokers.redisPubSub, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
        </AcapConfigContainer>

        <AcapConfigContainer
          data={data}
          label="Services"
          color="skyblue"
          size="1.2rem"
          icon={<FaServicestack size={'1.5rem'} color="skyblue" />}
        >
          <AcapConfigItem label="Swagger">
            <SiSwagger size={'1.2rem'} color={getColor(data.services.swagger, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
          <AcapConfigItem label="Crypto">
            <SiSecurityscorecard size={'1.2rem'} color={getColor(data.services.crypto, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
          <AcapConfigItem label="GZIP">
            <FaCompress size={'1.2rem'} color={getColor(data.services.gzip, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
          <AcapConfigItem label="EnvVars">
            <FaResolving size={'1.2rem'} color={getColor(data.services.resolveEnv, 'yellowgreen', 'crimson')} />
          </AcapConfigItem>
        </AcapConfigContainer>
      </div>
    )
  );
}
