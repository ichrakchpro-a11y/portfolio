import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatTurn, LlmProvider } from './llm-provider.js';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

@Injectable()
export class GeminiProvider extends LlmProvider {
  private readonly logger = new Logger(GeminiProvider.name);

  constructor(private readonly configService: ConfigService) {
    super();
  }

  async generateAnswer(question: string, systemContext: string, history: ChatTurn[] = []): Promise<string> {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    const model = this.configService.get<string>('GEMINI_MODEL') ?? 'gemini-1.5-flash';

    if (!apiKey) {
      throw new InternalServerErrorException("La clé d'API Gemini n'est pas configurée.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemContext }],
        },
        contents: [
          ...history.map((turn) => ({
            role: turn.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: turn.text }],
          })),
          {
            role: 'user',
            parts: [{ text: question }],
          },
        ],
      }),
    });

    if (!response.ok) {
      // Le détail de l'erreur reste dans les logs serveur, jamais dans la réponse au client.
      this.logger.error(`Gemini a répondu ${response.status}: ${await response.text()}`);
      throw new InternalServerErrorException('Le service de réponse a échoué.');
    }

    const data = (await response.json()) as GeminiResponse;
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      throw new InternalServerErrorException("Aucune réponse n'a pu être générée.");
    }

    return answer.trim();
  }
}
