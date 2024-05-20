import { BullModule } from "@nestjs/bullmq";
import { ConsoleLogger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Partitioners } from "kafkajs";

import {
  ACAP_BRCS,
  KAFKA_CLIENT,
  REDIS_PUBSUB,
} from "@/constants/app.constants";
import { OutbreakController } from "@/controllers/outbreak.controller";
import { AppService } from "@/services/app.service";
import { ConfigFactoryService } from "@/services/config-factory.service";
import { OutbreakService } from "@/services/outbreak.service";

import { GlobalConfigFactoryModule } from "./global-config-factory.module";
import { MqttClientModule } from "./mqtt-client.module";

const imports = [];

imports.push(GlobalConfigFactoryModule);

if (process.env.USE_REDIS_PUBSUB === "true")
  imports.push(
    ClientsModule.registerAsync([
      {
        name: REDIS_PUBSUB,
        imports: [ConfigModule],
        inject: [ConfigFactoryService],
        useFactory: async ({ redisPubSub }: ConfigFactoryService) =>
          redisPubSub,
      },
    ]),
  );

if (process.env.USE_KAFKA === "true")
  imports.push(
    ClientsModule.registerAsync([
      {
        name: KAFKA_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigFactoryService],
        useFactory: async ({ kafka }: ConfigFactoryService) => ({
          name: "ACAP_BRCS",
          transport: Transport.KAFKA,
          ...kafka,
          createPartitioner: Partitioners.DefaultPartitioner,
        }),
      },
    ]),
  );

if (process.env.USE_BULLMQ === "true")
  imports.push(
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigFactoryService],
      name: ACAP_BRCS,
      useFactory: async ({ bullMQ }: ConfigFactoryService) => ({
        ...bullMQ,
        defaultJobOptions: {
          backoff: 300_000,
          attempts: 12,
          removeOnComplete: true,
          removeOnFail: {
            age: 604_800_000,
          },
        },
      }),
    }),
  );

if (process.env.USE_MQTT === "true")
  imports.push(
    MqttClientModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigFactoryService],
      isGlobal: true,
      useFactory: ({ mqtt }: ConfigFactoryService) => mqtt,
    }),
  );

@Module({
  imports,
  providers: [AppService, ConsoleLogger, OutbreakService],
  controllers: [OutbreakController],
})
export class AppModule {}
