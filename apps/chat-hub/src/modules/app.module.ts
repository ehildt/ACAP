import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { REDIS_PUBSUB } from '@/constants/app.constants';
import { ChatHubController } from '@/controllers/chat.controller';
import { AppService } from '@/services/app.service';
import { ChatService } from '@/services/chat.service';
import { ConfigFactoryService } from '@/services/config-factory.service';

import { GlobalConfigFactoryModule } from './global-config-factory.module';

@Module({
  imports: [
    GlobalConfigFactoryModule,
    ClientsModule.registerAsync([
      {
        name: REDIS_PUBSUB,
        imports: [ConfigModule],
        inject: [ConfigFactoryService],
        useFactory: async ({ redisPubSub }: ConfigFactoryService) => redisPubSub,
      },
    ]),
  ],
  providers: [AppService, ConsoleLogger, ChatService],
  controllers: [ChatHubController],
})
export class AppModule {}
