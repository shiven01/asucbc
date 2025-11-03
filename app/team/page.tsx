"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { TeamMember, teamMembers } from "../../types/team";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { TeamMemberCard } from "../components/Team/TeamMemberCard";
import { Heading, Text } from "../components/ui";

const titleVariants = {
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

const subtitleVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 20,
      mass: 0.5,
      delay: 0.1,
    },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
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

export default function TeamPage() {
  const [activeMember, setActiveMember] = useState<TeamMember["id"] | null>(null);
  return (
    <div className="min-h-[100dvh] max-h-[100dvh] relative overflow-y-auto">
      <Header />
      <div className="font-sans p-8 pb-20 sm:p-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-16 flex flex-col items-center max-w-prose mx-auto">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              <Heading level="h1" animate={false} className="mb-4">
                Meet Our Team
              </Heading>
            </motion.div>
            <motion.div
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              <Text size="lg" variant="secondary" className="max-w-2xl">
                A diverse group of individuals passionate about AI and its potential to transform education and technology.
              </Text>
            </motion.div>
          </div>
          {/* Team Members Grid */}
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12"
          >
            {/* Team Member Card */}
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                className={activeMember === member.id ? "z-20" : ""}
              >
                <TeamMemberCard member={member} activeMember={activeMember} setActiveMember={setActiveMember} />
              </motion.div>
            ))}
          </motion.div>

          {/* Open Source Contributors Section */}
          <div className="mt-20">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-8"
            >
              <Heading level="h2" animate={false} className="mb-2">
                Open Source Contributors
              </Heading>
              <Text size="sm" variant="secondary" className="max-w-prose mx-auto">
                Thanks to everyone helping build and improve this project.
              </Text>
            </motion.div>

            <motion.div
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {[
                { name: "AwesomeJaith", url: "https://github.com/AwesomeJaith" },
                { name: "anmol7470", url: "https://github.com/anmol7470" },
                { name: "icedTet", url: "https://github.com/icedTet" },
                { name: "shiven01", url: "https://github.com/shiven01" },
              ].map((contrib) => (
                <motion.div key={contrib.url} variants={cardVariants}>
                  <div className="w-full h-full rounded-lg border-2 border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/100 shadow-sm p-4 flex flex-col items-center text-center transition-colors">
                    <div className="w-16 h-16 rounded-full bg-[var(--theme-card-bg)]/50 border border-[var(--theme-card-border)] mb-3 flex items-center justify-center text-[var(--theme-text-accent)]">
                      {/* No image as requested */}
                      <span className="text-xs">OS</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-semibold text-[var(--theme-text-primary)]">{contrib.name}</span>
                      <a
                        href={contrib.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--theme-text-accent)] hover:text-[var(--theme-text-primary)] transition-colors"
                      >
                        View GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
