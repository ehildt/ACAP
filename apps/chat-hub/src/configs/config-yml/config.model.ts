import { RedisOptions } from 'ioredis';

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
};

export type Config = {
  appConfig: App;
  redisPubSubConfig: RedisOptions;
};
