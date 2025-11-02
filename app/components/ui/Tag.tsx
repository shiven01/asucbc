"use client";

import { motion } from "framer-motion";
import { HTMLAttributes, forwardRef } from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline";
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = "primary",
      removable = false,
      onRemove,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-300";

    const variants = {
      primary:
        "bg-[var(--theme-button-bg)] text-[var(--theme-button-text)]",
      secondary:
        "bg-[var(--theme-button-alternate-bg)] text-[var(--theme-button-alternate-text)]",
      outline:
        "bg-transparent text-[var(--theme-text-primary)] border-2 border-[var(--theme-card-border)]",
    };

    return (
      <motion.span
        ref={ref}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        whileHover={{ scale: 1.03, y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        <span>{children}</span>
        {removable && onRemove && (
          <motion.button
            type="button"
            onClick={onRemove}
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="ml-1 hover:text-[var(--theme-text-accent)] transition-colors duration-200"
            aria-label="Remove tag"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        )}
      </motion.span>
    );
  }
);

Tag.displayName = "Tag";

export default Tag;
