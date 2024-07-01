import Joi from 'joi';

import { APP_SCHEMA } from './app.schema';
import { REDIS_PUBSUB_SCHEMA } from './redis-pubsub.schema';

export const validationSchema = Joi.object({
  ...APP_SCHEMA,
  ...REDIS_PUBSUB_SCHEMA,
});
