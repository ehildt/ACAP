import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ParticipantSchemaDocument extends Document {
  @Prop({ type: String, required: true })
  refId: string;

  @Prop({ type: String, required: true })
  refTopic: string;

  @Prop({ type: String, required: true })
  refThread: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(ParticipantSchemaDocument);

ParticipantSchema.index({ refId: 1, refTopic: 1, refThread: 1, refMessage: 1 }, { unique: true });
