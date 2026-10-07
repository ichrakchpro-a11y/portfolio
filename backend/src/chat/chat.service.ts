import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatTurn, LlmProvider } from '../llm/llm-provider.js';
import { buildSystemPrompt } from '../profile/profile-context.js';
import { ChatQuestion, ChatQuestionDocument } from './schemas/chat-question.schema.js';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatQuestion.name)
    private readonly chatQuestionModel: Model<ChatQuestionDocument>,
    private readonly llmProvider: LlmProvider,
  ) {}

  async ask(question: string, history: ChatTurn[] = []): Promise<{ answer: string }> {
    await this.chatQuestionModel.create({ question, askedAt: new Date() });

    const answer = await this.llmProvider.generateAnswer(question, buildSystemPrompt(), history);

    return { answer };
  }
}
