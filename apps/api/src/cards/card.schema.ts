import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Card extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'List', required: true })
  list: Types.ObjectId;

  @Prop({ required: true })
  order: number; // position within the list
}

export const CardSchema = SchemaFactory.createForClass(Card);
