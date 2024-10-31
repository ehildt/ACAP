import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Thread {
  @IsString()
  @ApiProperty({
    example: 'Strawberry Flavor',
    description: 'The thread name',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'thrt4f3x0000s4ip1v7f95hz9x00tead',
    description:
      'The unique identifier of the thread. A thread allows for ongoing discussion related to the original message.',
  })
  id: string;
}
