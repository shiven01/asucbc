import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Heading, Text, Card, Container } from "./components/ui";

export default function NotFoundPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 py-16">
        <Container size="md" animate>
          <Card gradient className="text-center py-16 px-6">
            <Heading level="h1" animate={false} className="text-4xl sm:text-5xl mb-6">
              Error 404
            </Heading>
            <Text size="lg" variant="secondary" className="max-w-2xl mx-auto mb-10">
              We couldn&apos;t find the experience you were looking for. It may have moved, been retired, or requires special access.
            </Text>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-transparent bg-[var(--theme-button-bg)] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[var(--theme-button-hover-bg)] hover:shadow-xl"
              >
                Return Home
              </Link>
            </div>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
