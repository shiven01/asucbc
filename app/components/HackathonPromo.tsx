"use client";

import { showHackathonPromo } from "../theme-config";
import Link from "next/link";
import { useState } from "react";
import { useBatParticles } from "../hooks/useBatParticles";
import { Heading, Text, Button } from "./ui";
import Tilt from "react-parallax-tilt";

type HackathonPromoProps = {
  className?: string;
};

export default function HackathonPromo({
  className = "",
}: HackathonPromoProps) {
  const { containerRef, particlesRef, createParticles } = useBatParticles();
  const [mounted, setMounted] = useState(false);
  if (!mounted) {
    // trigger minimal mount state for any future effects if needed
    setMounted(true);
  }

  if (!showHackathonPromo) return null;

  return (
    <div
      className={`hackathon-promo relative w-full rounded-2xl overflow-visible ${className}`}
      ref={containerRef}
    >
      {/* Card container styled like team cards, with theme glow and tilt on hover */}
      <Tilt
        className="hackathon-tilt w-full"
        glareEnable={true}
        glareMaxOpacity={0.15}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        transitionSpeed={500}
        scale={1}
        gyroscope={true}
      >
        <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/95 backdrop-blur-sm theme-glow min-h-[320px] sm:min-h-[380px] !transition-all duration-300">
          {/* Theme-aware background layer */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="theme-card-bg w-full h-full" />
          </div>

          {/* Content overlay */}
          <div className="relative p-4 sm:p-6">
            <Heading level="h3" animate={false} className="mb-2 leading-tight">
              HackASU 2025
            </Heading>

            <Text size="lg" className="leading-relaxed mb-4">
              Build something remarkable at ASU’s 24‑hour hackathon. Sponsored by
              Anthropic, Polymarket, Acorns, Silicon Oasis, StreetSmart, and more.
            </Text>

            <ul className="list-disc space-y-1.5 mb-4 text-base pl-6">
              <li>Free Claude Pro accounts + $50 in API credits</li>
              <li>Thousands in prizes</li>
              <li>Free food, drinks, and swag</li>
              <li>Mentorship and community</li>
            </ul>

            <Link href="/hackathon" className="w-full inline-block">
              <Button variant="primary" size="md" fullWidth>
                Register Now — Limited Spots
              </Button>
            </Link>

            <Text size="xs" className="text-center mt-3">
              Nov 8–9 • Starts 11 AM
            </Text>
          </div>
        </div>
      </Tilt>

      <style jsx>{`
        /* Optimized animations with will-change and reduced motion support */
        @keyframes pulse-scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
          will-change: transform;
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-scale {
            animation: none;
          }

          .cta-button {
            transition: none !important;
          }
        }

        /* Theme-aware card background (matches team cards) */
        .theme-card-bg {
          background: linear-gradient(
              160deg,
              color-mix(in oklab, var(--theme-card-bg) 100%, transparent 0%) 0%,
              color-mix(in oklab, var(--theme-card-bg) 85%, transparent 15%) 50%,
              color-mix(in oklab, var(--theme-bg) 92%, transparent 8%) 100%
            );
          background-size: 120% 120%;
          background-position: 50% 50%;
          transition: background 300ms ease, background-position 300ms ease;
        }

        /* Accent glow akin to team visuals */
        .theme-glow {
          box-shadow: 0 0 0 1px var(--theme-card-border), 0 8px 30px rgba(0, 0, 0, 0.25),
            0 0 36px color-mix(in oklab, var(--theme-text-accent) 30%, transparent 70%),
            0 0 72px color-mix(in oklab, var(--theme-text-accent) 45%, transparent 55%);
        }

        /* Disable glow in light mode */
        :global(html[data-theme='light']) .theme-glow {
          box-shadow: none;
        }

        /* Hover tilt gradient accent similar to team cards */
        .hackathon-tilt:hover .theme-card-bg {
          background: linear-gradient(
              150deg,
              color-mix(in oklab, var(--theme-text-accent) 16%, var(--theme-card-bg) 84%) 0%,
              color-mix(in oklab, var(--theme-card-bg) 88%, transparent 12%) 50%,
              color-mix(in oklab, var(--theme-bg) 96%, transparent 4%) 100%
            );
          background-position: 48% 46%;
        }

        /* Disable gradient in light mode (flat card surface) */
        :global(html[data-theme='light']) .theme-card-bg {
          background: var(--theme-card-bg);
          background-size: auto;
          background-position: center;
        }
        :global(html[data-theme='light']) .hackathon-tilt:hover .theme-card-bg {
          background: var(--theme-card-bg);
          background-size: auto;
          background-position: center;
        }

        /* Optimized button hover */
        .cta-button {
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
          will-change: transform;
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-button:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
