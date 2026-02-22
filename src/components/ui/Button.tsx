"use client";

import { motion } from "motion/react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const sizeClasses = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-9 py-4 text-lg",
};

const variantClasses = {
  primary:
    "bg-primary text-button-text font-semibold hover:brightness-110",
  outline:
    "border border-primary text-primary font-semibold hover:bg-primary/10",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
