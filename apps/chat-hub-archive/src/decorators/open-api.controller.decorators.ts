import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { Message } from '@/dtos/message.dto';

import { MessageUpsert } from './open-api.method.decorators';

const REQUEST_SUCCESSFUL = 'request successful';

export function OpenApi_Chat() {
  return applyDecorators(MessageUpsert(), ApiCreatedResponse({ description: REQUEST_SUCCESSFUL }));
}

export function OpenApi_Messages() {
  return applyDecorators(ApiResponse({ description: REQUEST_SUCCESSFUL, type: Message, isArray: true }));
}
