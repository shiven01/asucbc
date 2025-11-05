"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Confetti from "react-confetti-boom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Countdown from "../components/Countdown";
import { Heading, Text, Card, Button } from "../components/ui";
import Link from "next/link";

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 20,
    },
  },
};

interface ScheduleItemProps {
  time: string;
  title: string;
  description?: string;
  delay?: number;
}

function ScheduleItem({
  time,
  title,
  description,
  delay = 0,
}: ScheduleItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: delay,
      }}
      className="relative pl-8 pb-8 border-l-2 border-[var(--theme-text-accent)] last:border-l-0 last:pb-0"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--theme-text-accent)] border-2 border-[var(--theme-card-bg)]" />
      <div className="font-bold text-[var(--theme-text-accent)] text-sm mb-1">
        {time}
      </div>
      <h3 className="font-bold text-lg mb-1 text-[var(--theme-text-primary)]">
        {title}
      </h3>
      {description && (
        <p className="text-[var(--theme-text-dark)] text-sm leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

interface TrackCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
  link?: string;
  linkText?: string;
  mystery?: boolean;
}

const killMessages = [
  "Just wait for me to update. Keep clicking and see what happens!",
  "Are you trying to break me?",
  "Patience is a virtue!",
  "You can just wait it out y'know!",
  "Ok, you're persistent...",
  "Instead of touching me, why not touch some grass?",
  "Your dedication is noted.",
];

function TrackCard({
  icon,
  title,
  description,
  delay = 0,
  link,
  linkText,
  mystery = false,
}: TrackCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, delay * 1000 + 500); // delay in seconds + animation duration
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, hasAnimated]);

  const [wiggle, setWiggle] = useState(false);
  const [hitCount, setHitCount] = useState(0);
  const [isShattered, setIsShattered] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const breakAudioRef = useRef<HTMLAudioElement | null>(null);
  const getXPAudioRef = useRef<HTMLAudioElement | null>(null);

  // Preload audio
  useEffect(() => {
    audioRef.current = new Audio(
      "https://raw.githubusercontent.com/misode/mcmeta/1.21.10-assets/assets/minecraft/sounds/mob/villager/hit3.ogg"
    );
    audioRef.current.preload = "auto";
    audioRef.current.volume = 0.5;

    breakAudioRef.current = new Audio(
      "https://raw.githubusercontent.com/misode/mcmeta/1.21.10-assets/assets/minecraft/sounds/mob/villager/death.ogg"
    );
    breakAudioRef.current.preload = "auto";
    breakAudioRef.current.volume = 0.6;

    getXPAudioRef.current = new Audio(
      "https://raw.githubusercontent.com/misode/mcmeta/1.21.10-assets/assets/minecraft/sounds/ui/toast/challenge_complete.ogg"
    );
    getXPAudioRef.current.preload = "auto";
    getXPAudioRef.current.volume = 0.5;
  }, []);

  const handleWiggle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (wiggle) return; // Prevent triggering while already wiggling

    // Calculate click position relative to viewport
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setConfettiOrigin({ x, y });

    // Increment hit count
    const newHitCount = hitCount + 1;
    setHitCount(newHitCount);

    // Check if we've reached 5 hits
    if (newHitCount >= 5) {
      // Play break sound
      if (breakAudioRef.current) {
        breakAudioRef.current.currentTime = 0;
        breakAudioRef.current
          .play()
          .catch((err) => console.log("Break audio play failed:", err))
          .then(async () => {
            // Play get XP sound after 300ms break sound finishes
            await new Promise((resolve) => setTimeout(resolve, 500));
            getXPAudioRef.current
              ?.play()
              .catch((err) => console.log("Get XP audio play failed:", err));
          });
      }

      // Track the shatter event with Umami
      if (typeof window !== "undefined" && window.umami) {
        //@ts-ignore Umami shennanigans
        window.umami.track("mystery-card-shattered", {
          clickCount: newHitCount,
          totalShatters: clickCount + 1,
          title: title,
        });
      }

      // Trigger shatter animation
      setIsShattered(true);

      // Show toast after a brief delay
      setTimeout(() => {
        setShowToast(true);
      }, 800);

      // Auto-dismiss toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4800);

      // Reset after shatter animation completes
      setTimeout(() => {
        setIsShattered(false);
        setClickCount((c) => c + 1);
        setHitCount(0);
      }, 5000);

      return;
    }

    // Play villager sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play failed:", err));
    }

    setWiggle(true);

    // Trigger confetti
    setConfettiKey((prev) => prev + 1);

    // Reset wiggle after animation completes
    setTimeout(() => {
      setWiggle(false);
    }, 500);
  };

  if (mystery) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        whileHover={{ scale: 1.05 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 15,
          delay: hasAnimated ? 0 : delay,
        }}
        className={`h-full ${isShattered ? "pointer-events-none" : ""}`}
      >
        <motion.div
          ref={cardRef}
          animate={
            isShattered
              ? {}
              : wiggle
              ? {
                  x: [0, -10, 10, -10, 10, 0],
                  rotate: [0, -5, 5, -5, 5, 0],
                }
              : { scale: 1, opacity: 1 }
          }
          transition={{
            duration: isShattered ? 1.5 : 0.5,
            ease: "easeInOut",
          }}
          onClick={handleWiggle}
          className="h-full cursor-pointer relative"
        >
          {/* Confetti effect */}
          {confettiKey > 0 && (
            <Confetti
              key={confettiKey}
              mode="boom"
              particleCount={150}
              colors={["#cc785c", "#e5947d", "#d4c4a8", "#5d4e37"]}
              shapeSize={24}
              spreadDeg={360}
              effectCount={1}
              effectInterval={3000}
              deg={270}
              x={confettiOrigin.x}
              y={confettiOrigin.y}
              className={`w-[300%] h-[300%] absolute top-[-25%] left-[-25%] pointer-events-none z-10`}
            />
          )}

          {/* Shatter effect */}
          {isShattered && (
            <>
              <div className="absolute inset-0 pointer-events-none z-30">
                {[...Array(16)].map((_, i) => {
                  const angle = (360 / 16) * i;
                  const distance = 300 + Math.random() * 500;
                  const x = Math.cos((angle * Math.PI) / 180) * distance;
                  const y = Math.sin((angle * Math.PI) / 180) * distance;
                  const rotation = Math.random() * 720 - 360;

                  return (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-br from-[var(--theme-text-accent)] to-[var(--theme-button-alternate-bg)] rounded-sm"
                      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                      animate={{
                        x: x,
                        y: y,
                        opacity: 0,
                        rotate: rotation,
                        scale: 0.5,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "circInOut",
                      }}
                    />
                  );
                })}
              </div>

              {/* Minecraft Advancement Toast */}
            </>
          )}

          {/* Programmatically controlled toast */}
          {showToast && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              className="absolute -top-20 right-0 z-50 pointer-events-none"
            >
              <div className="bg-[#2d2d2d] ring-2  ring-gray-600 rounded-sm shadow-2xl overflow-hidden min-w-[300px]">
                {/* Yellow top border */}
                {/* <div className="h-1 bg-gradient-to-r from-[#ffff00] via-[#ffee00] to-[#ffff00]" /> */}

                <div className="p-3 flex items-center gap-3">
                  {/* Achievement icon */}
                  <div className="w-12 h-12 bg-[#8b4513] rounded-sm border-2 border-[#d4a574] flex items-center justify-center text-2xl flex-shrink-0">
                    🎯
                  </div>

                  <div className="flex-1">
                    <div className="text-[#ed8cf6] text-xs font-bold mb-0.5 tracking-wide">
                      Challenge Complete!
                    </div>
                    <div className="text-white text-sm font-semibold">
                      Impatient person
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {
                        killMessages[
                          Math.min(clickCount, killMessages.length - 1)
                        ]
                      }
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <Card
            gradient
            animated={false}
            className={`h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-[var(--theme-card-bg)] to-[var(--theme-gradient-accent)] !p-0 ${
              isShattered ? "opacity-50 blur-lg" : ""
            }`}
            childrenAreRelative={false}
          >
            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                background:
                  "linear-gradient(45deg, var(--theme-text-accent), var(--theme-button-alternate-bg), var(--theme-text-accent))",
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-[2px] bg-[var(--theme-card-bg)] rounded-lg" />

            {/* Animated blob background */}
            <motion.div
              className="absolute inset-[2px] rounded-lg opacity-20 pointer-events-none z-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 40%, var(--theme-text-accent) 0%, transparent 50%), radial-gradient(circle at 70% 60%, var(--theme-button-alternate-bg) 0%, transparent 50%)",
              }}
              animate={{
                scale: [2, 2.4, 2],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center p-6">
              {/* Animated question mark */}
              <motion.div
                className="text-6xl mb-4 opacity-30"
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ❓
              </motion.div>
              <motion.h3
                className="font-bold text-2xl mb-2 text-[var(--theme-text-accent)]"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Coming Soon
              </motion.h3>
              <p className="text-[var(--theme-text-dark)] leading-relaxed">
                This track's details are still under wraps. Stay tuned for
                updates!
              </p>

              {/* Hit counter badge */}
              {hitCount > 0 && hitCount < 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 px-3 py-1 bg-[var(--theme-text-accent)]/20 rounded-full border-2 border-[var(--theme-text-accent)]"
                >
                  <span className="text-xs font-bold text-[var(--theme-text-accent)]">
                    {hitCount}/5 hits
                  </span>
                </motion.div>
              )}

              {/* Animated badge with shimmer */}
              <motion.div
                className="mt-6 px-4 py-2 bg-[var(--theme-text-accent)]/10 rounded-full relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-sm font-semibold text-[var(--theme-text-accent)] relative z-10">
                  TO BE ANNOUNCED
                </span>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: hasAnimated ? 0 : delay,
      }}
      className="h-full"
    >
      <Card gradient animated={false} className="h-full flex flex-col">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="font-bold text-xl mb-2 text-[var(--theme-text-primary)]">
          {title}
        </h3>
        <p className="text-[var(--theme-text-dark)] leading-relaxed flex-1">
          {description}
        </p>
        {link && (
          <div className="mt-4 pt-4 border-t border-[var(--theme-card-border)]">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--theme-text-accent)] hover:text-[var(--theme-button-hover-bg)] font-semibold transition-colors"
            >
              {linkText || "Learn more"}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

interface PrizeItemProps {
  emoji: string;
  title: string;
  prizes: string;
  delay?: number;
  highlight?: boolean;
}

interface SponsorCardProps {
  name: string;
  tier?: "title" | "platinum" | "gold" | "partner";
  delay?: number;
  logo?: string;
  url?: string;
}

function SponsorCard({
  name,
  tier = "partner",
  delay = 0,
  logo,
  url,
}: SponsorCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getTierStyles = () => {
    switch (tier) {
      case "title":
        return "scale-100 bg-gradient-to-br from-[var(--theme-text-accent)] to-[var(--theme-button-alternate-bg)] border-4 border-[var(--theme-text-accent)]";
      case "platinum":
        return "bg-[var(--theme-card-bg)] border-3 border-[var(--theme-text-accent)]";
      case "gold":
        return "bg-[var(--theme-card-bg)] border-2 border-[var(--theme-text-accent)]/70";
      default:
        return "bg-[var(--theme-card-bg)] border-2 border-[var(--theme-card-border)] hover:border-[var(--theme-text-accent)]";
    }
  };

  const getTextColor = () => {
    return tier === "title" ? "text-white" : "text-[var(--theme-text-primary)]";
  };

  const getLogoHeight = () => {
    switch (tier) {
      case "title":
        return "h-32"; // Largest for title sponsors
      case "platinum":
        return "h-24"; // Medium-large for platinum
      case "gold":
        return "h-20"; // Medium for gold
      default:
        return "h-16"; // Smallest for partners
    }
  };

  const content = (
    <div
      className={`h-full flex flex-col items-center justify-center rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all ${getTierStyles()} ${
        url ? "cursor-pointer" : ""
      }`}
    >
      {logo ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className={`relative w-full ${getLogoHeight()} flex items-center justify-center`}>
            <img
              src={logo}
              alt={`${name} logo`}
              className="max-w-full max-h-full object-contain dark:invert dark:hue-rotate-180"
            />
          </div>
          <h3 className={`font-bold text-xl text-center ${getTextColor()}`}>
            {name}
          </h3>
        </div>
      ) : (
        <h3 className={`font-bold text-2xl text-center ${getTextColor()}`}>
          {name}
        </h3>
      )}
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              transition: {
                delay: delay,
                type: "spring",
                stiffness: 60,
                damping: 15,
              },
            }
          : { opacity: 0, scale: 0.9 }
      }
      whileHover={{ scale: tier === "title" ? 1.1 : 1.05, y: -8 }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
      }}
      className="h-full"
    >
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="h-full block"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
}

function PrizeItem({
  emoji,
  title,
  prizes,
  delay = 0,
  highlight = false,
}: PrizeItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                delay: delay,
                type: "spring",
                stiffness: 60,
                damping: 15,
              },
            }
          : { opacity: 0, y: 20 }
      }
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
      }}
      className="h-full"
    >
      <div
        className={`h-full flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all ${
          highlight
            ? "bg-gradient-to-br from-[var(--theme-text-accent)] to-[var(--theme-button-alternate-bg)] border-4 border-[var(--theme-text-accent)]"
            : "bg-[var(--theme-card-bg)] border-2 border-[var(--theme-card-border)] hover:border-[var(--theme-text-accent)]"
        }`}
      >
        {/* Top accent bar */}
        <div
          className={`h-2 ${
            highlight
              ? "bg-white/30"
              : "bg-gradient-to-r from-[var(--theme-text-accent)] to-[var(--theme-button-alternate-bg)]"
          }`}
        />

        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Emoji icon with circle background */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-4xl ${
              highlight
                ? "bg-white/20 backdrop-blur-sm"
                : "bg-gradient-to-br from-[var(--theme-gradient-accent)] to-transparent"
            }`}
          >
            {emoji}
          </div>

          {/* Title */}
          <h3
            className={`font-black text-xl mb-3 leading-tight ${
              highlight ? "text-white" : "text-[var(--theme-text-accent)]"
            }`}
          >
            {title}
          </h3>

          {/* Prize description */}
          <p
            className={`text-base leading-relaxed flex-1 ${
              highlight ? "text-white/90" : "text-[var(--theme-text-dark)]"
            }`}
          >
            {prizes}
          </p>

          {/* Bottom decoration */}
          {highlight && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <span className="text-sm font-bold text-white/80 uppercase tracking-wider">
                Featured Prize
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hackathon() {
  return (
    <div className="max-h-full flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--theme-text-accent)] text-[var(--theme-card-bg)] rounded-full font-bold text-sm tracking-wider">
              NOVEMBER 8-9, 2025
            </div>
            <Heading
              level="h1"
              animate={false}
              className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 leading-none"
            >
              <span className="text-[var(--theme-text-primary)]">Hack</span>
              <span className="text-[var(--theme-text-accent)]">ASU</span>
            </Heading>
            <Text
              size="xl"
              className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed"
            >
              24 hours. Unlimited creativity. Build with Claude AI at ASU&apos;s
              most innovative hackathon.
            </Text>
          </motion.div>

          {/* Countdown */}
          <div className="mb-8">
            <Countdown targetDate={new Date("2025-11-08T11:00:00")} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/hackathon/signup">
                <Button size="lg" className="text-lg px-8 py-6">
                  Register Now
                </Button>
              </Link>
              <div className="text-[var(--theme-text-dark)]">
                <p className="font-bold">Memorial Union, Pima (230)</p>
                <p className="text-sm">11 AM Start • Nov 8-9</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-[var(--theme-gradient-accent)] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Heading level="h2" className="text-4xl sm:text-5xl font-bold mb-4">
              Hackathon{" "}
              <span className="text-[var(--theme-text-accent)]">Tracks</span>
            </Heading>
            <Text size="lg" variant="secondary">
              Choose your challenge and compete for track-specific prizes
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            <TrackCard
              icon="📚"
              title="Education & Accessibility"
              description="Create tools that make learning more engaging, accessible, or personalized. Could include tutoring systems, interactive learning experiences, or accessibility tools."
              delay={0.2}
            />

            <TrackCard
              icon="❓"
              title="Nice Try Reading This | Mystery Track 2"
              description="Nice try! This track is a mystery and will be revealed soon. Stay tuned on our Discord for updates or come back later to see what exciting new challenge awaits!"
              mystery={true}
              link="https://v6.tet.moe"
              linkText="You found the easter egg!"
              delay={0.3}
            />
            <TrackCard
              icon="❓"
              title="Nice Try Reading This | Mystery Track 3"
              description="Nice try! This track is a mystery and will be revealed soon. Stay tuned on our Discord for updates or come back later to see what exciting new challenge awaits!"
              mystery={true}
              link="https://v6.tet.moe"
              linkText="You found the easter egg!"
              delay={0.4}
            />
            <TrackCard
              icon="❓"
              title="Nice Try Reading This | Mystery Track 4"
              description="Nice try! This track is a mystery and will be revealed soon. Stay tuned on our Discord for updates or come back later to see what exciting new challenge awaits!"
              mystery={true}
              link="https://v6.tet.moe"
              linkText="You found the easter egg!"
              delay={0.5}
            />
            <TrackCard
              icon="❓"
              title="Nice Try Reading This | Mystery Track 5"
              description="Nice try! This track is a mystery and will be revealed soon. Stay tuned on our Discord for updates or come back later to see what exciting new challenge awaits!"
              mystery={true}
              link="https://v6.tet.moe"
              linkText="You found the easter egg!"
              delay={0.6}
            />
            <TrackCard
              icon="❓"
              title="Nice Try Reading This | Mystery Track 6"
              description="Nice try! This track is a mystery and will be revealed soon. Stay tuned on our Discord for updates or come back later to see what exciting new challenge awaits!"
              mystery={true}
              link="https://v6.tet.moe"
              linkText="You found the easter egg!"
              delay={0.7}
            />
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Heading level="h2" className="text-4xl sm:text-5xl font-bold mb-4">
              24-Hour{" "}
              <span className="text-[var(--theme-text-accent)]">Schedule</span>
            </Heading>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Day 1 */}
            <div>
              <h3 className="text-3xl font-bold mb-8 text-[var(--theme-text-accent)]">
                Day 1 - November 8
              </h3>
              <ScheduleItem
                time="10:00 AM - 11:00 AM"
                title="Registration & Breakfast"
                description="Check-in, swag distribution, team formation area. Light breakfast and networking"
              />
              <ScheduleItem
                time="11:00 AM - 12:00 PM"
                title="Opening Ceremony"
                description="Welcome from organizers and Anthropic sponsors. Hackathon rules, prizes, track announcements, and Claude API demo"
              />
              <ScheduleItem
                time="12:00 PM - 1:00 PM"
                title="Hacking Begins! Team Formation & Ideation"
                description="Teams finalize and register their projects. Access to mentors for initial concept validation. Lunch available"
              />
              <ScheduleItem
                time="1:00 PM - 6:00 PM"
                title="Hacking Sprint #1"
                description="Mentors circulating, help desk for API issues, track-specific mentor hours"
              />
              <ScheduleItem time="6:00 PM - 7:00 PM" title="Dinner Break" />
              <ScheduleItem
                time="7:00 PM - 8:30 PM"
                title="Hacking Sprint #2"
              />
              <ScheduleItem
                time="8:30 PM - 9:30 PM"
                title="Minecraft Tournament Break! 🎮"
                description="Optional team-based Minecraft mini-games tournament. Prizes for winners. Relaxation area for those who prefer to rest"
              />
              <ScheduleItem
                time="9:30 PM - 12:00 AM"
                title="Evening Hacking Sprint"
                description="Snacks and energy drinks available"
              />
            </div>

            {/* Day 2 */}
            <div>
              <h3 className="text-3xl font-bold mb-8 text-[var(--theme-text-accent)]">
                Day 2 - November 9
              </h3>
              <ScheduleItem
                time="12:00 AM - 6:00 AM"
                title="Overnight Hacking & Rest"
                description="Quiet hours for sleeping. Dedicated space for night owl teams. Midnight pizza at 2 AM"
              />
              <ScheduleItem time="6:00 AM - 7:00 AM" title="Breakfast" />
              <ScheduleItem
                time="7:00 AM - 10:00 AM"
                title="Final Sprint"
                description="Last push for features and polish. Code freeze reminder at 9:30 AM"
              />
              <ScheduleItem
                time="10:00 AM - 10:30 AM"
                title="Submission Deadline & Setup"
                description="Hard deadline for submissions. Teams set up demo stations"
              />
              <ScheduleItem
                time="10:30 AM - 12:00 PM"
                title="Judging & Demos"
                description="Teams present to judges (3 min demos + 1 min Q&A). Expo-style viewing for other participants"
              />
              <ScheduleItem
                time="12:00 PM - 1:00 PM"
                title="Closing Ceremony & Lunch"
                description="Winner announcements for each track + grand prize. Sponsor remarks. Distribution of prizes. Closing lunch"
              />
              <ScheduleItem
                time="1:00 PM"
                title="Event Ends"
                description="See you next year!"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-transparent via-[var(--theme-gradient-accent)] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Heading level="h2" className="text-4xl sm:text-5xl font-bold mb-4">
              Prizes &{" "}
              <span className="text-[var(--theme-text-accent)]">Rewards</span>
            </Heading>
            <Text size="lg" variant="secondary">
              Over $1500 in prizes and API credits
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr">
            <PrizeItem
              emoji="🏆"
              title="Grand Prize (Best Overall)"
              prizes="$500 Claude API Credits + Nintendo Switch"
              delay={0}
              highlight={true}
            />
            <PrizeItem
              emoji="🥈"
              title="Second Place"
              prizes="$250 Claude API Credits"
              delay={0.1}
            />
            <PrizeItem
              emoji="🥉"
              title="Third Place"
              prizes="$150 Claude API Credits"
              delay={0.2}
            />
            <PrizeItem
              emoji="⭐"
              title="Best per Track (6 winners)"
              prizes="$100 API credits split + Claude merch"
              delay={0.3}
            />
            <PrizeItem
              emoji="🎖️"
              title="Honorable Mentions"
              prizes="Claude merch"
              delay={0.4}
            />
            <PrizeItem
              emoji="🎮"
              title="Minecraft Minigame Winners"
              prizes="Plushies"
              delay={0.5}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-[var(--theme-card-bg)] border-2 border-[var(--theme-text-accent)] rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-4 text-[var(--theme-text-accent)]">
              Additional Swag & Prizes
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--theme-text-dark)]">
              <li className="flex items-center">
                <span className="mr-2">🎵</span> Echo Pop (5 units)
              </li>
              <li className="flex items-center">
                <span className="mr-2">🎮</span> Nintendo Switch
              </li>
              <li className="flex items-center">
                <span className="mr-2">🎁</span> Mystery Prizes (5 units)
              </li>
              <li className="flex items-center">
                <span className="mr-2">💬</span> Discord Nitro Classic x2
              </li>
              <li className="flex items-center">
                <span className="mr-2">🧱</span> Lego Set
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-[var(--theme-gradient-accent)] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Heading level="h2" className="text-4xl sm:text-5xl font-bold mb-4">
              Our{" "}
              <span className="text-[var(--theme-text-accent)]">Sponsors</span>
            </Heading>
            <Text size="lg" variant="secondary">
              Thank you to our amazing sponsors who make this event possible
            </Text>
          </motion.div>

          {/* Title Sponsors */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-[var(--theme-text-accent)]">
              Title Sponsors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <SponsorCard
                name="Anthropic"
                tier="title"
                delay={0}
                url="https://anthropic.com"
                logo="/assets/hackathon/sponsors/anthropic.png"
              />

              <SponsorCard
                name="EtherFi"
                tier="title"
                delay={0.1}
                url="https://ether.fi"
                logo="/assets/hackathon/sponsors/etherfi.png"
              />
            </div>
          </div>

          {/* Platinum Sponsors */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-6 text-[var(--theme-text-dark)]">
              Platinum Sponsors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SponsorCard
                name="Base"
                tier="platinum"
                delay={0.2}
                url="https://base.org"
                logo="/assets/hackathon/sponsors/base.svg"
              />
              <SponsorCard
                name="Acorns"
                tier="platinum"
                delay={0.3}
                url="https://acorns.com"
                logo="/assets/hackathon/sponsors/acorns.svg"
              />
              <SponsorCard
                name="Streetsmart"
                tier="platinum"
                delay={0.4}
                url="https://streetsmart.com"
                logo="/assets/hackathon/sponsors/streetsmart.svg"

              />
            </div>
          </div>

          {/* Partner Sponsors */}
          <div>
            <h3 className="text-lg font-bold text-center mb-6 text-[var(--theme-text-dark)]">
              Partners
            </h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
                <SponsorCard
                  name="ASU GDSC"
                  tier="partner"
                  delay={0.5}
                  url="https://www.asudsc.com/"
                  logo="/assets/hackathon/sponsors/gdsc.webp"
                />
              </div>
              <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
                <SponsorCard
                  name="Red Bull"
                  tier="partner"
                  delay={0.6}
                  url="https://redbull.com"
                  logo="/assets/hackathon/sponsors/redbull.png"
                />
              </div>
              <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
                <SponsorCard
                  name="SoDA"
                  tier="partner"
                  delay={0.7}
                  url="https://thesoda.io/"
                  logo="/assets/hackathon/sponsors/soda.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heading level="h2" className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to{" "}
              <span className="text-[var(--theme-text-accent)]">Build?</span>
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto">
              Join us for 24 hours of innovation, collaboration, and creativity.
              All skill levels welcome!
            </Text>
            <Link href="/hackathon/signup">
              <Button size="lg" className="text-lg px-10 py-6">
                Sign Up Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
