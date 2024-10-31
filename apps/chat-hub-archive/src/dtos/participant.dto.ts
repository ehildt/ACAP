import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Participant {
  @IsString()
  @ApiProperty({
    example: 'participant123',
    description: 'The reference ID of the participant',
  })
  refId: string;
}
