import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

import { Attachment } from './attachment.dto';
import { Emoji } from './emoji.dto';
import { Flag } from './flag.dto';
import { Thread } from './thread.dto';
import { Topic } from './topic.dto';

@ApiExtraModels(Topic, Thread)
export class Message {
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
  })
  isPersisted: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: `Weather the message is a private message.
    If 'true', the participants will receive a private message.
    If 'false', the participants will receive a silent notification.`,
    default: false,
  })
  isPM: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'clkt4f3x0000s4xw1v7f95hz9x000002',
    description: 'A reference to the quoted message (cuid)',
    required: false,
  })
  refQuoteId?: string;

  @IsOptional()
  // @Transform(({ value }) => typeof value === 'string' || typeof value === 'object')
  @Type(() => Topic)
  @ApiProperty({
    oneOf: [{ $ref: getSchemaPath(Topic) }, { type: 'string' }],
    description: 'Topic can either be a string or a Topic object',
    required: false,
  })
  @ValidateNested({ each: true })
  topic?: Topic | string;

  @IsOptional()
  // @Transform(({ value }) => typeof value === 'string' || typeof value === 'object')
  @Type(() => Thread)
  @ApiProperty({
    oneOf: [{ $ref: getSchemaPath(Thread) }, { type: 'string' }],
    description: 'Thread can either be a string or a Thread object',
    required: false,
  })
  @ValidateNested({ each: true })
  thread?: Thread | string;

  @IsOptional()
  @Type(() => Emoji)
  @ValidateNested({ each: true })
  @ApiProperty({
    isArray: true,
    required: false,
    description: 'A list of emoji objects',
    type: Emoji,
  })
  emojis?: Array<Emoji>;

  @IsOptional()
  @Type(() => Flag)
  @ValidateNested({ each: true })
  @ApiProperty({
    isArray: true,
    required: false,
    description: 'A list of flag objects',
    type: Flag,
  })
  flags?: Array<Flag>;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ required: false })
  participants?: Array<string>;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Attachment)
  @ApiProperty({ type: Attachment, isArray: true, required: false })
  attachments?: Array<Attachment>;
}
