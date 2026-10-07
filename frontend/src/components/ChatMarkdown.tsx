import { Fragment, type ReactNode } from "react";

// Rendu volontairement minimal du Markdown renvoyé par l'assistant :
// paragraphes, listes à puces, **gras**, *italique* et liens bruts. Pas de HTML injecté.

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{linkify(part)}</Fragment>;
  });
}

function linkify(text: string): ReactNode[] {
  return text.split(/(https?:\/\/[^\s)]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer" className="break-all underline underline-offset-2 hover:text-accent">
        {part.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const BULLET = /^\s*[-*•]\s+/;

export function ChatMarkdown({ text }: { text: string }) {
  const blocks: Array<{ type: "p" | "ul"; lines: string[] }> = [];

  for (const line of text.split("\n")) {
    if (!line.trim()) {
      blocks.push({ type: "p", lines: [] });
      continue;
    }
    const type = BULLET.test(line) ? "ul" : "p";
    const content = line.replace(BULLET, "").trim();
    const last = blocks[blocks.length - 1];
    if (last && last.type === type && (type === "ul" || last.lines.length > 0)) {
      last.lines.push(content);
    } else {
      blocks.push({ type, lines: [content] });
    }
  }

  return (
    <>
      {blocks
        .filter((block) => block.lines.length > 0)
        .map((block, i) =>
          block.type === "ul" ? (
            <ul key={i} className="my-1.5 flex flex-col gap-1 first:mt-0 last:mb-0">
              {block.lines.map((line, j) => (
                <li key={j} className="flex gap-2">
                  <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{renderInline(line)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p key={i} className="my-1.5 first:mt-0 last:mb-0">
              {block.lines.map((line, j) => (
                <Fragment key={j}>
                  {j > 0 && <br />}
                  {renderInline(line)}
                </Fragment>
              ))}
            </p>
          ),
        )}
    </>
  );
}
