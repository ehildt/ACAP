import { InjectQueue } from "@nestjs/bullmq";
import { Inject, Injectable, Optional } from "@nestjs/common";
import { ClientKafka, ClientProxy, ClientRMQ } from "@nestjs/microservices";
import { Job, Queue, Worker } from "bullmq";

import { AppBrokers } from "@/configs/config-yml/config.model";
import {
  ACAP_BRCS,
  ACAP_MSBR,
  BULLMQ_CLIENT,
  KAFKA_CLIENT,
  RABBITMQ_CLIENT,
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
    @Optional() @InjectQueue(BULLMQ_CLIENT) private readonly bullmq: Queue,
    @Optional() @Inject(MQTT_CLIENT) private readonly mqtt: MqttClient,
    @Optional() @Inject(KAFKA_CLIENT) private readonly kafka: ClientKafka,
    @Optional() @Inject(RABBITMQ_CLIENT) private readonly rabbitmq: ClientRMQ,
  ) {}

  onModuleInit() {
    new Worker(
      ACAP_MSBR,
      async (job: Job) => {
        for (let index = 0; index < job.data.length; index++) {
          const realm = job.name;
          const item = JSON.stringify({ realm, ...job.data[index] });
          if (this.factory.app.brokers.useRedisPubSub)
            this.redisPubSub?.emit(ACAP_BRCS, item);
          if (this.factory.app.brokers.useRabbitMQ)
            this.rabbitmq.emit(ACAP_BRCS, item);
          if (this.factory.app.brokers.useMQTT)
            this.mqtt?.publish(ACAP_BRCS, item);
          if (this.factory.app.brokers.useBullMQ)
            this.bullmq?.add(ACAP_BRCS, item).catch((error) => error);
          if (this.factory.app.brokers.useKafka)
            this.kafka.emit(ACAP_BRCS, item);
        }
      },
      { connection: this.factory.bullMQ.connection },
    );
  }

  async delegate(reqs: Array<BreakoutUpsertReq>, args: AppBrokers) {
    reqs.forEach(({ realm, contents }) => {
      contents.forEach(({ value }) => {
        const item = JSON.stringify({ realm, ...value });
        if (args.useRabbitMQ) this.rabbitmq.emit(ACAP_BRCS, item);
        if (args.useKafka) this.kafka.emit(ACAP_BRCS, item);
        if (args.useRedisPubSub) this.redisPubSub?.emit(ACAP_BRCS, item);
        if (args.useMQTT) this.mqtt?.publish(ACAP_BRCS, item);
        if (args.useBullMQ)
          this.bullmq?.add(ACAP_BRCS, item).catch((error) => error);
      });
    });
  }
}
