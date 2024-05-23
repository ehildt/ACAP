import Joi from "joi";

import { CONFIG_YML } from "@/configs/config-yml/loader";

export const APP_SCHEMA = {
  PORT: CONFIG_YML?.appConfig?.port
    ? Joi.number().default(CONFIG_YML.appConfig.port)
    : Joi.number().required(),

  ADDRESS: CONFIG_YML?.appConfig?.address
    ? Joi.string().default(CONFIG_YML.appConfig.address)
    : Joi.string().required(),

  PRINT_ENV:
    CONFIG_YML?.appConfig?.printEnv !== undefined
      ? Joi.boolean().default(CONFIG_YML.appConfig.printEnv)
      : Joi.boolean().required(),

  START_SWAGGER:
    CONFIG_YML?.appConfig?.startSwagger !== undefined
      ? Joi.boolean().default(CONFIG_YML.appConfig.startSwagger)
      : Joi.boolean().required(),

  NODE_ENV: CONFIG_YML?.appConfig?.nodeEnv
    ? Joi.string().default(CONFIG_YML.appConfig.nodeEnv)
    : Joi.string().required(),

  USE_REDIS_PUBSUB:
    CONFIG_YML?.appConfig?.brokers.useRedisPubSub !== undefined
      ? Joi.boolean().default(CONFIG_YML.appConfig.brokers.useRedisPubSub)
      : Joi.boolean().required(),

  USE_BULLMQ:
    CONFIG_YML?.appConfig?.brokers.useBullMQ !== undefined
      ? Joi.boolean().default(CONFIG_YML.appConfig.brokers.useBullMQ)
      : Joi.boolean().required(),

  REALM_NAMESPACE_POSTFIX: CONFIG_YML?.appConfig.realm?.namespacePostfix
    ? Joi.string().default(CONFIG_YML.appConfig.realm?.namespacePostfix)
    : Joi.string().required(),

  REALM_RESOLVE_ENV:
    CONFIG_YML?.appConfig.realm?.resolveEnv !== undefined
      ? Joi.boolean().default(CONFIG_YML.appConfig.realm?.resolveEnv)
      : Joi.boolean().required(),

  REALM_TTL:
    CONFIG_YML?.appConfig.realm?.ttl !== undefined
      ? Joi.number().default(CONFIG_YML.appConfig.realm.ttl)
      : Joi.number().required(),

  REALM_GZIP_THRESHOLD: CONFIG_YML?.appConfig.realm?.gzipThreshold
    ? Joi.number().default(CONFIG_YML.appConfig.realm.gzipThreshold)
    : Joi.number().required(),

  BODY_LIMIT: CONFIG_YML?.appConfig.bodyLimit
    ? Joi.number().default(CONFIG_YML.appConfig.bodyLimit)
    : Joi.number().required(),

  SYMMETRIC_KEY: CONFIG_YML?.appConfig.crypto?.secret
    ? Joi.string()
        .length(32)
        .length(24)
        .length(16)
        .error(new Error("secret must have a length of [32, 24, 16]"))
        .default(CONFIG_YML?.appConfig.crypto?.secret)
    : Joi.string()
        .length(32)
        .length(24)
        .length(16)
        .error(
          new Error("secret must have a character length of [32 | 24 | 16]"),
        )
        .optional(),
};
