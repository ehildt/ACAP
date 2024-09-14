import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ChatHubController } from '@/controllers/chat.controller';
import { AppService } from '@/services/app.service';
import { ChatService } from '@/services/chat.service';
import { ConfigFactoryService } from '@/services/config-factory.service';

import { GlobalConfigFactoryModule } from './global-config-factory.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { ChatHubGateway } from './web-socket/chat-hub.gateway';

@Module({
  imports: [
    PubSubModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigFactoryService],
      useFactory: ({ redisPubSub }: ConfigFactoryService) => ({
        host: redisPubSub.host,
        username: redisPubSub.username,
        password: redisPubSub.password,
        port: redisPubSub.port,
      }),
    }),
    GlobalConfigFactoryModule,
  ],
  providers: [AppService, ConsoleLogger, ChatService, ChatHubGateway],
  controllers: [ChatHubController],
})
export class AppModule {}
