import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AttachmentSchemaDocument extends Document {
  @Prop({ type: String, required: true })
  refId: string;

  @Prop({ type: String, required: true })
  filename: string;

  @Prop({ type: String, required: true })
  mimeType: string;

  @Prop({ type: String, required: true })
  fileSize: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: Object, required: false })
  meta?: Record<string, any>;
}

export const AttachmentSchema = SchemaFactory.createForClass(AttachmentSchemaDocument);
