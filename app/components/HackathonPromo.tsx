"use client";

import { showHackathonPromo } from "../theme-config";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
  const [imageLoaded, setImageLoaded] = useState(false);

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
      <div className="relative rounded-2xl overflow-hidden border-4 border-yellow-500 shadow-gold-glow min-h-[400px] sm:min-h-[450px]">
        {/* Loading Skeleton - shown while image is loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 via-orange-600 to-orange-700 animate-pulse">
            <div className="p-3 sm:p-4 space-y-3">
              <div className="h-8 w-40 bg-white/20 rounded-full"></div>
              <div className="h-10 w-3/4 bg-white/30 rounded"></div>
              <div className="h-24 bg-white/20 rounded"></div>
              <div className="h-12 bg-white/40 rounded-xl"></div>
              <div className="h-4 bg-white/20 rounded w-2/3"></div>
            </div>
          </div>
        )}

        {/* Background Image - Next.js optimized */}
        <Image
          src="/halloween/halloween-illustration-dark.png"
          alt="Halloween hackathon spooky background"
          fill
          priority
          className={`object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Content overlay */}
        <div className="relative p-3 sm:p-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight text-shadow-strong">
          Spooky Hackathon 2025
        </h2>

        <p className="text-base sm:text-lg text-white leading-relaxed mb-4 text-shadow-medium">
          Join us for an epic Halloween-themed hackathon! Build something
          spooky, win amazing prizes, and connect with fellow builders.
        </p>

        <ul className="list-none space-y-1.5 mb-4 text-base text-white text-shadow-medium pl-8">
          <li className="flex items-start">
            <span className="text-white mr-2">🎃</span>
            <span>$5,000 in prizes</span>
          </li>
          <li className="flex items-start">
            <span className="text-white mr-2">👻</span>
            <span>Free food & swag</span>
          </li>
          <li className="flex items-start">
            <span className="text-white mr-2">🦇</span>
            <span>Mentorship from industry experts</span>
          </li>
        </ul>

        <Link
          href="/hackathon"
          onMouseEnter={isHalloween ? createParticles : undefined}
          onTouchStart={isHalloween ? createParticles : undefined}
          className={`cta-button relative z-20 flex max-w-md mx-auto items-center justify-center rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white px-6 py-4 text-base sm:text-lg font-bold shadow-lg min-h-[48px] touch-manipulation ${
            isHalloween ? "active:scale-90" : ""
          }`}
        >
          Register Now - Limited Spots!
        </Link>

          <p className="text-xs text-white text-center mt-2 text-shadow-medium">
            November 8-9, 2025 • Nov 8, 11 AM - Nov 9, 5 PM
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Performance-optimized text shadows */
        .text-shadow-strong {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 0.8);
        }

        .text-shadow-medium {
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.7);
        }

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

        /* Simplified shadow effects - fewer layers */
        .shadow-gold-glow {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.4),
            0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .hackathon-promo:hover .shadow-gold-glow {
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.6),
            0 6px 30px rgba(0, 0, 0, 0.4);
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
