import { Test } from "@nestjs/testing";

import { MetaService } from "@/services/meta.service";

import { MetaController } from "./meta.controller";

describe("MetaController", () => {
  let controller: MetaController;
  let service: MetaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MetaController],
      providers: [
        {
          provide: MetaService,
          useValue: {
            getMeta: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<MetaController>(MetaController);
    service = moduleRef.get<MetaService>(MetaService);
  });

  describe("getMeta", () => {
    it("should call metaService.getMeta", async () => {
      await controller.getMeta();
      expect(service.getMeta).toHaveBeenCalledOnce();
    });
  });
});
