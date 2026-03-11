"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import MusicNoteIcon from "@/components/ui/MusicNoteIcon";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLocale } from "@/contexts/LocaleContext";

export default function PreRegistration() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError(t("preregistration", "errorRequired"));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("preregistration", "errorInvalid"));
      return;
    }
    if (!agree) {
      setError(t("preregistration", "errorAgree"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/preregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSubmitted(true);
        return;
      }
      if (res.status === 503) {
        setError(t("preregistration", "errorService"));
        return;
      }
      setError((data.error as string) || t("preregistration", "errorSubmit"));
    } catch {
      setError(t("preregistration", "errorNetwork"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="preregistration"
      className="relative overflow-hidden bg-gradient-cta py-20 md:py-28"
    >
      <div className="mx-auto max-w-xl px-4">
        <ScrollReveal>
          <h2 className="flex items-center justify-center gap-2 text-center text-2xl font-bold text-primary-900 md:text-3xl">
            <MusicNoteIcon size={28} className="text-accent-600" aria-hidden />
            {t("preregistration", "title")}
          </h2>
          <p className="mt-4 text-center text-primary-700">
            {t("preregistration", "subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-primary-100 bg-white p-6 shadow-lg md:p-8">
            {submitted ? (
              <div className="py-8 text-center">
                <p className="text-lg font-medium text-primary-900">
                  {t("preregistration", "successTitle")}
                </p>
                <p className="mt-2 text-primary-700">
                  {t("preregistration", "successMessage")}
                </p>
                <p className="mt-3 text-sm text-primary-500">
                  {t("preregistration", "successNote")}
                </p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    type="email"
                    label={t("preregistration", "emailLabel")}
                    placeholder={t("preregistration", "emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                    aria-invalid={!!error}
                  />
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-primary-300 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-sm text-primary-700">
                      {t("preregistration", "agreeLabel")}
                    </span>
                  </label>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading
                      ? t("preregistration", "loading")
                      : t("preregistration", "submit")}
                  </Button>
                </form>
                <p className="mt-4 text-center text-sm text-primary-500">
                  {t("preregistration", "formNote")}
                </p>
              </>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
