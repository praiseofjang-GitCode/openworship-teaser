"use client";

import Logo from "@/components/ui/Logo";
import MusicNoteIcon from "@/components/ui/MusicNoteIcon";
import Button from "@/components/ui/Button";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLocale } from "@/contexts/LocaleContext";

export default function SiteHeader() {
  const { t } = useLocale();
  return (
    <header
      className="sticky top-0 z-[200] border-b border-white/10 bg-white/95 backdrop-blur-sm"
      style={{ isolation: "isolate", color: "#0f172a" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo layout="horizontal" />
        <nav className="flex items-center gap-3">
          <LanguageSwitcher />
          <span className="hidden text-brand-gray sm:inline" aria-hidden>
            <MusicNoteIcon size={18} className="text-accent-600" />
          </span>
          <Button
            variant="outline"
            size="sm"
            className="border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white"
            onClick={() => {
              const el = document.getElementById("preregistration");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("header", "cta")}
          </Button>
        </nav>
      </div>
    </header>
  );
}
