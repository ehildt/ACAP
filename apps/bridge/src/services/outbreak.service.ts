import { InjectQueue } from "@nestjs/bullmq";
import { Inject, Injectable, Optional } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Job, Queue, Worker } from "bullmq";

import { AppConfigBrokers } from "@/configs/config-yml/config.model";
import { ACAP_BRCS, ACAP_MSBR, REDIS_PUBSUB } from "@/constants/app.constants";
import { BreakoutUpsertReq } from "@/dtos/breakout-upsert.dto.req";
import { MQTT_CLIENT, MqttClient } from "@/modules/mqtt-client.module";

import { ConfigFactoryService } from "./config-factory.service";

@Injectable()
export class OutbreakService {
  constructor(
    @Optional() @Inject(REDIS_PUBSUB) private readonly redisPubSub: ClientProxy,
    @Optional() @InjectQueue(ACAP_BRCS) private readonly bullmq: Queue,
    @Optional() @Inject(MQTT_CLIENT) private readonly mqtt: MqttClient,
    private readonly factory: ConfigFactoryService,
  ) {}

  onModuleInit() {
    new Worker(
      ACAP_MSBR,
      async (job: Job) => {
        for (let index = 0; index < job.data.length; index++) {
          const item = job.data[index];
          this.factory.app.brokers.useRedisPubSub &&
            this.redisPubSub?.emit(job.name, item);
          this.factory.app.brokers.useMQTT &&
            this.mqtt?.publish(job.name, JSON.stringify(item));
          this.factory.app.brokers.useBullMQ &&
            this.bullmq?.add(job.name, item).catch((error) => error);
        }
      },
      { connection: this.factory.bullMQ.connection },
    );
  }

  async delegate(reqs: Array<BreakoutUpsertReq>, args: AppConfigBrokers) {
    reqs.forEach(({ realm, contents }) => {
      contents.forEach(({ value, jobOptions }) => {
        args.useRedisPubSub && this.redisPubSub?.emit(realm, value);
        args.useMQTT && this.mqtt?.publish(realm, JSON.stringify(value));
        args.useBullMQ &&
          this.bullmq?.add(realm, value, jobOptions).catch((error) => error);
      });
    });
  }
}
