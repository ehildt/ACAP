import Joi from 'joi';

import { CONFIG_YML } from '@/configs/config-yml/loader';

const options = CONFIG_YML?.kafkaClientConfig?.options;

export const KAFKA_SCHEMA = {
  KAFKA_CLIENT_ID: options.client.clientId ? Joi.string().default(options.client.clientId) : Joi.string().optional(),

  KAFKA_BROKERS: options.client.brokers
    ? Joi.string().default(options.client.brokers.reduce((acc, val) => `${acc},${val}`))
    : Joi.required().optional(),

  KAFKA_SSL: options.client.ssl !== undefined ? Joi.boolean().default(options.client.ssl) : Joi.required().optional(),

  KAFKA_RETRIES: options.client.retry.retries
    ? Joi.number().default(options.client.retry.retries)
    : Joi.required().optional(),

  KAFKA_RETRY_TIME: options.client.retry.retries
    ? Joi.number().default(options.client.retry.initialRetryTime)
    : Joi.required().optional(),

  KAFKA_RETRY_FACTOR: options.client.retry.factor
    ? Joi.number().default(options.client.retry.factor)
    : Joi.required().optional(),

  KAFKA_RETRY_SCALAR: options.client.retry.multiplier
    ? Joi.number().default(options.client.retry.multiplier)
    : Joi.required().optional(),

  KAFKA_RETRY_MAX_TIMES: options.client.retry.maxRetryTime
    ? Joi.number().default(options.client.retry.maxRetryTime)
    : Joi.required().optional(),
};
