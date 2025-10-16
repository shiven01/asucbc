import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="font-sans min-h-screen p-8 pb-20 sm:p-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Anthropic Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src="/claude-image.svg"
                  alt="Claude 3-7 Illustration"
                  width={800}
                  height={800}
                  className="w-[36rem] h-[36rem] lg:w-[40rem] lg:h-[40rem] object-contain"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--theme-text-primary)] mb-6">
                About Anthropic
              </h1>
              <p className="text-[var(--theme-text-accent)] text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                The Arizona State University Claude Builder Club is a
                student-run organization dedicated to exploring the cutting-edge
                capabilities of Anthropic's Claude AI. We foster innovation,
                collaboration, and learning in the rapidly evolving field of
                artificial intelligence.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--theme-text-primary)]/10 backdrop-blur-sm rounded-lg p-6 border border-[var(--theme-card-border)] hover:bg-[var(--theme-text-primary)]/15 transition-all duration-300">
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">
                    AI Innovation
                  </h3>
                  <p className="text-[var(--theme-text-accent)] text-sm leading-relaxed">
                    Explore the latest developments in AI technology and build
                    innovative applications using Claude's advanced
                    capabilities.
                  </p>
                </div>

                <div className="bg-[var(--theme-text-primary)]/10 backdrop-blur-sm rounded-lg p-6 border border-[var(--theme-card-border)] hover:bg-[var(--theme-text-primary)]/15 transition-all duration-300">
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">
                    Community Learning
                  </h3>
                  <p className="text-[var(--theme-text-accent)] text-sm leading-relaxed">
                    Join a vibrant community of students passionate about AI,
                    sharing knowledge and collaborating on exciting projects.
                  </p>
                </div>

                <div className="bg-[var(--theme-text-primary)]/10 backdrop-blur-sm rounded-lg p-6 border border-[var(--theme-card-border)] hover:bg-[var(--theme-text-primary)]/15 transition-all duration-300">
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">
                    Hands-on Projects
                  </h3>
                  <p className="text-[var(--theme-text-accent)] text-sm leading-relaxed">
                    Work on real-world projects that showcase the power of
                    Claude AI and contribute to meaningful technological
                    solutions.
                  </p>
                </div>

                <div className="bg-[var(--theme-text-primary)]/10 backdrop-blur-sm rounded-lg p-6 border border-[var(--theme-card-border)] hover:bg-[var(--theme-text-primary)]/15 transition-all duration-300">
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">
                    Future-Ready Skills
                  </h3>
                  <p className="text-[var(--theme-text-accent)] text-sm leading-relaxed">
                    Develop essential skills for the AI-driven future, preparing
                    for careers in technology and artificial intelligence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer integrated into the grid layout */}
          <div className="mt-16 pt-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
