import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { ConfigFactoryService } from './config-factory.service';

describe('ConfigFactoryService', () => {
  let service: ConfigFactoryService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigFactoryService, ConfigService],
    }).compile();

    service = module.get<ConfigFactoryService>(ConfigFactoryService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('app', () => {
    it('should return a valid App object', () => {
      jest.spyOn(configService, 'get').mockImplementation((key) => {
        if (key === 'App.BODY_LIMIT') return 1000;
        if (key === 'App.PORT') return 3000;
        if (key === 'App.ADDRESS') return 'localhost';
        if (key === 'App.START_SWAGGER') return true;
        if (key === 'App.PRINT_ENV') return true;
        if (key === 'App.NODE_ENV') return 'production';
        if (key === 'App.TTL') return 3600;
        if (key === 'App.USE_BULLMQ') return true;
        if (key === 'App.USE_REDIS_PUBSUB') return true;
        if (key === 'App.USE_MQTT') return true;
        if (key === 'App.USE_KAFKA') return true;
        if (key === 'App.USE_RABBITMQ') return true;
        return null;
      });

      expect(service.app).toEqual({
        port: 3000,
        bodyLimit: 1000,
        address: 'localhost',
        startSwagger: true,
        printEnv: true,
        nodeEnv: 'production',
        brokers: {
          useBullMQ: true,
          useRedisPubSub: true,
          useMQTT: true,
          useKafka: true,
          useRabbitMQ: true,
        },
      });
    });
  });

  describe('redisPubSub', () => {
    it('should return a valid RedisPubSubConfig object', () => {
      jest.spyOn(configService, 'get').mockImplementation((key) => {
        if (key === 'RedisPubSub.PORT') return 6379;
        if (key === 'RedisPubSub.HOST') return 'localhost';
        if (key === 'RedisPubSub.PASS') return 'redispassword';
        if (key === 'RedisPubSub.USER') return 'redisuser';
        return null;
      });

      expect(service.redisPubSub).toEqual({
        transport: Transport.REDIS,
        options: {
          port: 6379,
          host: 'localhost',
          password: 'redispassword',
          username: 'redisuser',
        },
      });
    });
  });

  describe('bullMQ', () => {
    it('should return a valid BullMQConfig object', () => {
      jest.spyOn(configService, 'get').mockImplementation((key) => {
        if (key === 'BullMQ.PORT') return 6379;
        if (key === 'BullMQ.HOST') return 'localhost';
        if (key === 'BullMQ.PASS') return 'bullmqpassword';
        if (key === 'BullMQ.USER') return 'bullmquser';
        return null;
      });

      expect(service.bullMQ).toEqual({
        connection: {
          port: 6379,
          host: 'localhost',
          password: 'bullmqpassword',
          username: 'bullmquser',
        },
      });
    });
  });

  describe('mqtt', () => {
    it('should return a valid MqttClientOptions object', () => {
      jest.spyOn(configService, 'get').mockImplementation((key) => {
        if (key === 'MQTT.BROKER_URL') return 'mqtt://localhost:1883';
        if (key === 'MQTT.KEEPALIVE') return 60;
        if (key === 'MQTT.CONNECTION_TIMEOUT') return 30 * 1000;
        if (key === 'MQTT.RECONNECT_PERIOD') return 10 * 1000;
        if (key === 'MQTT.RESUBSCRIBE') return true;
        if (key === 'MQTT.PROTOCOL') return undefined;
        if (key === 'MQTT.HOSTNAME') return 'localhost';
        if (key === 'MQTT.PORT') return 1883;
        if (key === 'MQTT.USERNAME') return 'mqttuser';
        if (key === 'MQTT.PASSWORD') return 'mqttpassword';
        return null;
      });

      expect(service.mqtt).toEqual({
        brokerUrl: 'mqtt://localhost:1883',
        options: {
          keepalive: 60,
          connectTimeout: 30 * 1000,
          reconnectPeriod: 10 * 1000,
          resubscribe: true,
          protocol: undefined,
          hostname: 'localhost',
          port: 1883,
          username: 'mqttuser',
          password: 'mqttpassword',
        },
      });
    });
  });
});
