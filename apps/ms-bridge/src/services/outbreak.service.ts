import { InjectQueue } from "@nestjs/bullmq";
import { Inject, Injectable, Optional } from "@nestjs/common";
import { ClientKafka, ClientProxy } from "@nestjs/microservices";
import { Job, Queue, Worker } from "bullmq";

import { AppConfigBrokers } from "@/configs/config-yml/config.model";
import {
  ACAP_BRCS,
  ACAP_MSBR,
  KAFKA_CLIENT,
  REDIS_PUBSUB,
} from "@/constants/app.constants";
import { BreakoutUpsertReq } from "@/dtos/breakout-upsert.dto.req";
import { MQTT_CLIENT, MqttClient } from "@/modules/mqtt-client.module";

import { ConfigFactoryService } from "./config-factory.service";

@Injectable()
export class OutbreakService {
  constructor(
    private readonly factory: ConfigFactoryService,
    @Optional() @Inject(REDIS_PUBSUB) private readonly redisPubSub: ClientProxy,
    @Optional() @InjectQueue(ACAP_BRCS) private readonly bullmq: Queue,
    @Optional() @Inject(MQTT_CLIENT) private readonly mqtt: MqttClient,
    @Optional() @Inject(KAFKA_CLIENT) private readonly kafka: ClientKafka,
  ) {}

  onModuleInit() {
    new Worker(
      ACAP_MSBR,
      async (job: Job) => {
        for (let index = 0; index < job.data.length; index++) {
          const item = job.data[index];
          if (this.factory.app.brokers.useRedisPubSub)
            this.redisPubSub?.emit(job.name, item);
          if (this.factory.app.brokers.useMQTT)
            this.mqtt?.publish(job.name, JSON.stringify(item));
          if (this.factory.app.brokers.useBullMQ)
            this.bullmq?.add(job.name, item).catch((error) => error);
          if (this.factory.app.brokers.useKafka)
            this.kafka.emit(job.name, item);
        }
      },
      { connection: this.factory.bullMQ.connection },
    );
  }

  async delegate(reqs: Array<BreakoutUpsertReq>, args: AppConfigBrokers) {
    reqs.forEach(({ realm, contents }) => {
      contents.forEach(({ value, jobOptions }) => {
        if (args.useKafka) this.kafka.emit(realm, value);
        if (args.useRedisPubSub) this.redisPubSub?.emit(realm, value);
        if (args.useMQTT) this.mqtt?.publish(realm, JSON.stringify(value));
        if (args.useBullMQ)
          this.bullmq?.add(realm, value, jobOptions).catch((error) => error);
      });
    });
  }
}
