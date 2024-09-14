import { ConsoleLogger, DynamicModule, Module } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';

import { ConfigFactoryService } from '@/services/config-factory.service';

import { PUBSUB_CLIENT } from './pubsub.constants';
import { PubSupService } from './pubsub.service';

type PubSubModuleProps = {
  imports?: Array<any>;
  inject?: Array<any>;
  providers?: Array<any>;
  isGlobal?: boolean;
  useFactory: (deps: ConfigFactoryService) => RedisOptions;
};

@Module({})
export class PubSubModule {
  static registerAsync(options: PubSubModuleProps): DynamicModule {
    return {
      module: PubSubModule,
      imports: options.imports ?? [],
      global: options.isGlobal,
      exports: [PubSupService, PUBSUB_CLIENT],
      providers: [
        ConsoleLogger,
        PubSupService,
        ...(options.providers ?? []),
        {
          provide: PUBSUB_CLIENT,
          inject: options.inject ?? [],
          useFactory: ({ redisPubSub }: ConfigFactoryService) => {
            return new Redis(redisPubSub);
          },
        },
      ],
    };
  }
}
