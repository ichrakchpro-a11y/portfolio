import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service.js';
import { AskQuestionDto } from './dto/ask-question.dto.js';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('ask')
  async ask(@Body() dto: AskQuestionDto): Promise<{ answer: string }> {
    return this.chatService.ask(dto.question, dto.history ?? []);
  }
}
