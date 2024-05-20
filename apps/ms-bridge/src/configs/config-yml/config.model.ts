import { Transport } from "@nestjs/microservices";

import { MqttClientOptions } from "@/modules/mqtt-client.module";

export type AppBrokers = {
  useBullMQ: boolean;
  useRedisPubSub: boolean;
  useMQTT: boolean;
  useKafka: boolean;
  useRabbitMQ: boolean;
};

export type App = {
  port: number;
  nodeEnv: string;
  address: string;
  printEnv: boolean;
  bodyLimit: number;
  startSwagger: boolean;
  brokers: AppBrokers;
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

export type KafkaClientConfig = {
  options: {
    client: {
      ssl: boolean;
      clientId: string;
      brokers: Array<string>;
      retry: {
        retries: number;
        initialRetryTime: number;
        factor: number;
        multiplier: number;
        maxRetryTime: number;
      };
    };
  };
};

export type RabbitMQClientConfig = {
  options: {
    urls: Array<string>;
  };
};

export type Config = {
  appConfig: App;
  redisPubSubConfig: RedisPubSubConfig;
  bullMQConfig: BullMQConfig;
  mqttClientConfig: MqttClientOptions;
  kafkaClientConfig: KafkaClientConfig;
  rabbitMQClientConfig: RabbitMQClientConfig;
};
