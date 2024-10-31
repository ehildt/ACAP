import { RedisOptions } from 'ioredis';

export type App = {
  port: number;
  nodeEnv: string;
  address: string;
  printEnv: boolean;
  bodyLimit: number;
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

export type MongoConfig = {
  uri: string;
  dbName: string;
  user: string;
  pass: string;
  ssl: boolean;
  tlsAllowInvalidCertificates: boolean;
};

export type Config = {
  appConfig: App;
  bullMQConfig: BullMQConfig;
  redisPubSubConfig: RedisOptions;
  mongoConfig: MongoConfig;
};
