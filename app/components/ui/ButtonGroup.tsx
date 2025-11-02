"use client";

import { motion } from "framer-motion";
import { forwardRef, ReactNode } from "react";

export interface ButtonGroupOption<T = string> {
  value: T;
  label: ReactNode;
  description?: string;
}

export interface ButtonGroupProps<T = string> {
  options: ButtonGroupOption<T>[];
  value: T | null | undefined;
  onChange: (value: T) => void;
  columns?: 1 | 2 | 3 | 4;
  disabled?: boolean;
  className?: string;
  accentColor?: string; // Custom accent color (e.g., "#3b82f6" for blue)
}

function ButtonGroupInner<T = string>(
  {
    options,
    value,
    onChange,
    columns = 2,
    disabled = false,
    className = "",
    accentColor,
  }: ButtonGroupProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };

  return (
    <div
      ref={ref}
      className={`grid ${gridCols[columns]} gap-3 ${className}`}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        const activeColor = accentColor || "var(--theme-text-accent)";

        return (
          <motion.button
            key={String(option.value)}
            type="button"
            onClick={() => !disabled && onChange(option.value)}
            disabled={disabled}
            style={{
              ...(isSelected && accentColor
                ? {
                    borderColor: accentColor,
                    backgroundColor: `${accentColor}10`,
                  }
                : {}),
            }}
            whileHover={
              disabled
                ? {}
                : {
                    scale: 1.02,
                    y: -2,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    },
                  }
            }
            whileTap={
              disabled
                ? {}
                : {
                    scale: 0.98,
                    transition: {
                      type: "spring",
                      stiffness: 600,
                      damping: 10,
                      bounce: 0.5,
                    },
                  }
            }
            className={`
              relative overflow-hidden rounded-lg border-2 p-4 text-left
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
              ${
                isSelected && !accentColor
                  ? "border-[var(--theme-text-accent)] bg-[var(--theme-text-accent)]/10"
                  : !isSelected
                  ? "border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] hover:border-[var(--theme-text-accent)]/50 hover:bg-[var(--theme-text-accent)]/5"
                  : ""
              }
            `}
          >
            {/* Selection indicator */}
            <motion.div
              className="absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{
                ...(isSelected && accentColor
                  ? {
                      borderColor: accentColor,
                      backgroundColor: accentColor,
                    }
                  : {}),
              }}
              animate={
                !accentColor
                  ? {
                      borderColor: isSelected
                        ? "var(--theme-text-accent)"
                        : "var(--theme-card-border)",
                      backgroundColor: isSelected
                        ? "var(--theme-text-accent)"
                        : "transparent",
                    }
                  : {
                      borderColor: isSelected
                        ? accentColor
                        : "var(--theme-card-border)",
                    }
              }
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <motion.svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isSelected ? 1 : 0,
                  opacity: isSelected ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>

            {/* Glow effect when selected */}
            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.15, 0],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: accentColor
                    ? `radial-gradient(circle at center, ${accentColor}, transparent 70%)`
                    : "radial-gradient(circle at center, var(--theme-text-accent), transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
            )}

            {/* Content */}
            <div className="relative z-10">
              <div
                className={`font-medium mb-1 transition-colors ${
                  isSelected && !accentColor
                    ? "text-[var(--theme-text-accent)]"
                    : "text-[var(--theme-text-primary)]"
                }`}
                style={{
                  ...(isSelected && accentColor ? { color: accentColor } : {}),
                }}
              >
                {option.label}
              </div>
              {option.description && (
                <div className="text-sm text-[var(--theme-text-primary)]/60">
                  {option.description}
                </div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export const ButtonGroup = forwardRef(ButtonGroupInner) as <T = string>(
  props: ButtonGroupProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ButtonGroupInner>;

export default ButtonGroup;
