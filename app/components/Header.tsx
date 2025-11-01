"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Separate particle hooks for each navigation item

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full mesh-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 overflow-visible">
          {/* Logo on the left */}
            <Link
              href="/"
              className={`relative z-10 group hover:scale-105 transition-all duration-200 px-4 py-3 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation`}
            >
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight cursor-pointer font-sans whitespace-nowrap">
                <span className="text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors duration-200">
                  ANTHROPIC
                </span>{" "}
                <span className="text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors duration-200">
                  @ ASU
                </span>
              </h1>
            </Link>

            {/* Navigation buttons in the middle */}
            <nav className="hidden lg:flex items-center space-x-8 overflow-visible">
              <Link
                href="/about"
                className={`relative z-10 text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] hover:scale-105 transition-all duration-200 font-medium font-sans px-4 py-3 rounded-md hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation`}
              >
                About
              </Link>

              <Link
                href="/team"
                className={`relative z-10 text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] hover:scale-105 transition-all duration-200 font-medium font-sans px-4 py-3 rounded-md hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation`}
              >
                Team
              </Link>
              <Link
                href="/careers"
                className={`relative z-10 text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] hover:scale-105 transition-all duration-200 font-medium font-sans px-4 py-3 rounded-md hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation`}
              >
                Careers
              </Link>
              <div className="relative z-10">
                <Link
                  href="/hackathon"
                  className={`relative z-10 bg-[var(--theme-button-alternate-bg)] text-[var(--theme-button-alternate-text)] px-6 py-3 rounded-lg hover:bg-[var(--theme-button-hover-bg)] hover:text-[var(--theme-button-hover-text)] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out font-medium text-base font-sans border border-transparent hover:border-[var(--theme-button-hover-border)] min-h-[48px] flex items-center touch-manipulation overflow-visible`}
                >
                  Hackathon
                </Link>
              </div>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative z-20 bg-[var(--theme-button-bg)] text-white px-6 py-3 rounded-lg hover:bg-[var(--theme-button-hover-bg)] hover:shadow-lg transition-all duration-300 ease-in-out font-medium text-base font-sans  min-h-[48px] flex items-center touch-manipulation`}
              >
                Join Us
              </Link>
            </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] transition-colors duration-200 font-sans p-2 rounded-lg hover:bg-white/10 min-h-[48px] min-w-[48px] flex items-center justify-center touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[var(--theme-card-bg)] backdrop-blur-sm border-t border-[var(--theme-card-border)] rounded-b-2xl">
              <Link
                href="/about"
                className={`flex px-3 py-4 text-[var(--theme-button-text)] hover:text-[var(--theme-text-accent)] hover:bg-[var(--theme-button-bg)]/10 transition-all duration-200 font-medium font-sans rounded-lg min-h-[48px] items-center touch-manipulation`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/team"
                className={`flex px-3 py-4 text-[var(--theme-button-text)] hover:text-[var(--theme-text-accent)] hover:bg-[var(--theme-button-bg)]/10 transition-all duration-200 font-medium font-sans rounded-lg min-h-[48px] items-center touch-manipulation`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/careers"
                className={`flex px-3 py-4 text-[var(--theme-button-text)] hover:text-[var(--theme-text-accent)] hover:bg-[var(--theme-button-bg)]/10 transition-all duration-200 font-medium font-sans rounded-lg min-h-[48px] items-center touch-manipulation`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                href="/hackathon"
                className={`relative z-20 flex px-3 py-4 bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 ease-in-out font-medium text-base font-sans border border-orange-400 hover:border-orange-500 rounded-lg min-h-[48px] items-center touch-manipulation`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hackathon
              </Link>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative z-20 flex px-3 py-4 bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 ease-in-out font-medium text-base font-sans border border-orange-400 hover:border-orange-500 rounded-lg min-h-[48px] items-center touch-manipulation`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
