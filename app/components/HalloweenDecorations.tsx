'use client';

import { isHalloweenTheme } from '../theme-config';
import Image from 'next/image';

export default function HalloweenDecorations() {
  if (!isHalloweenTheme) return null;

  return (
    <div className="halloween-decorations pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Bats - scattered throughout */}
      <div className="bat bat-1 absolute top-[10%] left-[5%] w-16 h-16 text-white opacity-20">
        <Image src="/halloween/bat.svg" alt="" width={64} height={64} className="w-full h-full hover-float" />
      </div>
      <div className="bat bat-2 absolute top-[25%] right-[8%] w-12 h-12 text-white opacity-15">
        <Image src="/halloween/bat.svg" alt="" width={48} height={48} className="w-full h-full hover-float" />
      </div>
      <div className="bat bat-3 absolute top-[60%] left-[15%] w-14 h-14 text-white opacity-20">
        <Image src="/halloween/bat.svg" alt="" width={56} height={56} className="w-full h-full hover-float" />
      </div>
      <div className="bat bat-4 absolute top-[40%] right-[20%] w-10 h-10 text-white opacity-10">
        <Image src="/halloween/bat.svg" alt="" width={40} height={40} className="w-full h-full hover-float" />
      </div>
      <div className="bat bat-5 absolute bottom-[20%] left-[25%] w-12 h-12 text-white opacity-15">
        <Image src="/halloween/bat.svg" alt="" width={48} height={48} className="w-full h-full hover-float" />
      </div>
      <div className="bat bat-6 absolute bottom-[35%] right-[12%] w-16 h-16 text-white opacity-20">
        <Image src="/halloween/bat.svg" alt="" width={64} height={64} className="w-full h-full hover-float" />
      </div>

      {/* Pumpkins - corners and sides */}
      <div className="pumpkin absolute bottom-[5%] left-[3%] w-20 h-20 text-[#ff8c42] opacity-30 hover:rotate-12 transition-transform duration-300">
        <Image src="/halloween/pumpkin.svg" alt="" width={80} height={80} className="w-full h-full" />
      </div>
      <div className="pumpkin absolute bottom-[8%] right-[5%] w-24 h-24 text-[#ff8c42] opacity-25 hover:-rotate-12 transition-transform duration-300">
        <Image src="/halloween/pumpkin.svg" alt="" width={96} height={96} className="w-full h-full" />
      </div>
      <div className="pumpkin absolute top-[70%] left-[40%] w-16 h-16 text-[#ff8c42] opacity-20 hover:rotate-12 transition-transform duration-300">
        <Image src="/halloween/pumpkin.svg" alt="" width={64} height={64} className="w-full h-full" />
      </div>

      {/* Ghosts - floating animation */}
      <div className="ghost absolute top-[15%] left-[75%] w-16 h-20 text-white opacity-15 floating">
        <Image src="/halloween/ghost.svg" alt="" width={64} height={80} className="w-full h-full" />
      </div>
      <div className="ghost absolute top-[50%] left-[85%] w-14 h-18 text-white opacity-10 floating-slow">
        <Image src="/halloween/ghost.svg" alt="" width={56} height={72} className="w-full h-full" />
      </div>

      {/* Spider Webs - top corners */}
      <div className="spider-web absolute top-0 left-0 w-32 h-32 text-white opacity-10">
        <Image src="/halloween/spider-web.svg" alt="" width={128} height={128} className="w-full h-full" />
      </div>
      <div className="spider-web absolute top-0 right-0 w-32 h-32 text-white opacity-10 scale-x-[-1]">
        <Image src="/halloween/spider-web.svg" alt="" width={128} height={128} className="w-full h-full" />
      </div>

      <style jsx>{`
        .hover-float {
          transition: transform 0.3s ease;
        }
        .bat:hover .hover-float {
          transform: translateY(-10px);
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes floating-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .floating {
          animation: floating 4s ease-in-out infinite;
        }

        .floating-slow {
          animation: floating-slow 6s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .bat, .pumpkin, .ghost, .spider-web {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

