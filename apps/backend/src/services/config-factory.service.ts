import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import {
  App,
  BullMQConfig,
  MinioConfig,
  MongoConfig,
  RedisConfig,
} from "@/configs/config-yml/config.model";
import { ALGORITHM } from "@/constants/app.constants";

@Injectable()
export class ConfigFactoryService {
  constructor(private readonly configService: ConfigService) {}

  get app() {
    const secret = this.configService.get<string>("App.SYMMETRIC_KEY");
    const algorithm = secret ? ALGORITHM[secret.length] : undefined;
    return Object.freeze<App>({
      port: this.configService.get<number>("App.PORT"),
      address: this.configService.get<string>("App.ADDRESS"),
      startSwagger: this.configService.get<boolean>("App.START_SWAGGER"),
      printEnv: this.configService.get<boolean>("App.PRINT_ENV"),
      nodeEnv: this.configService.get<string>("App.NODE_ENV"),
      bodyLimit: this.configService.get<number>("App.BODY_LIMIT"),
      crypto: {
        secret,
        algorithm,
      },
      realm: {
        ttl: this.configService.get<number>("App.TTL"),
        namespacePostfix: this.configService.get<string>(
          "App.NAMESPACE_POSTFIX",
        ),
        resolveEnv: this.configService.get<boolean>("App.RESOLVE_ENV"),
        gzipThreshold: this.configService.get<number>("App.GZIP_THRESHOLD"),
      },
      brokers: {
        useBullMQ: this.configService.get<boolean>("App.USE_BULLMQ"),
      },
    });
  }

  get mongo() {
    return Object.freeze<MongoConfig>({
      uri: this.configService.get<string>("MongoConfig.URI"),
      ssl: this.configService.get<boolean>("MongoConfig.SSL"),
      tlsAllowInvalidCertificates: this.configService.get<boolean>(
        "MongoConfig.TLS_ALLOW_INVALID_CERTIFICATES",
      ),
      dbName: this.configService.get<string>("MongoConfig.DB_NAME"),
      user: this.configService.get<string>("MongoConfig.USER"),
      pass: this.configService.get<string>("MongoConfig.PASS"),
    });
  }

  get minio() {
    return Object.freeze<MinioConfig>({
      endPoint: this.configService.get<string>("MinioConfig.ENDPOINT"),
      useSSL: this.configService.get<boolean>("MinioConfig.USE_SSL"),
      port: this.configService.get<number>("MinioConfig.PORT"),
      accessKey: this.configService.get<string>("MinioConfig.ACCESS_KEY"),
      secretKey: this.configService.get<string>("MinioConfig.SECRET_KEY"),
      bucket: this.configService.get<string>("MinioConfig.BUCKET"),
    });
  }

  get redis() {
    return Object.freeze<RedisConfig>({
      host: this.configService.get<string>("RedisConfig.HOST"),
      port: this.configService.get<number>("RedisConfig.PORT"),
      ttl: this.configService.get<number>("RedisConfig.TTL"),
      max: this.configService.get<number>("RedisConfig.MAX"),
      db: this.configService.get<number>("RedisConfig.DB_INDEX"),
      password: this.configService.get<string>("RedisConfig.PASS"),
      username: this.configService.get<string>("RedisConfig.USER"),
    });
  }

  get bullMQ() {
    const port = this.configService.get<number>("BullMQ.PORT");
    const host = this.configService.get<string>("BullMQ.HOST");
    const password = this.configService.get<string>("BullMQ.PASS");
    const username = this.configService.get<string>("BullMQ.USER");
    return Object.freeze<BullMQConfig>({
      connection: {
        port,
        host,
        password,
        username,
      },
    });
  }
}
