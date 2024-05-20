import Joi from "joi";

import { CONFIG_YML } from "@/configs/config-yml/loader";

const options = CONFIG_YML?.kafkaClientConfig?.options;

export const KAFKA_SCHEMA = {
  KAFKA_CLIENT_ID: options.client.clientId
    ? Joi.string().default(options.client.clientId)
    : Joi.string().optional(),

  KAFKA_GROUP_ID: options.consumer.groupId
    ? Joi.string().default(options.consumer.groupId)
    : Joi.string().optional(),

  KAFKA_BROKERS: options.client.brokers
    ? Joi.array<string>().default(options.client.brokers)
    : Joi.required().optional(),
};
