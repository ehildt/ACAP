import { BullModule } from '@nestjs/bullmq';
import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BULLMQ_PERSISTANCE_QUEUE } from '@/constants/app.constants';
import { ChatHubController } from '@/controllers/chat.controller';
import { AppService } from '@/services/app.service';
import { ChatService } from '@/services/chat.service';
import { ConfigFactoryService } from '@/services/config-factory.service';

import { GlobalConfigFactoryModule } from './global-config-factory.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { ChatHubGateway } from './web-socket/chat-hub.gateway';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigFactoryService],
      name: BULLMQ_PERSISTANCE_QUEUE,
      useFactory: async ({ bullMQ }: ConfigFactoryService) => ({
        ...bullMQ,
        // ! add defaultJobOptions to config
        defaultJobOptions: {
          backoff: {
            type: 'exponential',
            delay: 500,
          },
          attempts: 7,
          removeOnComplete: true,
          removeOnFail: {
            age: 604_800_000,
          },
        },
      }),
    }),
    PubSubModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigFactoryService],
      useFactory: ({ redisPubSub }: ConfigFactoryService) => ({
        host: redisPubSub.host,
        username: redisPubSub.username,
        password: redisPubSub.password,
        port: redisPubSub.port,
        connectionName: redisPubSub.connectionName,
      }),
    }),
    GlobalConfigFactoryModule,
  ],
  providers: [AppService, ConsoleLogger, ChatService, ChatHubGateway],
  controllers: [ChatHubController],
})
export class AppModule {}
