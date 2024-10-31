import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppRegistry } from '@/configs/app/registry';
import { BullMQRegistry } from '@/configs/bullmq/registry';
import { MongoConfigRegistry } from '@/configs/mongo/registry';
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
      load: [AppRegistry, BullMQRegistry, MongoConfigRegistry],
    }),
  ],
  providers: [ConfigFactoryService],
  exports: [ConfigFactoryService],
})
export class GlobalConfigFactoryModule {}
