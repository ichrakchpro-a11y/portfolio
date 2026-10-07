"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { askAssistant, AssistantError, type ChatTurn } from "@/lib/api";
import { useLocale } from "@/lib/i18n";
import { ChatMarkdown } from "@/components/ChatMarkdown";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  visibleText: string;
  done: boolean;
}

const MAX_LENGTH = 500;
// Nombre de messages précédents envoyés à l'assistant pour garder le fil de la conversation.
const HISTORY_SIZE = 6;

export function ChatWidget() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const revealTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const listener = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    return () => {
      if (revealTimer.current) clearInterval(revealTimer.current);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function updateMessage(id: number, patch: Partial<Message>) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function revealProgressively(fullText: string, id: number) {
    if (revealTimer.current) clearInterval(revealTimer.current);

    if (reducedMotion) {
      updateMessage(id, { visibleText: fullText, done: true });
      return;
    }

    // Découpe en conservant les espaces et retours à la ligne, pour que le Markdown reste intact.
    const tokens = fullText.split(/(\s+)/);
    let count = 0;

    revealTimer.current = setInterval(() => {
      count += 2;
      const done = count >= tokens.length;
      updateMessage(id, { visibleText: tokens.slice(0, count).join(""), done });

      if (done && revealTimer.current) {
        clearInterval(revealTimer.current);
        revealTimer.current = null;
      }
    }, 45);
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const history: ChatTurn[] = messages
      .filter((m) => m.done)
      .slice(-HISTORY_SIZE)
      .map(({ role, text }) => ({ role, text }));

    setError(null);
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", text: trimmed, visibleText: trimmed, done: true },
    ]);
    setQuestion("");
    setThinking(true);

    try {
      const answer = await askAssistant(trimmed, history);
      const id = nextId.current++;
      setMessages((prev) => [...prev, { id, role: "assistant", text: answer, visibleText: "", done: false }]);
      revealProgressively(answer, id);
    } catch (err) {
      setError(err instanceof AssistantError && err.status === 429 ? t.chat.rateLimited : t.chat.error);
    } finally {
      setThinking(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void send(question);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.chat.close : t.chat.open}
        aria-expanded={open}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border/15 bg-bg text-ink shadow-lg"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5.5h16v10H9l-4 3.5v-3.5H4z"
                />
              </svg>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-5 z-40 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-lg border border-border/15 bg-bg shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/10 px-4 py-3">
              <span className="text-sm font-medium text-ink">{t.chat.title}</span>
              <span className="font-mono text-xs text-muted">{t.chat.subtitle}</span>
            </div>

            <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3">
              {messages.length === 0 && !thinking && (
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-muted">{t.chat.intro}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.chat.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => void send(suggestion)}
                        className="rounded-full border border-border/15 px-3 py-1.5 text-left text-xs text-ink transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-md px-3.5 py-2.5 text-sm ${
                    message.role === "user"
                      ? "ml-auto bg-accent text-bg"
                      : "border border-border/10 text-ink"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className={!message.done ? "typing-caret" : ""}>
                      <ChatMarkdown text={message.visibleText} />
                    </div>
                  ) : (
                    message.visibleText
                  )}
                </div>
              ))}

              {thinking && (
                <div className="flex items-center gap-1.5 px-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}

              {error && <p className="text-xs text-accent">{error}</p>}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border/10 p-3">
              <input
                ref={inputRef}
                value={question}
                onChange={(event) => setQuestion(event.target.value.slice(0, MAX_LENGTH))}
                placeholder={t.chat.placeholder}
                maxLength={MAX_LENGTH}
                className="flex-1 rounded-md border border-border/15 bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
              />
              <button
                type="submit"
                disabled={thinking || !question.trim()}
                className="rounded-md bg-accent px-3.5 py-2 text-sm font-semibold text-bg transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.chat.send}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
