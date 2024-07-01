import { registerAs } from '@nestjs/config';

import { MQTTClientAdapter } from './adapter';

export const MQTTRegistry = registerAs('MQTT', () => new MQTTClientAdapter());
