"use client";

import { motion } from "framer-motion";
import { HTMLAttributes, forwardRef } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width = "100%",
      height,
      animate = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "bg-[var(--theme-card-border)] relative overflow-hidden";

    const variants = {
      text: "rounded h-4",
      circular: "rounded-full",
      rectangular: "rounded-lg",
    };

    const defaultHeights = {
      text: "1rem",
      circular: width,
      rectangular: "3rem",
    };

    const heightValue = height || defaultHeights[variant];

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof heightValue === "number" ? `${heightValue}px` : heightValue,
        }}
        {...props}
      >
        {animate && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
