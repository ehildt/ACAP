import { ClientKafka, ClientProxy, ClientRMQ } from "@nestjs/microservices";
import { Test } from "@nestjs/testing";
import { Queue, Worker } from "bullmq";

import { AppBrokers } from "@/configs/config-yml/config.model";
import {
  ACAP_BRCS,
  ACAP_MSBR,
  KAFKA_CLIENT,
  RABBITMQ_CLIENT,
  REDIS_PUBSUB,
} from "@/constants/app.constants";
import { BreakoutUpsertReq } from "@/dtos/breakout-upsert.dto.req";
import { MQTT_CLIENT, MqttClient } from "@/modules/mqtt-client.module";

import { ConfigFactoryService } from "./config-factory.service";
import { OutbreakService } from "./outbreak.service";

jest.mock("bullmq", () => ({
  Worker: jest.fn(() => ({
    run: jest.fn(),
  })),
}));

describe("OutbreakService", () => {
  let outbreakService: OutbreakService;
  let mockRedisPubSub: jest.Mocked<ClientProxy>;
  let mockKafka: jest.Mocked<ClientKafka>;
  let mockRabbitMQ: jest.Mocked<ClientRMQ>;
  let mockMQTTClient: jest.Mocked<MqttClient>;
  let mockBullMQQueue: jest.Mocked<Queue>;
  let mockConfigFactory: Partial<ConfigFactoryService>;

  beforeEach(async () => {
    mockConfigFactory = {
      app: {
        brokers: {},
      } as any,
      bullMQ: {
        connection: {},
      } as any,
    };
    const moduleRef = await Test.createTestingModule({
      providers: [
        OutbreakService,
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
        {
          provide: KAFKA_CLIENT,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: RABBITMQ_CLIENT,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: MQTT_CLIENT,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: ACAP_BRCS,
          useValue: {
            add: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    outbreakService = moduleRef.get<OutbreakService>(OutbreakService);
    mockRedisPubSub = moduleRef.get(REDIS_PUBSUB);
    mockMQTTClient = moduleRef.get(MQTT_CLIENT);
    mockBullMQQueue = moduleRef.get(ACAP_BRCS);
    mockKafka = moduleRef.get(KAFKA_CLIENT);
    mockRabbitMQ = moduleRef.get(RABBITMQ_CLIENT);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("delegate", () => {
    it("should initialize Worker on module init", () => {
      outbreakService.onModuleInit();
      expect(Worker).toHaveBeenCalledWith(ACAP_MSBR, expect.any(Function), {
        connection: mockConfigFactory.bullMQ.connection,
      });
    });

    it("should distribute data to realms using enabled messaging options", async () => {
      const reqs: BreakoutUpsertReq[] = [
        {
          realm: "realm1",
          contents: [{ value: "value1" }],
        },
        {
          realm: "realm2",
          contents: [{ value: "value2" }],
        },
      ];

      const args: AppBrokers = {
        useRabbitMQ: true,
        useKafka: true,
        useRedisPubSub: true,
        useMQTT: true,
        useBullMQ: false,
      };

      await outbreakService.delegate(reqs, args);
      expect(mockRedisPubSub.emit).toHaveBeenCalledTimes(2);
      expect(mockKafka.emit).toHaveBeenCalledTimes(2);
      expect(mockMQTTClient.publish).toHaveBeenCalledTimes(2);
      expect(mockRabbitMQ.emit).toHaveBeenCalledTimes(2);
      // TODO: is this one mockable at all?
      expect(mockBullMQQueue.add).not.toHaveBeenCalled();
    });

    it("should not distribute data if no messaging options are enabled", async () => {
      const reqs: BreakoutUpsertReq[] = [
        {
          realm: "realm1",
          contents: [
            {
              value: "value1",
            },
          ],
        },
      ];

      const args: AppBrokers = {
        useRabbitMQ: false,
        useKafka: false,
        useRedisPubSub: false,
        useMQTT: false,
        useBullMQ: false,
      };

      await outbreakService.delegate(reqs, args);
      expect(mockRedisPubSub.emit).not.toHaveBeenCalled();
      expect(mockKafka.emit).not.toHaveBeenCalled();
      expect(mockMQTTClient.publish).not.toHaveBeenCalled();
      expect(mockBullMQQueue.add).not.toHaveBeenCalled();
    });
  });
});
