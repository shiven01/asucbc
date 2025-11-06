"use client";

import { motion } from "framer-motion";
import { HTMLAttributes, forwardRef } from "react";

export interface CardProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onAnimationStart"
    | "onAnimationEnd"
  > {
  hoverable?: boolean;
  animated?: boolean;
  gradient?: boolean;
  childrenAreRelative?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      hoverable = false,
      animated = true,
      gradient = false,
      children,
      className = "",
      childrenAreRelative = true,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative rounded-lg sm:rounded-xl border-2 border-[var(--theme-card-border)] p-4 sm:p-5 lg:p-6 overflow-hidden";

    const backgroundStyle = gradient
      ? {
          background: `
            linear-gradient(135deg,
              var(--theme-card-bg) 0%,
              var(--theme-card-gradient-end, var(--theme-card-bg)) 100%
            )
          `,
        }
      : {
          background: "var(--theme-card-bg)",
        };

    // Realistic shadows based on light source from top-left (135deg gradient)
    // Light comes from upper-left, so shadows cast to lower-right
    const baseShadow = gradient
      ? "2px 2px 4px rgba(0, 0, 0, 0.05), 4px 4px 12px rgba(0, 0, 0, 0.08)"
      : "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06)";

    const hoverShadow = gradient
      ? "4px 8px 16px rgba(0, 0, 0, 0.1), 8px 16px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      : "0 10px 25px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.06)";

    if (!animated && !hoverable) {
      return (
        <div
          ref={ref}
          className={`${baseStyles} ${className}`}
          style={{ ...backgroundStyle, boxShadow: baseShadow }}
          {...props}
        >
          {gradient && (
            <>
              {/* Animated light source gradient */}
              <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle at 20% 50%,
                      var(--theme-gradient-accent, transparent) 0%,
                      transparent 50%
                    )
                  `,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Subtle highlight on lit edge (top-left) */}
              <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg sm:rounded-xl"
                style={{
                  background: `
                    linear-gradient(135deg,
                      rgba(255, 255, 255, 0.08) 0%,
                      transparent 40%
                    )
                  `,
                }}
              />
            </>
          )}
          {childrenAreRelative ? (
            <div className="relative z-10">{children}</div>
          ) : (
            children
          )}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={`${baseStyles} ${className}`}
        style={backgroundStyle}
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        whileInView={animated ? { opacity: 1, y: 0 } : undefined}
        viewport={animated ? { once: true, amount: 0.3 } : undefined}
        animate={{
          boxShadow: baseShadow,
        }}
        whileHover={
          hoverable
            ? {
                scale: 1.02,
                y: -6,
                boxShadow: hoverShadow,
              }
            : undefined
        }
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        {...props}
      >
        {gradient && (
          <>
            {/* Animated light source gradient */}
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 20% 50%,
                    var(--theme-gradient-accent, transparent) 0%,
                    transparent 50%
                  )
                `,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Subtle highlight on lit edge (top-left) */}
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg sm:rounded-xl"
              style={{
                background: `
                  linear-gradient(135deg,
                    rgba(255, 255, 255, 0.08) 0%,
                    transparent 40%
                  )
                `,
              }}
            />
          </>
        )}
        {childrenAreRelative ? (
          <div className="relative z-10">{children}</div>
        ) : (
          children
        )}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
