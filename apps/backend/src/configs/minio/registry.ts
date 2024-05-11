import { registerAs } from '@nestjs/config';

import { MinioConfigAdapter } from './adapter';

export const MinioConfigRegistry = registerAs('MinioConfig', () => new MinioConfigAdapter());
