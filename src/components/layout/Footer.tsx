"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { useLocale } from "@/i18n/locale-context";

function AlgeriaFlag({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      className="w-5 h-3.5 rounded-[2px] shrink-0"
      aria-label={ariaLabel}
    >
      {/* Green half */}
      <rect width="450" height="600" fill="#006233" />
      {/* White half */}
      <rect x="450" width="450" height="600" fill="#FFFFFF" />
      {/* Red crescent */}
      <circle cx="450" cy="300" r="150" fill="#D21034" />
      <circle cx="480" cy="300" r="120" fill="#006233" />
      {/* Mask the right side of the inner circle with white */}
      <clipPath id="flag-right">
        <rect x="450" width="450" height="600" />
      </clipPath>
      <circle cx="480" cy="300" r="120" fill="#FFFFFF" clipPath="url(#flag-right)" />
      {/* Red star */}
      <polygon
        points="490,230 500,265 537,265 508,287 518,322 490,302 462,322 472,287 443,265 480,265"
        fill="#D21034"
      />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-surface-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left — brand + copyright + flag */}
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-semibold text-primary tracking-tight"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            {SITE_CONFIG.name}
          </span>
          <span className="text-surface-light">|</span>
          <span className="text-sm text-text-dim">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </span>
          <AlgeriaFlag ariaLabel={t.footer.flagLabel} />
        </div>

        {/* Right — links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-text-dim hover:text-text-muted transition-colors"
          >
            {t.footer.privacy}
          </a>
          <a
            href="#"
            className="text-sm text-text-dim hover:text-text-muted transition-colors"
          >
            {t.footer.legal}
          </a>
        </div>
      </div>
    </footer>
  );
}
