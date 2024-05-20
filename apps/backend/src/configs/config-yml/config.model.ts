export type AppConfigBrokers = {
  useBullMQ: boolean;
};

export type AppConfig = {
  port: number;
  nodeEnv: string;
  address: string;
  printEnv: boolean;
  bodyLimit: number;
  startSwagger: boolean;
  crypto: {
    secret: string;
    algorithm: string;
  };
  realm: {
    gzipThreshold: number;
    namespacePostfix: string;
    resolveEnv: boolean;
    ttl: number;
  };
  brokers: AppConfigBrokers;
};

export type MongoConfig = {
  uri: string;
  dbName: string;
  user: string;
  pass: string;
  ssl: boolean;
  tlsAllowInvalidCertificates: boolean;
};

export type BullMQConfig = {
  connection: {
    port: number;
    host: string;
    password: string;
    username: string;
  };
};

export type RedisConfig = {
  db: number;
  host: string;
  port: number;
  password: string;
  username: string;
  ttl: number;
  max: number;
};

export type MinioConfig = {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  bucket: string;
};

export type Config = {
  appConfig: AppConfig;
  mongoConfig: MongoConfig;
  minioConfig: MinioConfig;
  redisConfig: RedisConfig;
  bullMQConfig: BullMQConfig;
};
