"use client";

import { FileText, Sparkles, ListChecks, Music } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLocale } from "@/contexts/LocaleContext";

const stepKeys = ["step1", "step2", "step3", "step4"] as const;
const stepIcons = [FileText, Sparkles, ListChecks, Music];

const chapterKeys = [
  { id: "1", nameKey: "chapter1" as const, energyKey: "energyCalm" as const },
  { id: "2", nameKey: "chapter2" as const, energyKey: "energyDeep" as const },
  { id: "3", nameKey: "chapter3" as const, energyKey: "energyPeak" as const },
  { id: "4", nameKey: "chapter4" as const, energyKey: "energyCommit" as const },
] as const;

export default function StorylineBuilder() {
  const { t, getSection } = useLocale();
  const storyline = getSection("storyline");
  const detailsItems = "detailsItems" in storyline && Array.isArray(storyline.detailsItems)
    ? storyline.detailsItems
    : [];
  const lentSongs = "lentSongs" in storyline && Array.isArray(storyline.lentSongs)
    ? storyline.lentSongs
    : [];
  // Energy curve: 구간 전체(0~100) 사용. 도입 35 → 참회 28 → 기쁨 85 → 결단 80
  const pathSmooth =
    "M 0,50 C 8.75,49 13.75,45 18.75,43 C 31.25,46 40,47 50,48 C 60,28 72.5,14 81.25,8 C 88.75,9 95,9 100,10";

  return (
    <section className="border-t border-primary-100 bg-primary-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-col gap-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-primary-900 md:text-3xl">
              {t("storyline", "title")}
            </h2>
            <p className="mt-4 text-primary-700">
              {t("storyline", "intro")}
            </p>
            <p className="mt-6 text-sm font-medium text-primary-600">
              {t("storyline", "flowLabel")}
            </p>
            <div className="mt-3 rounded-xl border border-primary-200 bg-white p-4 shadow-sm">
              <p className="text-center text-sm font-medium text-primary-800">
                {t("storyline", "flowSentence")}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {stepKeys.map((key, i) => {
                  const Icon = stepIcons[i];
                  return (
                    <div
                      key={key}
                      className="flex flex-col items-center rounded-lg border border-primary-100 bg-primary-50/50 px-3 py-4 text-center"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-500/25 text-sm font-bold text-accent-700">
                        {i + 1}
                      </span>
                      <span className="mt-3 flex items-center justify-center gap-1.5">
                        <Icon className="h-4 w-4 shrink-0 text-accent-600" aria-hidden />
                        <span className="text-sm font-medium leading-snug text-primary-800">
                          {t("storyline", key)}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="mt-6 text-sm text-primary-600">
              {t("storyline", "detailSummary")}
            </p>
            <details className="mt-4 rounded-lg border border-primary-100 bg-white/80 p-3">
              <summary className="cursor-pointer text-sm font-medium text-primary-700">
                {t("storyline", "detailsTitle")}
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-primary-600">
                {detailsItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </details>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-xl border border-primary-200 bg-white p-6 shadow-sm md:p-8">
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-primary-500">
                {t("storyline", "exampleTitle")}
              </p>
              <p className="mb-4 text-xs text-primary-600">
                {t("storyline", "exampleSubtitle")}
              </p>

              <div className="rounded-lg bg-primary-900/5 p-4">
                <div className="relative h-32 w-full">
                  <svg
                    viewBox="0 0 100 60"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                  >
                    <defs>
                      <linearGradient id="energyGradient" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="rgb(13, 148, 136)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(13, 148, 136)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`${pathSmooth} L 100,60 L 0,60 Z`}
                      fill="url(#energyGradient)"
                    />
                    <path
                      d={pathSmooth}
                      fill="none"
                      stroke="rgb(13, 148, 136)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {[0, 25, 50, 75, 100].map((x, i) => (
                      <line
                        key={i}
                        x1={x}
                        y1={0}
                        x2={x}
                        y2={60}
                        stroke="rgba(100, 116, 139, 0.2)"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                      />
                    ))}
                  </svg>
                </div>
                <div className="mt-2 grid grid-cols-4 text-[10px] font-medium text-primary-600">
                  {chapterKeys.map((ch) => (
                    <div key={ch.id} className="flex flex-col items-center justify-center">
                      <span>{t("storyline", ch.nameKey)}</span>
                      <span className="text-primary-400">{t("storyline", ch.energyKey)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {chapterKeys.map((ch, i) => (
                  <div
                    key={ch.id}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-primary-100 bg-white py-2.5 px-3 text-sm"
                  >
                    <span className="min-w-[5.5rem] shrink-0 whitespace-nowrap font-medium text-primary-500">
                      {t("storyline", ch.nameKey)}
                    </span>
                    {lentSongs[i] && (
                      <>
                        <span className="min-w-0 flex-1 font-medium text-primary-900">
                          {lentSongs[i].song}
                        </span>
                        <span className="shrink-0 text-primary-500">— {lentSongs[i].artist}</span>
                      </>
                    )}
                    <span className="ml-auto shrink-0 rounded bg-primary-100 px-2 py-0.5 text-xs text-primary-700">
                      {(() => {
                        const item = lentSongs[i] as { key?: string; bpm?: number; bpmDisplay?: string };
                        const bpmText = item?.bpmDisplay ?? (item?.bpm != null ? String(item.bpm) : null);
                        return item?.key != null && bpmText != null
                          ? `${item.key} · ${bpmText} BPM`
                          : "";
                      })()}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-primary-500">
                {t("storyline", "exampleNote")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
