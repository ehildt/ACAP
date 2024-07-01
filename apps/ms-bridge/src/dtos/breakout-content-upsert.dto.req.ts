import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsObject, IsOptional } from 'class-validator';

import { BullMQJobsOptions } from './breakout-jobs-options.dto';

export class BreakoutContentUpsertReq {
  @IsDefined()
  @ApiProperty({
    oneOf: [
      { type: 'string' },
      { type: 'number' },
      { type: 'boolean' },
      { type: 'array', items: { type: 'any' } },
      { type: 'object', items: { type: 'any', additionalProperties: true } },
    ],
  })
  value: any;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    required: false,
    description: 'bullMQ ONLY',
    type: () => BullMQJobsOptions,
  })
  jobOptions?: BullMQJobsOptions;
}
