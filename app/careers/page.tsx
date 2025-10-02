import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="font-sans flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#ffffff] leading-tight mb-6">
            <span className="text-[#f4f3ee] font-bold">Careers</span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#f4f3ee] font-medium">
            More opportunities coming soon!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
