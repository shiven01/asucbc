import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CalendarContainer from "./components/calendar/CalendarContainer";
import JoinCard from "./components/JoinCard";
import HackathonPromo from "./components/HackathonPromo";
import HalloweenDecorations from "./components/HalloweenDecorations";
import { showHackathonPromo } from "./theme-config";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <HalloweenDecorations />
      <Header />
      <div className="font-sans flex-1 pt-4 px-4 pb-0 sm:pt-8 sm:px-8 md:p-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 min-h-full items-start">
          {/* Left half - Title + Cards */}
          <div className="flex flex-col justify-start p-4 gap-4 sm:p-6 sm:gap-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] leading-tight">
            The Arizona State University Claude Builder Club. Where curiosity meets <span className="text-[var(--theme-text-accent)] font-bold underline">cutting-edge AI</span>. Build <span className="text-[var(--theme-text-accent)] font-bold underline">anything</span>. Create the <span className="text-[var(--theme-text-accent)] font-bold underline italic">impossible</span>.
            </h1>
            
            {/* Cards container - Hackathon on left, Join on right when both shown */}
            <div className={`grid ${showHackathonPromo ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4 mt-2`}>
              {showHackathonPromo && (
                <HackathonPromo className="md:col-span-2" />
              )}
              <JoinCard
                className={showHackathonPromo ? 'md:col-span-2' : ''}
                discordHref="https://discord.gg/PRh8F2XebB"
                benefitsHref="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
              />
            </div>
          </div>
          
          {/* Right half - Calendar */}
          <div className="flex flex-col items-center sm:items-start pt-0 pb-4 px-4 sm:pb-8 md:pb-12 lg:pb-20 lg:px-0">
            <CalendarContainer className="w-full max-w-2xl" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}