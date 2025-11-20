"use client";

import { motion } from "framer-motion";
import { HTMLAttributes, forwardRef } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  gradient?: boolean;
  animate?: boolean;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = "h2",
      gradient = false,
      animate = true,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizes = {
      h1: "text-4xl sm:text-5xl md:text-6xl font-bold",
      h2: "text-3xl sm:text-4xl md:text-5xl font-bold",
      h3: "text-2xl sm:text-3xl md:text-4xl font-semibold",
      h4: "text-xl sm:text-2xl md:text-3xl font-semibold",
      h5: "text-lg sm:text-xl md:text-2xl font-medium",
      h6: "text-base sm:text-lg md:text-xl font-medium",
    };

    const gradientClass = gradient
      ? "bg-gradient-to-r from-[var(--theme-text-primary)] to-[var(--theme-text-accent)] bg-clip-text text-transparent"
      : "text-[var(--theme-text-primary)]";

    const Component = level;

    const content = (
      <Component
        ref={ref}
        className={`${sizes[level]} ${gradientClass} tracking-tight ${className}`}
        {...props}
      >
        {children}
      </Component>
    );

    if (!animate) return content;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {content}
      </motion.div>
    );
  }
);

Heading.displayName = "Heading";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  variant?: "primary" | "secondary" | "accent";
  animate?: boolean;
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      size = "base",
      variant = "primary",
      animate = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizes = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    const variants = {
      primary: "text-[var(--theme-text-primary)]",
      secondary: "text-[var(--theme-text-primary)]/70",
      accent: "text-[var(--theme-text-accent)]",
    };

    const content = (
      <p
        ref={ref}
        className={`${sizes[size]} ${variants[variant]} leading-relaxed ${className}`}
        {...props}
      >
        {children}
      </p>
    );

    if (!animate) return content;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
      >
        {content}
      </motion.div>
    );
  }
);

Text.displayName = "Text";

interface LabelProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  required?: boolean;
  htmlFor?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, children, className = "", ...props }, ref) => {
    return (
      <motion.label
        ref={ref}
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`text-sm font-medium text-[var(--theme-text-primary)] flex items-center mb-1 ${className}`}
        {...props}
      >
        {children}
        {required && <span className="text-[var(--theme-text-accent)] ml-1">*</span>}
      </motion.label>
    );
  }
);

Label.displayName = "Label";
