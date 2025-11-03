"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
    },
  },
};

export default function Footer() {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="p-6 flex justify-between items-center relative z-10"
    >
      {/* Left side - Club info */}
      <motion.p
        variants={itemVariants}
        className="text-[var(--theme-text-accent)] font-medium text-sm"
      >
        <span className="hidden md:inline">Arizona State University Claude Builder Club</span>
        <span className="md:hidden">ASU Claude Builder Club</span>
      </motion.p>

      {/* Right side - Repo link */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 text-[var(--theme-text-accent)] text-xs"
      >
        <motion.a
          href="https://github.com/shiven01/asucbc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] transition-colors duration-200 font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="View our GitHub repository"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.05.13 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
          </svg>
          <span>View our GitHub</span>
        </motion.a>
      </motion.div>
    </motion.footer>
  );
}
