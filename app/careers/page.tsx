import Header from "../components/Header";
import Footer from "../components/Footer";
import JobApplicationForm from "../components/JobApplicationForm";

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="font-sans flex-1 pt-4 px-4 pb-0 sm:pt-8 sm:px-8 md:p-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffffff] leading-tight mb-4">
              Join Our <span className="text-[#f4f3ee] font-bold underline">Team</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#f4f3ee] max-w-2xl mx-auto">
              Help us build the future of AI at Arizona State University. We're looking for passionate individuals to join the Claude Builder Club leadership team.
            </p>
          </div>

          {/* Job Application Form */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl">
            <JobApplicationForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
