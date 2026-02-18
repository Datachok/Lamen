"use client";

import { motion, type Variants } from "motion/react";
import { useLocale } from "@/i18n/locale-context";

const cardFloat: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const checkPop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: [0, 1.3, 1],
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <motion.div
      variants={checkPop}
      className={`inline-flex items-center justify-center w-5 h-5 rounded-md bg-secondary/20 ${className}`}
    >
      <svg viewBox="0 0 16 16" className="w-3 h-3 text-secondary" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M3 8.5L6.5 12L13 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

export default function DashboardIllustration() {
  const { t } = useLocale();

  return (
    <motion.div
      className="relative w-full max-w-lg mx-auto h-[420px] sm:h-[460px] lg:h-[500px]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Card 1 — Identity Verification (main card) */}
      <motion.div
        variants={cardFloat}
        className="absolute top-6 left-0 sm:left-4 w-[260px] sm:w-[280px] rounded-2xl bg-surface border border-surface-light p-5 shadow-xl z-20"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-xs font-semibold tracking-wide uppercase text-text-muted">
            {t.dashboard.identityVerification}
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-text-dim uppercase tracking-wider">{t.dashboard.name}</p>
              <p className="text-sm font-medium text-text">Amina Bouzidi</p>
            </div>
            <CheckIcon />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-text-dim uppercase tracking-wider">{t.dashboard.dateOfBirth}</p>
              <p className="text-sm font-medium text-text">12/03/1992</p>
            </div>
            <CheckIcon />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-text-dim uppercase tracking-wider">{t.dashboard.nin}</p>
              <p className="text-sm font-medium text-text font-mono">2219XXXXXXXX</p>
            </div>
            <CheckIcon />
          </div>
          {/* Progress bar */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-text-dim">{t.dashboard.progress}</span>
              <span className="text-[10px] font-semibold text-secondary">100%</span>
            </div>
            <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-tertiary via-secondary to-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" as const }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 2 — Risk Level (top right) */}
      <motion.div
        variants={cardFloat}
        className="absolute top-0 right-0 sm:right-2 w-[180px] rounded-2xl bg-surface border border-surface-light p-4 shadow-xl z-30"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-text-muted">
            {t.dashboard.riskLevel}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-surface-light" />
              <motion.circle
                cx="18" cy="18" r="15.5" fill="none" strokeWidth="3"
                strokeLinecap="round"
                className="text-primary"
                stroke="currentColor"
                strokeDasharray="97.4"
                initial={{ strokeDashoffset: 97.4 }}
                animate={{ strokeDashoffset: 97.4 * 0.95 }}
                transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" as const }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">5%</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-secondary">{t.dashboard.low}</p>
            <p className="text-[10px] text-text-dim">{t.dashboard.verified}</p>
          </div>
        </div>
      </motion.div>

      {/* Card 3 — Shared Data (middle right) */}
      <motion.div
        variants={cardFloat}
        className="absolute top-[140px] right-[-10px] sm:right-0 w-[200px] rounded-2xl bg-surface border border-surface-light p-4 shadow-xl z-10"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-tertiary" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-text-muted">
            {t.dashboard.sharedData}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {t.dashboard.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-primary/15 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
          {t.dashboard.tagSecondary.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-tertiary/15 text-tertiary border border-tertiary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Card 4 — Compliance Report (bottom) */}
      <motion.div
        variants={cardFloat}
        className="absolute bottom-0 left-4 sm:left-8 w-[240px] sm:w-[260px] rounded-2xl bg-surface border border-surface-light p-4 shadow-xl z-20"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-text-muted">
            {t.dashboard.complianceReport}
          </span>
        </div>
        <div className="flex items-end gap-1.5 h-12">
          {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 1.0, 0.75, 0.85].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-secondary to-primary"
              initial={{ height: 0 }}
              animate={{ height: `${h * 100}%` }}
              transition={{
                duration: 0.5,
                delay: 1.8 + i * 0.08,
                ease: "easeOut" as const,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-text-dim">{t.dashboard.kycScore}</span>
          <span className="text-xs font-bold text-primary">98.2%</span>
        </div>
      </motion.div>

      {/* Decorative blurred circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-tertiary/5 blur-2xl pointer-events-none" />
    </motion.div>
  );
}
