import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EmojiSchemaDocument extends Document {
  @Prop({ type: String, required: true })
  refId: string;

  @Prop({ type: Number, default: 0 })
  count: number;
}

export const EmojiSchema = SchemaFactory.createForClass(EmojiSchemaDocument);
