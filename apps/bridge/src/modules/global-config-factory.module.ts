import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppConfigRegistry } from "@/configs/app/registry";
import { BullMQRegistry } from "@/configs/bullmq/registry";
import { MQTTClientRegistry } from "@/configs/mqtt/registry";
import { RedisPubSubRegistry } from "@/configs/redis-pubsub/registry";
import { ConfigFactoryService } from "@/services/config-factory.service";
import { validationSchema } from "@/validations/validation.schema";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      ignoreEnvFile: true,
      validationSchema,
      load: [
        AppConfigRegistry,
        RedisPubSubRegistry,
        BullMQRegistry,
        MQTTClientRegistry,
      ],
    }),
  ],
  providers: [ConfigFactoryService],
  exports: [ConfigFactoryService],
})
export class GlobalConfigFactoryModule {}
