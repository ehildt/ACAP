import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transport } from "@nestjs/microservices";

import {
  AppConfig,
  BullMQConfig,
  KafkaClientConfig,
  RedisPubSubConfig,
} from "@/configs/config-yml/config.model";
import { MqttClientOptions } from "@/modules/mqtt-client.module";

@Injectable()
export class ConfigFactoryService {
  constructor(private readonly configService: ConfigService) {}

  get app() {
    return Object.freeze<AppConfig>({
      port: this.configService.get<number>("AppConfig.PORT"),
      address: this.configService.get<string>("AppConfig.ADDRESS"),
      startSwagger: this.configService.get<boolean>("AppConfig.START_SWAGGER"),
      printEnv: this.configService.get<boolean>("AppConfig.PRINT_ENV"),
      nodeEnv: this.configService.get<string>("AppConfig.NODE_ENV"),
      bodyLimit: this.configService.get<number>("AppConfig.BODY_LIMIT"),
      brokers: {
        useBullMQ: this.configService.get<boolean>("AppConfig.USE_BULLMQ"),
        useMQTT: this.configService.get<boolean>("AppConfig.USE_MQTT"),
        useKafka: this.configService.get<boolean>("AppConfig.USE_KAFKA"),
        useRedisPubSub: this.configService.get<boolean>(
          "AppConfig.USE_REDIS_PUBSUB",
        ),
      },
    });
  }

  get redisPubSub() {
    const port = this.configService.get<number>("RedisPubSub.PORT");
    const host = this.configService.get<string>("RedisPubSub.HOST");
    const password = this.configService.get<string>("RedisPubSub.PASS");
    const username = this.configService.get<string>("RedisPubSub.USER");
    return Object.freeze<RedisPubSubConfig>({
      transport: Transport.REDIS,
      options: {
        port,
        host,
        password,
        username,
      },
    });
  }

  get bullMQ() {
    const port = this.configService.get<number>("BullMQ.PORT");
    const host = this.configService.get<string>("BullMQ.HOST");
    const password = this.configService.get<string>("BullMQ.PASS");
    const username = this.configService.get<string>("BullMQ.USER");
    return Object.freeze<BullMQConfig>({
      connection: {
        port,
        host,
        password,
        username,
      },
    });
  }

  get kafka() {
    const clientId = this.configService.get<string>("KafkaClient.CLIENT_ID");
    const groupId = this.configService.get<string>("KafkaClient.GROUP_ID");
    const brokers = this.configService.get<Array<string>>(
      "KafkaClient.BROKERS",
    );
    return Object.freeze<KafkaClientConfig>({
      options: {
        client: {
          clientId,
          brokers,
        },
        consumer: {
          groupId,
        },
      },
    });
  }

  get mqtt() {
    return Object.freeze<MqttClientOptions>({
      brokerUrl: this.configService.get<string>("MQTTClientConfig.BROKER_URL"),
      options: {
        keepalive: this.configService.get<number>("MQTTClientConfig.KEEPALIVE"),
        connectTimeout: this.configService.get<number>(
          "MQTTClientConfig.CONNECTION_TIMEOUT",
        ),
        reconnectPeriod: this.configService.get<number>(
          "MQTTClientConfig.RECONNECT_PERIOD",
        ),
        resubscribe: this.configService.get<boolean>(
          "MQTTClientConfig.RESUBSCRIBE",
        ),
        protocol: this.configService.get<any>("MQTTClientConfig.PROTOCOL"),
        hostname: this.configService.get<string>("MQTTClientConfig.HOSTNAME"),
        port: this.configService.get<number>("MQTTClientConfig.PORT"),
        username: this.configService.get<string>("MQTTClientConfig.USERNAME"),
        password: this.configService.get<string>("MQTTClientConfig.PASSWORD"),
      },
    });
  }
}
