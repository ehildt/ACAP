import { ConsoleLogger, Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

import { PUBSUB_CLIENT, PUBSUB_WARN } from './pubsub.constants';

@Injectable()
export class PubSupService implements OnModuleInit, OnModuleDestroy {
  private subscribers = new Map<string, Redis>();

  constructor(
    private readonly logger: ConsoleLogger,
    @Inject(PUBSUB_CLIENT) private readonly client: Redis,
  ) {}

  async onModuleInit() {
    this.client.on('connect', () => {
      this.logger.log('Connected..', PUBSUB_CLIENT);
    });
  }

  async onModuleDestroy() {
    try {
      await Promise.all(
        Array.from(this.subscribers).map(async ([channel, subscriber]) => {
          await subscriber.unsubscribe();
          await subscriber.quit();
          this.logger.log(`Connection closed for channel ${channel}`, PUBSUB_CLIENT);
        }),
      );
      await this.client.quit();
      this.logger.log(`Connection closed`, PUBSUB_CLIENT);
    } catch (error) {
      this.logger.error(error, 'PUBSUB_ERROR');
      throw error;
    }
  }

  async publish(channel: string | Buffer, message: string | Buffer) {
    return await this.client.publish(channel, message);
  }

  async subscribe(channel: string) {
    if (!this.subscribers.get(channel)) {
      const subscriber = this.client.duplicate();
      await subscriber.subscribe(channel);
      this.subscribers.set(channel, subscriber);
      this.logger.log(`Subscriber "${channel}" added`, PUBSUB_CLIENT);
      return subscriber;
    } else this.logger.warn(`Subscriber "${channel}" already exists; SKIPPED`, PUBSUB_WARN);
  }

  async getSubscriber(channel: string) {
    const subscriber = this.subscribers.get(channel);
    if (subscriber) return subscriber;
    else this.logger.warn(`Nothing to unsubscribe from channel "${channel}"; SKIPPED`, PUBSUB_WARN);
  }
}
