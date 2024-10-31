import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class Participant {
  @IsString()
  @ApiProperty({
    example: 'part4f3x0000s4xw1v7f95hz9x00000n',
    description: 'A participant cuid',
  })
  id: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    required: false,
    description: 'Whereas the message is a private message or a silent notification',
  })
  isPM?: string;
}
