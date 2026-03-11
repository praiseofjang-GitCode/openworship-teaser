"use client";

import Logo from "@/components/ui/Logo";
import MusicNoteIcon from "@/components/ui/MusicNoteIcon";
import { useLocale } from "@/contexts/LocaleContext";

export default function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-primary-100 bg-primary-50/50 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
        <Logo layout="horizontal" />
        <span className="flex items-center gap-1 text-sm text-brand-gray">
          <MusicNoteIcon size={16} className="text-accent-600" aria-hidden />
          {t("footer", "tagline")}
        </span>
      </div>
    </footer>
  );
}
