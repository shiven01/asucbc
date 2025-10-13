"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Shiven Shekar",
    role: "Claude Builder Ambassador and President",
    image: "/shiven.jpeg",
  },
  {
    name: "Tino",
    role: "Claude Ambassador",
    image: "/tino.jpeg",
  },
  {
    name: "Farnaz",
    role: "Claude Builder Ambassador",
    image: "/farnaz.jpg",
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
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {/* First set of team members */}
              {teamMembers.map((member, index) => (
                <div
                  key={`team-1-${index}`}
                  className="flex flex-col items-center text-center flex-shrink-0 px-8"
                  style={{ width: "250px" }}
                >
                  <div className="relative mb-4">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#ffffff] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#f4f3ee] text-sm">{member.role}</p>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {teamMembers.map((member, index) => (
                <div
                  key={`team-2-${index}`}
                  className="flex flex-col items-center text-center flex-shrink-0 px-8"
                  style={{ width: "250px" }}
                >
                  <div className="relative mb-4">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#ffffff] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#f4f3ee] text-sm">{member.role}</p>
                </div>
              ))}
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
