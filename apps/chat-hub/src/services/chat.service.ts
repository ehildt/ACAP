import { Inject, Injectable, Optional } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CHAT_BRCS, REDIS_PUBSUB } from '@/constants/app.constants';
import { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';

import { ConfigFactoryService } from './config-factory.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly factory: ConfigFactoryService,
    @Optional() @Inject(REDIS_PUBSUB) private readonly redisPubSub: ClientProxy,
  ) {}

  async onMessage(reqs: Array<ChatUpsertReq>) {
    reqs.forEach(({ realm, messages }) => {
      messages.forEach((message) => {
        const item = JSON.stringify({ realm, message });
        this.redisPubSub?.emit(CHAT_BRCS, item);
      });
    });
  }
}
