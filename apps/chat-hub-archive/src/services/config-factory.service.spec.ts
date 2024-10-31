import { ConfigService } from '@nestjs/config';
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
        if (key === 'App.USE_REDIS_PUBSUB') return true;
        return null;
      });

      expect(service.app).toEqual({
        port: 3000,
        bodyLimit: 1000,
        address: 'localhost',
        startSwagger: true,
        printEnv: true,
        nodeEnv: 'production',
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

      expect(service.bullMQ).toEqual({
        autoResubscribe: true,
        connectionName: 'CHAT_BRCS',
        host: 'localhost',
        keepAlive: 3000,
        offlineQueue: true,
        password: 'redispassword',
        port: 6379,
        username: 'redisuser',
      });
    });
  });
});
