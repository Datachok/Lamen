"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Locale, Translations } from "./types";
import { fr } from "./locales/fr";
import { en } from "./locales/en";
import { ar } from "./locales/ar";

const translations: Record<Locale, Translations> = { fr, en, ar };

const VALID_LOCALES: Locale[] = ["fr", "en", "ar"];

interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  // Sync React state with the data-locale already set by the inline script
  useEffect(() => {
    const stored = localStorage.getItem("lamen-locale") as Locale | null;
    const initial =
      stored && VALID_LOCALES.includes(stored) ? stored : "fr";
    setLocaleState(initial);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    const dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("data-locale", newLocale);
    document.documentElement.setAttribute("lang", newLocale);
    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem("lamen-locale", newLocale);
  }, []);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <LocaleContext.Provider
      value={{ locale, t: translations[locale], setLocale, dir }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
