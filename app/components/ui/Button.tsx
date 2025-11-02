"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium touch-manipulation rounded-lg border overflow-hidden";

    const variants = {
      primary:
        "bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] border-transparent hover:bg-[var(--theme-button-hover-bg)] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl",
      secondary:
        "bg-[var(--theme-button-alternate-bg)] text-[var(--theme-button-alternate-text)] border-transparent hover:bg-[var(--theme-button-alternate-hover-bg)] hover:text-[var(--theme-button-alternate-hover-text)] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl",
      ghost:
        "bg-transparent text-[var(--theme-text-primary)] border-transparent hover:bg-white/10 hover:text-[var(--theme-text-accent)] disabled:opacity-50 disabled:cursor-not-allowed",
      outline:
        "bg-transparent text-[var(--theme-text-primary)] border-2 border-[var(--theme-card-border)] hover:border-[var(--theme-text-accent)] hover:bg-[var(--theme-text-accent)]/5 disabled:opacity-50 disabled:cursor-not-allowed",
    };

    const sizes = {
      sm: "px-4 py-1.5 text-sm min-h-[32px]",
      md: "px-6 py-2 text-base min-h-[40px]",
      lg: "px-8 py-2.5 text-lg min-h-[44px]",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <motion.button
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={
          disabled
            ? {}
            : {
                scale: 1.05,
                y: -3,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                },
              }
        }
        whileTap={
          disabled
            ? {}
            : {
                scale: 0.92,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 600,
                  damping: 10,
                  bounce: 0.5,
                },
              }
        }
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        disabled={disabled}
        {...props}
      >
        {/* Animated shine effect on hover (not for outline) */}
        {variant !== "outline" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{
              x: "100%",
              opacity: [0, 0.5, 0],
              transition: {
                duration: 0.6,
                ease: "easeInOut",
              },
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
            }}
          />
        )}

        {/* Pulsing glow overlay on hover (not for outline) */}
        {variant !== "outline" && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={
              disabled
                ? {}
                : {
                    opacity: [0, 0.15, 0],
                    scale: [0.95, 1.05, 0.95],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
            style={{
              background:
                "radial-gradient(circle at center, var(--theme-text-accent), transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        )}

        {/* Animated border segments for outline variant */}
        {variant === "outline" && (
          <>
            {/* Top border segment */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(90deg, var(--theme-text-accent), transparent)",
              }}
              animate={{
                width: isHovered && !disabled ? "100%" : "0%",
                opacity: isHovered && !disabled ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0,
              }}
            />

            {/* Right border segment */}
            <motion.div
              className="absolute top-0 right-0 w-[2px] rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(180deg, var(--theme-text-accent), transparent)",
              }}
              animate={{
                height: isHovered && !disabled ? "100%" : "0%",
                opacity: isHovered && !disabled ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.1,
              }}
            />

            {/* Bottom border segment */}
            <motion.div
              className="absolute bottom-0 right-0 h-[2px] rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(270deg, var(--theme-text-accent), transparent)",
              }}
              animate={{
                width: isHovered && !disabled ? "100%" : "0%",
                opacity: isHovered && !disabled ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.2,
              }}
            />

            {/* Left border segment */}
            <motion.div
              className="absolute bottom-0 left-0 w-[2px] rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(0deg, var(--theme-text-accent), transparent)",
              }}
              animate={{
                height: isHovered && !disabled ? "100%" : "0%",
                opacity: isHovered && !disabled ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.3,
              }}
            />
          </>
        )}

        {/* Button content with bounce */}
        <motion.span
          className="relative z-10"
          animate={{
            scale: 1,
          }}
          whileTap={
            disabled
              ? {}
              : {
                  scale: 0.9,
                  transition: {
                    type: "spring",
                    stiffness: 700,
                    damping: 12,
                  },
                }
          }
        >
          {children}
        </motion.span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
