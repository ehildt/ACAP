import { BullModule } from '@nestjs/bullmq';
import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { ACAP_REALM_QUEUE, REDIS_PUBSUB } from '@/constants/app.constants';
import { OutbreakController } from '@/controllers/outbreak.controller';
import { AppService } from '@/services/app.service';
import { ConfigFactoryService } from '@/services/config-factory.service';
import { OutbreakService } from '@/services/outbreak.service';

import { GlobalConfigFactoryModule } from './global-config-factory.module';
import { MqttClientModule } from './mqtt-client.module';

const useRedisPubSub = process.env.USE_REDIS_PUBSUB === 'true';
const useBullMQ = process.env.USE_BULLMQ === 'true';
const useMQTTClient = process.env.USE_MQTT === 'true';

@Module({
  imports: [
    GlobalConfigFactoryModule,
    useRedisPubSub &&
      ClientsModule.registerAsync([
        {
          name: REDIS_PUBSUB,
          imports: [ConfigModule],
          inject: [ConfigFactoryService],
          useFactory: async ({ redisPubSub }: ConfigFactoryService) => redisPubSub,
        },
      ]),
    useBullMQ &&
      BullModule.registerQueueAsync({
        imports: [ConfigModule],
        inject: [ConfigFactoryService],
        useFactory: async ({ bullMQ }: ConfigFactoryService) => ({ ...bullMQ, name: ACAP_REALM_QUEUE }),
      }),
    useMQTTClient &&
      MqttClientModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigFactoryService],
        isGlobal: true,
        useFactory: ({ mqtt }: ConfigFactoryService) => mqtt,
      }),
  ].filter((exists) => exists),
  providers: [AppService, ConsoleLogger, OutbreakService],
  controllers: [OutbreakController],
})
export class AppModule {}
