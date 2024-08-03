import { Test } from '@nestjs/testing';

import { BreakoutUpsertReq } from '@/dtos/breakout-upsert.dto.req';
import { OutbreakService } from '@/services/outbreak.service';

import { OutbreakController } from './outbreak.controller';

describe('OutbreakController', () => {
  let controller: OutbreakController;
  let service: OutbreakService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OutbreakController],
      providers: [{ provide: OutbreakService, useValue: { delegate: jest.fn() } }],
    }).compile();

    controller = moduleRef.get<OutbreakController>(OutbreakController);
    service = moduleRef.get<OutbreakService>(OutbreakService);
  });

  describe('delegate', () => {
    it('should call outbreakService.delegate with the correct arguments', async () => {
      const reqs: Array<BreakoutUpsertReq> = [{ realm: 'TEST', contents: [{ value: 'do-test' }] }];
      const useKafka = false;
      const useMQTT = false;
      const useBullMQ = false;
      const useRedisPubSub = false;
      const useRabbitMQ = false;
      const result = await controller.delegate(reqs, useMQTT, useBullMQ, useRedisPubSub, useKafka, useRabbitMQ);
      expect(service.delegate).toHaveBeenCalledWith(reqs, {
        useBullMQ,
        useMQTT,
        useRedisPubSub,
        useKafka,
        useRabbitMQ,
      });
      expect(result).toEqual(undefined);
    });

    it('should call outbreakService.delegate multiple times', async () => {
      const reqs: Array<BreakoutUpsertReq> = [{ realm: 'TEST', contents: [{ value: 'do-test' }] }];
      const useKafka = true;
      const useMQTT = true;
      const useBullMQ = true;
      const useRedisPubSub = true;
      const useRabbitMQ = true;
      const result = await controller.delegate(reqs, useMQTT, useBullMQ, useRedisPubSub, useKafka, useRabbitMQ);
      expect(service.delegate).toHaveBeenCalledWith(reqs, {
        useBullMQ,
        useMQTT,
        useRedisPubSub,
        useKafka,
        useRabbitMQ,
      });
      expect(result).toEqual(undefined);
    });
  });
});
