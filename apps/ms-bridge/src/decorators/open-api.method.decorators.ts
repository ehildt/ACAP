import { ApiBody, ApiQuery } from "@nestjs/swagger";

import { BreakoutUpsertReq } from "@/dtos/breakout-upsert.dto.req";

export const ApiQueryUseMqtt = () =>
  ApiQuery({ name: "useMqtt", type: Boolean, example: false, required: false });

export const ApiQueryUseBullMQ = () =>
  ApiQuery({
    name: "useBullMQ",
    type: Boolean,
    example: false,
    required: false,
  });

export const ApiQueryUseRedisPubSub = () =>
  ApiQuery({
    name: "useRedisPubSub",
    type: Boolean,
    example: false,
    required: false,
  });

export const ApiQueryUseKafka = () =>
  ApiQuery({
    name: "useKafka",
    type: Boolean,
    example: false,
    required: false,
  });

export const ApiQueryRabbitMQ = () =>
  ApiQuery({
    name: "useRabbitMQ",
    type: Boolean,
    example: false,
    required: false,
  });

export const ApiBreakoutUpsert = () =>
  ApiBody({
    isArray: true,
    required: true,
    type: BreakoutUpsertReq,
  });
