import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { MetaService } from '@/services/meta.service';

export const GetMeta = () => Get('ms-bridge');

class MetaItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  hasSchema: boolean;

  @ApiProperty({
    required: false,
    oneOf: [
      { type: 'string' },
      { type: 'number' },
      { type: 'boolean' },
      { type: 'array', items: { type: 'object', additionalProperties: true } },
      { type: 'object', additionalProperties: true },
    ],
  })
  value?: any;
}

class MetaObject {
  @ApiProperty({ type: MetaItem, isArray: true, required: false })
  EXAMPLE_REALM?: Array<MetaItem>;
}

export class OpenApiMetaProperty {
  @ApiProperty({
    description: 'as in the amount of total realms/schemas in the database',
  })
  count: number;

  @ApiProperty({
    type: MetaObject,
    description: 'a simple POJO',
  })
  data: Record<string, unknown>;
}

export function OpenApi_GetMeta() {
  return applyDecorators(
    ApiOkResponse({ type: OpenApiMetaProperty }),
    ApiOperation({
      description: 'Returns the meta data',
    }),
  );
}

@ApiTags('Metae')
@Controller('metae')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @GetMeta()
  @OpenApi_GetMeta()
  async getMeta() {
    return this.metaService.getMeta();
  }
}
