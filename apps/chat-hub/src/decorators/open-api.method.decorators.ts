import { ApiBody } from '@nestjs/swagger';

import { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';

export const ApiChatUpsert = () =>
  ApiBody({
    isArray: true,
    required: true,
    type: ChatUpsertReq,
  });
