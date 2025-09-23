import Link from "next/link";
import { useButtonTracking } from '@/lib/analytics';
import { FEATURE_FLAGS } from '@/lib/analytics';

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
  const { trackJoinCard } = useButtonTracking();
  return (
    <div className={`w-full rounded-2xl bg-[#f4f3ee]/95 border border-black/10 shadow-sm p-4 sm:p-6 ${className}`}>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3">{title}</h2>
      <p className="text-sm sm:text-base text-black/70 leading-relaxed mb-4">{subtitle}</p>
      <ul className="list-disc pl-4 text-sm sm:text-base text-black/80 space-y-1 mb-4">
        <li>Free Claude Pro + $50 in API credits</li>
        <li>Hands-on workshops and resources</li>
        <li>Exclusive merchandise</li>
      </ul>
      <p className="text-xs sm:text-sm text-black/60 italic mb-4">
        **Benefits require attendance at a CBC event for activation**
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <Link
          href={discordHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackJoinCard(FEATURE_FLAGS.JOIN_CARD.DISCORD)}
          className="inline-flex w-full items-center justify-center rounded-xl bg-black text-white px-4 py-3 text-sm sm:text-base font-semibold shadow hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out border border-transparent hover:border-black/20 min-h-[40px] touch-manipulation"
        >
          Join our Discord
        </Link>
        <Link
          href={benefitsHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackJoinCard(FEATURE_FLAGS.JOIN_CARD.BENEFITS)}
          className="inline-flex w-full items-center justify-center rounded-xl border border-black/20 bg-white text-black px-4 py-3 text-sm sm:text-base font-semibold hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:border-black transition-all duration-300 ease-in-out min-h-[40px] touch-manipulation"
        >
          Sign up to receive benefits
        </Link>
      </div>
    </div>
  );
}


