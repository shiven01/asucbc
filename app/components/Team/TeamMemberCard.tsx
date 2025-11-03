"use client";
import { useEffect, useState } from "react";
import { TeamMember } from "../../../types/team";
import Tilt from "react-parallax-tilt";
import { CiGlobe, CiLinkedin } from "react-icons/ci";
import { Heading, Text, Link } from "../ui";
export const TeamMemberCard = ({
  member,
  activeMember,
  setActiveMember,
}: {
  member: TeamMember;
  activeMember: string | null;
  setActiveMember: (id: string | null) => void;
}) => {
  const { name, position, id } = member;
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    if (!(activeMember === id)) {
      setFlip(false);
    }
  }, [activeMember]);
  return (
    <Tilt
      flipHorizontally={flip}
      glareEnable={true}
      glareMaxOpacity={0.2}
      scale={1.05}
      transitionSpeed={500}
      tiltMaxAngleX={activeMember === id ? 2 : 10}
      tiltMaxAngleY={activeMember === id ? 2 : 10}
      className={`${flip ? `z-[100]` : activeMember ? `z-0` : `z-10`} ${
        !(activeMember === id) && activeMember
          ? ` grayscale blur-[2px]`
          : `opacity-100`
      } w-full h-full transition-all rounded-lg`}
    >
      <div
        className={`rounded-lg bg-[var(--theme-card-bg)]/100 relative shadow ${
          flip ? `opacity-0 scale-150 z-20` : `opacity-100 z-0`
        } transition-all duration-300 ${
          flip ? `blur-sm pointer-events-none` : `pointer-events-auto`
        }`}
      >
        <div
          className={`w-full h-auto aspect-square bg-[var(--theme-card-bg)]/10 backdrop-blur-sm rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer`}
          onClick={() => {
            if (activeMember === member.id) {
              setActiveMember(null);
            } else {
              setActiveMember(member.id);
              // Track team member card click
              if (typeof window !== 'undefined' && (window as any).umami) {
                (window as any).umami.track('Team Member Card Click', { member: member.name });
              }
            }
            setFlip(true);
          }}
        >
          <img
            src={member.image}
            alt={name}
            className={`w-full h-full object-cover text-[var(--theme-text-primary)] fill-[var(--theme-text-primary)] ${
              member.image === "/staff/claude.svg" ? "p-20 mb-20" : ""
            }`}
            style={{
              maskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
            }}
          />
          <div
            className={`absolute -bottom-0 left-0 w-full h-full bg-linear-to-tl from-[var(--theme-bg)]/20 via-[var(--theme-card-bg)]/10 to-[var(--theme-bg)]/5`}
          ></div>
        </div>
        <div
          className={`flex flex-col bottom-4 left-1/2 transform -translate-x-1/2 absolute bg-linear-to-br from-[var(--theme-card-bg)]/100 to-[var(--theme-card-bg)]/80 w-[90%] px-4 py-2 rounded-md text-center border-2 border-[var(--theme-card-border)] backdrop-blur-sm transition duration-500`}
        >
          <Heading level="h6" animate={false} className="mb-0">
            {name}
          </Heading>
          <Text size="base" variant="secondary">
            {position}
          </Text>
        </div>
      </div>
      <div
        className={`w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg ${
          flip ? `pointer-events-auto` : `pointer-events-none`
        } ${
          flip ? `opacity-100 scale-100` : `opacity-0 scale-[66.67%] -z-10`
        } -scale-x-100 z-[100] border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/95 backdrop-blur-sm shadow-lg transition-all duration-150`}
        onClick={() => {
          setActiveMember(null);
          setFlip(false);
        }}
      >
        <div
          className={`w-full h-auto aspect-square bg-[var(--theme-card-bg)]/10 backdrop-blur-sm rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer`}
          onClick={() => setFlip(!flip)}
        >
          <div
            className={`absolute -bottom-0 left-0 w-full h-full bg-linear-to-tl from-[var(--theme-bg)]/20 via-[var(--theme-card-bg)]/10 to-[var(--theme-bg)]/5`}
          ></div>
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full p-6 flex flex-col text-start `}
        >
          <Heading level="h4" animate={false} className="mb-4">
            About {name}
          </Heading>

          <Text size="base" variant="secondary" className="leading-relaxed">
            {member.description
              ? member.description
              : "No additional information provided."}
          </Text>
          <div className={`flex-grow w-full mt-8 gap-8`}>
            <div className="">
              {member.linkedinUrl && (
                <div className={`flex flex-row items-center mb-2`}>
                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--theme-text-accent)] hover:underline flex items-center"
                    data-umami-event="Team LinkedIn Click"
                    data-umami-event-member={member.name}
                  >
                    <CiLinkedin
                      size={24}
                      className="inline-block mr-2 text-[var(--theme-text-accent)]"
                    />
                    LinkedIn
                  </Link>
                </div>
              )}
            </div>
            <div className="">
              {member.websiteUrl && (
                <div className={`flex flex-row items-center mb-2`}>
                  <Link
                    href={member.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--theme-text-accent)] hover:underline flex items-center"
                    data-umami-event="Team Website Click"
                    data-umami-event-member={member.name}
                  >
                    <CiGlobe
                      size={24}
                      className="inline-block mr-2 text-[var(--theme-text-accent)]"
                    />
                    Website
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};
