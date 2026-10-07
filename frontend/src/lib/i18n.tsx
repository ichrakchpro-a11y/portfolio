"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/data/profile";
import { ui, type UiStrings } from "@/data/ui";

const STORAGE_KEY = "locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: UiStrings;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "fr" || stored === "en" ? stored : null;
  } catch {
    return null;
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Le rendu serveur se fait en anglais ; la langue du visiteur est appliquée au montage.
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const preferred = readStoredLocale() ?? (navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en");
    setLocaleState(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // stockage indisponible (navigation privée) : le choix vaut pour la session en cours
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: ui[locale] as UiStrings }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside <LocaleProvider>");
  return value;
}
