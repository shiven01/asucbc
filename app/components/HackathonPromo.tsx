'use client';

import { showHackathonPromo } from '../theme-config';
import Link from 'next/link';

type HackathonPromoProps = {
  className?: string;
};

export default function HackathonPromo({ className = '' }: HackathonPromoProps) {
  if (!showHackathonPromo) return null;

  return (
    <div className={`hackathon-promo relative w-full rounded-2xl overflow-hidden ${className}`}>
      {/* Animated border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#ff8c42] to-[#FFD700] bg-[length:200%_100%] animate-shimmer rounded-2xl" />
      
      {/* Inner content with glow effect */}
      <div className="relative m-[3px] rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 sm:p-8 animate-pulse-scale shadow-glow">
        {/* Glowing badge */}
        <div className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-[#FFD700] to-[#ff8c42] rounded-full">
          <span className="text-black font-bold text-sm uppercase tracking-wider">
            🎃 Featured Event
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#ff8c42] to-[#FFD700] mb-4 leading-tight">
          Spooky Hackathon 2024
        </h2>
        
        <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6">
          Join us for an epic Halloween-themed hackathon! Build something spooky, win amazing prizes, and connect with fellow builders.
        </p>

        <ul className="list-none space-y-2 mb-6 text-white/80">
          <li className="flex items-start">
            <span className="text-[#ff8c42] mr-2">🎃</span>
            <span>$5,000 in prizes</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ff8c42] mr-2">👻</span>
            <span>Free food & swag</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ff8c42] mr-2">🦇</span>
            <span>Mentorship from industry experts</span>
          </li>
        </ul>

        <Link
          href="/hackathon"
          className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#FFD700] to-[#ff8c42] text-black px-6 py-4 text-base sm:text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-white/20 min-h-[48px] touch-manipulation relative overflow-hidden group"
        >
          <span className="relative z-10">Register Now - Limited Spots!</span>
          <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>

        <p className="text-xs text-white/50 text-center mt-3">
          October 31st, 2024 • 6 PM - 6 AM
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
          0%, 100% {
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
          box-shadow: 
            0 0 30px rgba(255, 215, 0, 0.3),
            0 0 60px rgba(255, 140, 66, 0.2),
            0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .hackathon-promo:hover .shadow-glow {
          box-shadow: 
            0 0 40px rgba(255, 215, 0, 0.5),
            0 0 80px rgba(255, 140, 66, 0.3),
            0 15px 50px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
}

