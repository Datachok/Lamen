"use client";

import { useLocale } from "@/i18n/locale-context";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";

const featureIcons = [
  <svg key="security" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  <svg key="speed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  <svg key="compliance" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
  </svg>,
];

const stepNumbers = ["01", "02", "03"];

export default function AboutSection() {
  const { t } = useLocale();

  const features = t.about.features.map((f, i) => ({
    ...f,
    icon: featureIcons[i],
  }));

  const steps = t.about.steps.map((s, i) => ({
    ...s,
    number: stepNumbers[i],
  }));

  return (
    <SectionWrapper id="about">
      {/* Section header */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {t.about.title}
            <span className="text-primary">{t.about.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto text-lg">
            {t.about.description}
          </p>
        </div>
      </ScrollReveal>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
        {features.map((feature, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <div className="group rounded-2xl bg-surface border border-surface-light p-8 transition-colors hover:border-primary/30">
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* How it works */}
      <ScrollReveal>
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold">
            {t.about.howItWorks}
          </h3>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting line (desktop only) */}
        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-tertiary via-secondary to-primary" />

        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.2}>
            <div className="text-center relative">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface border-2 border-primary text-primary font-bold text-lg mb-6 relative z-10">
                {step.number}
              </div>
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
