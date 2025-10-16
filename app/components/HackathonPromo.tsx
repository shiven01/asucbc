"use client";

import { showHackathonPromo } from "../theme-config";
import Link from "next/link";
import { useHalloweenTheme } from "./HalloweenThemeProvider";
import { useBatParticles } from "../hooks/useBatParticles";

type HackathonPromoProps = {
  className?: string;
};

export default function HackathonPromo({
  className = "",
}: HackathonPromoProps) {
  const { isHalloween } = useHalloweenTheme();
  const { containerRef, particlesRef, createParticles } = useBatParticles();

  if (!showHackathonPromo) return null;

  return (
    <div
      className={`hackathon-promo relative w-full rounded-2xl overflow-visible animate-pulse-scale ${className}`}
      ref={containerRef}
    >
      {/* Particles container - positioned to allow escape */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-visible z-[15]"
      />

      {/* Inner content with glow effect */}
      <div
        className="relative rounded-2xl bg-cover bg-center bg-no-repeat p-3 sm:p-4 overflow-hidden border-4 border-yellow-500 shadow-gold-glow"
        style={{
          backgroundImage: "url(/halloween/halloween-illustration-dark.png)",
        }}
      >
        {/* Glowing badge */}
        <div className="inline-block mb-2 px-3 py-1 bg-white rounded-full">
          <span className="text-black font-bold text-sm uppercase tracking-wider">
            🎃 Featured Event
          </span>
        </div>

        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.9))" }}
        >
          Spooky Hackathon 2025
        </h2>

        <p
          className="text-base sm:text-lg text-white leading-relaxed mb-4"
          style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.9))" }}
        >
          Join us for an epic Halloween-themed hackathon! Build something
          spooky, win amazing prizes, and connect with fellow builders.
        </p>

        <ul className="list-none space-y-1.5 mb-4 text-base text-white">
          <li
            className="flex items-start"
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.9))" }}
          >
            <span className="text-white mr-2">🎃</span>
            <span>$5,000 in prizes</span>
          </li>
          <li
            className="flex items-start"
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.9))" }}
          >
            <span className="text-white mr-2">👻</span>
            <span>Free food & swag</span>
          </li>
          <li
            className="flex items-start"
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.9))" }}
          >
            <span className="text-white mr-2">🦇</span>
            <span>Mentorship from industry experts</span>
          </li>
        </ul>

        <Link
          href="/hackathon"
          onMouseEnter={isHalloween ? createParticles : undefined}
          onTouchStart={isHalloween ? createParticles : undefined}
          className={`relative z-20 flex max-w-md mx-auto items-center justify-center rounded-xl bg-white text-black px-6 py-4 text-base sm:text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-white/20 min-h-[48px] touch-manipulation overflow-hidden group ${
            isHalloween ? "active:scale-90" : ""
          }`}
        >
          <span className="relative z-10">Register Now - Limited Spots!</span>
          <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>

        <p
          className="text-xs text-white text-center mt-2"
          style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.9))" }}
        >
          October 31st, 2025 • 6 PM - 6 AM
        </p>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes pulse-scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-pulse-scale {
          animation: pulse-scale 3s ease-in-out infinite;
        }

        .shadow-glow {
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.3),
            0 0 60px rgba(255, 140, 66, 0.2), 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .hackathon-promo:hover .shadow-glow {
          box-shadow: 0 0 40px rgba(255, 215, 0, 0.5),
            0 0 80px rgba(255, 140, 66, 0.3), 0 15px 50px rgba(0, 0, 0, 0.6);
        }

        .shadow-gold-glow {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5),
            0 0 40px rgba(255, 215, 0, 0.3),
            0 0 60px rgba(255, 180, 0, 0.2),
            0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .hackathon-promo:hover .shadow-gold-glow {
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.7),
            0 0 60px rgba(255, 215, 0, 0.5),
            0 0 90px rgba(255, 180, 0, 0.3),
            0 6px 30px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}
