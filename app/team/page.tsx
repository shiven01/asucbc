"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TeamMember, teamMembers } from "../../types/team";

export default function Team() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState<number>(0);

  useEffect(() => {
    setIsTouch(typeof window !== 'undefined' && ('ontouchstart' in window || (navigator as any).maxTouchPoints > 0));
  }, []);

  useEffect(() => {
    // Measure the actual width of one set of team members
    const measureWidth = () => {
      if (scrollContainerRef.current) {
        const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement;
        if (firstChild) {
          // The first child contains one complete set of team members
          const children = Array.from(firstChild.children);
          const halfCount = Math.floor(children.length / 2);
          let totalWidth = 0;
          
          // Sum up the width of the first half (one complete set)
          for (let i = 0; i < halfCount; i++) {
            totalWidth += (children[i] as HTMLElement).offsetWidth;
          }
          
          setScrollWidth(totalWidth);
        }
      }
    };

    // Measure after images load and on resize
    measureWidth();
    window.addEventListener('resize', measureWidth);
    
    // Also measure after a short delay to ensure images are loaded
    const timer = setTimeout(measureWidth, 100);

    return () => {
      window.removeEventListener('resize', measureWidth);
      clearTimeout(timer);
    };
  }, [isTouch]);

  useEffect(() => {
    const handleOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleOutside as EventListener);
      document.addEventListener("touchstart", handleOutside as EventListener);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutside as EventListener);
      document.removeEventListener("touchstart", handleOutside as EventListener);
    };
  }, [openDropdown]);

  const toggleDropdown = (memberId: string) => {
    if (openDropdown === memberId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(memberId);
    }
  };

  const renderTeamMember = (member: TeamMember, index: number, setKey: string) => {
    const memberId = `${setKey}-${index}`;
    const hasDescription = !!member.description;
    const isOpen = openDropdown === memberId;

    const hoverHandlers = isTouch
      ? {}
      : {
          onMouseEnter: () => hasDescription && setOpenDropdown(memberId),
          onMouseLeave: () => setOpenDropdown(null),
        };

    const touchHandlers = isTouch
      ? {
          onClick: () => hasDescription && toggleDropdown(memberId),
        }
      : {};

    return (
      <div
        key={memberId}
        className="flex flex-col items-center text-center flex-shrink-0 px-6 sm:px-12 relative"
        style={{ width: isTouch ? "280px" : "360px" }}
        {...hoverHandlers}
        {...touchHandlers}
      >
        <div className="relative mb-4">
          <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-[var(--theme-text-primary)] mb-3">
          {member.name}
        </h3>
        <div className="relative w-full flex justify-center">
          <button
            className="text-[var(--theme-button-text)] text-sm bg-[var(--theme-button-bg)] px-5 sm:px-6 py-3 rounded-lg hover:bg-[var(--theme-button-hover-bg)] hover:text-[var(--theme-button-hover-text)] hover:scale-105 transition-all duration-300 ease-in-out font-medium border border-transparent hover:border-[var(--theme-button-hover-border)] whitespace-nowrap"
            style={{ minWidth: isTouch ? '15rem' : '18rem' }}
          >
            {member.position}
          </button>
          {isOpen && hasDescription && (
            <div 
              ref={dropdownRef}
              className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[var(--theme-card-bg)] rounded-lg p-4 sm:p-5 w-72 sm:w-80 z-50 text-[var(--theme-text-dark)] text-xs leading-relaxed shadow-xl border-2 border-[var(--theme-card-border)] text-center"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}
                className="absolute top-1.5 right-1.5 text-[var(--theme-text-accent)] hover:text-[var(--theme-text-primary)] font-bold text-base w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
              {(member.linkedinUrl || member.websiteUrl) && (
                <div className="flex items-center justify-center gap-3 mb-3">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-[var(--theme-text-accent)] hover:text-[var(--theme-text-primary)]"
                      aria-label={`Open ${member.name} LinkedIn`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {member.websiteUrl && (
                    <a
                      href={member.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-[var(--theme-text-accent)] hover:text-[var(--theme-text-primary)]"
                      aria-label={`Open ${member.name} Website`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
              <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                {member.description}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="font-sans min-h-screen p-8 pb-20 sm:p-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--theme-text-primary)] mb-4">
              Meet Our Team
            </h1>
          </div>

          {/* Infinite Scrolling Team Members */}
          <div className="relative overflow-hidden" style={{ paddingBottom: "32rem" }} ref={scrollContainerRef}>
            <div 
              className={`flex ${openDropdown ? 'paused' : ''}`}
              style={{
                animation: scrollWidth > 0 ? `scroll-exact ${isTouch ? '50s' : '40s'} linear infinite` : 'none'
              }}
            >
              {/* First set of team members */}
              {teamMembers.map((member, index) =>
                renderTeamMember(member, index, "team-1")
              )}
              {/* Duplicate set for seamless loop */}
              {teamMembers.map((member, index) =>
                renderTeamMember(member, index, "team-2")
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-[var(--theme-text-accent)] mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who want to make a difference in the AI community at ASU.
            </p>
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=sshekar9@asu.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--theme-button-bg)] text-[var(--theme-button-text)] px-8 py-3 rounded-lg hover:bg-[var(--theme-button-hover-bg)] hover:text-[var(--theme-button-hover-text)] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out font-medium text-lg font-sans border border-transparent hover:border-[var(--theme-button-hover-border)]"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes scroll-exact {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${scrollWidth}px);
          }
        }

        .paused {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
