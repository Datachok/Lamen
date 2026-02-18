export type Locale = "fr" | "en" | "ar";

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    contact: string;
    cta: string;
    menuLabel: string;
  };
  hero: {
    titleLine1: string;
    titleHighlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    titleHighlight: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    howItWorks: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    title: string;
    titleHighlight: string;
    description: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
    };
    success: {
      title: string;
      description: string;
    };
    info: {
      title: string;
      emailLabel: string;
      phoneLabel: string;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  dashboard: {
    identityVerification: string;
    name: string;
    dateOfBirth: string;
    nin: string;
    progress: string;
    riskLevel: string;
    low: string;
    verified: string;
    sharedData: string;
    tags: string[];
    tagSecondary: string[];
    complianceReport: string;
    kycScore: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    legal: string;
    flagLabel: string;
  };
  themeToggle: {
    lightMode: string;
    darkMode: string;
  };
  langSwitcher: {
    label: string;
  };
}
