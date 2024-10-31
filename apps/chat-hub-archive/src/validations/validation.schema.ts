import Joi from 'joi';

import { APP_SCHEMA } from './app.schema';
import { BULLMQ_SCHEMA } from './bullmq.schema';
import { MONGOOSE_SCHEMA } from './mongoose.schema';

export const validationSchema = Joi.object({
  ...APP_SCHEMA,
  ...BULLMQ_SCHEMA,
  ...MONGOOSE_SCHEMA,
});
