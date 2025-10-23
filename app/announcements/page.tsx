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
                  <p className="text-white/90 text-sm font-medium">⚡ Only 58 spots left! Join our exclusive hybrid meeting to claim your benefits</p>
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
                  <p className="text-[var(--theme-text-primary)]/80 text-sm font-medium">🔥 Sponsored by Anthropic, Polymarket, ASU Blockchain & more!</p>
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
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">🎓 <span className="text-[var(--theme-text-accent)]">ASU's Premier AI Club</span></h2>
                  <p className="text-lg text-[var(--theme-text-primary)]/80 font-medium">Exclusive access to Anthropic's cutting-edge AI tools</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[var(--theme-text-accent)]/10 to-transparent p-6 rounded-2xl border-l-4 border-[var(--theme-text-accent)]">
                <p className="text-[var(--theme-text-primary)] font-bold text-lg">
                  🚀 We're building the <span className="text-[var(--theme-text-accent)]">most technically connected</span> university community in the Southwest!
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
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">💰 <span className="text-[var(--theme-text-accent)]">EXCLUSIVE BENEFITS</span></h2>
                  <p className="text-lg text-[var(--theme-text-primary)]/80 font-medium">Only for ASU students - Limited time offer!</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Free Claude Pro */}
                <div className="bg-gradient-to-br from-[var(--theme-text-accent)]/10 to-transparent p-6 rounded-2xl border-2 border-[var(--theme-text-accent)]/20">
                  <h3 className="text-xl font-bold text-[var(--theme-text-accent)] mb-3">🔥 <span className="underline">FREE</span> Claude Pro + $50 API Credits</h3>
                  <p className="text-[var(--theme-text-primary)] mb-4 font-bold">⏰ Valid until February 2025</p>
                  <div className="space-y-2 text-sm text-[var(--theme-text-primary)] font-medium">
                    <p>✅ Join our hybrid info meeting</p>
                    <p>✅ Monday 27, 6-7pm (Arizona Time)</p>
                    <p>✅ <span className="text-[var(--theme-text-accent)] font-bold">Instant access</span> - 1-7 business days</p>
                  </div>
                </div>

                {/* Community Access */}
                <div className="bg-gradient-to-br from-[var(--theme-text-accent)]/5 to-transparent p-6 rounded-2xl border border-[var(--theme-text-accent)]/10">
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">🤝 <span className="text-[var(--theme-text-accent)]">Elite Community</span></h3>
                  <p className="text-[var(--theme-text-primary)] mb-4 font-medium">Connect with the brightest ASU builders</p>
                  <div className="space-y-2 text-sm text-[var(--theme-text-primary)] font-medium">
                    <p>💬 200+ active Discord members</p>
                    <p>🚀 Industry networking events</p>
                    <p>⚡ Real-time project collaboration</p>
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
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">🎯 <span className="text-[var(--theme-text-accent)]">Our Mission</span></h2>
                  <p className="text-lg text-[var(--theme-text-primary)]/80 font-medium">Making ASU the #1 tech-connected university in the Southwest</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[var(--theme-text-accent)]/10 to-transparent p-6 rounded-2xl border-l-4 border-[var(--theme-text-accent)]">
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-3">🏆 Our Vision</h3>
                  <p className="text-[var(--theme-text-primary)] font-medium">
                    ASU should be as equally technically connected to tech-companies as schools like <span className="text-[var(--theme-text-accent)] font-bold">UC Berkeley, MIT, Dartmouth</span> - and we're making it happen!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-4">⚡ How We Achieve This</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <span className="text-[var(--theme-text-accent)] font-bold text-lg">🔥</span>
                        <span className="font-medium">Building <span className="text-[var(--theme-text-accent)] font-bold">extremely hard</span> technical projects</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[var(--theme-text-accent)] font-bold text-lg">📱</span>
                        <span className="font-medium">Social media engagement + <span className="text-[var(--theme-text-accent)] font-bold">massive analytics</span></span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[var(--theme-text-accent)] font-bold text-lg">💰</span>
                        <span className="font-medium">Using proof to gather <span className="text-[var(--theme-text-accent)] font-bold">more sponsors</span></span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-4">🎯 What Makes a Project "Extremely Hard"</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-[var(--theme-text-primary)] font-medium">
                        When the Service Level Agreement (SLA) <span className="text-[var(--theme-text-accent)] font-bold">technically cannot be possible</span> with just AI tools
                      </p>
                      <div className="bg-gradient-to-r from-[var(--theme-text-accent)]/10 to-transparent p-4 rounded-lg border border-[var(--theme-text-accent)]/20">
                        <p className="text-sm font-bold text-[var(--theme-text-primary)] mb-2">🚀 Requires all three:</p>
                        <ul className="space-y-1 text-sm text-[var(--theme-text-primary)] font-medium">
                          <li>🔬 Independent Research</li>
                          <li>🤖 AI Tools</li>
                          <li>💬 Communication</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hackathon Info */}
            <div className="bg-gradient-to-br from-[var(--theme-text-accent)]/10 to-[var(--theme-text-accent)]/5 rounded-3xl p-8 shadow-lg border-2 border-[var(--theme-text-accent)]/30">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-[var(--theme-text-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">🏆</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">🚀 <span className="text-[var(--theme-text-accent)]">EPIC HACKATHON</span></h2>
                  <p className="text-lg text-[var(--theme-text-primary)]/80 font-bold">🔥 <span className="underline">NOT</span> your regular hackathon - This is LEGENDARY!</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-4">💰 <span className="text-[var(--theme-text-accent)]">MAJOR SPONSORS</span></h3>
                  <div className="flex flex-wrap gap-2">
                    {['Anthropic', 'Polymarket', 'ASU Blockchain', 'Acorns', 'StreetSmart'].map((sponsor) => (
                      <span key={sponsor} className="bg-[var(--theme-text-accent)]/30 text-[var(--theme-text-primary)] px-3 py-1 rounded-full text-sm font-bold border border-[var(--theme-text-accent)]/40">
                        {sponsor}
                      </span>
                    ))}
                    <span className="bg-[var(--theme-text-accent)]/30 text-[var(--theme-text-primary)] px-3 py-1 rounded-full text-sm font-bold border border-[var(--theme-text-accent)]/40">
                      + MORE COMING! 🚀
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-4">🎯 <span className="text-[var(--theme-text-accent)]">WHAT TO EXPECT</span></h3>
                  <ul className="space-y-3 text-[var(--theme-text-primary)]">
                    <li className="flex items-center space-x-3">
                      <span className="text-[var(--theme-text-accent)] text-xl font-bold">💰</span>
                      <span className="font-bold">MASSIVE prizes & recognition</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-[var(--theme-text-accent)] text-xl font-bold">🚀</span>
                      <span className="font-bold">Insanely unique projects</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-[var(--theme-text-accent)] text-xl font-bold">⚡</span>
                      <span className="font-bold">Life-changing experience</span>
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
