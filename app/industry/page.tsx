"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading, Text, Card, Badge, Button } from "../components/ui";
import { motion } from "framer-motion";
import Link from "next/link";

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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
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

const sponsors = {
    current: [
        {
            name: "Anthropic",
            logo: "/assets/sponsors/anthropic.png",
            description: "Primary Sponsor"
        }
    ],
    past: [
        { name: "Polymarket", logo: "/assets/sponsors/polymarket.svg" },
        { name: "ether.fi", logo: "/assets/sponsors/etherfi.png" },
        { name: "Base", logo: "/assets/sponsors/base.svg" },
        { name: "RedBull", logo: "/assets/sponsors/redbull.png" },
        { name: "Acorns", logo: "/assets/sponsors/acorns.svg" },
        { name: "Streetsmart", logo: "/assets/sponsors/streetsmart.svg" }
    ],
};

const faqs = [
  {
    question: "How is ASU Claude Builder Club structured?",
    answer:
      "Each semester, we partner with clients to build custom products and services tailored to their needs. We assign dedicated project leaders and developers who work directly with companies to implement a fully-fledged project. Every team will meet weekly and check in throughout the semester.",
  },
  {
    question: "What is the timeframe for an ASU Claude Builder Club project?",
    answer:
      "Projects run over 10-12 weeks. We kick off in week 1 after a pitch call and a formal statement of work, demo progress around week 5, and present the final product with documentation and support by the semester's end.",
  },
  {
    question: "What value does ASU Claude Builder Club provide?",
    answer:
      "You get a high-impact solution built by top ASU talent, increased campus visibility, and a chance to support a student organization developing future tech leaders.",
  },
];

export default function IndustryPage() {
    return(
        <div className="min-h-screen flex flex-col">
        <Header />
        <div className="font-sans flex-1 pt-8 px-4 pb-8 sm:pt-12 sm:px-8 md:p-20">
            <div className="max-w-6xl mx-auto">

            {/* Page Header */}
            <div className="text-center mb-12">
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Heading level="h1" animate={false} className="mb-4">
                        Industry <span className="text-[var(--theme-text-accent)]">Partnerships</span>
                    </Heading>
                    <Text size="lg" variant="secondary" className="max-w-3xl mx-auto">
                        Partner with ASU's premier AI and software development club to build innovative solutions
                    </Text>
                </motion.div>
            </div>

            <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="mb-12"
            >
                <Card gradient className="text-center">
                    {/* Current Sponsor Section */}
                    <Badge variant="accent" size="lg" className="mb-6">
                        Current Primary Sponsor
                    </Badge>
                    <div className="flex justify-center items-center mb-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-64 h-32 flex items-center justify-center">
                            <img
                                src={sponsors.current[0].logo}
                                alt={`${sponsors.current[0].name} logo`}
                                className="flex-1 max-w-[200px] max-h-full object-contain dark:invert dark:hue-rotate-180"
                            />
                        </div>
                    </div>

                    {/* Past Sponsor Section */}
                    <Badge variant="accent" size="lg" className="mb-6">
                        Past Sponsors
                    </Badge>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {sponsors.past.map((sponsor, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <img
                                    src={sponsor.logo}
                                    alt={`${sponsor.name} logo`}
                                    className="flex-1 max-w-[120px] max-h-full object-contain dark:invert dark:hue-rotate-180"
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            </motion.div>

            { /* Partnership Information */}
            <motion.div
                custom={2}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="mb-12"
            >
                <Heading level="h2" className="mb-8 text-center">
                    Partnership Information
                </Heading>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <Card key={index} gradient hoverable>
                            <Heading level="h3" className="mb-3 text-[var(--theme-text-accent)]">
                                {faq.question}
                            </Heading>
                            <Text variant="secondary">{faq.answer}</Text>
                        </Card>
                    ))}
                </div>
            </motion.div>

            {/* Call to Action Section */}
            <motion.div
                custom={3}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
            >
                <Card gradient className="bg-gradient-to-br from-[var(--theme-card-bg)] to-[var(--theme-card-gradient-end)]">
                    <Heading level="h3" className="mb-4">
                        Ready to Partner With Us?
                    </Heading>
                    <Text size="base" variant="secondary" className="mb-6 max-w-2xl mx-auto">
                        Let's discuss how ASU Claude Builder Club can help bring your project to life
                    </Text>
                    <Link href="/contact">
                        <Button variant="primary" size="lg">
                            Get in Touch
                        </Button>
                    </Link>
                </Card>
            </motion.div>
        </div>
      </div>

      {/* Floating Contact Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 left-8 z-40"
      >
        <Link href="/contact">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] px-6 py-3 rounded-full shadow-lg hover:bg-[var(--theme-button-hover-bg)] transition-colors flex items-center gap-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Contact Us
          </motion.div>
        </Link>
      </motion.div>

      <Footer />
    </div>
    )
}
