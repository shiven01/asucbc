"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "accent" | "underline";
  external?: boolean;
  children: React.ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      variant = "default",
      external = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles = "relative inline-flex items-center gap-1 font-medium transition-colors duration-300";

    const variants = {
      default:
        "text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)]",
      accent: "text-[var(--theme-text-accent)] hover:text-[var(--theme-text-primary)]",
      underline:
        "text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] underline underline-offset-4 decoration-2 decoration-[var(--theme-text-accent)]/30 hover:decoration-[var(--theme-text-accent)]",
    };

    const externalProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    const linkContent = (
      <>
        <motion.span
          whileHover={{ x: variant === "default" ? 2 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {children}
        </motion.span>
        {external && (
          <motion.svg
            className="w-4 h-4"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 2, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </motion.svg>
        )}
      </>
    );

    return (
      <NextLink
        ref={ref}
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...externalProps}
        {...props}
      >
        {linkContent}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
