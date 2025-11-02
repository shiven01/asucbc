"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 20,
      mass: 0.8,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 20,
      mass: 0.5,
      delay: i * 0.1,
    },
  }),
};

export default function About() {
  return (
    <div className="min-h-[100dvh] max-h-[100dvh] relative overflow-y-auto">
      <Header />
      <div className="font-sans p-8 pb-20 sm:p-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Anthropic Logo */}
            <motion.div
              variants={imageVariants}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <Image
                  src="/claude-image.svg"
                  alt="Claude 3-7 Illustration"
                  width={800}
                  height={800}
                  className="w-[36rem] h-[36rem] lg:w-[40rem] lg:h-[40rem] object-contain claude-image-dark-mode"
                />
              </div>
            </motion.div>

            {/* Right side - Content */}
            <div className="text-center lg:text-left">
              <motion.h1
                variants={textVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--theme-text-primary)] mb-6"
              >
                About Anthropic
              </motion.h1>
              <motion.p
                variants={textVariants}
                className="text-[var(--theme-text-secondary)] text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                The Arizona State University Claude Builder Club is a
                student-run organization dedicated to exploring the cutting-edge
                capabilities of Anthropic's Claude AI. We foster innovation,
                collaboration, and learning in the rapidly evolving field of
                artificial intelligence.
              </motion.p>

              {/* Feature Cards */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
                  className="bg-[var(--theme-card-bg)] rounded-lg p-6 border border-[var(--theme-card-border)] cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">
                    AI Innovation
                  </h3>
                  <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
                    Explore the latest developments in AI technology and build
                    innovative applications using Claude's advanced
                    capabilities.
                  </p>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
                  className="bg-[var(--theme-card-bg)] rounded-lg p-6 border border-[var(--theme-card-border)] cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">
                    Community Learning
                  </h3>
                  <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
                    Join a vibrant community of students passionate about AI,
                    sharing knowledge and collaborating on exciting projects.
                  </p>
                </motion.div>

                <motion.div
                  custom={2}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
                  className="bg-[var(--theme-card-bg)] rounded-lg p-6 border border-[var(--theme-card-border)] cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">
                    Hands-on Projects
                  </h3>
                  <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
                    Work on real-world projects that showcase the power of
                    Claude AI and contribute to meaningful technological
                    solutions.
                  </p>
                </motion.div>

                <motion.div
                  custom={3}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
                  className="bg-[var(--theme-card-bg)] rounded-lg p-6 border border-[var(--theme-card-border)] cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">
                    Future-Ready Skills
                  </h3>
                  <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
                    Develop essential skills for the AI-driven future, preparing
                    for careers in technology and artificial intelligence.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Footer integrated into the grid layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: 0.6 }}
            className="mt-16 pt-8"
          >
            <Footer />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
