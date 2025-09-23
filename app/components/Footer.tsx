'use client';

import { useButtonTracking } from '@/lib/analytics';
import { FEATURE_FLAGS } from '@/lib/analytics';

export default function Footer() {
  const { trackFooter } = useButtonTracking();
  return (
    <footer className="p-6 flex justify-between items-center">
      {/* Left side - Club info */}
      <p className="text-[#f4f3ee] font-medium text-sm">
        <span className="hidden md:inline">Arizona State University Claude Builder Club</span>
        <span className="md:hidden">ASU Claude Builder Club</span>
      </p>
      
      {/* Right side - Attribution */}
      <div className="flex items-center gap-2 text-[#f4f3ee] text-xs">
        {/* Desktop version */}
        <div className="hidden md:flex items-center gap-2">
          <span>Website by</span>
          <a
            href="https://github.com/shiven01"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFooter(FEATURE_FLAGS.FOOTER.GITHUB_PROFILE, { source: 'desktop' })}
            className="text-[#ffffff] hover:text-[#f4f3ee] transition-colors duration-200 font-medium flex items-center gap-1"
          >
            <svg 
              className="w-3 h-3" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Shiven Shekar
          </a>
          <span>© 2025</span>
        </div>
        
        {/* Mobile version - just GitHub logo */}
        <a
          href="https://github.com/shiven01"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackFooter(FEATURE_FLAGS.FOOTER.GITHUB_PROFILE, { source: 'mobile' })}
          className="md:hidden text-[#ffffff] hover:text-[#f4f3ee] transition-colors duration-200"
          aria-label="Visit Shiven Shekar's GitHub"
        >
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
