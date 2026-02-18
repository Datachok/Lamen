import type { Translations } from "../types";

export const en: Translations = {
  meta: {
    title: "Lamen \u2014 Digital Identity Verification",
    description:
      "Secure your financial transactions with fast, reliable, and compliant digital identity verification.",
  },
  nav: {
    about: "About",
    contact: "Contact",
    cta: "Get in touch",
    menuLabel: "Menu",
  },
  hero: {
    titleLine1: "Your digital identity, ",
    titleHighlight: "verified in an instant",
    description:
      "Lamen secures your financial transactions through fast, reliable digital identity verification that fully complies with current regulations.",
    ctaPrimary: "Discover Lamen",
    ctaSecondary: "Contact us",
  },
  about: {
    title: "About ",
    titleHighlight: "Lamen",
    description:
      "A digital identity verification solution designed to secure financial transactions and streamline digital operations.",
    features: [
      {
        title: "Enhanced Security",
        description:
          "State-of-the-art encryption protocols and multi-factor authentication to protect every identity verification.",
      },
      {
        title: "Instant Verification",
        description:
          "Validate your users\u2019 identity in seconds with our real-time processing technology.",
      },
      {
        title: "Regulatory Compliance",
        description:
          "Fully compliant with KYC/AML standards and national as well as international regulatory requirements.",
      },
    ],
    howItWorks: "How it works",
    steps: [
      {
        title: "Submission",
        description:
          "The user submits their identity documents through our secure interface.",
      },
      {
        title: "Verification",
        description:
          "Our system analyses and validates the information in real time.",
      },
      {
        title: "Validation",
        description:
          "The identity is confirmed and the user can proceed with their operations.",
      },
    ],
  },
  contact: {
    title: "Contact ",
    titleHighlight: "us",
    description:
      "Have a question or a project? Don\u2019t hesitate to write to us. Our team will get back to you as soon as possible.",
    form: {
      name: "Full name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjectPlaceholder: "Subject of your message",
      message: "Message",
      messagePlaceholder: "Describe your project or question\u2026",
      submit: "Send message",
    },
    success: {
      title: "Message sent",
      description:
        "Thank you for your message. We will get back to you shortly.",
    },
    info: {
      title: "Contact details",
      emailLabel: "Email",
      phoneLabel: "Phone",
    },
    cta: {
      title: "Ready to secure your operations?",
      description:
        "Find out how Lamen can simplify identity verification for your organisation.",
      button: "Learn more",
    },
  },
  dashboard: {
    identityVerification: "Identity Verification",
    name: "Name",
    dateOfBirth: "Date of birth",
    nin: "NIN",
    progress: "Progress",
    riskLevel: "Risk Level",
    low: "Low",
    verified: "Verified",
    sharedData: "Shared Data",
    tags: ["Identity", "Transactions", "Balance"],
    tagSecondary: ["Contact info"],
    complianceReport: "Compliance Report",
    kycScore: "KYC/AML Score",
  },
  footer: {
    copyright: "All rights reserved.",
    privacy: "Privacy policy",
    legal: "Legal notice",
    flagLabel: "Flag of Algeria",
  },
  themeToggle: {
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
  },
  langSwitcher: {
    label: "Change language",
  },
};
