import { registerAs } from '@nestjs/config';

import { AppAdapter } from './adapter';

export const AppRegistry = registerAs('App', async () => new AppAdapter());
