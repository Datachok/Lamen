"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/locale-context";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocale();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("[v0] Contact form error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {t.contact.title}<span className="text-primary">{t.contact.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto text-lg">
            {t.contact.description}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Form */}
        <ScrollReveal className="lg:col-span-3">
          {submitted ? (
            <div className="rounded-2xl bg-surface border border-primary/30 p-12 text-center">
              <div className="text-primary text-5xl mb-4">&#10003;</div>
              <h3 className="text-2xl font-semibold mb-2">{t.contact.success.title}</h3>
              <p className="text-text-muted">
                {t.contact.success.description}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-surface border border-surface-light p-8 md:p-10 space-y-6"
            >
              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-text-muted mb-2"
                  >
                    {t.contact.form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={loading}
                    className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-text-muted mb-2"
                  >
                    {t.contact.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={loading}
                    className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm text-text-muted mb-2"
                >
                  {t.contact.form.subject}
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  disabled={loading}
                  className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={t.contact.form.subjectPlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-text-muted mb-2"
                >
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  disabled={loading}
                  className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? "Envoi en cours..." : t.contact.form.submit}
              </Button>
            </form>
          )}
        </ScrollReveal>

        {/* Contact info */}
        <ScrollReveal delay={0.2} className="lg:col-span-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.contact.info.title}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-5 h-5 text-primary mt-0.5 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-text-muted">{t.contact.info.emailLabel}</p>
                    <p className="text-text">{SITE_CONFIG.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-5 h-5 text-primary mt-0.5 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-text-muted">{t.contact.info.phoneLabel}</p>
                    <p className="text-text">{SITE_CONFIG.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface border border-surface-light p-6">
              <h4 className="font-semibold mb-2">{t.contact.cta.title}</h4>
              <p className="text-sm text-text-muted mb-4">
                {t.contact.cta.description}
              </p>
              <Button href="#hero" variant="outline" size="sm">
                {t.contact.cta.button}
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
