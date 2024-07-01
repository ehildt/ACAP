import { ClientProxy } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';

import { REDIS_PUBSUB } from '@/constants/app.constants';
import { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';

import { ChatService } from './chat.service';
import { ConfigFactoryService } from './config-factory.service';

describe('ChatService', () => {
  let chatService: ChatService;
  let mockRedisPubSub: jest.Mocked<ClientProxy>;
  let mockConfigFactory: Partial<ConfigFactoryService>;

  beforeEach(async () => {
    mockConfigFactory = {};
    const moduleRef = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: ConfigFactoryService,
          useValue: mockConfigFactory,
        },
        {
          provide: REDIS_PUBSUB,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    chatService = moduleRef.get<ChatService>(ChatService);
    mockRedisPubSub = moduleRef.get(REDIS_PUBSUB);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('chats', () => {
    it('should distribute messages to realms using enabled messaging options', async () => {
      const reqs: ChatUpsertReq[] = [
        {
          realm: 'realm1',
          messages: [{ value: 'value1' }],
        },
        {
          realm: 'realm2',
          messages: [{ value: 'value2' }],
        },
      ];

      await chatService.onMessage(reqs);
      expect(mockRedisPubSub.emit).toHaveBeenCalledTimes(2);
    });
  });
});
