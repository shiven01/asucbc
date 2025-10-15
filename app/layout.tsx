import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isHalloweenTheme } from "./theme-config";
import HalloweenThemeProvider from "./components/HalloweenThemeProvider";
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
    icon: '/claude.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased ${isHalloweenTheme ? 'halloween-theme' : ''}`}
      >
        <HalloweenThemeProvider>
          {children}
        </HalloweenThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
