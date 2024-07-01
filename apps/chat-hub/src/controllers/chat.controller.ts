import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChatUpsertBody } from '@/decorators/controller.parameter.decorators';
import { OpenApi_Chat } from '@/decorators/open-api.controller.decorators';
import { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';
import { ChatService } from '@/services/chat.service';

@ApiTags('Chat')
@Controller('chats')
export class ChatHubController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @OpenApi_Chat()
  async onMessage(@ChatUpsertBody() reqs: Array<ChatUpsertReq>) {
    return await this.chatService.onMessage(reqs);
  }
}
