import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

import {
  App,
  BullMQConfig,
  KafkaClientConfig,
  RabbitMQClientConfig,
  RedisPubSubConfig,
} from '@/configs/config-yml/config.model';
import { MqttClientOptions } from '@/modules/mqtt-client.module';

@Injectable()
export class ConfigFactoryService {
  constructor(private readonly configService: ConfigService) {}

  get app() {
    return Object.freeze<App>({
      port: this.configService.get<number>('App.PORT'),
      address: this.configService.get<string>('App.ADDRESS'),
      startSwagger: this.configService.get<boolean>('App.START_SWAGGER'),
      printEnv: this.configService.get<boolean>('App.PRINT_ENV'),
      nodeEnv: this.configService.get<string>('App.NODE_ENV'),
      bodyLimit: this.configService.get<number>('App.BODY_LIMIT'),
      brokers: {
        useRabbitMQ: this.configService.get<boolean>('App.USE_RABBITMQ'),
        useBullMQ: this.configService.get<boolean>('App.USE_BULLMQ'),
        useMQTT: this.configService.get<boolean>('App.USE_MQTT'),
        useKafka: this.configService.get<boolean>('App.USE_KAFKA'),
        useRedisPubSub: this.configService.get<boolean>('App.USE_REDIS_PUBSUB'),
      },
    });
  }

  get redisPubSub() {
    const port = this.configService.get<number>('RedisPubSub.PORT');
    const host = this.configService.get<string>('RedisPubSub.HOST');
    const password = this.configService.get<string>('RedisPubSub.PASS');
    const username = this.configService.get<string>('RedisPubSub.USER');
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
    const port = this.configService.get<number>('BullMQ.PORT');
    const host = this.configService.get<string>('BullMQ.HOST');
    const password = this.configService.get<string>('BullMQ.PASS');
    const username = this.configService.get<string>('BullMQ.USER');
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
    return Object.freeze<KafkaClientConfig>({
      options: {
        client: {
          ssl: this.configService.get<boolean>('Kafka.SSL'),
          clientId: this.configService.get<string>('Kafka.CLIENT_ID'),
          brokers: this.configService.get<Array<string>>('Kafka.BROKERS'),
          retry: {
            factor: this.configService.get<number>('Kafka.RETRY_FACTOR'),
            retries: this.configService.get<number>('Kafka.RETRIES'),
            multiplier: this.configService.get<number>('Kafka.RETRY_SCALAR'),
            initialRetryTime: this.configService.get<number>('Kafka.RETRY_TIME'),
            maxRetryTime: this.configService.get<number>('Kafka.RETRY_MAX_TIMES'),
          },
        },
      },
    });
  }

  get rabbitmq() {
    const urls = this.configService.get<Array<string>>('RabbitMQ.URLS');
    return Object.freeze<RabbitMQClientConfig>({
      options: {
        urls,
      },
    });
  }

  get mqtt() {
    return Object.freeze<MqttClientOptions>({
      brokerUrl: this.configService.get<string>('MQTT.BROKER_URL'),
      options: {
        keepalive: this.configService.get<number>('MQTT.KEEPALIVE'),
        connectTimeout: this.configService.get<number>('MQTT.CONNECTION_TIMEOUT'),
        reconnectPeriod: this.configService.get<number>('MQTT.RECONNECT_PERIOD'),
        resubscribe: this.configService.get<boolean>('MQTT.RESUBSCRIBE'),
        protocol: this.configService.get<any>('MQTT.PROTOCOL'),
        hostname: this.configService.get<string>('MQTT.HOSTNAME'),
        port: this.configService.get<number>('MQTT.PORT'),
        username: this.configService.get<string>('MQTT.USERNAME'),
        password: this.configService.get<string>('MQTT.PASSWORD'),
      },
    });
  }
}
