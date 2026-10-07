export interface ChatTurn {
  role: 'user' | 'assistant';
  text: string;
}

export abstract class LlmProvider {
  abstract generateAnswer(question: string, systemContext: string, history?: ChatTurn[]): Promise<string>;
}
