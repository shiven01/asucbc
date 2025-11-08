"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
  endDate?: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type CountdownState = "before-start" | "in-progress" | "ended";

export default function Countdown({ targetDate, endDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [state, setState] = useState<CountdownState>("before-start");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = (): { timeLeft: TimeLeft; state: CountdownState } => {
      const now = new Date().getTime();
      const startTime = targetDate.getTime();
      const endTime = endDate?.getTime();

      // If event has ended
      if (endTime && now > endTime) {
        return {
          timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
          state: "ended",
        };
      }

      // If event is in progress
      if (now >= startTime && endTime && now < endTime) {
        const difference = endTime - now;
        return {
          timeLeft: {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          },
          state: "in-progress",
        };
      }

      // Before event starts
      const difference = startTime - now;
      if (difference > 0) {
        return {
          timeLeft: {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          },
          state: "before-start",
        };
      }

      return {
        timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
        state: "before-start",
      };
    };

    const timer = setInterval(() => {
      const result = calculateTimeLeft();
      setTimeLeft(result.timeLeft);
      setState(result.state);
    }, 1000);

    const result = calculateTimeLeft();
    setTimeLeft(result.timeLeft);
    setState(result.state);

    return () => clearInterval(timer);
  }, [targetDate, endDate]);

  if (!mounted || state === "ended") {
    return null;
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  const title = state === "in-progress" ? "Time Left to Hack" : "Hacking Starts In";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full"
    >
      <motion.div
        key={state}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
          {title}
        </h3>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="relative"
          >
            <div className="bg-[var(--theme-card-bg)] border-2 border-[var(--theme-text-accent)] rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <motion.div
                key={unit.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--theme-text-accent)] mb-2 tabular-nums"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.div>
              <div className="text-xs sm:text-sm font-semibold text-[var(--theme-text-dark)] uppercase tracking-wider">
                {unit.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
