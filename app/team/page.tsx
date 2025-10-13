"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Shiven Shekar",
    role: "Claude Builder Ambassador and President",
    image: "/shiven.jpeg",
    description:
      "I'm a senior studying Computer Science with a Software Engineering concentration at Arizona State University. My interests lie in AppliedML and Distributed Systems.",
  },
  {
    name: "Tino",
    role: "Claude Ambassador",
    image: "/tino.jpeg",
    description:
      "Tino brings a global perspective to technology and policy, having studied across four continents. She holds a BA in Psychology and Management from Monash University and is pursuing a Master in Global Management at ASU's Thunderbird School, where she serves as a Claude AI Ambassador. She specializes in technology, people, and policy, focusing on AI, cybersecurity, and emerging technologies.",
  },
  {
    name: "Farnaz",
    role: "Claude Builder Ambassador",
    image: "/farnaz.jpg",
    description:
      "Farnaz is a PhD candidate in Educational Policy and Evaluation at Arizona State University's Mary Lou Fulton College for Teaching and Learning Innovation. Her doctoral research combines multilingual STEM education, curriculum policy, and generative AI to enhance teaching practices. She develops AI-driven solutions that support teachers in diverse classrooms, efforts that have been recognized through multiple awards, publications, and invited talks. Her most recent AI project, conducted through Principled Innovation® (one of nine design aspirations that guides the ongoing evolution of ASU as a New American University), has led to the development of an AI tool that will be launched in mid-October.",
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

  const toggleDropdown = (memberId: string) => {
    setOpenDropdown(openDropdown === memberId ? null : memberId);
  };

  const renderTeamMember = (member: TeamMember, index: number, setKey: string) => {
    const memberId = `${setKey}-${index}`;
    const hasDescription = !!member.description;

    return (
      <div
        key={memberId}
        className="flex flex-col items-center text-center flex-shrink-0 px-8 relative"
        style={{ width: "250px" }}
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
        <div className="relative w-full">
          {hasDescription ? (
            <>
              <button
                onClick={() => toggleDropdown(memberId)}
                className="text-[#f4f3ee] text-sm bg-[#cc785c] hover:bg-[#b5674d] px-4 py-2 rounded-lg transition-all duration-200 font-medium"
              >
                {member.role}
              </button>
              {openDropdown === memberId && (
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-4 w-64 z-50 text-[#cc785c] text-xs leading-relaxed shadow-xl border-2 border-[#cc785c]">
                  <button
                    onClick={() => setOpenDropdown(null)}
                    className="absolute top-2 right-2 text-[#cc785c] hover:text-[#b5674d] font-bold text-lg"
                  >
                    ✕
                  </button>
                  <div className="pt-2">
                    {member.description}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-[#f4f3ee] text-sm px-4 py-2">
              {member.role}
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
          <div className="relative overflow-hidden pb-64">
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
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
