import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "./components/ThemeProvider";
import DarkModeToggle from "./components/DarkModeToggle";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ASU Claude Builder Club",
  description: "ASU Claude Builder Club - Building with Claude AI",
  icons: {
    icon: "/claude.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ASU Claude Builder Club</title>
        <meta
          name="description"
          content="ASU Claude Builder Club - Building with Claude AI"
        />
        <link rel="icon" href="/claude.svg" />
        <meta property="og:title" content="ASU Claude Builder Club" />
        <meta
          property="og:description"
          content="ASU Claude Builder Club - Building with Claude AI"
        />
        <meta property="og:image" content="/assets/og/splash.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ASU Claude Builder Club" />
        <meta
          name="twitter:description"
          content="ASU Claude Builder Club - Building with Claude AI"
        />
        <meta name="twitter:image" content="/assets/og/splash.png" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <DarkModeToggle />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
