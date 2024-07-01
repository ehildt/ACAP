import Joi from 'joi';

import { APP_SCHEMA } from './app.schema';
import { BULLMQ_SCHEMA } from './bullmq.schema';
import { MINIO_SCHEMA } from './minio.schema';
import { MONGOOSE_SCHEMA } from './mongoose.schema';
import { REDIS_SCHEMA } from './redis.schema';

export const validationSchema = Joi.object({
  ...APP_SCHEMA,
  ...REDIS_SCHEMA,
  ...MONGOOSE_SCHEMA,
  ...MINIO_SCHEMA,
  ...BULLMQ_SCHEMA,
});
