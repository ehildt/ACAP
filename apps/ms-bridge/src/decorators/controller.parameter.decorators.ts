import { Body, ParseArrayPipe, ParseBoolPipe, Query } from '@nestjs/common';

import { BreakoutUpsertReq } from '@/dtos/breakout-upsert.dto.req';

const ParseBreakoutUpsertReqPipe = new ParseArrayPipe({
  items: BreakoutUpsertReq,
});

export const BreakoutUpsertBody = () => Body(ParseBreakoutUpsertReqPipe);
export const QueryUseMqtt = () => Query('useMqtt', ParseBoolPipe);
export const QueryUseBullMQ = () => Query('useBullMQ', ParseBoolPipe);
export const QueryUseKafka = () => Query('useKafka', ParseBoolPipe);
export const QueryUseRedisPubSub = () => Query('useRedisPubSub', ParseBoolPipe);
export const QueryUseRabbitMQ = () => Query('useRabbitMQ', ParseBoolPipe);
