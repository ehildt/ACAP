import { Test } from '@nestjs/testing';

import { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';
import { PubSupService } from '@/modules/pubsub/pubsub.service';
import { ChatHubGateway } from '@/modules/web-socket/chat-hub.gateway';

import { ChatService } from './chat.service';
import { ConfigFactoryService } from './config-factory.service';

describe('ChatService', () => {
  let chatService: ChatService;
  let mockRedisPubSub: jest.Mocked<PubSupService>;
  let mockConfigFactory: Partial<ConfigFactoryService>;

  beforeEach(async () => {
    mockConfigFactory = {};
    const moduleRef = await Test.createTestingModule({
      providers: [
        ChatHubGateway,
        ChatService,
        {
          provide: ConfigFactoryService,
          useValue: mockConfigFactory,
        },
        {
          provide: PubSupService,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    chatService = moduleRef.get(ChatService);
    mockRedisPubSub = moduleRef.get(PubSupService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('chats', () => {
    it('should distribute messages to realms using enabled messaging options', async () => {
      const reqs: ChatUpsertReq[] = [
        {
          topic: { id: '1', name: 'cookies' },
          message: 'i love cookies',
          publisherId: 'user_1',
        },
        {
          topic: { id: '2', name: 'how to stop simping' },
          message: 'start by going to gym frequently',
          publisherId: 'user_1',
        },
      ];

      await chatService.publish(reqs);
      expect(mockRedisPubSub.publish).toHaveBeenCalledTimes(2);
    });
  });
});
