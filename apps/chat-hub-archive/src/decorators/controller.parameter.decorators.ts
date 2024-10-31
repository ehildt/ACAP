import { Body, ParseArrayPipe } from '@nestjs/common';

import { Message } from '@/dtos/message.dto';

export const ChatUpsertBody = () => Body(new ParseArrayPipe({ items: Message }));
