import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class Attachment {
  @IsString()
  @ApiProperty({
    example: 'clkt4f3x0000s4xw1v7f95hz9x000002',
    description: 'The reference ID of the uploaded file',
  })
  refId: string;

  @IsString()
  @ApiProperty({
    example: 'document.pdf',
    description: 'The original filename of the uploaded attachment',
  })
  filename: string;

  @IsString()
  @ApiProperty({
    example: 'application/pdf',
    description: 'The MIME type of the uploaded attachment',
  })
  mimeType: string;

  @IsString()
  @ApiProperty({
    example: '1048576',
    description: 'The size of the file in bytes',
  })
  fileSize: string;

  @IsUrl()
  @ApiProperty({
    example: 'https://example.com/uploads/clkt4f3x0000s4xw1v7f95hz9x000002/document.pdf',
    description: 'The URL where the attachment can be accessed',
  })
  url: string;

  @IsOptional()
  @ApiProperty({
    example: { author: 'Richie Rich', description: 'Confidential financial report' },
    description: 'Optional metadata related to the attachment',
    required: false,
  })
  meta?: Record<string, any>;
}
