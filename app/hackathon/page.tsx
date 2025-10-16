import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Hackathon() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="font-sans flex-1 pt-4 px-4 pb-0 sm:pt-8 sm:px-8 md:p-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffffff] leading-tight mb-2">
              🎃 Spooky <span className="text-[#f4f3ee] font-bold underline">Hackathon</span> 2025
            </h1>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full inline-block text-sm font-semibold mb-4">
              🚀 LIMITED TIME OPPORTUNITY
            </div>
            <p className="text-lg sm:text-xl text-[#f4f3ee] max-w-2xl mx-auto">
              Join us for an epic Halloween-themed hackathon! Build something spooky, win amazing prizes, and connect with fellow builders.
            </p>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border-2 border-yellow-400/20">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#5d4e37] mb-6">
                Signup Form Coming Soon!
              </h2>
              <p className="text-xl text-[#5d4e37]/80 mb-8">
                We're putting the finishing touches on our hackathon registration form. Check back soon!
              </p>
              
              {/* Event Details */}
              <div className="bg-[#f4f3ee] rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-[#5d4e37] mb-4">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-[#5d4e37]/60 text-sm font-semibold mb-1">📅 DATE</p>
                    <p className="text-[#5d4e37] font-bold">November 8-9, 2025</p>
                  </div>
                  <div>
                    <p className="text-[#5d4e37]/60 text-sm font-semibold mb-1">⏰ TIME</p>
                    <p className="text-[#5d4e37] font-bold">Nov 8, 11 AM - Nov 9, 5 PM</p>
                  </div>
                  <div>
                    <p className="text-[#5d4e37]/60 text-sm font-semibold mb-1">💰 PRIZES</p>
                    <p className="text-[#5d4e37] font-bold">$5,000 Total</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#cc785c]/20">
                  <h4 className="text-[#5d4e37] font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2 text-[#5d4e37]">
                    <li className="flex items-center justify-center">
                      <span className="mr-2">🎃</span>
                      <span>$5,000 in prizes</span>
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="mr-2">👻</span>
                      <span>Free food & swag</span>
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="mr-2">🦇</span>
                      <span>Mentorship from industry experts</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center">
                <p className="text-[#5d4e37]/80 mb-2">
                  Questions? Contact us at{" "}
                  <a
                    href="mailto:shivenshekar01@gmail.com"
                    className="text-[#5d4e37] hover:underline font-semibold"
                  >
                    shivenshekar01@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}