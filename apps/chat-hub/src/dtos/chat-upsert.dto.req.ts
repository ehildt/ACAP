import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

import { AttachmentReq } from './attachment-req.dto';

class Topic {
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

class Thread {
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

export class ChatUpsertReq {
  @IsString()
  @ApiProperty({ example: 'cuid_zero', description: 'The cuid of the publisher' })
  publisherId: string;

  @IsString()
  @ApiProperty({ example: 'some very meaningful text' })
  message: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'clkt4f3x0000s4xw1v7f95hz9x000002',
    description: 'A reference to the quoted message (cuid)',
    required: false,
  })
  refQuote?: string;

  @IsObject()
  @Type(() => Topic)
  @ApiProperty({
    description: 'The topic',
    type: Topic,
  })
  topic: Topic;

  @IsOptional()
  @IsObject()
  @Type(() => Thread)
  @ApiProperty({
    description: 'The topic',
    type: Thread,
    required: false,
  })
  thread?: Thread;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    isArray: true,
    required: false,
    description: 'A list of emoji cuids',
    example: ['emot4f3x0000s4xp1v7f95hz9x00te02'],
  })
  refEmojis?: Array<string>;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    isArray: true,
    required: false,
    description: 'A list of flag cuids',
    example: ['flat4f3x0000s4xp1v7fi5hz9x00te0g'],
  })
  refFlags?: Array<string>;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: ['cuid_one', 'cuid_two'],
    description: 'A list of cuids which are to be notified. If the cuid replies, it will auto-subscribe to the thread',
  })
  @IsString({ each: true })
  refParticipants?: Array<string>;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AttachmentReq)
  @ApiProperty({ type: AttachmentReq, isArray: true, required: false })
  attachments?: Array<AttachmentReq>;
}
