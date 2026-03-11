"use client";

import { Monitor, Tablet, Smartphone } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLocale } from "@/contexts/LocaleContext";

const devices = [
  { icon: Monitor, key: "desktop" as const },
  { icon: Tablet, key: "tablet" as const },
  { icon: Smartphone, key: "mobile" as const },
];

const sizes = { desktop: 220, tablet: 180, mobile: 120 };
const iconSizes = { desktop: 80, tablet: 64, mobile: 48 };

export default function Deployment() {
  const { t } = useLocale();
  return (
    <section className="border-t border-primary-100 bg-primary-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <h2 className="text-center text-2xl font-bold text-primary-900 md:text-3xl">
            {t("deployment", "title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-primary-700">
            {t("deployment", "subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-end justify-center gap-8 md:gap-12">
            {devices.map((device) => (
              <div
                key={device.key}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className="flex items-center justify-center rounded-xl border-2 border-primary-200 bg-white p-8 shadow-md transition-transform hover:-translate-y-1"
                  style={{
                    minWidth: sizes[device.key],
                    minHeight: 140,
                  }}
                >
                  <device.icon
                    className="text-primary-500"
                    size={iconSizes[device.key]}
                    aria-hidden
                  />
                </div>
                <span className="text-sm font-medium text-primary-700">
                  {t("deployment", device.key)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-primary-600">
            {t("deployment", "note")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
