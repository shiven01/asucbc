"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type JoinCardProps = {
  title?: string;
  subtitle?: string;
  discordHref?: string;
  benefitsHref?: string;
  className?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 12,
    },
  },
};

export default function JoinCard({
  title = "Join the Claude Builder Club!",
  subtitle = "Meet fellow builders, learn fast, and collaborate on real projects across campus.",
  discordHref = "#",
  benefitsHref = "#",
  className = "",
}: JoinCardProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full rounded-xl relative overflow-hidden border-2 border-[var(--theme-card-border)] shadow-sm p-4 sm:p-6 ${className}`}
      style={{
        background: `
          linear-gradient(135deg,
            var(--theme-card-bg) 0%,
            var(--theme-card-gradient-end, var(--theme-card-bg)) 100%
          )
        `,
      }}
    >
      {/* Subtle animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
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
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.h2
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--theme-text-primary)] mb-3"
        >
          {title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-[var(--theme-text-primary)]/70 leading-relaxed mb-4"
        >
          {subtitle}
        </motion.p>
        <motion.ul
          variants={itemVariants}
          className="list-disc pl-4 text-sm sm:text-base text-[var(--theme-text-primary)]/80 space-y-1 mb-4"
        >
          <motion.li variants={listItemVariants}>
            Free Claude Pro + $50 in API credits
          </motion.li>
          <motion.li variants={listItemVariants}>
            Hands-on workshops and resources
          </motion.li>
          <motion.li variants={listItemVariants}>
            Exclusive merchandise
          </motion.li>
        </motion.ul>
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm text-[var(--theme-text-primary)]/60 italic mb-4"
        >
          **Benefits require attendance at a CBC event for activation**
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
          >
            <Link
              href={discordHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex w-full items-center justify-center rounded-xl bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] hover:bg-[var(--theme-button-text)] hover:text-[var(--theme-button-bg)] px-4 py-3 text-sm sm:text-base font-semibold shadow hover:shadow-lg border border-[var(--theme-button-text)] min-h-[40px] touch-manipulation transition-all duration-300"
            >
              Join our Discord
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
          >
            <Link
              href={benefitsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex w-full items-center justify-center rounded-xl bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] hover:bg-[var(--theme-button-text)] hover:text-[var(--theme-button-bg)] px-4 py-3 text-sm sm:text-base font-semibold shadow hover:shadow-lg border border-[var(--theme-button-text)] min-h-[40px] touch-manipulation transition-all duration-300"
            >
              Sign up to receive benefits
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
