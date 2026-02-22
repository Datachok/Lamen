"use client";

import { motion } from "motion/react";
import { fingerprintPaths } from "@/lib/fingerprint-paths";
import { useTheme } from "@/lib/theme-context";
import { useEffect, useState } from "react";

export default function FingerprintAnimation() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInitialAnimComplete, setIsInitialAnimComplete] = useState(false);

  useEffect(() => {
    // Set initial animation complete after paths draw
    const timer = setTimeout(() => setIsInitialAnimComplete(true), 4500);

    const handleScroll = () => {
      if (!isInitialAnimComplete) return;

      // Calculate scroll progress: 0 to 1
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / documentHeight, 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [isInitialAnimComplete]);

  // Get color based on path index for smooth color progression
  const getPathColor = (index: number) => {
    const colors = isDark
      ? [
          "#5ce1e6", // cyan
          "#55dfe2",
          "#4edcde",
          "#42d6d4",
          "#35cfc4",
          "#28c8b4",
          "#1cc1a4",
          "#14bb92",
          "#0db680",
          "#0abf6e",
          "#1ec462",
          "#3ecf5e",
          "#5eda5c",
          "#7ee55e",
          "#96ee62",
          "#a8f46a",
          "#b5f870",
          "#c1ff72", // lime
        ]
      : [
          "#0891b2", // cyan light
          "#0e7490",
          "#0d9488",
          "#0f766e",
          "#047857",
          "#059669",
          "#16a34a",
          "#15803d",
          "#166534",
          "#14532d",
          "#365314",
          "#3f6212",
          "#4d7c0f",
          "#65a30d",
          "#84cc16",
          "#a3e635",
          "#bef264",
          "#d9f99d", // lime light
        ];
    return colors[index] || colors[colors.length - 1];
  };

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
        {fingerprintPaths.map((fp, index) => {
          // Calculate the fill threshold: outer paths fill first as you scroll
          const pathThreshold = index / fingerprintPaths.length;
          const isFilled = scrollProgress >= pathThreshold;

          // Smooth color transition from initial to filled color
          const initialColor = isDark ? fp.color : fp.lightColor;
          const filledColor = getPathColor(index);

          return (
            <motion.path
              key={fp.id}
              d={fp.d}
              stroke={isFilled ? filledColor : initialColor}
              strokeWidth={isFilled ? 3 : 2}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                strokeWidth: isFilled ? 3 : 2,
              }}
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
                strokeWidth: {
                  duration: 0.3,
                  ease: "easeOut" as const,
                },
              }}
              style={{
                stroke: isFilled ? filledColor : initialColor,
                filter: isFilled
                  ? `drop-shadow(0 0 8px ${filledColor}) drop-shadow(0 0 16px ${filledColor})`
                  : `drop-shadow(0 0 2px ${initialColor})`,
              }}
            />
          );
        })}

        {/* Radial fill effect from center outward */}
        <motion.circle
          cx="250"
          cy="290"
          r={Math.max(50, 200 * scrollProgress)}
          fill="none"
          stroke={isDark ? "#c1ff72" : "#d9f99d"}
          strokeWidth={1}
          opacity={isInitialAnimComplete ? 0.15 : 0}
          style={{
            filter: `drop-shadow(0 0 20px ${
              isDark ? "rgba(193, 255, 114, 0.4)" : "rgba(217, 249, 157, 0.3)"
            })`,
          }}
        />
      </svg>

      {/* Subtle pulsing glow after draw completes (only before scroll) */}
      {!isInitialAnimComplete && (
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
      )}

      {/* Glow effect during scroll */}
      {isInitialAnimComplete && scrollProgress > 0 && (
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: 0.3 * scrollProgress }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(circle at center, ${
              isDark
                ? "rgba(193, 255, 114, 0.15)"
                : "rgba(217, 249, 157, 0.1)"
            } 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
