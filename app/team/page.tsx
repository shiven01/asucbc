"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Shiven",
    role: "President",
    image: "/shiven.jpeg",
    description:
      "I'm a senior studying Computer Science with a Software Engineering concentration at Arizona State University. My interests lie in AppliedML and Distributed Systems.",
    linkedin: "https://www.linkedin.com/in/shiven-shekar/",
  },
  {
    name: "Tino",
    role: "Claude Ambassador",
    image: "/tino.jpeg",
    description:
      "Tino brings a global perspective to technology and policy, having studied across four continents. She holds a BA in Psychology and Management from Monash University and is pursuing a Master in Global Management at ASU's Thunderbird School, where she serves as a Claude AI Ambassador. She specializes in technology, people, and policy, focusing on AI, cybersecurity, and emerging technologies.",
    linkedin: "https://www.linkedin.com/in/heathermavunga/",
  },
  {
    name: "Farnaz",
    role: "Claude Builder Ambassador",
    image: "/farnaz.jpg",
    description:
      "Farnaz is a PhD candidate in Educational Policy and Evaluation at Arizona State University's Mary Lou Fulton College for Teaching and Learning Innovation. Her doctoral research combines multilingual STEM education, curriculum policy, and generative AI to enhance teaching practices. She develops AI-driven solutions that support teachers in diverse classrooms, efforts that have been recognized through multiple awards, publications, and invited talks. Her most recent AI project, conducted through Principled Innovation® (one of nine design aspirations that guides the ongoing evolution of ASU as a New American University), has led to the development of an AI tool that will be launched in mid-October.",
    linkedin: "https://www.linkedin.com/in/farnaz-avarzamani-a672069b/",
  },
  {
    name: "Anjali",
    role: "Technology",
    image: "/claude.svg",
  },
  {
    name: "Sathwin",
    role: "Operations + Finance",
    image: "/claude.svg",
  },
  {
    name: "Ben",
    role: "Head of Operations",
    image: "/claude.svg",
  },
  {
    name: "Erick",
    role: "Business + Finance Public Outreach",
    image: "/claude.svg",
  },
  {
    name: "Hieu",
    role: "Technology",
    image: "/claude.svg",
  },
  {
    name: "Joana",
    role: "Head of Community Outreach",
    image: "/claude.svg",
  },
  {
    name: "John",
    role: "Technology",
    image: "/claude.svg",
  },
  {
    name: "Sebastian",
    role: "Outreach",
    image: "/claude.svg",
  },
];

export default function Team() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const toggleDropdown = (memberId: string) => {
    // Only open if a different member is requested; do nothing if same is already open
    if (openDropdown !== memberId) {
      setOpenDropdown(memberId);
    }
  };

  const renderTeamMember = (member: TeamMember, index: number, setKey: string) => {
    const memberId = `${setKey}-${index}`;
    const hasDescription = !!member.description;
    const isOpen = openDropdown === memberId;

    return (
      <div
        key={memberId}
        className="flex flex-col items-center text-center flex-shrink-0 px-12 relative"
        style={{ width: "360px" }}
        onMouseEnter={() => hasDescription && setOpenDropdown(memberId)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <div className="relative mb-4">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#ffffff] mb-3">
          {member.name}
        </h3>
        <div className="relative w-full flex justify-center">
          <button
            className="text-[#cc785c] text-sm bg-[#ffffff] px-6 py-3 rounded-lg hover:bg-[#cc785c] hover:text-[#ffffff] hover:scale-105 transition-all duration-300 ease-in-out font-medium border border-transparent hover:border-[#ffffff] whitespace-nowrap"
            style={{ cursor: hasDescription ? 'pointer' : 'default', minWidth: '18rem' }}
          >
            {member.role}
          </button>
          {isOpen && hasDescription && (
            <div 
              ref={dropdownRef}
              className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-5 w-80 z-50 text-[#cc785c] text-xs leading-relaxed shadow-xl border-2 border-[#cc785c] text-center"
            >
              <button
                onClick={() => setOpenDropdown(null)}
                className="absolute top-1.5 right-1.5 text-[#cc785c] hover:text-[#b5674d] font-bold text-base w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mb-3 text-[#cc785c] hover:text-[#b5674d]"
                  aria-label={`Open ${member.name} LinkedIn`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              <div className="pt-1">
                {member.description}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ffffff] mb-4">
              Meet Our Team
            </h1>
          </div>

          {/* Infinite Scrolling Team Members */}
          <div className="relative overflow-hidden" style={{ paddingBottom: "40rem" }}>
            <div className="flex animate-scroll">
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
            <h2 className="text-2xl font-bold text-[#ffffff] mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-[#f4f3ee] mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who want to make a difference in the AI community at ASU.
            </p>
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=sshekar9@asu.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#ffffff] text-[#cc785c] px-8 py-3 rounded-lg hover:bg-[#cc785c] hover:text-[#ffffff] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out font-medium text-lg font-sans border border-transparent hover:border-[#ffffff]"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
