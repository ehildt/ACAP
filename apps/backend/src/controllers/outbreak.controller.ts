import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostOutbreak } from '@/decorators/controller.method.decorators';
import { BreakoutUpsertBody, QueryUseBullMQ } from '@/decorators/controller.parameter.decorators';
import { OpenApi_Outbreak } from '@/decorators/open-api.controller.decorators';
import { BreakoutUpsertReq } from '@/dtos/breakout-upsert.dto.req';
import { OutbreakService } from '@/services/outbreak.service';

@ApiTags('Outbreaks')
@Controller('outbreaks')
export class OutbreakController {
  constructor(private readonly outbreakService: OutbreakService) {}

  @PostOutbreak()
  @OpenApi_Outbreak()
  async delegate(@BreakoutUpsertBody() reqs: Array<BreakoutUpsertReq>, @QueryUseBullMQ() useBullMQ = false) {
    if (!useBullMQ) return;
    return await this.outbreakService.delegate(reqs, {
      useBullMQ,
    });
  }
}
