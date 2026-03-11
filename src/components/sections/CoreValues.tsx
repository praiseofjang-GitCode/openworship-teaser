"use client";

import { Lightbulb, GitBranch, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import MusicNoteIcon from "@/components/ui/MusicNoteIcon";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLocale } from "@/contexts/LocaleContext";

const valueKeys = [
  { icon: Lightbulb, titleKey: "value1Title", descKey: "value1Desc" },
  { icon: GitBranch, titleKey: "value2Title", descKey: "value2Desc" },
  { icon: Users, titleKey: "value3Title", descKey: "value3Desc" },
] as const;

export default function CoreValues() {
  const { t } = useLocale();
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <h2 className="flex items-center justify-center gap-2 text-center text-2xl font-bold text-primary-900 md:text-3xl">
            <MusicNoteIcon size={28} className="text-accent-600" aria-hidden />
            {t("coreValues", "title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-primary-700">
            {t("coreValues", "subtitle")}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {valueKeys.map((item, i) => (
            <ScrollReveal key={item.titleKey} delay={i * 0.1}>
              <Card className="h-full flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500/20 text-accent-600">
                  <item.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-primary-900">
                  {t("coreValues", item.titleKey)}
                </h3>
                <p className="mt-2 flex-1 text-primary-700">
                  {t("coreValues", item.descKey)}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
