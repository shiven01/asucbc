"use client";

import { motion } from "framer-motion";
import { HTMLAttributes, forwardRef } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  center?: boolean;
  animate?: boolean;
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = "lg",
      center = true,
      animate = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    };

    const centerClass = center ? "mx-auto" : "";
    const baseStyles = "w-full px-3 sm:px-4 md:px-6 lg:px-8";

    const content = (
      <div
        ref={ref}
        className={`${baseStyles} ${sizes[size]} ${centerClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );

    if (!animate) return content;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {content}
      </motion.div>
    );
  }
);

Container.displayName = "Container";

export default Container;
