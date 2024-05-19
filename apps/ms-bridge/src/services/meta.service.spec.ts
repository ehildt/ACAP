import { Test } from "@nestjs/testing";

import { ConfigFactoryService } from "./config-factory.service";
import { MetaService } from "./meta.service";

describe("MetaService", () => {
  let metaService: MetaService;
  let mockConfigFactory: Partial<ConfigFactoryService>;

  beforeEach(async () => {
    mockConfigFactory = {
      app: {
        startSwagger: false,
        brokers: {
          useKafka: false,
          useMqtt: false,
          useRabbitMQ: false,
          useRedisPubSub: false,
        },
      } as any,
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        MetaService,
        {
          provide: ConfigFactoryService,
          useValue: mockConfigFactory,
        },
      ],
    }).compile();

    metaService = moduleRef.get<MetaService>(MetaService);
  });

  describe("getMsBridgeMeta", () => {
    it("should return metadata", async () => {
      const expectedData = {
        brokers: {
          useKafka: false,
          useMqtt: false,
          useRabbitMQ: false,
          useRedisPubSub: false,
        },
        services: {
          useSwagger: false,
        },
      };

      const result = await metaService.getMeta();
      expect(result).toStrictEqual(expectedData);
    });
  });
});
