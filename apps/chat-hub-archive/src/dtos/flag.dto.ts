import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Flag {
  @IsString()
  @ApiProperty({
    example: 'flat4f3x0000s4xp1v7fi5hz9x00te0g',
    description: 'The reference ID of the flag (typically a unique identifier)',
  })
  refId: string;

  @IsNumber()
  @ApiProperty({
    example: 10,
    description: 'The count of likes this flag has received',
    default: 0,
  })
  likes: number;

  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'The count of dislikes this flag has received',
    default: 0,
  })
  dislikes: number;
}
