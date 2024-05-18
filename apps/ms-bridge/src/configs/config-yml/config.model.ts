import { Transport } from "@nestjs/microservices";

import { MqttClientOptions } from "@/modules/mqtt-client.module";

export type AppConfigBrokers = {
  useBullMQ: boolean;
  useRedisPubSub: boolean;
  useMQTT: boolean;
};

export type AppConfig = {
  port: number;
  nodeEnv: string;
  address: string;
  printEnv: boolean;
  bodyLimit: number;
  startSwagger: boolean;
  brokers: AppConfigBrokers;
};

export type RedisPubSubConfig = {
  transport: Transport.REDIS;
  options: {
    port: number;
    host: string;
    password: string;
    username: string;
  };
};

export type BullMQConfig = {
  connection: {
    port: number;
    host: string;
    password: string;
    username: string;
  };
};

export type Config = {
  appConfig: AppConfig;
  redisPubSubConfig: RedisPubSubConfig;
  bullMQConfig: BullMQConfig;
  mqttClientConfig: MqttClientOptions;
};
