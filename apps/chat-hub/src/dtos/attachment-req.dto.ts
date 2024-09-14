import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumberString, IsObject, IsOptional, IsString, IsUrl } from 'class-validator';

export class AttachmentReq {
  @IsString()
  @ApiProperty({
    example: 'clkt4f3x0000s4xw1v7f95hz9x000002',
    description: 'The cuid to the uploaded file',
  })
  cuid: string;

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

  @IsNumberString()
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

  @IsDateString()
  @ApiProperty({
    example: '2023-08-17T12:34:56Z',
    description: 'The date and time when the attachment was uploaded in ISO 8601 format',
  })
  uploadedAt: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    example: { author: 'John Doe', description: 'Sample document' },
    description: 'Optional metadata related to the attachment',
  })
  meta?: any;
}
