export default function Header() {
  return (
    <header className="w-full bg-[#c15f3c] border-b border-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#f4f3ee] tracking-tight">
              ANTHROP\C
            </h1>
          </div>
          
          {/* Navigation buttons in the middle */}
          <nav className="hidden md:flex items-center space-x-8">
            <button className="text-[#f4f3ee] hover:text-black transition-colors duration-200 font-medium" style={{ fontFamily: 'var(--font-lora)' }}>
              About
            </button>
            <button className="text-[#f4f3ee] hover:text-black transition-colors duration-200 font-medium" style={{ fontFamily: 'var(--font-lora)' }}>
              Benefits
            </button>
            <button className="bg-[#f4f3ee] text-[#c15f3c] px-6 py-2 rounded-full hover:bg-white transition-colors duration-200 font-medium" style={{ fontFamily: 'var(--font-lora)' }}>
              Join
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-[#f4f3ee] hover:text-black transition-colors duration-200">
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
