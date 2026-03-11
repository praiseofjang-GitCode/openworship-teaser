"use client";

import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex rounded-lg border border-primary-200 bg-primary-50/50 p-0.5">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-md px-2.5 py-1 text-sm font-medium transition-colors ${
          locale === "en"
            ? "bg-accent-600 text-white"
            : "text-primary-600 hover:bg-primary-100"
        }`}
        aria-pressed={locale === "en"}
        aria-label="English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ko")}
        className={`rounded-md px-2.5 py-1 text-sm font-medium transition-colors ${
          locale === "ko"
            ? "bg-accent-600 text-white"
            : "text-primary-600 hover:bg-primary-100"
        }`}
        aria-pressed={locale === "ko"}
        aria-label="한국어"
      >
        KO
      </button>
    </div>
  );
}
