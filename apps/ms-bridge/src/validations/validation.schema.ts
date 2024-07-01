import Joi from 'joi';

import { APP_SCHEMA } from './app.schema';
import { BULLMQ_SCHEMA } from './bullmq.schema';
import { KAFKA_SCHEMA } from './kafka.schema';
import { MQTT_SCHEMA } from './mqtt.schema';
import { RABBITMQ_SCHEMA } from './rabbitmq.schema';
import { REDIS_PUBSUB_SCHEMA } from './redis-pubsub.schema';

export const validationSchema = Joi.object({
  ...APP_SCHEMA,
  ...REDIS_PUBSUB_SCHEMA,
  ...BULLMQ_SCHEMA,
  ...MQTT_SCHEMA,
  ...KAFKA_SCHEMA,
  ...RABBITMQ_SCHEMA,
});
