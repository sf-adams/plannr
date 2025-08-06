import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class List extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  board: Types.ObjectId;
}

export const ListSchema = SchemaFactory.createForClass(List);
