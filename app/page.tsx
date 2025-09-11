import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CalendarContainer from "./components/calendar/CalendarContainer";
import JoinCard from "./components/JoinCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#cc785c] flex flex-col">
      <Header />
      <div className="font-sans flex-1 p-8 pb-20 sm:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-full items-start">
          {/* Left half - Title + Join card */}
          <div className="flex flex-col justify-start p-6 gap-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#ffffff] leading-tight">
            The Arizona State University Claude Builder Club. Where curiosity meets <span className="text-[#f4f3ee] font-bold underline">cutting-edge AI</span>. Build <span className="text-[#f4f3ee] font-bold underline">anything</span>. Create the <span className="text-[#f4f3ee] font-bold underline italic">impossible</span>.
            </h1>
            <JoinCard
              className="mt-2"
              discordHref="https://discord.gg/PRh8F2XebB"
              benefitsHref="https://docs.google.com/forms/d/e/1FAIpQLScP9LuFwiHEx806tv9zczjCIEzqO1Zjb-FjB4XWoa6BS1NNKQ/viewform"
            />
          </div>
          
          {/* Right half - Calendar */}
          <div className="flex flex-col items-center sm:items-start">
            <CalendarContainer className="w-full max-w-2xl" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}