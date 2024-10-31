import Joi from 'joi';

import { CONFIG_YML } from '@/configs/config-yml/loader';

export const REDIS_PUBSUB_SCHEMA = {
  REDIS_PUBSUB_HOST: CONFIG_YML?.redisPubSubConfig?.host
    ? Joi.string().default(CONFIG_YML.redisPubSubConfig.host)
    : Joi.string().optional(),

  REDIS_PUBSUB_PASS: CONFIG_YML?.redisPubSubConfig?.password
    ? Joi.string().default(CONFIG_YML.redisPubSubConfig.password)
    : Joi.string().optional(),

  REDIS_PUBSUB_USER: CONFIG_YML?.redisPubSubConfig?.username
    ? Joi.string().default(CONFIG_YML.redisPubSubConfig.username)
    : Joi.string().optional(),

  REDIS_PUBSUB_PORT: CONFIG_YML?.redisPubSubConfig?.port
    ? Joi.number().default(CONFIG_YML.redisPubSubConfig.port)
    : Joi.number().optional(),

  REDIS_CONNECTION_NAME: CONFIG_YML?.redisPubSubConfig?.connectionName
    ? Joi.string().default(CONFIG_YML.redisPubSubConfig.connectionName)
    : Joi.string().optional(),
};
