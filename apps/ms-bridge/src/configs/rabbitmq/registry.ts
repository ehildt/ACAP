import { registerAs } from '@nestjs/config';

import { RabbitMQAdapter } from './adapter';

export const RabbitMQRegistry = registerAs('RabbitMQ', async () => new RabbitMQAdapter());
