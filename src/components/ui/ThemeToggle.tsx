"use client";

import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/lib/theme-context";
import { useLocale } from "@/i18n/locale-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full
                 bg-surface-light/50 hover:bg-surface-light
                 border border-surface-light hover:border-primary/30
                 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? t.themeToggle.lightMode : t.themeToggle.darkMode}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="moon"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
          >
            <motion.path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" as const }}
            />
            {/* Stars */}
            <motion.circle
              cx="19" cy="5" r="0.8"
              fill="currentColor"
              stroke="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            />
            <motion.circle
              cx="16" cy="3" r="0.5"
              fill="currentColor"
              stroke="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            />
            <motion.circle
              cx="21" cy="9" r="0.5"
              fill="currentColor"
              stroke="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-amber-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
          >
            {/* Sun center */}
            <motion.circle
              cx="12" cy="12" r="5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
            {/* Sun rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 12 + Math.cos(rad) * 8;
              const y1 = 12 + Math.sin(rad) * 8;
              const x2 = 12 + Math.cos(rad) * 10;
              const y2 = 12 + Math.sin(rad) * 10;
              return (
                <motion.line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.15 + i * 0.04,
                    ease: "easeOut" as const,
                  }}
                />
              );
            })}
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Glow ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: isDark
            ? "0 0 0 0 rgba(193, 255, 114, 0)"
            : "0 0 0 0 rgba(251, 191, 36, 0)",
        }}
        whileHover={{
          boxShadow: isDark
            ? "0 0 12px 2px rgba(193, 255, 114, 0.3)"
            : "0 0 12px 2px rgba(251, 191, 36, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
