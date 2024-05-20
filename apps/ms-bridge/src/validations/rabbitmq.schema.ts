import Joi from "joi";

import { CONFIG_YML } from "@/configs/config-yml/loader";

const options = CONFIG_YML?.rabbitMQClientConfig?.options;

export const RABBITMQ_SCHEMA = {
  RABBITMQ_URLS: options?.urls
    ? Joi.string().default(options.urls)
    : Joi.string().optional(),
};
