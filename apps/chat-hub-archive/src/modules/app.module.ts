import { BullModule } from '@nestjs/bullmq';
import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ATTACHMENTS_COLLECTION,
  BULLMQ_PERSISTANCE_QUEUE,
  EMOJIS_COLLECTION,
  FLAGS_COLLECTION,
  MESSAGES_COLLECTION,
  PARTICIPANTS_COLLECTION,
  THREADS_COLLECTION,
  TOPICS_COLLECTION,
} from '@/constants/app.constants';
import { ChatHubArchiveController } from '@/controllers/chat-hub-archive.controller';
import { MessageProcessor } from '@/processors/sample.processor';
import { MessageRepository } from '@/repositories/message.repository';
import { AttachmentSchema, AttachmentSchemaDocument } from '@/schemas/attachment.schema';
import { EmojiSchema, EmojiSchemaDocument } from '@/schemas/emoji.schema';
import { FlagSchema, FlagSchemaDocument } from '@/schemas/flag.schema';
import { MessageSchema, MessageSchemaDocument } from '@/schemas/message.schema';
import { ParticipantSchema, ParticipantSchemaDocument } from '@/schemas/participant.schema';
import { ThreadSchema, ThreadSchemaDocument } from '@/schemas/thread.schema';
import { TopicSchema, TopicSchemaDocument } from '@/schemas/topic.schema';
import { AppService } from '@/services/app.service';
import { ChatHubArchiveService } from '@/services/chat-hub-archive.service';
import { ConfigFactoryService } from '@/services/config-factory.service';

import { GlobalConfigFactoryModule } from './global-config-factory.module';

@Module({
  imports: [
    GlobalConfigFactoryModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigFactoryService],
      useFactory: ({ mongo }: ConfigFactoryService) => mongo,
    }),
    MongooseModule.forFeature([
      {
        name: MessageSchemaDocument.name,
        schema: MessageSchema,
        collection: MESSAGES_COLLECTION,
      },
      {
        name: TopicSchemaDocument.name,
        schema: TopicSchema,
        collection: TOPICS_COLLECTION,
      },
      {
        name: ThreadSchemaDocument.name,
        schema: ThreadSchema,
        collection: THREADS_COLLECTION,
      },
      {
        name: ParticipantSchemaDocument.name,
        schema: ParticipantSchema,
        collection: PARTICIPANTS_COLLECTION,
      },
      {
        name: AttachmentSchemaDocument.name,
        schema: AttachmentSchema,
        collection: ATTACHMENTS_COLLECTION,
      },
      {
        name: FlagSchemaDocument.name,
        schema: FlagSchema,
        collection: FLAGS_COLLECTION,
      },
      {
        name: EmojiSchemaDocument.name,
        schema: EmojiSchema,
        collection: EMOJIS_COLLECTION,
      },
    ]),
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigFactoryService],
      name: BULLMQ_PERSISTANCE_QUEUE,
      useFactory: async ({ bullMQ }: ConfigFactoryService) => ({
        ...bullMQ,
        // ! add defaultJobOptions to config
        defaultJobOptions: {
          backoff: {
            type: 'exponential',
            delay: 500,
          },
          attempts: 7,
          removeOnComplete: true,
          removeOnFail: {
            age: 604_800_000,
          },
        },
      }),
    }),
  ],
  providers: [AppService, ConsoleLogger, ChatHubArchiveService, MessageProcessor, MessageRepository],
  controllers: [ChatHubArchiveController],
})
export class AppModule {}
