import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class Thread {
  @IsString()
  @ApiProperty({
    example: 'Strawberry Flavor',
    description: 'The thread name',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'the most amazing strawberry receipt',
    description: 'The thread description',
  })
  description?: string;

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Weather the topic is locked',
    default: false,
  })
  isLocked: boolean;
}
