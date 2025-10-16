"use client";

import { useState } from "react";
import { useHalloweenTheme } from "./HalloweenThemeProvider";
import { useBatParticles } from "../hooks/useBatParticles";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isHalloween } = useHalloweenTheme();

  // Separate particle hooks for each navigation item
  const logoParticles = useBatParticles();
  const aboutParticles = useBatParticles();
  const teamParticles = useBatParticles();
  const careersParticles = useBatParticles();
  const hackathonParticles = useBatParticles();
  const joinUsParticles = useBatParticles();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full mesh-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <div ref={logoParticles.containerRef} className="relative z-10">
              <div
                ref={logoParticles.particlesRef}
                className="absolute inset-0 pointer-events-none overflow-visible z-0"
              />
              <a
                href="/"
                onMouseEnter={
                  isHalloween ? logoParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? logoParticles.createParticles : undefined
                }
                className={`relative z-10 group hover:scale-105 transition-all duration-200 px-4 py-3 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
              >
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight cursor-pointer font-sans whitespace-nowrap">
                  <span className="text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors duration-200">
                    ANTHROPIC
                  </span>{" "}
                  <span className="text-[var(--theme-text-primary)] group-hover:text-[var(--theme-text-accent)] transition-colors duration-200">
                    @ ASU
                  </span>
                </h1>
              </a>
            </div>
          </div>

          {/* Navigation buttons in the middle */}
          <nav className="hidden md:flex items-center space-x-8">
            <div ref={aboutParticles.containerRef} className="relative z-10">
              <div
                ref={aboutParticles.particlesRef}
                className="absolute inset-0 pointer-events-none overflow-visible z-0"
              />
              <a
                href="/about"
                onMouseEnter={
                  isHalloween ? aboutParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? aboutParticles.createParticles : undefined
                }
                className={`relative z-10 text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] hover:scale-105 transition-all duration-200 font-medium font-sans px-4 py-3 rounded-md hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
              >
                About
              </a>
            </div>
            <div ref={teamParticles.containerRef} className="relative z-10">
              <div
                ref={teamParticles.particlesRef}
                className="absolute inset-0 pointer-events-none overflow-visible z-0"
              />
              <a
                href="/team"
                onMouseEnter={
                  isHalloween ? teamParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? teamParticles.createParticles : undefined
                }
                className={`relative z-10 text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] hover:scale-105 transition-all duration-200 font-medium font-sans px-4 py-3 rounded-md hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
              >
                Team
              </a>
            </div>
            <div ref={careersParticles.containerRef} className="relative z-10">
              <div
                ref={careersParticles.particlesRef}
                className="absolute inset-0 pointer-events-none overflow-visible z-0"
              />
              <a
                href="/careers"
                onMouseEnter={
                  isHalloween ? careersParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? careersParticles.createParticles : undefined
                }
                className={`relative z-10 text-[var(--theme-text-primary)] hover:text-[var(--theme-text-accent)] hover:scale-105 transition-all duration-200 font-medium font-sans px-4 py-3 rounded-md hover:bg-white/10 min-h-[48px] flex items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
              >
                Careers
              </a>
            </div>
            <div ref={hackathonParticles.containerRef} className="relative z-10">
              <div
                ref={hackathonParticles.particlesRef}
                className="absolute inset-0 pointer-events-none overflow-hidden z-0"
              />
              <a
                href="/hackathon"
                onMouseEnter={
                  isHalloween ? hackathonParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? hackathonParticles.createParticles : undefined
                }
                className={`relative z-20 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out font-medium text-base font-sans border border-orange-400 hover:border-orange-300 min-h-[48px] flex items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
              >
                Hackathon
              </a>
            </div>
            <div ref={joinUsParticles.containerRef} className="relative z-10">
              <div
                ref={joinUsParticles.particlesRef}
                className="absolute inset-0 pointer-events-none overflow-visible z-0"
              />
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={
                  isHalloween ? joinUsParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? joinUsParticles.createParticles : undefined
                }
                className={`relative z-10 bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] px-6 py-3 rounded-lg hover:bg-[var(--theme-button-hover-bg)] hover:text-[var(--theme-button-hover-text)] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out font-medium text-base font-sans border border-transparent hover:border-[var(--theme-button-hover-border)] min-h-[48px] flex items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
              >
                Join Us
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
              <a
                href="/about"
                onMouseEnter={
                  isHalloween ? aboutParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? aboutParticles.createParticles : undefined
                }
                className={`flex px-3 py-4 text-[var(--theme-button-text)] hover:text-[var(--theme-text-accent)] hover:bg-[var(--theme-button-bg)]/10 transition-all duration-200 font-medium font-sans rounded-lg min-h-[48px] items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/team"
                onMouseEnter={
                  isHalloween ? teamParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? teamParticles.createParticles : undefined
                }
                className={`flex px-3 py-4 text-[var(--theme-button-text)] hover:text-[var(--theme-text-accent)] hover:bg-[var(--theme-button-bg)]/10 transition-all duration-200 font-medium font-sans rounded-lg min-h-[48px] items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
              </a>
              <a
                href="/careers"
                onMouseEnter={
                  isHalloween ? careersParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? careersParticles.createParticles : undefined
                }
                className={`flex px-3 py-4 text-[var(--theme-button-text)] hover:text-[var(--theme-text-accent)] hover:bg-[var(--theme-button-bg)]/10 transition-all duration-200 font-medium font-sans rounded-lg min-h-[48px] items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </a>
              <a
                href="/hackathon"
                onMouseEnter={
                  isHalloween ? hackathonParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? hackathonParticles.createParticles : undefined
                }
                className={`relative z-20 flex px-3 py-4 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 ease-in-out font-medium text-base font-sans border border-orange-400 hover:border-orange-300 rounded-lg min-h-[48px] items-center touch-manipulation ${
                  isHalloween ? "active:scale-90" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hackathon
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={
                  isHalloween ? joinUsParticles.createParticles : undefined
                }
                onTouchStart={
                  isHalloween ? joinUsParticles.createParticles : undefined
                }
                className={`flex px-3 py-4 bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] hover:bg-[var(--theme-button-hover-bg)] hover:text-[var(--theme-button-hover-text)] transition-all duration-300 ease-in-out font-medium text-base font-sans border border-transparent hover:border-[var(--theme-button-hover-border)] rounded-lg min-h-[48px] items-center touch-manipulation mt-2 ${
                  isHalloween ? "active:scale-90" : ""
                }`}
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
