import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

import { App } from '@/configs/config-yml/config.model';
import { CHAT_BRCS } from '@/constants/app.constants';

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

  get redisPubSub() {
    const port = this.configService.get<number>('RedisPubSub.PORT');
    const host = this.configService.get<string>('RedisPubSub.HOST');
    const password = this.configService.get<string>('RedisPubSub.PASS');
    const username = this.configService.get<string>('RedisPubSub.USER');
    return Object.freeze<RedisOptions>({
      port,
      host,
      password,
      username,
      keepAlive: 3000,
      offlineQueue: true,
      autoResubscribe: true,
      connectionName: CHAT_BRCS,
    });
  }
}
