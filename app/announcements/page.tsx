import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Announcements() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      
      <div className="font-sans flex-1 pt-4 px-4 pb-0 sm:pt-8 sm:px-8 md:p-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--theme-text-primary)] mb-6 leading-tight">
              🚀 <span className="text-[var(--theme-text-accent)]">CodeDevils x CBC</span> Hackathon
            </h1>
            <p className="text-xl sm:text-2xl text-[var(--theme-text-accent)] font-bold mb-4">
              🎯 <span className="underline">FREE</span> Claude Pro + $50 API Credits
            </p>
            <p className="text-lg text-[var(--theme-text-primary)]/80 mb-8">
              Join our exclusive info meeting • Monday 27, 6-7pm (Arizona Time)
            </p>
            <div className="w-32 h-1 bg-[var(--theme-text-accent)] mx-auto rounded-full"></div>
          </div>

          {/* Quick Actions - Redesigned for better UX */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)] mb-8 text-center">
              🎯 <span className="text-[var(--theme-text-accent)]">Don't Miss Out</span> - Limited Time Only!
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Action - Meeting */}
              <a
                href="https://cglink.me/22J/r387342"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-br from-[var(--theme-text-accent)] to-[var(--theme-text-accent)]/80 text-white p-8 rounded-3xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">🔥 SECURE YOUR SPOT NOW</h3>
                      <p className="text-white/90 text-sm font-semibold">Monday 27, 6-7pm (Arizona Time)</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold mb-2">💰 <span className="underline">FREE</span> Claude Pro + $50 API Credits</p>
                  <p className="text-white/90 text-sm font-medium">⚡ Join our exclusive hybrid meeting to claim your benefits</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </a>

              {/* Secondary Action - Hackathon */}
              <a
                href="/hackathon"
                className="group relative overflow-hidden bg-[var(--theme-card-bg)] border-2 border-[var(--theme-text-accent)] p-8 rounded-3xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[var(--theme-text-accent)]/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--theme-text-primary)]">🏆 REGISTER FOR HACKATHON</h3>
                      <p className="text-[var(--theme-text-accent)] text-sm font-bold">⚡ Spots filling fast!</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-[var(--theme-text-primary)] mb-2">💰 <span className="text-[var(--theme-text-accent)]">MASSIVE PRIZES</span> + Industry Recognition</p>
                  <p className="text-[var(--theme-text-primary)]/80 text-sm font-medium">🔥 Sponsored by Anthropic, Polymarket, ASU Blockchain, Acorns, StreetSmart & more!</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-text-accent)]/5 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </a>

              {/* Tertiary Actions */}
              <a
                href="https://discord.gg/PRh8F2XebB"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)] rounded-2xl hover:shadow-lg hover:scale-102 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[var(--theme-text-accent)]/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--theme-text-primary)]">💬 Join Discord</h3>
                    <p className="text-sm text-[var(--theme-text-primary)]/80 font-medium">Connect with 200+ ASU builders</p>
                  </div>
                </div>
                <div className="text-[var(--theme-text-accent)] group-hover:translate-x-1 transition-transform duration-200 font-bold">
                  →
                </div>
              </a>

              <a
                href="/"
                className="group flex items-center justify-between p-6 bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)] rounded-2xl hover:shadow-lg hover:scale-102 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[var(--theme-text-accent)]/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--theme-text-primary)]">📅 View Calendar</h3>
                    <p className="text-sm text-[var(--theme-text-primary)]/80 font-medium">Never miss an event</p>
                  </div>
                </div>
                <div className="text-[var(--theme-text-accent)] group-hover:translate-x-1 transition-transform duration-200 font-bold">
                  →
                </div>
              </a>
            </div>
          </div>

          {/* Announcements Content - Redesigned for better readability */}
          <div className="space-y-12">
            {/* What is Claude Builder Club */}
            <div className="bg-[var(--theme-card-bg)] rounded-3xl p-8 shadow-lg border border-[var(--theme-card-border)]">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-[var(--theme-text-accent)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">About Claude Builder Club</h2>
                  <p className="text-lg text-[var(--theme-text-primary)]/80">A program to sponsor Anthropic builder tools to our university</p>
                </div>
              </div>
              <div className="bg-[var(--theme-text-accent)]/5 p-6 rounded-2xl border-l-4 border-[var(--theme-text-accent)]">
                <p className="text-[var(--theme-text-primary)] font-medium">
                  Part of this is trying to have an on-campus club to do this
                </p>
              </div>
            </div>

            {/* What We Offer */}
            <div className="bg-[var(--theme-card-bg)] rounded-3xl p-8 shadow-lg border border-[var(--theme-card-border)]">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-[var(--theme-text-accent)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎁</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">What We Offer</h2>
                  <p className="text-lg text-[var(--theme-text-primary)]/80">Exclusive benefits for ASU students</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Free Claude Pro */}
                <div className="bg-gradient-to-br from-[var(--theme-text-accent)]/10 to-transparent p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-[var(--theme-text-accent)] mb-3">Free Claude Pro + $50 API Credits</h3>
                  <p className="text-[var(--theme-text-primary)] mb-4">Valid until February</p>
                  <div className="space-y-2 text-sm text-[var(--theme-text-primary)]/70">
                    <p>• Join our hybrid info meeting</p>
                    <p>• Monday 27, 6-7pm (Arizona Time)</p>
                    <p>• 1-7 business days to receive benefits</p>
                  </div>
                </div>

                {/* Community Access */}
                <div className="bg-gradient-to-br from-[var(--theme-text-accent)]/5 to-transparent p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">Community Access</h3>
                  <p className="text-[var(--theme-text-primary)] mb-4">Connect with like-minded builders</p>
                  <div className="space-y-2 text-sm text-[var(--theme-text-primary)]/70">
                    <p>• Discord community</p>
                    <p>• Networking opportunities</p>
                    <p>• Project collaboration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Builder Community Vision */}
            <div className="bg-[var(--theme-card-bg)] rounded-3xl p-8 shadow-lg border border-[var(--theme-card-border)]">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-[var(--theme-text-accent)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">Builder Community Vision</h2>
                  <p className="text-lg text-[var(--theme-text-primary)]/80">Making ASU as technically connected as top-tier universities</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[var(--theme-text-accent)]/10 to-transparent p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-3">Our Vision</h3>
                  <p className="text-[var(--theme-text-primary)]">
                    ASU should be as equally technically connected to tech-companies as schools like UC Berkeley, MIT, Dartmouth, etc.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-4">How We Achieve This</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <span className="text-[var(--theme-text-accent)] font-bold">•</span>
                        <span>Building extremely hard technical projects</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[var(--theme-text-accent)] font-bold">•</span>
                        <span>Social media engagement + analytics</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[var(--theme-text-accent)] font-bold">•</span>
                        <span>Using proof to gather more sponsors</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-4">What Makes a Project "Extremely Hard"</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-[var(--theme-text-primary)]/80">
                        When the Service Level Agreement (SLA) technically cannot be possible with just AI tools
                      </p>
                      <div className="bg-[var(--theme-text-accent)]/5 p-4 rounded-lg">
                        <p className="text-sm font-medium text-[var(--theme-text-primary)] mb-2">Requires all three:</p>
                        <ul className="space-y-1 text-sm text-[var(--theme-text-primary)]/70">
                          <li>• Independent Research</li>
                          <li>• AI Tools</li>
                          <li>• Communication</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hackathon Info */}
            <div className="bg-gradient-to-br from-[var(--theme-text-accent)]/10 to-[var(--theme-text-accent)]/5 rounded-3xl p-8 shadow-lg border border-[var(--theme-text-accent)]/20">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-[var(--theme-text-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">🏆</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">Builder + Business Case Comp. Hackathon</h2>
                  <p className="text-lg text-[var(--theme-text-primary)]/80">Definitely not your regular hackathon</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-4">Major Sponsors</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Anthropic', 'Polymarket', 'ASU Blockchain', 'Acorns', 'StreetSmart'].map((sponsor) => (
                      <span key={sponsor} className="bg-[var(--theme-text-accent)]/20 text-[var(--theme-text-primary)] px-3 py-1 rounded-full text-sm font-medium">
                        {sponsor}
                      </span>
                    ))}
                    <span className="bg-[var(--theme-text-accent)]/20 text-[var(--theme-text-primary)] px-3 py-1 rounded-full text-sm font-medium">
                      + more coming!
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-4">What to Expect</h3>
                  <ul className="space-y-2 text-[var(--theme-text-primary)]">
                    <li className="flex items-center space-x-2">
                      <span className="text-[var(--theme-text-accent)]">✓</span>
                      <span>Very large prizes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-[var(--theme-text-accent)]">✓</span>
                      <span>Insanely unique projects</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-[var(--theme-text-accent)]">✓</span>
                      <span>Unforgettable experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
