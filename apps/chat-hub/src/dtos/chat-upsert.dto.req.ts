import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

import { AttachmentReq } from './attachment-req.dto';
import { Participant } from './participant.dto';
import { Thread } from './thread.dto';
import { Topic } from './topic.dto';

export class ChatUpsertReq {
  @IsString()
  @ApiProperty({ example: 'cuid_zero', description: 'The cuid of the publisher' })
  publisherId: string;

  @IsString()
  @MaxLength(1000)
  @ApiProperty({
    example: 'something meaningful, deep or just insane',
    description: 'The actual message',
    maxLength: 1000,
  })
  message: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Weather the message should be persisted',
    default: false,
    required: false,
  })
  persist?: boolean;

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
    isArray: true,
    type: Participant,
  })
  @Type(() => Participant)
  @ValidateNested({ each: true })
  refParticipants?: Array<Participant>;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AttachmentReq)
  @ApiProperty({ type: AttachmentReq, isArray: true, required: false })
  attachments?: Array<AttachmentReq>;
}
