"use client";

import { motion } from "framer-motion";
import { HTMLAttributes, forwardRef } from "react";

export interface DividerProps extends Omit<HTMLAttributes<HTMLHRElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "gradient";
  label?: string;
  animate?: boolean;
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "solid",
      label,
      animate = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      orientation === "horizontal"
        ? "w-full h-px my-3 sm:my-4"
        : "h-full w-px mx-3 sm:mx-4 inline-block";

    const variants = {
      solid: "border-[var(--theme-card-border)]",
      dashed: "border-[var(--theme-card-border)] border-dashed",
      gradient:
        "bg-gradient-to-r from-transparent via-[var(--theme-card-border)] to-transparent",
    };

    if (label && orientation === "horizontal") {
      return (
        <motion.div
          initial={animate ? { opacity: 0, scaleX: 0 } : undefined}
          whileInView={animate ? { opacity: 1, scaleX: 1 } : undefined}
          viewport={animate ? { once: true } : undefined}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 sm:gap-4 my-3 sm:my-4"
        >
          <hr
            ref={ref}
            className={`flex-1 ${baseStyles} ${variant === "gradient" ? "" : "border-t"} ${
              variants[variant]
            } ${className}`}
            {...props}
          />
          <span className="text-sm text-[var(--theme-text-primary)]/60 font-medium">
            {label}
          </span>
          <hr
            className={`flex-1 ${baseStyles} ${variant === "gradient" ? "" : "border-t"} ${
              variants[variant]
            } ${className}`}
          />
        </motion.div>
      );
    }

    return (
      <motion.hr
        ref={ref}
        initial={
          animate
            ? orientation === "horizontal"
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 0, scaleY: 0 }
            : undefined
        }
        whileInView={
          animate
            ? orientation === "horizontal"
              ? { opacity: 1, scaleX: 1 }
              : { opacity: 1, scaleY: 1 }
            : undefined
        }
        viewport={animate ? { once: true } : undefined}
        transition={{ duration: 0.5 }}
        className={`${baseStyles} ${variant === "gradient" ? "" : orientation === "horizontal" ? "border-t" : "border-l"} ${
          variants[variant]
        } ${className}`}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export default Divider;
