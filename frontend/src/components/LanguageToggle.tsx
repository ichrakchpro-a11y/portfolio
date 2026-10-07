"use client";

import { useLocale } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();
  const next = locale === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={t.switchLanguage}
      title={t.switchLanguage}
      className="flex h-9 shrink-0 items-center justify-center rounded-md px-2 font-mono text-xs font-medium uppercase tracking-wide text-ink transition-colors hover:bg-ink/5"
    >
      <span className={locale === "fr" ? "text-ink" : "text-muted"}>FR</span>
      <span className="mx-1 text-muted/50" aria-hidden>/</span>
      <span className={locale === "en" ? "text-ink" : "text-muted"}>EN</span>
    </button>
  );
}
