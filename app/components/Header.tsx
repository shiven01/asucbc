export default function Header() {
  return (
    <header className="w-full bg-[#cc785c] border-b border-[#b1ada1]/30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <a href="/">
              <h1 className="text-2xl font-bold tracking-tight cursor-pointer font-sans">
                <span className="text-[#ffffff] hover:text-[#ffffff] transition-colors duration-200">ANTHROPIC</span> <span className="text-[#ffffff] hover:text-[#f4f3ee] transition-colors duration-200">@ ASU</span>
              </h1>
            </a>
          </div>
          
          {/* Navigation buttons in the middle */}
          <nav className="hidden md:flex items-center space-x-8">
            <button className="text-[#ffffff] hover:text-[#f4f3ee] transition-colors duration-200 font-medium font-sans">
              About
            </button>
            <a 
              href="/team"
              className="text-[#ffffff] hover:text-[#f4f3ee] transition-colors duration-200 font-medium font-sans"
            >
              Team
            </a>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ffffff] text-[#cc785c] px-6 py-2 rounded-lg hover:bg-[#cc785c] hover:text-[#ffffff] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out font-medium text-base font-sans border border-transparent hover:border-[#ffffff]"
            >
              Join Us
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-[#ffffff] hover:text-[#f4f3ee] transition-colors duration-200 font-sans">
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
