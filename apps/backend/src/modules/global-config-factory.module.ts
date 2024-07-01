import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppRegistry } from '@/configs/app/registry';
import { BullMQRegistry } from '@/configs/bullmq/registry';
import { MinioConfigRegistry } from '@/configs/minio/registry';
import { MongoConfigRegistry } from '@/configs/mongo/registry';
import { RedisConfigRegistry } from '@/configs/redis/registry';
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
      load: [AppRegistry, MongoConfigRegistry, MinioConfigRegistry, RedisConfigRegistry, BullMQRegistry],
    }),
  ],
  providers: [ConfigFactoryService],
  exports: [ConfigFactoryService],
})
export class GlobalConfigFactoryModule {}
