import { InjectQueue } from '@nestjs/bullmq';
import { ConsoleLogger, Injectable, OnModuleInit, Optional } from '@nestjs/common';
import { Queue } from 'bullmq';

import { BULLMQ_PERSISTANCE_QUEUE } from '@/constants/app.constants';
import { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';
import { PubSupService } from '@/modules/pubsub/pubsub.service';
import { ChatHubGateway } from '@/modules/web-socket/chat-hub.gateway';

import { ConfigFactoryService } from './config-factory.service';

@Injectable()
export class ChatService implements OnModuleInit {
  constructor(
    private readonly factory: ConfigFactoryService,
    private readonly pubsub: PubSupService,
    private readonly socket: ChatHubGateway,
    private readonly logger: ConsoleLogger,
    @Optional() @InjectQueue(BULLMQ_PERSISTANCE_QUEUE) private readonly bullmq: Queue,
  ) {}

  async onModuleInit() {
    (await this.pubsub.subscribe(this.factory.app.brcsChannel)).on('message', (_, message) => {
      this.socket.emit(this.factory.app.brcsChannel, JSON.parse(message));
    });
  }

  async publish(reqs: Array<ChatUpsertReq>) {
    try {
      await Promise.allSettled(
        // ! do we want to encrypt the message?
        reqs.map(async (item) => {
          await this.pubsub.publish(this.factory.app.brcsChannel, Buffer.from(JSON.stringify(item)));
          if (item.persist) await this.bullmq?.add(this.factory.app.brcsChannel, item);
        }),
      );
    } catch (error) {
      this.logger.error(error, this.constructor.name);
      throw error;
    }
  }
}
