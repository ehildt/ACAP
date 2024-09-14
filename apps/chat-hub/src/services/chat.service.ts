import { Injectable, OnModuleInit } from '@nestjs/common';

import { CHAT_BRCS } from '@/constants/app.constants';
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
  ) {}

  async onModuleInit() {
    (await this.pubsub.subscribe(CHAT_BRCS)).on('message', (channel, message) => {
      console.log('delegate to web-sockets', { channel, message: JSON.parse(message) });
      const suc = this.socket.emit(CHAT_BRCS, JSON.parse(message));
      console.log('was send?: ', suc);
    });
  }

  async publish(reqs: Array<ChatUpsertReq>) {
    try {
      await Promise.all(reqs.map(async (item) => await this.pubsub.publish(CHAT_BRCS, JSON.stringify(item))));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
