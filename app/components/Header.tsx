'use client';

import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full mesh-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <a href="/" className="group hover:scale-105 transition-all duration-200 inline-block px-4 py-3 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight cursor-pointer font-sans whitespace-nowrap">
                <span className="text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors duration-200">ANTHROPIC</span> <span className="text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors duration-200">@ ASU</span>
              </h1>
            </a>
          </div>
          
          {/* Navigation buttons in the middle */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/about"
              className="text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] hover:scale-105 transition-all duration-200 font-medium font-sans px-4 py-3 rounded-md hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation"
            >
              About
            </a>
            <a 
              href="/team"
              className="text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] hover:scale-105 transition-all duration-200 font-medium font-sans px-4 py-3 rounded-md hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation"
            >
              Team
            </a>
            <a 
              href="/careers"
              className="text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] hover:scale-105 transition-all duration-200 font-medium font-sans px-4 py-3 rounded-md hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation"
            >
              Careers
            </a>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] px-6 py-3 rounded-lg hover:bg-[var(--theme-button-hover-bg)] hover:text-[var(--theme-button-hover-text)] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out font-medium text-base font-sans border border-transparent hover:border-[var(--theme-button-hover-border)] min-h-[48px] flex items-center touch-manipulation"
            >
              Join Us
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] transition-colors duration-200 font-sans p-2 rounded-lg hover:bg-white/10 min-h-[48px] min-w-[48px] flex items-center justify-center touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[var(--theme-card-bg)] backdrop-blur-sm border-t border-[var(--theme-card-border)] rounded-b-2xl">
              <a 
                href="/about"
                className="block px-3 py-4 text-[var(--theme-button-text)] hover:text-[var(--theme-text-accent)] hover:bg-[var(--theme-button-bg)]/10 transition-all duration-200 font-medium font-sans rounded-lg min-h-[48px] flex items-center touch-manipulation"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="/team"
                className="block px-3 py-4 text-[var(--theme-button-text)] hover:text-[var(--theme-text-accent)] hover:bg-[var(--theme-button-bg)]/10 transition-all duration-200 font-medium font-sans rounded-lg min-h-[48px] flex items-center touch-manipulation"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
              </a>
              <a 
                href="/careers"
                className="block px-3 py-4 text-[var(--theme-button-text)] hover:text-[var(--theme-text-accent)] hover:bg-[var(--theme-button-bg)]/10 transition-all duration-200 font-medium font-sans rounded-lg min-h-[48px] flex items-center touch-manipulation"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </a>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-4 bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] hover:bg-[var(--theme-button-hover-bg)] hover:text-[var(--theme-button-hover-text)] transition-all duration-300 ease-in-out font-medium text-base font-sans border border-transparent hover:border-[var(--theme-button-hover-border)] rounded-lg min-h-[48px] flex items-center touch-manipulation mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Us
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
