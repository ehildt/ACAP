import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { App, BullMQConfig, MongoConfig } from '@/configs/config-yml/config.model';

@Injectable()
export class ConfigFactoryService {
  constructor(private readonly configService: ConfigService) {}

  get app() {
    return Object.freeze<App>({
      port: this.configService.get<number>('App.PORT'),
      address: this.configService.get<string>('App.ADDRESS'),
      startSwagger: this.configService.get<boolean>('App.START_SWAGGER'),
      printEnv: this.configService.get<boolean>('App.PRINT_ENV'),
      nodeEnv: this.configService.get<string>('App.NODE_ENV'),
      bodyLimit: this.configService.get<number>('App.BODY_LIMIT'),
    });
  }

  get bullMQ() {
    const port = this.configService.get<number>('BullMQ.PORT');
    const host = this.configService.get<string>('BullMQ.HOST');
    const password = this.configService.get<string>('BullMQ.PASS');
    const username = this.configService.get<string>('BullMQ.USER');
    return Object.freeze<BullMQConfig>({
      connection: {
        port,
        host,
        password,
        username,
      },
    });
  }

  get mongo() {
    return Object.freeze<MongoConfig>({
      uri: this.configService.get<string>('MongoConfig.URI'),
      ssl: this.configService.get<boolean>('MongoConfig.SSL'),
      tlsAllowInvalidCertificates: this.configService.get<boolean>('MongoConfig.TLS_ALLOW_INVALID_CERTIFICATES'),
      dbName: this.configService.get<string>('MongoConfig.DB_NAME'),
      user: this.configService.get<string>('MongoConfig.USER'),
      pass: this.configService.get<string>('MongoConfig.PASS'),
    });
  }
}
