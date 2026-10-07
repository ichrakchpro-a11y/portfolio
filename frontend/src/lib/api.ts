const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

export class AssistantError extends Error {
  constructor(readonly status: number) {
    super(`Assistant request failed with status ${status}`);
  }
}

export async function askAssistant(question: string, history: ChatTurn[] = []): Promise<string> {
  const response = await fetch(`${API_URL}/chat/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history }),
  });

  if (!response.ok) {
    throw new AssistantError(response.status);
  }

  const data = (await response.json()) as { answer: string };
  return data.answer;
}
