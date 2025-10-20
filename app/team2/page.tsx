import { teamMembers } from "../../types/team";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { TeamMemberCard } from "../components/Team/TeamMemberCard";

export default function TeamPage() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="font-sans min-h-screen p-8 pb-20 sm:p-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-16 flex flex-col items-center max-w-prose mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--theme-text-primary)] mb-4">
              Meet Our Team
            </h1>
            <p className="text-[var(--theme-text-secondary)] text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                A diverse group of individuals passionate about AI and its potential to transform education and technology.
            </p>
          </div>
          {/* Team Members Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12">
            {/* Team Member Card */}
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
