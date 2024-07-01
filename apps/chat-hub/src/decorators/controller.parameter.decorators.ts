import { Body, ParseArrayPipe } from '@nestjs/common';

import { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';

const ParseChatUpsertReqPipe = new ParseArrayPipe({ items: ChatUpsertReq });

export const ChatUpsertBody = () => Body(ParseChatUpsertReqPipe);
