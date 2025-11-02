"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HackathonSignupForm from "../components/HackathonSignupForm";
import { motion } from "framer-motion";

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 20,
      mass: 0.5,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
      mass: 0.5,
      delay: 0.1,
    },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 20,
      mass: 0.5,
      delay: 0.2,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 20,
      mass: 0.5,
      delay: 0.3,
    },
  },
};

export default function Hackathon() {
  return (
    <div className="min-h-[100dvh] max-h-[100dvh] flex flex-col overflow-y-auto">
      <Header />
      <div className="font-sans flex-1 pt-4 px-4 pb-0 sm:pt-8 sm:px-8 md:p-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.h1
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--theme-text-primary)] leading-tight mb-2"
            >
              🎃 Spooky <span className="text-[var(--theme-text-accent)] font-bold underline">Hackathon</span> 2025
            </motion.h1>
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
              className="bg-[var(--theme-button-bg)] text-white px-4 py-2 rounded-full inline-block text-sm font-semibold mb-4 cursor-default"
            >
              🚀 LIMITED TIME OPPORTUNITY
            </motion.div>
            <motion.p
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl text-[var(--theme-text-secondary)] max-w-2xl mx-auto"
            >
              Join us for an epic Halloween-themed hackathon! Build something spooky, win amazing prizes, and connect with fellow builders.
            </motion.p>
          </div>

          {/* Registration Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="bg-[var(--theme-card-bg)] backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border-2 border-[var(--theme-card-border)]"
          >
            <HackathonSignupForm />
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
