import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatQuestionDocument = HydratedDocument<ChatQuestion>;

@Schema()
export class ChatQuestion {
  @Prop({ required: true })
  question!: string;

  @Prop({ default: Date.now })
  askedAt!: Date;
}

export const ChatQuestionSchema = SchemaFactory.createForClass(ChatQuestion);
