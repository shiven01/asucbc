import Image from "next/image";
import Header from "./components/Header";
import CalendarContainer from "./components/calendar/CalendarContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f3ee]">
      <Header />
      <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen items-start">
          {/* Left half - Title */}
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#000000] leading-tight">
              The Arizona State University Claude Builder Club
            </h1>
          </div>
          
          {/* Right half - Calendar */}
          <div className="flex flex-col items-center sm:items-start">
            <CalendarContainer className="w-full max-w-2xl" />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="flex gap-[24px] flex-wrap items-center justify-center mt-8">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </div>
  );
}