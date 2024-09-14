import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FlagReq {
  @IsString()
  @ApiProperty({
    example: 'fgyt4f3x0000s4xw1v7f95hz9x0wei02',
    description: 'A cuid of the flag. Indicates the type or nature of the message',
  })
  refFlag: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'The message promotes harmful stereotypes and biased views about social issues',
    description: 'The subscribers explanation why this message was flagged',
  })
  explanation?: string;
}
