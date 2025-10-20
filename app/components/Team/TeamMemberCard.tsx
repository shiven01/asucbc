import { TeamMember } from "../../../types/team";

export const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const { name, position } = member;
  return (
    <div className=" rounded-lg bg-[var(--theme-card-bg)]/100 relative shadow">
      <div
        className={`w-full h-auto aspect-square bg-[var(--theme-card-bg)]/10 backdrop-blur-sm rounded-lg overflow-hidden flex items-center justify-center relative`}
      >
        <img
          src={member.image}
          alt={name}
          className={`w-full h-full object-cover ${member.image === '/staff/claude.svg' ? 'p-20 mb-20' : ''}`}
          style={{
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
          }}
        />
        <div className={`absolute -bottom-0 left-0 w-full h-full bg-linear-to-tl from-[var(--theme-bg)]/20 via-[var(--theme-card-bg)]/10 to-[var(--theme-bg)]/5`}></div>
      </div>
      <div className={`flex flex-col bottom-4 left-1/2 transform -translate-x-1/2 absolute bg-linear-to-br from-[var(--theme-card-bg)]/100 to-[var(--theme-card-bg)]/80 w-[90%] px-4 py-2 rounded-md text-center border-2 border-[var(--theme-card-border)]`}>
        <h2 className="text-2xl font-bold text-[var(--theme-text-primary)]">{name}</h2>
        <p className="text-[var(--theme-text-secondary)]">{position}</p>
      </div>
    </div>
  );
};
