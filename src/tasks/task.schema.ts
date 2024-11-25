import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, enum: ['pending', 'in-progress', 'completed'], type: String })
  status: string;

  @Prop({ default: Date.now, type: Date })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
