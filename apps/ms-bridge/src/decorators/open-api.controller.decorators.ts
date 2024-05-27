import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";

import {
  ApiBreakoutUpsert,
  ApiQueryRabbitMQ,
  ApiQueryUseBullMQ,
  ApiQueryUseKafka,
  ApiQueryUseMqtt,
  ApiQueryUseRedisPubSub,
} from "./open-api.method.decorators";

const REQUEST_SUCCESSFUL = "request successful";

export function OpenApi_Outbreak() {
  return applyDecorators(
    ApiOperation({
      description: `
        This endpoint facilitates the distribution of data to various realms (channels), driven by configurable options.
        It operates silently without providing a specific response, handling data delegation and messaging operations 
        internally. Data is distributed using different mechanisms: Redis Pub-Sub for event emission, MQTT for data 
        publication, and BullMQ for task addition to a job queue. The BullMQ can take additional JobsOptions. 
        This endpoint ensures efficient fire-and-forget functionality.`,
    }),
    ApiCreatedResponse({ description: REQUEST_SUCCESSFUL }),
    ApiQueryUseMqtt(),
    ApiQueryUseBullMQ(),
    ApiQueryUseRedisPubSub(),
    ApiQueryUseKafka(),
    ApiQueryRabbitMQ(),
    ApiBreakoutUpsert(),
  );
}
