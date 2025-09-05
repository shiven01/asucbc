export default function Header() {
  return (
    <header className="w-full bg-[#f4f3ee] border-b border-[#b1ada1]/30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <a href="https://www.anthropic.com/" target="_blank" rel="noopener noreferrer">
              <h1 className="text-2xl font-bold text-[#c15f3c] hover:text-[#000000] transition-colors duration-200 tracking-tight cursor-pointer">
                ANTHROP\C
              </h1>
            </a>
          </div>
          
          {/* Navigation buttons in the middle */}
          <nav className="hidden md:flex items-center space-x-8">
            <button className="text-[#000000] hover:text-[#c15f3c] transition-colors duration-200 font-medium" style={{ fontFamily: 'var(--font-lora)' }}>
              About
            </button>
            <button className="text-[#000000] hover:text-[#c15f3c] transition-colors duration-200 font-medium" style={{ fontFamily: 'var(--font-lora)' }}>
              Benefits
            </button>
            <button className="bg-[#c15f3c] text-[#f4f3ee] px-6 py-2 rounded-lg hover:bg-[#a04d2f] hover:text-[#ffffff] transition-colors duration-200 font-medium text-base" style={{ fontFamily: 'var(--font-lora)' }}>
              Join Club
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-[#000000] hover:text-[#c15f3c] transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
