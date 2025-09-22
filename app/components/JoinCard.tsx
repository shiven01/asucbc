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
    <div className={`w-full rounded-2xl bg-[#f4f3ee]/95 border border-black/10 shadow-sm p-6 sm:p-8 ${className}`}>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4">{title}</h2>
      <p className="text-base sm:text-lg text-black/70 leading-relaxed mb-5">{subtitle}</p>
      <ul className="list-disc pl-5 text-base sm:text-lg text-black/80 space-y-2 mb-5">
        <li>Free Claude Pro + $50 in API credits</li>
        <li>Hands-on workshops and resources</li>
        <li>Exclusive merchandise</li>
      </ul>
      <p className="text-sm sm:text-base text-black/60 italic mb-6">
        **Benefits require attendance at a CBC event for activation**
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Link
          href={discordHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl bg-black text-white px-6 py-5 text-base sm:text-lg font-semibold shadow hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out border border-transparent hover:border-black/20 min-h-[48px] touch-manipulation"
        >
          Join our Discord
        </Link>
        <Link
          href={benefitsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl border border-black/20 bg-white text-black px-6 py-5 text-base sm:text-lg font-semibold hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:border-black transition-all duration-300 ease-in-out min-h-[48px] touch-manipulation"
        >
          Sign up to receive benefits
        </Link>
      </div>
    </div>
  );
}


