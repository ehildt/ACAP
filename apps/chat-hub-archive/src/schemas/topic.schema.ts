import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TopicSchemaDocument extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Boolean, default: false })
  isLocked: boolean;

  @Prop({ type: String, required: false })
  description: string;
}

export const TopicSchema = SchemaFactory.createForClass(TopicSchemaDocument);
