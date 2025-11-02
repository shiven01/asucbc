import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading, Text } from "../components/ui";

export default function Careers() {
  return (
    <div className="min-h-[100dvh] max-h-[100dvh] flex flex-col relative overflow-y-auto">
      <Header />
      <div className="font-sans flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="text-center">
          <Heading level="h1" animate={false} className="mb-6">
            Careers
          </Heading>
          <Text size="xl" variant="secondary" className="font-medium">
            More opportunities coming soon!
          </Text>
        </div>
      </div>
      <Footer />
    </div>
  );
}
