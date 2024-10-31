import { RedisOptions } from 'ioredis';

export type App = {
  port: number;
  nodeEnv: string;
  address: string;
  printEnv: boolean;
  bodyLimit: number;
  brcsChannel: string;
  startSwagger: boolean;
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
  appConfig: App;
  bullMQConfig: BullMQConfig;
  redisPubSubConfig: RedisOptions;
};
