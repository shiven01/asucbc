import Header from "../components/Header";
import Footer from "../components/Footer";
import HackathonSignupForm from "../components/HackathonSignupForm";

export default function Hackathon() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="font-sans flex-1 pt-4 px-4 pb-0 sm:pt-8 sm:px-8 md:p-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--theme-text-primary)] leading-tight mb-2">
              🎃 Spooky <span className="text-[var(--theme-text-accent)] font-bold underline">Hackathon</span> 2025
            </h1>
            <div className="bg-[var(--theme-button-bg)] text-white px-4 py-2 rounded-full inline-block text-sm font-semibold mb-4">
              🚀 LIMITED TIME OPPORTUNITY
            </div>
            <p className="text-lg sm:text-xl text-[var(--theme-text-secondary)] max-w-2xl mx-auto">
              Join us for an epic Halloween-themed hackathon! Build something spooky, win amazing prizes, and connect with fellow builders.
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-[var(--theme-card-bg)] backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border-2 border-[var(--theme-card-border)]">
            <HackathonSignupForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}