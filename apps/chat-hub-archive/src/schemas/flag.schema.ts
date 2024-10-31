import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class FlagSchemaDocument extends Document {
  @Prop({ type: String, required: true })
  refId: string;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: Number, default: 0 })
  dislikes: number;
}

export const FlagSchema = SchemaFactory.createForClass(FlagSchemaDocument);
