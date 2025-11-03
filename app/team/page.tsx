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
  const [activeMember, setActiveMember] = useState<TeamMember["id"] | null>(
    null
  );
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
                A diverse group of individuals passionate about AI and its
                potential to transform education and technology.
              </Text>
            </motion.div>
          </div>
          {/* Team Members Grid */}
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12"
          >
            {/* Team Member Card */}
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                className={activeMember === member.id ? "z-20" : ""}
              >
                <TeamMemberCard
                  member={member}
                  activeMember={activeMember}
                  setActiveMember={setActiveMember}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
