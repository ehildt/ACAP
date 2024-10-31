import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Topic {
  @IsString()
  @ApiProperty({
    example: 'Cookies',
    description: 'The topic name',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'topt4f3x0000s4ip1v7f95hz9x00teic',
    description: 'The unique topic cuid',
  })
  id: string;
}
