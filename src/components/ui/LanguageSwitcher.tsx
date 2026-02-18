"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocale } from "@/i18n/locale-context";
import type { Locale } from "@/i18n/types";

/* -------------------------------------------------- */
/*  Flag SVG components                                */
/* -------------------------------------------------- */

function FranceFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 600" className={className} aria-hidden="true">
      <rect width="300" height="600" fill="#002395" />
      <rect x="300" width="300" height="600" fill="#FFFFFF" />
      <rect x="600" width="300" height="600" fill="#ED2939" />
    </svg>
  );
}

function GBFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      {/* Blue field */}
      <rect width="60" height="30" fill="#012169" />
      {/* Diagonal white stripes */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
      {/* Diagonal red stripes */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      {/* White cross */}
      <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
      {/* Red cross */}
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function AlgeriaFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 600" className={className} aria-hidden="true">
      <rect width="450" height="600" fill="#006233" />
      <rect x="450" width="450" height="600" fill="#FFFFFF" />
      <circle cx="450" cy="300" r="150" fill="#D21034" />
      <circle cx="475" cy="300" r="120" fill="#006233" />
      <g transform="translate(450,300)">
        <polygon
          points="0,-80 18.5,-24.7 76.1,-24.7 29.8,9.4 48.4,64.7 0,30.6 -48.4,64.7 -29.8,9.4 -76.1,-24.7 -18.5,-24.7"
          fill="#D21034"
          transform="translate(35,0) scale(0.65)"
        />
      </g>
    </svg>
  );
}

/* -------------------------------------------------- */
/*  Locale config                                      */
/* -------------------------------------------------- */

const localeConfig: Array<{
  code: Locale;
  label: string;
  Flag: (props: { className?: string }) => React.JSX.Element;
}> = [
  { code: "fr", label: "Fran\u00e7ais", Flag: FranceFlag },
  { code: "en", label: "English", Flag: GBFlag },
  { code: "ar", label: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", Flag: AlgeriaFlag },
];

/* -------------------------------------------------- */
/*  LanguageSwitcher component                         */
/* -------------------------------------------------- */

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const current = localeConfig.find((l) => l.code === locale)!;
  const CurrentFlag = current.Flag;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button — shows current flag */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full
                   bg-surface-light/50 hover:bg-surface-light
                   border border-surface-light hover:border-primary/30
                   cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t.langSwitcher.label}
        aria-expanded={open}
      >
        {/* Animated flag swap */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={locale}
            className="flex items-center justify-center"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
          >
            <CurrentFlag className="w-5 h-3.5 rounded-[2px]" />
          </motion.div>
        </AnimatePresence>

        {/* Glow ring on hover */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: "0 0 0 0 rgba(193, 255, 114, 0)" }}
          whileHover={{
            boxShadow: "0 0 12px 2px rgba(193, 255, 114, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="absolute top-full mt-2 ltr:right-0 rtl:left-0
                       min-w-[180px] rounded-xl bg-surface border border-surface-light
                       shadow-2xl overflow-hidden z-50"
            style={{
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {localeConfig.map(({ code, label, Flag }, index) => {
              const isActive = code === locale;
              return (
                <motion.button
                  key={code}
                  type="button"
                  onClick={() => {
                    setLocale(code);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors cursor-pointer
                    ${
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-text-muted hover:text-text hover:bg-surface-light/50"
                    }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.05 },
                  }}
                  whileHover={{
                    x: locale === "ar" ? -4 : 4,
                    backgroundColor: "rgba(193, 255, 114, 0.05)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                >
                  <div className="rounded-[3px] overflow-hidden shadow-sm ring-1 ring-black/10">
                    <Flag className="w-6 h-4" />
                  </div>
                  <span className="flex-1 text-start font-medium">
                    {label}
                  </span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ duration: 0.35, ease: "easeOut" as const }}
                      className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(193,255,114,0.5)]"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
