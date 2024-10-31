import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import {
  ATTACHMENTS_COLLECTION,
  EMOJIS_COLLECTION,
  FLAGS_COLLECTION,
  PARTICIPANTS_COLLECTION,
  THREADS_COLLECTION,
  TOPICS_COLLECTION,
} from '@/constants/app.constants';

@Schema({ timestamps: true })
export class MessageSchemaDocument extends Document {
  @Prop({ type: String, required: true })
  publisherId: string;

  @Prop({ type: String, required: true, maxlength: 5000 })
  message: string;

  @Prop({ type: Boolean, default: false })
  isPersisted: boolean;

  @Prop({ type: Boolean, default: false })
  isPM: boolean;

  @Prop({ type: String, required: false })
  refQuoteId?: string;

  @Prop({ type: Array<Types.ObjectId>, ref: EMOJIS_COLLECTION, required: false })
  refEmojis?: Array<Types.ObjectId>;

  @Prop({ type: Array<Types.ObjectId>, ref: FLAGS_COLLECTION, required: false })
  refFlags?: Array<Types.ObjectId>;

  @Prop({ type: Types.ObjectId, ref: TOPICS_COLLECTION, required: false })
  topic?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: THREADS_COLLECTION, required: false })
  thread?: Types.ObjectId;

  @Prop({ type: Array<Types.ObjectId>, ref: PARTICIPANTS_COLLECTION, required: false })
  refParticipants?: Array<Types.ObjectId>;

  @Prop({ type: Array<Types.ObjectId>, ref: ATTACHMENTS_COLLECTION, required: false })
  attachments?: Array<Types.ObjectId>;
}

export const MessageSchema = SchemaFactory.createForClass(MessageSchemaDocument);

MessageSchema.index({ publisherId: 1 });
MessageSchema.index({ topic: 1, thread: 1 });
MessageSchema.index({ refEmojis: 1 });
MessageSchema.index({ refFlags: 1 });
