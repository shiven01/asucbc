import Link from "next/link";

type JoinCardProps = {
  title?: string;
  subtitle?: string;
  discordHref?: string;
  benefitsHref?: string;
  className?: string;
};

export default function JoinCard({
  title = "Join Claude Builder Club",
  subtitle = "Meet fellow builders, learn fast, and collaborate on real projects across campus.",
  discordHref = "#",
  benefitsHref = "#",
  className = "",
}: JoinCardProps) {
  return (
    <div className={`w-full rounded-2xl bg-[#f4f3ee]/95 border border-black/10 shadow-sm p-6 sm:p-8 ${className}`}>
      <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">{title}</h2>
      <p className="text-base text-black/70 leading-relaxed mb-4">{subtitle}</p>
      <ul className="list-disc pl-5 text-black/80 space-y-1 mb-6">
        <li>Complimentary Claude Pro</li>
        <li>$50 in API credits</li>
        <li>Hands-on workshops and resources</li>
        <li>Exclusive merchandise</li>
      </ul>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href={discordHref}
          className="inline-flex w-full items-center justify-center rounded-xl bg-black text-white px-5 py-4 text-base font-semibold shadow hover:opacity-90 transition"
        >
          Join our Discord
        </Link>
        <Link
          href={benefitsHref}
          className="inline-flex w-full items-center justify-center rounded-xl border border-black/20 bg-white text-black px-5 py-4 text-base font-semibold hover:bg-black/5 transition"
        >
          Sign up to receive benefits
        </Link>
      </div>
    </div>
  );
}


