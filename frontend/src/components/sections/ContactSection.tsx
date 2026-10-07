"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { useLocale } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function ContactSection() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — the mailto link still works
    }
  }

  return (
    <section id="contact" className="border-t border-border/10 py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="flex flex-col items-start gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <div className="flex items-center gap-3">
            <span className="text-accent">05</span>
            <span className="h-px w-8 bg-border/20" aria-hidden />
            <span>{t.contact.label}</span>
          </div>
        </div>

        <Reveal delay={0.05} className="mt-6 flex flex-col gap-10">
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{t.contact.title}</h2>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="border-b border-border/20 pb-2 text-xl font-medium text-ink transition-colors hover:border-accent hover:text-accent md:text-2xl"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-live="polite"
                className="rounded-md border border-border/15 px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              LinkedIn
              <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
