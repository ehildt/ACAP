import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChatUpsertBody } from '@/decorators/controller.parameter.decorators';
import { OpenApi_Chat, OpenApi_Messages } from '@/decorators/open-api.controller.decorators';
import { Message } from '@/dtos/message.dto';
import { ChatHubArchiveService } from '@/services/chat-hub-archive.service';

@ApiTags('ChatHubArchive')
@Controller('messages')
export class ChatHubArchiveController {
  constructor(private readonly archive: ChatHubArchiveService) {}

  @Post()
  @OpenApi_Chat()
  async publish(@ChatUpsertBody() reqs: Array<Message>) {
    return this.archive.insert(reqs);
  }

  @Get()
  @OpenApi_Messages()
  async messages() {
    return this.archive.messages();
  }
}
