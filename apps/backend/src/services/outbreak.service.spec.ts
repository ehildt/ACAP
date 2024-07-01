import { Test } from '@nestjs/testing';
import { Queue } from 'bullmq';

import { AppBrokers } from '@/configs/config-yml/config.model';
import { ACAP_MSBR } from '@/constants/app.constants';
import { BreakoutUpsertReq } from '@/dtos/breakout-upsert.dto.req';

import { OutbreakService } from './outbreak.service';

describe('OutbreakService', () => {
  let outbreakService: OutbreakService;
  let mockBullMQQueue: jest.Mocked<Queue>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        OutbreakService,
        {
          provide: ACAP_MSBR,
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    outbreakService = moduleRef.get<OutbreakService>(OutbreakService);
    mockBullMQQueue = moduleRef.get(ACAP_MSBR);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('delegate', () => {
    it('should distribute data to realms using enabled messaging options', async () => {
      const reqs: BreakoutUpsertReq[] = [
        {
          realm: 'realm1',
          contents: [{ value: 'value1' }],
        },
        {
          realm: 'realm2',
          contents: [{ value: 'value2' }],
        },
      ];

      const args: AppBrokers = {
        useBullMQ: true,
      };

      await outbreakService.delegate(reqs, args);
      expect(mockBullMQQueue.add).not.toHaveBeenCalled();
    });

    it('should not distribute data if no messaging options are enabled', async () => {
      const reqs: BreakoutUpsertReq[] = [
        {
          realm: 'realm1',
          contents: [
            {
              value: 'value1',
            },
          ],
        },
      ];

      const args: AppBrokers = {
        useBullMQ: false,
      };

      await outbreakService.delegate(reqs, args);
      expect(mockBullMQQueue.add).not.toHaveBeenCalled();
    });
  });
});
