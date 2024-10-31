import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChatUpsertBody } from '@/decorators/controller.parameter.decorators';
import { OpenApi_Chat } from '@/decorators/open-api.controller.decorators';
import { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';
import { ChatService } from '@/services/chat.service';

@ApiTags('ChatHub')
@Controller('chats')
export class ChatHubController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @OpenApi_Chat()
  async publish(@ChatUpsertBody() reqs: Array<ChatUpsertReq>) {
    await this.chatService.publish(reqs);
  }
}
