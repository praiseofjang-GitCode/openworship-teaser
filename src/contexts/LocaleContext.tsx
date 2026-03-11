"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Locale } from "@/lib/translations";

const STORAGE_KEY = "openworship-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (section: string, key: string) => string;
  getSection: <S extends keyof (typeof translations)["en"]>(
    section: S
  ) => (typeof translations)["en"][S];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getNested(obj: Record<string, unknown>, path: string): string {
  const value = path.split(".").reduce((acc: unknown, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj as unknown);
  return typeof value === "string" ? value : path;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "en" || stored === "ko") setLocaleState(stored);
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      if (typeof document !== "undefined") {
        document.documentElement.lang = next === "ko" ? "ko" : "en";
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale === "ko" ? "ko" : "en";
  }, [locale, mounted]);

  const t = useCallback(
    (section: string, key: string) => {
      const sectionObj = translations[locale] as Record<string, unknown>;
      if (!sectionObj || !(section in sectionObj)) return key;
      const value = (sectionObj[section] as Record<string, unknown>)?.[key];
      return typeof value === "string" ? value : key;
    },
    [locale]
  );

  const getSection = useCallback(
    <S extends keyof (typeof translations)["en"]>(section: S) =>
      translations[locale][section] as (typeof translations)["en"][S],
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, getSection }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
