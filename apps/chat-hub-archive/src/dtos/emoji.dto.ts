import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Emoji {
  @IsString()
  @ApiProperty({
    example: 'emot4f3x0000s4xp1v7f95hz9x00te02',
    description: 'The reference ID of the emoji (typically a unique identifier)',
  })
  refId: string;

  @IsNumber()
  @ApiProperty({
    example: 10,
    description: 'The count of how many times this emoji has been used',
    default: 0,
  })
  count: number;
}
