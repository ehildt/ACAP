import { Transport } from '@nestjs/microservices';

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

export type RedisPubSubConfig = {
  transport: Transport.REDIS;
  options: {
    port: number;
    host: string;
    password: string;
    username: string;
  };
};

export type Config = {
  appConfig: App;
  redisPubSubConfig: RedisPubSubConfig;
};
