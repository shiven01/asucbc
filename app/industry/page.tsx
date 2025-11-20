"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FiMail, FiChevronDown } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading, Text, Card } from "../components/ui";

// Data
const currentSponsor = {
  name: "Anthropic",
  description: "Anthropic partners with us to bridge industry and academia, empowering ASU students to build real-world AI solutions with Claude. Together we're fostering the next generation of responsible AI developers.",
  logo: "/assets/hackathon/sponsors/anthropic.png",
  url: "https://www.anthropic.com",
};

const pastSponsors = [
  { name: "Polymarket", logo: "/assets/hackathon/sponsors/polymarket.svg", url: "https://polymarket.com" },
  { name: "ether.fi", logo: "/assets/hackathon/sponsors/etherfi.png", url: "https://www.ether.fi" },
  { name: "Base", logo: "/assets/hackathon/sponsors/base.svg", url: "https://www.base.org" },
  { name: "Redbull", logo: "/assets/hackathon/sponsors/redbull.png", url: "https://www.redbull.com" },
  { name: "Acorns", logo: "/assets/hackathon/sponsors/acorns.svg", url: "https://www.acorns.com" },
  { name: "Streetsmart", logo: "/assets/hackathon/sponsors/streetsmart.svg", url: "https://streetsmart.org" },
];

const faqData = [
  {
    question: "How is ASU Claude Builder Club structured?",
    answer: "Each semester, we partner with clients to build custom products and services tailored to their needs. We assign dedicated project leaders and developers who work directly with companies to implement a fully-fledged project. Every team will meet weekly and check in throughout the semester.",
  },
  {
    question: "What is the timeframe for an ASU Claude Builder Club project?",
    answer: "Projects run over 10-12 weeks. We kick off in week 1 after a pitch call and a formal statement of work, demo progress around week 5, and present the final product with documentation and support by the semester's end.",
  },
  {
    question: "What value does ASU Claude Builder Club provide?",
    answer: "You get a high-impact solution built by top ASU talent, increased campus visibility, and a chance to support a student organization developing future tech leaders.",
  },
];

// FAQ Accordion Component
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqData.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className="overflow-hidden cursor-pointer hover:border-[var(--theme-text-accent)] transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <Heading level="h3" animate={false} className="text-lg font-semibold text-[var(--theme-text-accent)]">
                  {faq.question}
                </Heading>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="w-5 h-5 flex-shrink-0" />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Text variant="secondary" className="mt-4 leading-relaxed">
                      {faq.answer}
                    </Text>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default function IndustryPage() {
  return (
    <div className="min-h-[100dvh] max-h-[100dvh] relative overflow-y-auto">
      <Header />

      <div className="font-sans relative">
        {/* Hero Section */}
        <section className="relative px-8 pt-20 pb-32 sm:px-20 sm:pt-32 sm:pb-40">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-text-accent)]/5 via-transparent to-[var(--theme-text-accent)]/10 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Hero Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-text-accent)]/10 border border-[var(--theme-text-accent)]/20">
                  <div className="w-2 h-2 rounded-full bg-[var(--theme-text-accent)] animate-pulse" />
                  <Text size="sm" className="font-medium text-[var(--theme-text-accent)]">
                    Now Accepting Partnership Proposals
                  </Text>
                </div>

                <Heading level="h1" animate={false} className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
                  Partner With{" "}
                  <span className="text-[var(--theme-text-accent)]">ASU's AI Innovators</span>
                </Heading>

                <Text size="xl" variant="secondary" className="leading-relaxed">
                  Join leading companies partnering with elite ASU engineering talent to build cutting-edge AI solutions with Claude.
                </Text>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[var(--theme-button-bg)] text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <FiMail />
                    Get in Touch
                  </motion.button>
                </Link>
              </motion.div>

              {/* Right: Current Sponsor */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  scale={1.02}
                  glareEnable
                  glareMaxOpacity={0.2}
                >
                  <Link href={currentSponsor.url} target="_blank" rel="noopener noreferrer" className="block">
                    <Card gradient hoverable animated={false} className="p-8 sm:p-12">
                      <Text size="sm" className="uppercase tracking-[0.3em] text-[var(--theme-text-accent)] mb-6 font-bold">
                        CURRENT SPONSOR
                      </Text>
                      <div className="relative h-20 w-56">
                        <Image
                          src={currentSponsor.logo}
                          alt={`${currentSponsor.name} logo`}
                          fill
                          sizes="224px"
                          className="object-contain dark:invert dark:hue-rotate-180"
                        />
                      </div>
                      <Text variant="secondary" className="leading-relaxed">
                        {currentSponsor.description}
                      </Text>
                    </Card>
                  </Link>
                </Tilt>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-8 py-20 sm:px-20 bg-[var(--theme-card-bg)]/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Text size="sm" className="uppercase tracking-[0.3em] text-[var(--theme-text-accent)] mb-4 font-bold">
                PARTNERSHIP FAQ
              </Text>
              <Heading level="h2" animate={false} className="text-4xl sm:text-5xl">
                Frequently Asked Questions
              </Heading>
            </motion.div>
            <FAQAccordion />
          </div>
        </section>

        {/* Past Sponsors */}
        <section className="px-8 py-20 sm:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Text size="sm" className="uppercase tracking-[0.3em] text-[var(--theme-text-accent)] mb-4 font-bold">
                TRUSTED BY
              </Text>
              <Heading level="h2" animate={false} className="text-3xl sm:text-4xl">
                Past Sponsors
              </Heading>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {pastSponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    scale={1.05}
                    glareEnable
                    glareMaxOpacity={0.1}
                  >
                    <Link href={sponsor.url} target="_blank" rel="noopener noreferrer">
                      <Card hoverable animated={false} className="p-6 flex items-center justify-center">
                        <div className="relative h-12 w-28">
                          <Image
                            src={sponsor.logo}
                            alt={`${sponsor.name} logo`}
                            fill
                            sizes="112px"
                            className="object-contain dark:invert dark:hue-rotate-180"
                          />
                        </div>
                      </Card>
                    </Link>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="px-8 pb-20 sm:px-20">
          <div className="max-w-7xl mx-auto">
            <Footer />
          </div>
        </div>
      </div>

      {/* Floating Contact Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--theme-button-bg)] text-white shadow-2xl flex items-center justify-center border-2 border-[var(--theme-text-accent)]/30"
            aria-label="Contact Us"
          >
            <FiMail className="w-6 h-6" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
