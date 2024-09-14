import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MessageReq {
  @IsString()
  @ApiProperty({ example: 'some very meaningful text' })
  text: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'clkt4f3x0000s4xw1v7f95hz9x000002',
    description: 'A reference to the quoted message (cuid)',
    required: false,
  })
  refQuote?: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    isArray: true,
    required: false,
    description: 'A list of emoji cuids',
    example: ['emot4f3x0000s4xp1v7f95hz9x00te02'],
  })
  refEmojis?: Array<string>;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    isArray: true,
    required: false,
    description: 'A list of flag cuids',
    example: ['flat4f3x0000s4xp1v7fi5hz9x00te0g'],
  })
  refFlags?: Array<string>;
}
