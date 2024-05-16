import multipart from '@fastify/multipart';
import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './modules/app.module';
import { AppService } from './services/app.service';
import { ConfigFactoryService } from './services/config-factory.service';

const LOG_LEVEL: Array<LogLevel> =
  process.env.NODE_ENV === 'production' ? ['warn', 'error'] : ['warn', 'error', 'debug', 'log', 'verbose'];

const MB16 = '16777216';
const BODY_LIMIT = parseInt(process.env.BODY_LIMIT ?? MB16, 10);

void (async () => {
  // TODO: put bodyLimit in config
  const adapter = new FastifyAdapter({ bodyLimit: BODY_LIMIT });
  adapter.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, { logger: LOG_LEVEL });
  const appService = app.get(AppService);
  const factory = app.get(ConfigFactoryService);

  await app.register(multipart as any);
  appService.useGlobalPipes(app);
  appService.enableVersioning(app);
  appService.enableOpenApi(app);

  app.enableShutdownHooks(['SIGINT', 'SIGTERM', 'SIGQUIT']);

  await app.listen(factory.app.port, factory.app.address);
  appService.logOnServerStart();
})();
