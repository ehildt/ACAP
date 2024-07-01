import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsString } from 'class-validator';

export class ChatUpsertReq {
  @IsString()
  @ApiProperty()
  realm: string;

  @ArrayNotEmpty()
  @ApiProperty({
    isArray: true,
    oneOf: [
      { type: 'string' },
      { type: 'number' },
      { type: 'boolean' },
      { type: 'array', items: { type: 'any' } },
      { type: 'object', items: { type: 'any', additionalProperties: true } },
    ],
  })
  messages: Array<string | number | boolean | Array<any> | object>;
}
