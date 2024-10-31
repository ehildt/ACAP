import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

import { App, BullMQConfig } from '@/configs/config-yml/config.model';

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
      brcsChannel: this.configService.get<string>('App.BRCS_CHANNEL'),
    });
  }

  get redisPubSub() {
    const port = this.configService.get<number>('RedisPubSub.PORT');
    const host = this.configService.get<string>('RedisPubSub.HOST');
    const password = this.configService.get<string>('RedisPubSub.PASS');
    const username = this.configService.get<string>('RedisPubSub.USER');
    const connectionName = this.configService.get<string>('RedisPubSub.CONNECTION_NAME');
    return Object.freeze<RedisOptions>({
      port,
      host,
      password,
      username,
      connectionName,
      keepAlive: 3000,
      offlineQueue: true,
      autoResubscribe: true,
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
}
