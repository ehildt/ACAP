import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class Topic {
  @IsString()
  @ApiProperty({
    example: 'Cookies',
    description: 'The topic name',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'the most amazing strawberry receipt',
    description: 'The topic description',
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
