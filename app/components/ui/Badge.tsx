"use client";

import { motion } from "framer-motion";
import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300";

    const variants = {
      primary:
        "bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] border border-[var(--theme-button-bg)]",
      secondary:
        "bg-[var(--theme-button-alternate-bg)] text-[var(--theme-button-alternate-text)] border border-[var(--theme-button-alternate-bg)]",
      accent:
        "bg-[var(--theme-text-accent)]/20 text-[var(--theme-text-accent)] border border-[var(--theme-text-accent)]/30",
      success: "bg-green-100 text-green-800 border border-green-200",
      warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      error: "bg-red-100 text-red-800 border border-red-200",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <motion.span
        ref={ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
