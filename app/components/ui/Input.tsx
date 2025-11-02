"use client";

import { motion } from "framer-motion";
import { InputHTMLAttributes, forwardRef, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      fullWidth = false,
      className = "",
      onFocus,
      onBlur,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const baseStyles =
      "px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 bg-[var(--theme-card-bg)] text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-primary)]/40 transition-all duration-300 focus:outline-none min-h-[44px] sm:min-h-[48px] touch-manipulation text-sm sm:text-base";

    const stateStyles = error
      ? "border-red-500 focus:border-red-600"
      : isFocused
      ? "border-[var(--theme-text-accent)] shadow-md"
      : "border-[var(--theme-card-border)] hover:border-[var(--theme-text-accent)]/50";

    const disabledStyles = disabled
      ? "opacity-50 cursor-not-allowed"
      : "cursor-text";

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <div className={widthClass}>
        <motion.div
          animate={
            isFocused
              ? { scale: 1.01, y: -1 }
              : { scale: 1, y: 0 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <input
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={`${baseStyles} ${stateStyles} ${disabledStyles} ${widthClass} ${className}`}
            {...props}
          />
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
