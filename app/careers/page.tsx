import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Careers() {
  return (
    <div className="min-h-[100dvh] max-h-[100dvh] flex flex-col relative overflow-y-auto">
      <Header />
      <div className="font-sans flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--theme-text-primary)] leading-tight mb-6">
            <span className="text-[var(--theme-text-primary)] font-bold">Careers</span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--theme-text-secondary)] font-medium">
            More opportunities coming soon!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
