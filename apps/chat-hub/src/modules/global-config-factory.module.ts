import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppRegistry } from '@/configs/app/registry';
import { BullMQRegistry } from '@/configs/bullmq/registry';
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
      load: [AppRegistry, RedisPubSubRegistry, BullMQRegistry],
    }),
  ],
  providers: [ConfigFactoryService],
  exports: [ConfigFactoryService],
})
export class GlobalConfigFactoryModule {}
