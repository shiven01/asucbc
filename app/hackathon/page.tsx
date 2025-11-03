"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HackathonSignupForm from "../components/HackathonSignupForm";
import { Heading, Text, Badge, Card } from "../components/ui";
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
            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate="visible"
            >
              <Heading level="h1" animate={false} className="leading-tight mb-2">
                <span className="text-[var(--theme-text-accent)] font-bold underline">HackASU</span> 2025
              </Heading>
            </motion.div>
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
              className="inline-block mb-4 cursor-default"
            >
              <Badge variant="primary" size="lg">LIMITED TIME OPPORTUNITY</Badge>
            </motion.div>
            <motion.div
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              <Text size="xl" variant="secondary" className="max-w-2xl mx-auto leading-relaxed">
                Hey everyone — The Claude Builder Club @ ASU is hosting a 24‑hour hackathon sponsored by Anthropic, Polymarket, Acorns, Silicon Oasis, StreetSmart, and more.
                <br />
                <br />
                <strong>Date:</strong> Nov. 8–9, starts 11 AM
                <br />
                <strong>Location:</strong> Memorial Union, Pima (230)
                <br />
                <br />
                Enjoy free Claude Pro accounts, $50 in API credits, thousands in prizes, food and drinks, mentorship from top tech students, and more!
              </Text>
            </motion.div>
          </div>

          {/* Registration Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <Card gradient animated={false} className="shadow-xl">
              <HackathonSignupForm />
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
