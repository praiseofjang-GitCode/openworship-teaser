"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { useLocale } from "@/contexts/LocaleContext";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&q=80";

export default function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt={t("hero", "imageAlt")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-primary-900/70"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.7)" }}
          aria-hidden
        />
      </div>

      <div
        className="relative z-[100] mx-auto max-w-5xl px-4 py-20 text-center"
        style={{ isolation: "isolate" }}
      >
        <h1
          className="text-3xl font-bold leading-tight whitespace-pre-line md:text-4xl lg:text-5xl"
          style={{
            color: "#ffffff",
            textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0 1px rgba(0,0,0,1)",
          }}
        >
          {t("hero", "title")}
        </h1>
        <p
          className="mt-6 text-lg md:text-xl whitespace-pre-line"
          style={{
            color: "rgba(255,255,255,0.95)",
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          {t("hero", "subtitle")}
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            className="bg-accent-600 text-white hover:bg-accent-500"
            onClick={() => {
              const el = document.getElementById("preregistration");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("hero", "cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
