import { Global, Module } from '@nestjs/common';
import Ajv from 'ajv';
import ajvAddFormats from 'ajv-formats';

import { AVJ_TOKEN } from '@/constants/app.constants';
import { AvjService } from '@/services/avj.service';

@Global()
@Module({
  providers: [
    AvjService,
    {
      provide: AVJ_TOKEN,
      useValue: ajvAddFormats(new Ajv({ allErrors: true })),
    },
  ],
  exports: [AvjService],
})
export class GlobalAvJModule {}
