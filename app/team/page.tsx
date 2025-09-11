import Header from "../components/Header";

export default function Team() {
  return (
    <div className="min-h-screen bg-[#cc785c]">
      <Header />
      <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ffffff] mb-4">
              Meet Our Team
            </h1>
            <p className="text-xl text-[#f4f3ee] max-w-2xl mx-auto">
              The passionate individuals behind the Arizona State University Claude Builder Club
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Team Member 1 - Left (Your name) */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#f4f3ee] to-[#ffffff] flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-44 h-44 rounded-full bg-[#cc785c] flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#ffffff]">SS</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#f4f3ee] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg">👑</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#ffffff] mb-2">Shiven Shekar</h3>
              <p className="text-[#f4f3ee] text-sm leading-relaxed max-w-xs">
              I'm a senior studying Computer Science with a Software Engineering concentration at Arizona State University. My interests lie in AppliedML and Distributed Systems.
              </p>
              <div className="mt-4 flex space-x-4">
                <a 
                  href="https://github.com/shiven01" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#f4f3ee] hover:text-[#ffffff] transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/in/shiven-shekar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#f4f3ee] hover:text-[#ffffff] transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Team Member 2 - Middle */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#f4f3ee] to-[#ffffff] flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-44 h-44 rounded-full bg-[#cc785c] flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#ffffff]">AM</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#f4f3ee] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg">🚀</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#ffffff] mb-2">Tino Mavuga</h3>
              <p className="text-[#f4f3ee] text-sm leading-relaxed max-w-xs">
                Originally from Zimbabwe, Tino brings a global perspective to technology and policy, having lived and studied across four continents. She holds a BA in Psychology and Management from Monash University and is pursuing a Master in Global Management with Digital Transformation concentration at ASU's Thunderbird School, where she serves as a Claude AI Ambassador. With certifications in Software Entrepreneurship, Innovation Management, and Scrum, plus experience as a remote software project manager across Europe, she specializes in the intersection of technology, people, and policy. Currently studying Artificial Intelligence, Chip Strategy, cybersecurity, and governance of nuclear technologies, Tino is positioned at the forefront of critical technology policy issues.
              </p>
              <div className="mt-4 flex space-x-4">
                <a 
                  href="#" 
                  className="text-[#f4f3ee] hover:text-[#ffffff] transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="text-[#f4f3ee] hover:text-[#ffffff] transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Team Member 3 - Right */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#f4f3ee] to-[#ffffff] flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-44 h-44 rounded-full bg-[#cc785c] flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#ffffff]">SJ</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#f4f3ee] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg">💡</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#ffffff] mb-2">Farnaz Avarzamani</h3>
              <ul className="text-[#f4f3ee] text-sm leading-relaxed max-w-xs text-left">
                <li>• PhD Candidate in Education</li>
                <li>• Claude AI Builder</li>
                <li>• Educational AI Builder</li>
                <li>• Educational Researcher</li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a 
                  href="#" 
                  className="text-[#f4f3ee] hover:text-[#ffffff] transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="text-[#f4f3ee] hover:text-[#ffffff] transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-[#ffffff] mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-[#f4f3ee] mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who want to make a difference in the AI community at ASU.
            </p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#ffffff] text-[#cc785c] px-8 py-3 rounded-lg hover:bg-[#cc785c] hover:text-[#ffffff] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out font-medium text-lg font-sans border border-transparent hover:border-[#ffffff]"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
