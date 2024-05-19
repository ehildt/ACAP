import { Test } from "@nestjs/testing";

import { BreakoutUpsertReq } from "@/dtos/breakout-upsert.dto.req";
import { OutbreakService } from "@/services/outbreak.service";

import { OutbreakController } from "./outbreak.controller";

describe("OutbreakController", () => {
  let controller: OutbreakController;
  let service: OutbreakService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OutbreakController],
      providers: [
        { provide: OutbreakService, useValue: { delegate: jest.fn() } },
      ],
    }).compile();

    controller = moduleRef.get<OutbreakController>(OutbreakController);
    service = moduleRef.get<OutbreakService>(OutbreakService);
  });

  describe("delegate", () => {
    it("should call outbreakService.delegate with the correct arguments", async () => {
      const reqs: Array<BreakoutUpsertReq> = [
        { realm: "TEST", contents: [{ value: "do-test" }] },
      ];
      const useBullMQ = false;
      const result = await controller.delegate(reqs, useBullMQ);
      expect(service.delegate).not.toHaveBeenCalledWith(reqs, {
        useBullMQ,
      });
      expect(result).toEqual(undefined);
    });

    it("should call outbreakService.delegate multiple times", async () => {
      const reqs: Array<BreakoutUpsertReq> = [
        { realm: "TEST", contents: [{ value: "do-test" }] },
      ];
      const useBullMQ = true;
      const result = await controller.delegate(reqs, useBullMQ);
      expect(service.delegate).toHaveBeenCalledWith(reqs, {
        useBullMQ,
      });
      expect(result).toEqual(undefined);
    });
  });
});
