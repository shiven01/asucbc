import Header from "../components/Header";
import Footer from "../components/Footer";
import AppSubmissionForm from "../components/AppSubmissionForm";

export default function AppSubmission() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="font-sans flex-1 pt-4 px-4 pb-0 sm:pt-8 sm:px-8 md:p-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffffff] leading-tight mb-2">
              Submit Your <span className="text-[#f4f3ee] font-bold underline">App</span>
            </h1>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full inline-block text-sm font-semibold mb-4">
              🚀 LIMITED TIME OPPORTUNITY
            </div>
            <p className="text-lg sm:text-xl text-[#f4f3ee] max-w-2xl mx-auto">
              Showcase your amazing app to the Claude Builder Club! Submit your project with videos and images to get feedback and recognition from our community.
            </p>
          </div>

          {/* App Submission Form */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border-2 border-yellow-400/20">
            <AppSubmissionForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
