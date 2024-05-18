import Joi from "joi";

import { CONFIG_YML } from "@/configs/config-yml/loader";

export const MINIO_SCHEMA = {
  MINIO_ENDPOINT: CONFIG_YML?.minioConfig?.endPoint
    ? Joi.string().default(CONFIG_YML.minioConfig?.endPoint)
    : Joi.string().required(),

  MINIO_PORT: CONFIG_YML?.minioConfig?.port
    ? Joi.number().default(CONFIG_YML.minioConfig.port)
    : Joi.number().required(),

  MINIO_USE_SSL:
    CONFIG_YML?.minioConfig?.useSSL !== undefined
      ? Joi.boolean().default(CONFIG_YML.minioConfig.useSSL)
      : Joi.boolean().required(),

  MINIO_ACCESS_KEY: CONFIG_YML?.minioConfig?.accessKey
    ? Joi.string().default(CONFIG_YML.minioConfig.accessKey)
    : Joi.string().min(3).required(),

  MINIO_SECRET_KEY: CONFIG_YML?.minioConfig?.secretKey
    ? Joi.string().default(CONFIG_YML.minioConfig.secretKey)
    : Joi.string().min(8).required(),

  MINIO_BUCKET: CONFIG_YML?.minioConfig?.bucket
    ? Joi.string().default(CONFIG_YML.minioConfig.bucket)
    : Joi.string().min(3).required(),
};
