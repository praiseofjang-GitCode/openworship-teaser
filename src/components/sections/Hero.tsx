"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
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
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
        <ScrollReveal delay={0.1}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold leading-tight text-white drop-shadow-md md:text-4xl lg:text-5xl"
          >
            {t("hero", "title")}
            <br />
            {t("hero", "titleLine2")}
          </motion.h1>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="mt-6 text-lg text-white/90 md:text-xl">
            {t("hero", "subtitle")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.5}>
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
        </ScrollReveal>
      </div>
    </section>
  );
}
