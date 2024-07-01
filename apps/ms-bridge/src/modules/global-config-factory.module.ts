import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppRegistry } from '@/configs/app/registry';
import { BullMQRegistry } from '@/configs/bullmq/registry';
import { KafkaRegistry } from '@/configs/kafka/registry';
import { MQTTRegistry } from '@/configs/mqtt/registry';
import { RabbitMQRegistry } from '@/configs/rabbitmq/registry';
import { RedisPubSubRegistry } from '@/configs/redis-pubsub/registry';
import { ConfigFactoryService } from '@/services/config-factory.service';
import { validationSchema } from '@/validations/validation.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      ignoreEnvFile: true,
      validationSchema,
      load: [AppRegistry, RedisPubSubRegistry, BullMQRegistry, MQTTRegistry, KafkaRegistry, RabbitMQRegistry],
    }),
  ],
  providers: [ConfigFactoryService],
  exports: [ConfigFactoryService],
})
export class GlobalConfigFactoryModule {}
