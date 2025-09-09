import Image from "next/image";
import Header from "./components/Header";
import CalendarContainer from "./components/calendar/CalendarContainer";
import JoinCard from "./components/JoinCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#c15f3c]">
      <Header />
      <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen items-start">
          {/* Left half - Title + Join card */}
          <div className="flex flex-col justify-start p-6 gap-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#ffffff] leading-tight">
            The Arizona State University Claude Builder Club. Where curiosity meets <span className="text-[#f4f3ee] font-bold underline">cutting-edge AI</span>. Build <span className="text-[#f4f3ee] font-bold underline">anything</span>. Create the <span className="text-[#f4f3ee] font-bold underline italic">impossible</span>.
            </h1>
            <JoinCard
              className="mt-2"
              discordHref="https://discord.gg/"
              benefitsHref="https://forms.gle/"
            />
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