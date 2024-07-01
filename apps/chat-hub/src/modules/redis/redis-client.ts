import { ConsoleLogger, Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Callback, Redis, RedisOptions } from 'ioredis';

import { REDIS_OPTIONS } from './redis.constants';

@Injectable()
export class RedisClient implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  constructor(
    private readonly logger: ConsoleLogger,
    @Inject(REDIS_OPTIONS) private readonly options: RedisOptions,
  ) {}

  async onModuleInit() {
    this.client = new Redis(this.options);
    this.client.on('connect', () => this.logger.log('Connected to Redis', 'REDIS'));
    await this.subscribe('my_channel', (payload) => this.logger.log(payload));
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async publish(channel: string | Buffer, message: string | Buffer, callback?: Callback<number>) {
    return await this.client.publish(channel, message, callback);
  }

  async subscribe(channel: string, cb: (channel: string, message: string) => void) {
    const subscriber = this.client.duplicate();
    subscriber.on('message', cb);
    await subscriber.subscribe(channel);
  }
}
