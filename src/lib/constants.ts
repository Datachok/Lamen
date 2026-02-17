export const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  contact: "contact",
} as const;

export const SITE_CONFIG = {
  name: "Lamen",
  tagline: "Vérification d'identité numérique",
  description:
    "Lamen sécurise vos transactions financières grâce à une vérification d'identité numérique rapide, fiable et conforme.",
  contact: {
    email: "contact@lamen.dz",
    phone: "+213 XX XX XX XX",
  },
} as const;
