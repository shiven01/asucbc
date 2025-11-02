"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading, Text, Card } from "../components/ui";
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
              <Heading level="h1" animate={false} className="mb-6">
                About Anthropic
              </Heading>
              <Text size="lg" variant="secondary" className="mb-8 max-w-2xl mx-auto lg:mx-0">
                The Arizona State University Claude Builder Club is a
                student-run organization dedicated to exploring the cutting-edge
                capabilities of Anthropic's Claude AI. We foster innovation,
                collaboration, and learning in the rapidly evolving field of
                artificial intelligence.
              </Text>

              {/* Feature Cards */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  custom={0}
                  variants={cardVariants}
                >
                  <Card hoverable gradient className="cursor-pointer h-full">
                    <Heading level="h3" animate={false} className="mb-3">
                      AI Innovation
                    </Heading>
                    <Text size="sm" variant="secondary">
                      Explore the latest developments in AI technology and build
                      innovative applications using Claude's advanced
                      capabilities.
                    </Text>
                  </Card>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={cardVariants}
                >
                  <Card hoverable gradient className="cursor-pointer h-full">
                    <Heading level="h3" animate={false} className="mb-3">
                      Community Learning
                    </Heading>
                    <Text size="sm" variant="secondary">
                      Join a vibrant community of students passionate about AI,
                      sharing knowledge and collaborating on exciting projects.
                    </Text>
                  </Card>
                </motion.div>

                <motion.div
                  custom={2}
                  variants={cardVariants}
                >
                  <Card hoverable gradient className="cursor-pointer h-full">
                    <Heading level="h3" animate={false} className="mb-3">
                      Hands-on Projects
                    </Heading>
                    <Text size="sm" variant="secondary">
                      Work on real-world projects that showcase the power of
                      Claude AI and contribute to meaningful technological
                      solutions.
                    </Text>
                  </Card>
                </motion.div>

                <motion.div
                  custom={3}
                  variants={cardVariants}
                >
                  <Card hoverable gradient className="cursor-pointer h-full">
                    <Heading level="h3" animate={false} className="mb-3">
                      Future-Ready Skills
                    </Heading>
                    <Text size="sm" variant="secondary">
                      Develop essential skills for the AI-driven future, preparing
                      for careers in technology and artificial intelligence.
                    </Text>
                  </Card>
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
