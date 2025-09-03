export default function Header() {
  return (
    <header className="w-full bg-[#f4f3ee] border-b border-[#c15f3c]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black tracking-tight">
              ANTHROP\C
            </h1>
          </div>
          
          {/* Navigation buttons in the middle */}
          <nav className="hidden md:flex items-center space-x-8">
            <button className="text-black hover:text-[#c15f3c] transition-colors duration-200 font-medium">
              About
            </button>
            <button className="text-black hover:text-[#c15f3c] transition-colors duration-200 font-medium">
              Benefits
            </button>
            <button className="bg-[#c15f3c] text-white px-6 py-2 rounded-full hover:bg-[#c15f3c]/90 transition-colors duration-200 font-medium">
              Join
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-black hover:text-[#c15f3c] transition-colors duration-200">
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
