import Link from "next/link";

type JoinCardProps = {
  title?: string;
  subtitle?: string;
  discordHref?: string;
  benefitsHref?: string;
  className?: string;
};

export default function JoinCard({
  title = "Join the Claude Builder Club!",
  subtitle = "Meet fellow builders, learn fast, and collaborate on real projects across campus.",
  discordHref = "#",
  benefitsHref = "#",
  className = "",
}: JoinCardProps) {
  return (
    <div
      className={`w-full rounded-2xl bg-[var(--theme-card-bg)] border-2 border-[var(--theme-card-border)] shadow-sm p-4 sm:p-6 ${className}`}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--theme-text-dark)] mb-3">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-[var(--theme-text-dark)]/70 leading-relaxed mb-4">
        {subtitle}
      </p>
      <ul className="list-disc pl-4 text-sm sm:text-base text-[var(--theme-text-dark)]/80 space-y-1 mb-4">
        <li>Free Claude Pro + $50 in API credits</li>
        <li>Hands-on workshops and resources</li>
        <li>Exclusive merchandise</li>
      </ul>
      <p className="text-xs sm:text-sm text-[var(--theme-text-dark)]/60 italic mb-4">
        **Benefits require attendance at a CBC event for activation**
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <Link
          href={discordHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--theme-card-bg)] text-[var(--theme-button-text)] px-4 py-3 text-sm sm:text-base font-semibold shadow hover:bg-[var(--theme-button-text)] hover:text-[var(--theme-card-bg)] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out border border-[var(--theme-button-text)] hover:border-[var(--theme-button-text)] min-h-[40px] touch-manipulation"
        >
          Join our Discord
        </Link>
        <Link
          href={benefitsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--theme-card-bg)] text-[var(--theme-button-text)] px-4 py-3 text-sm sm:text-base font-semibold shadow hover:bg-[var(--theme-button-text)] hover:text-[var(--theme-card-bg)] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out border border-[var(--theme-button-text)] hover:border-[var(--theme-button-text)] min-h-[40px] touch-manipulation"
        >
          Sign up to receive benefits
        </Link>
      </div>
    </div>
  );
}
