import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from '@/dtos/message.dto';
import { AttachmentSchemaDocument } from '@/schemas/attachment.schema';
import { EmojiSchemaDocument } from '@/schemas/emoji.schema';
import { FlagSchemaDocument } from '@/schemas/flag.schema';
import { MessageSchemaDocument } from '@/schemas/message.schema';
import { ParticipantSchemaDocument } from '@/schemas/participant.schema';
import { ThreadSchemaDocument } from '@/schemas/thread.schema';
import { TopicSchemaDocument } from '@/schemas/topic.schema';

type Filter = { limit: number; skip: number };

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(MessageSchemaDocument.name)
    private readonly messageModel: Model<MessageSchemaDocument>,
    @InjectModel(TopicSchemaDocument.name)
    private readonly topicModel: Model<TopicSchemaDocument>,
    @InjectModel(ThreadSchemaDocument.name)
    private readonly threadModel: Model<ThreadSchemaDocument>,
    @InjectModel(ParticipantSchemaDocument.name)
    private readonly participantModel: Model<ParticipantSchemaDocument>,
    @InjectModel(EmojiSchemaDocument.name)
    private readonly emojiModel: Model<EmojiSchemaDocument>,
    @InjectModel(FlagSchemaDocument.name)
    private readonly flagModel: Model<FlagSchemaDocument>,
    @InjectModel(AttachmentSchemaDocument.name)
    private readonly attachmentModel: Model<AttachmentSchemaDocument>,
  ) {}

  async insert(data: Message | Array<Message>) {
    const messages = Array.isArray(data) ? data : [data];
    const session = await this.messageModel.startSession();

    try {
      await session.withTransaction(async () => {
        const topics = [];
        const threads = [];

        for (const message of messages) {
          topics.push(message.topic);
          threads.push(message.thread);
        }

        const topicRes = await this.topicModel.insertMany(topics, { session });
        const threadRes = await this.threadModel.insertMany(threads, { session });

        console.log({ topicRes, threadRes });
      });
    } catch (error) {
      console.error('Insert failed', error);
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async findAll(filter: Filter = { limit: 10, skip: 0 }) {
    return await this.messageModel
      .find(filter)
      .populate(['emojis', 'flags', 'topic', 'thread', 'attachments', 'participants'])
      .sort({ updatedAt: 'desc', createdAt: 'desc' })
      .lean();
  }

  async count() {
    return await this.messageModel.estimatedDocumentCount({ lean: true });
  }
}
