import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading, Text } from "../components/ui";
import { notFound } from "next/navigation";
import { showHackathonPromo } from "../theme-config";

export default function Announcements() {
  if (!showHackathonPromo) {
    notFound();
  }

  return (
    <div className="min-h-[100dvh] max-h-[100dvh] flex flex-col relative overflow-y-auto">
      <Header />

      <div className="font-sans flex-1 pt-4 px-4 pb-0 sm:pt-8 sm:px-8 md:p-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Heading level="h1" animate={false} className="mb-6">
              🚀 <span className="text-[var(--theme-text-accent)]">CodeDevils x CBC</span> Hackathon
            </Heading>
            <Text size="xl" variant="accent" className="font-bold mb-4">
              🎯 <span className="underline">FREE</span> Claude Pro + $50 API Credits
            </Text>
            <Text size="lg" variant="secondary" className="mb-8">
              Join our exclusive info meeting • Monday, Oct. 27th, 6-7pm (Arizona Time)
            </Text>
            <div className="w-32 h-1 bg-[var(--theme-text-accent)] mx-auto rounded-full"></div>
          </div>

          {/* Quick Actions - Redesigned for better UX */}
          <div className="mb-16">
            <Heading level="h2" animate={false} className="mb-8 text-center">
              🎯 <span className="text-[var(--theme-text-accent)]">Don't Miss Out</span> - Limited Time Only!
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Action - Meeting */}
              <a
                href="https://cglink.me/22J/r387342"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-br from-[var(--theme-text-accent)] to-[var(--theme-text-accent)]/80 text-white p-8 rounded-3xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
                data-umami-event="Announcements - Meeting Registration"
                data-umami-event-location="Announcements Page"
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">🔥 SECURE YOUR SPOT NOW</h3>
                      <p className="text-white/90 text-sm font-semibold">Monday, Oct. 27th, 6-7pm (Arizona Time)</p>
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
                data-umami-event="Announcements - Hackathon Register"
                data-umami-event-location="Announcements Page"
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
                data-umami-event="Announcements - Discord Join"
                data-umami-event-location="Announcements Page"
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
                data-umami-event="Announcements - View Calendar"
                data-umami-event-location="Announcements Page"
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

          {/* Announcements Content - Enhanced Design */}
          <div className="space-y-16">
            {/* What is Claude Builder Club */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-[var(--theme-card-bg)] to-[var(--theme-card-bg)]/80 rounded-3xl p-10 shadow-xl border border-[var(--theme-card-border)] hover:scale-105 hover:rotate-1 transition-all duration-300 ease-out cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--theme-text-accent)]/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <Heading level="h2" animate={false} className="mb-3">About Claude Builder Club</Heading>
                  <Text size="xl" variant="secondary" className="leading-relaxed">A program to sponsor Anthropic builder tools to our university</Text>
                </div>
                <div className="bg-gradient-to-r from-[var(--theme-text-accent)]/10 to-[var(--theme-text-accent)]/5 p-8 rounded-2xl border-l-4 border-[var(--theme-text-accent)] shadow-sm">
                  <Text size="lg" variant="primary" className="font-semibold leading-relaxed">
                    Part of this is trying to have an on-campus club to do this
                  </Text>
                </div>
              </div>
            </div>

            {/* What We Offer */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-[var(--theme-card-bg)] to-[var(--theme-card-bg)]/80 rounded-3xl p-10 shadow-xl border border-[var(--theme-card-border)] hover:scale-105 hover:-rotate-1 transition-all duration-300 ease-out cursor-pointer">
              <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--theme-text-accent)]/5 rounded-full -translate-x-12 -translate-y-12"></div>
              <div className="relative z-10">
                <div className="mb-10">
                  <Heading level="h2" animate={false} className="mb-3">What We Offer</Heading>
                  <Text size="xl" variant="secondary" className="leading-relaxed">Exclusive benefits for ASU students</Text>
                </div>
                
                <div className="space-y-10">
                  {/* #1 - Free Claude Pro */}
                  <div className="relative bg-gradient-to-br from-[var(--theme-text-accent)]/15 to-[var(--theme-text-accent)]/5 p-8 rounded-3xl border border-[var(--theme-text-accent)]/20 shadow-lg">
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--theme-text-accent)]/20 rounded-full flex items-center justify-center">
                      <span className="text-[var(--theme-text-accent)] font-bold text-sm">1</span>
                    </div>
                    <Heading level="h3" animate={false} className="text-[var(--theme-text-accent)] mb-4 pr-12">Free Claude Pro + $50 API Credits</Heading>
                    <Text size="lg" variant="primary" className="mb-6 font-medium">Valid until February</Text>
                    <div className="space-y-3 text-[var(--theme-text-primary)]">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[var(--theme-text-accent)] rounded-full"></div>
                        <span className="font-medium">Join our hybrid info meeting</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[var(--theme-text-accent)] rounded-full"></div>
                        <span className="font-medium">Monday, Oct. 27th, 6-7pm (Arizona Time)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[var(--theme-text-accent)] rounded-full"></div>
                        <span className="font-medium">1-7 business days to receive benefits</span>
                      </div>
                    </div>
                  </div>

                  {/* #2 - Builder Community Vision */}
                  <div className="relative bg-gradient-to-br from-[var(--theme-text-accent)]/8 to-transparent p-8 rounded-3xl border border-[var(--theme-text-accent)]/10 shadow-lg">
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--theme-text-accent)]/20 rounded-full flex items-center justify-center">
                      <span className="text-[var(--theme-text-accent)] font-bold text-sm">2</span>
                    </div>
                    <Heading level="h3" animate={false} className="mb-4 pr-12">Vision: Builder Community</Heading>
                    <Text size="lg" variant="primary" className="mb-8 font-medium leading-relaxed">Making ASU as technically connected as top-tier universities</Text>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-[var(--theme-text-accent)]/15 to-[var(--theme-text-accent)]/5 p-6 rounded-2xl border-l-4 border-[var(--theme-text-accent)]">
                        <Heading level="h4" animate={false} className="mb-3">Our Vision</Heading>
                        <Text size="base" variant="primary" className="leading-relaxed">
                          ASU should be as equally technically connected to tech-companies as schools like UC Berkeley, MIT, Dartmouth, etc.
                        </Text>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Heading level="h4" animate={false} className="mb-4">How We Achieve This</Heading>
                          <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-[var(--theme-text-accent)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-[var(--theme-text-accent)] font-bold text-sm">•</span>
                              </div>
                              <span className="text-[var(--theme-text-primary)] font-medium">Building extremely hard technical projects</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-[var(--theme-text-accent)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-[var(--theme-text-accent)] font-bold text-sm">•</span>
                              </div>
                              <span className="text-[var(--theme-text-primary)] font-medium">Social media engagement + analytics</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-[var(--theme-text-accent)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-[var(--theme-text-accent)] font-bold text-sm">•</span>
                              </div>
                              <span className="text-[var(--theme-text-primary)] font-medium">Using proof to gather more sponsors</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <Heading level="h4" animate={false} className="mb-4">What Makes a Project "Extremely Hard"</Heading>
                          <div className="space-y-4">
                            <p className="text-[var(--theme-text-primary)]/80 leading-relaxed">
                              When the Service Level Agreement (SLA) technically cannot be possible with just AI tools
                            </p>
                            <div className="bg-gradient-to-r from-[var(--theme-text-accent)]/10 to-[var(--theme-text-accent)]/5 p-5 rounded-2xl border border-[var(--theme-text-accent)]/20">
                              <p className="text-[var(--theme-text-primary)] font-bold mb-3">Requires all three:</p>
                              <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-[var(--theme-text-accent)] rounded-full"></div>
                                  <span className="text-[var(--theme-text-primary)] font-medium">Independent Research</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-[var(--theme-text-accent)] rounded-full"></div>
                                  <span className="text-[var(--theme-text-primary)] font-medium">AI Tools</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-[var(--theme-text-accent)] rounded-full"></div>
                                  <span className="text-[var(--theme-text-primary)] font-medium">Communication</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Hackathon Info */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-[var(--theme-text-accent)]/15 to-[var(--theme-text-accent)]/5 rounded-3xl p-10 shadow-xl border-2 border-[var(--theme-text-accent)]/30 hover:scale-105 hover:rotate-1 transition-all duration-300 ease-out cursor-pointer">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--theme-text-accent)]/10 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--theme-text-accent)]/5 rounded-full translate-y-16 -translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-start space-x-6 mb-10">
                  <div className="w-16 h-16 bg-[var(--theme-text-accent)] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-3xl text-white">🏆</span>
                  </div>
                  <div>
                    <Heading level="h2" animate={false} className="mb-3">Builder + Business Case Comp. Hackathon</Heading>
                    <Text size="xl" variant="secondary" className="font-medium">Definitely not your regular hackathon</Text>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <Heading level="h3" animate={false} className="mb-6">Major Sponsors</Heading>
                    <div className="flex flex-wrap gap-3">
                      {['Anthropic', 'Polymarket', 'ASU Blockchain', 'Acorns', 'StreetSmart'].map((sponsor) => (
                        <span key={sponsor} className="bg-gradient-to-r from-[var(--theme-text-accent)]/25 to-[var(--theme-text-accent)]/15 text-[var(--theme-text-primary)] px-4 py-2 rounded-full text-sm font-bold border border-[var(--theme-text-accent)]/30 shadow-sm">
                          {sponsor}
                        </span>
                      ))}
                      <span className="bg-gradient-to-r from-[var(--theme-text-accent)]/25 to-[var(--theme-text-accent)]/15 text-[var(--theme-text-primary)] px-4 py-2 rounded-full text-sm font-bold border border-[var(--theme-text-accent)]/30 shadow-sm">
                        + more coming!
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Heading level="h3" animate={false} className="mb-6">What to Expect</Heading>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[var(--theme-text-accent)]/10 to-transparent rounded-2xl border border-[var(--theme-text-accent)]/20">
                        <div className="w-8 h-8 bg-[var(--theme-text-accent)]/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[var(--theme-text-accent)] font-bold">✓</span>
                        </div>
                        <span className="text-[var(--theme-text-primary)] font-semibold text-lg">Very large prizes</span>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[var(--theme-text-accent)]/10 to-transparent rounded-2xl border border-[var(--theme-text-accent)]/20">
                        <div className="w-8 h-8 bg-[var(--theme-text-accent)]/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[var(--theme-text-accent)] font-bold">✓</span>
                        </div>
                        <span className="text-[var(--theme-text-primary)] font-semibold text-lg">Insanely unique project tracks</span>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[var(--theme-text-accent)]/10 to-transparent rounded-2xl border border-[var(--theme-text-accent)]/20">
                        <div className="w-8 h-8 bg-[var(--theme-text-accent)]/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[var(--theme-text-accent)] font-bold">✓</span>
                        </div>
                        <span className="text-[var(--theme-text-primary)] font-semibold text-lg">Cracked Sponsors</span>
                      </div>
                    </div>
                  </div>
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
