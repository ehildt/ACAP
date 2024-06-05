import { FaCompress, FaDatabase, FaServicestack } from "react-icons/fa6";
import {
  SiApachekafka,
  SiDotenv,
  SiIobroker,
  SiMinio,
  SiMongodb,
  SiMqtt,
  SiRabbitmq,
  SiRedis,
  SiSecurityscorecard,
  SiSwagger,
} from "react-icons/si";
import useSWR from "swr";

import { get } from "@/api/fetcher.api";

import style from "./AcapConfig.module.scss";
import { AcapConfigContainer } from "./AcapConfigContainer";
import { AcapConfigItem } from "./AcapConfigItem";

function getColor(condition: boolean, enabled: string, disabled: string) {
  return condition ? enabled : disabled;
}

export default function AcapConfigViewer() {
  const msBridge = useSWR(
    ["http://localhost:3002/api/v1/metae/ms-bridge"],
    get,
  );
  const acap = useSWR(["http://localhost:3001/api/v1/metae/acap"], get);

  return (
    <div className={style.acapConfig}>
      <AcapConfigContainer
        label="Services"
        color="skyblue"
        size="1.2rem"
        icon={<FaServicestack size={"1.5rem"} color="skyblue" />}
      >
        <AcapConfigItem label="Swagger">
          <SiSwagger
            size={"1.2rem"}
            color={getColor(
              acap?.data?.services.swagger,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
        <AcapConfigItem label="Crypto">
          <SiSecurityscorecard
            size={"1.2rem"}
            color={getColor(
              acap?.data?.services.crypto,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
        <AcapConfigItem label="GZIP">
          <FaCompress
            size={"1.2rem"}
            color={getColor(
              acap?.data?.services.gzip,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
        <AcapConfigItem label="EnvVars">
          <SiDotenv
            size={"1.2rem"}
            color={getColor(
              acap?.data?.services.resolveEnv,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
      </AcapConfigContainer>

      <AcapConfigContainer
        label="Databases"
        color="orange"
        size="1.2rem"
        icon={<FaDatabase size={"1.5rem"} color="orchid" />}
      >
        <AcapConfigItem label="Redis">
          <SiRedis
            size={"1.2rem"}
            color={getColor(
              acap?.data?.databases.redis,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
        <AcapConfigItem label="MongoDB">
          <SiMongodb
            size={"1.2rem"}
            color={getColor(
              acap?.data?.databases.mongo,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
        <AcapConfigItem label="Minio">
          <SiMinio
            size={"1.2rem"}
            color={getColor(
              acap?.data?.databases.minio,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
      </AcapConfigContainer>

      <AcapConfigContainer
        style={{
          opacity:
            msBridge?.data?.brokers || acap?.data?.brokers?.useBullMQ
              ? "1"
              : "0.35",
        }}
        label="Brokers"
        color="orange"
        size="1.2rem"
        icon={<SiIobroker size={"1.5rem"} color="orange" />}
      >
        <AcapConfigItem label="BullMQ">
          <SiSecurityscorecard
            size={"1.2rem"}
            color={getColor(
              msBridge?.data?.brokers.useBullMQ ||
                acap?.data?.brokers?.useBullMQ,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
        <AcapConfigItem label="MQTT">
          <SiMqtt
            size={"1.2rem"}
            color={getColor(
              msBridge?.data?.brokers.useMQTT,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
        <AcapConfigItem label="PubSub">
          <SiRedis
            size={"1.2rem"}
            color={getColor(
              msBridge?.data?.brokers.useRedisPubSub,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
        <AcapConfigItem label="RabbitMQ">
          <SiRabbitmq
            size={"1.2rem"}
            color={getColor(
              msBridge?.data?.brokers.useRabbitMQ,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
        <AcapConfigItem label="Kafka">
          <SiApachekafka
            size={"1.2rem"}
            color={getColor(
              msBridge?.data?.brokers.useKafka,
              "yellowgreen",
              "crimson",
            )}
          />
        </AcapConfigItem>
      </AcapConfigContainer>
    </div>
  );
}
