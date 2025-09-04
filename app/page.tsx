import Image from "next/image";
import Header from "./components/Header";
import { Calendar } from "./components/calendar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f3ee]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#c15f3c] mb-4">
              ASU CBC Calendar
            </h1>
            <p className="text-black/70 text-lg">
              Stay updated with our upcoming events and activities
            </p>
          </div>
          
          <Calendar />
          
          <div className="mt-8 text-center">
            <p className="text-black/60 text-sm">
              Click on any event to view details and add to your calendar
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
