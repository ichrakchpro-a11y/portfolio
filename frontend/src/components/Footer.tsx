"use client";

import { profile } from "@/data/profile";
import { useLocale } from "@/lib/i18n";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border/10">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-5 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{t.footer}</p>
      </div>
    </footer>
  );
}
