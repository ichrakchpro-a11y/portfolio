import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller.js';
import { ChatService } from './chat.service.js';
import { ChatQuestion, ChatQuestionSchema } from './schemas/chat-question.schema.js';
import { LlmModule } from '../llm/llm.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatQuestion.name, schema: ChatQuestionSchema }]),
    LlmModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
