"use client";

import { motion } from "motion/react";
import { fingerprintPaths } from "@/lib/fingerprint-paths";
import { useTheme } from "@/lib/theme-context";

export default function FingerprintAnimation() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <svg
        viewBox="0 0 500 580"
        className="w-[340px] h-[400px] sm:w-[440px] sm:h-[510px] md:w-[540px] md:h-[630px] lg:w-[640px] lg:h-[740px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: `drop-shadow(0 0 12px var(--fp-glow-primary)) drop-shadow(0 0 40px var(--fp-glow-secondary))`,
        }}
      >
        {fingerprintPaths.map((fp) => (
          <motion.path
            key={fp.id}
            d={fp.d}
            stroke={isDark ? fp.color : fp.lightColor}
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                duration: 1.8,
                delay: fp.delay,
                ease: "easeInOut" as const,
              },
              opacity: {
                duration: 0.4,
                delay: fp.delay,
              },
            }}
          />
        ))}
      </svg>

      {/* Subtle pulsing glow after draw completes */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{
          duration: 4,
          delay: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut" as const,
        }}
        style={{
          background: `radial-gradient(circle at center, var(--fp-pulse) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
