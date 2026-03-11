"use client";

import { Edit3, Users, MessageCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLocale } from "@/contexts/LocaleContext";

const featureKeys = [
  { icon: Edit3, titleKey: "feature1Title" as const, descKey: "feature1Desc" as const },
  { icon: Users, titleKey: "feature2Title" as const, descKey: "feature2Desc" as const },
  { icon: MessageCircle, titleKey: "feature3Title" as const, descKey: "feature3Desc" as const },
];

export default function Collaboration() {
  const { t } = useLocale();
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <h2 className="text-center text-2xl font-bold text-primary-900 md:text-3xl">
            {t("collaboration", "title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-primary-700">
            {t("collaboration", "subtitle")}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {featureKeys.map((item, i) => (
            <ScrollReveal key={item.titleKey} delay={i * 0.1}>
              <div className="rounded-xl border border-primary-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-accent-600">
                  <item.icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-primary-900">
                  {t("collaboration", item.titleKey)}
                </h3>
                <p className="mt-2 text-primary-700">
                  {t("collaboration", item.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
