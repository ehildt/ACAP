import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Emoji {
  @IsString()
  @ApiProperty({
    example: '🌞',
    description: 'An emoji cuid',
  })
  cuid: string;

  @IsString()
  @ApiProperty({
    example: 'Gandalf',
    description: 'That subscriber who set the emoji',
  })
  subscriber: string;
}
