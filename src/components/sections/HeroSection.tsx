"use client";

import { motion, type Variants } from "motion/react";
import { useLocale } from "@/i18n/locale-context";
import Button from "@/components/ui/Button";
import FingerprintAnimation from "@/components/animations/FingerprintAnimation";
import DashboardIllustration from "@/components/ui/DashboardIllustration";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const { t } = useLocale();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Fingerprint background */}
      <div className="absolute inset-0" style={{ opacity: "var(--fp-opacity)" }}>
        <FingerprintAnimation />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />

      {/* Content — split layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-24 pt-28 lg:pt-24">
        {/* Left — text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
          >
            {t.hero.titleLine1}
            <span className="bg-gradient-to-r from-tertiary via-secondary to-primary bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg md:text-xl text-text-muted max-w-xl leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4 flex-wrap">
            <Button href="#about" size="lg">
              {t.hero.ctaPrimary}
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        {/* Right — dashboard illustration (isolated from RTL) */}
        <div className="hidden lg:block" dir="ltr">
          <DashboardIllustration />
        </div>
      </div>
    </section>
  );
}
