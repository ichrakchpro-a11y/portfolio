import { Module } from '@nestjs/common';
import { LlmProvider } from './llm-provider.js';
import { GeminiProvider } from './gemini.provider.js';

@Module({
  providers: [
    {
      provide: LlmProvider,
      useClass: GeminiProvider,
    },
  ],
  exports: [LlmProvider],
})
export class LlmModule {}
