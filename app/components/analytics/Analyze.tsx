"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    umami?: {
      track: (payload?: any) => void;
    };
  }
}

const WEBSITE_ID =
  process.env.NEXT_PUBLIC_LOCAL_UMAMI_OVERRIDE_ID ||
  "407772a6-dc54-4c85-8e46-327d20c45c26";

export const Analyze = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Collect all tracking properties manually
  const collectTrackingData = () => {
    if (typeof window === "undefined") return null;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    return {
      website: WEBSITE_ID,
      hostname: window.location.hostname,
      language: navigator.language,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      title: document.title,
      url: url,
    };
  };

  // Function to track pageview in a non-blocking way
  const trackPageview = () => {
    if (typeof window !== "undefined" && window.umami) {
      const trackingData = collectTrackingData();

      if (!trackingData) return;

      // Use requestIdleCallback to ensure tracking doesn't block navigation
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(
          () => {
            window.umami?.track(trackingData);
            console.log("Umami pageview tracked (idle):", trackingData);
          },
          { timeout: 2000 }
        );
      } else {
        setTimeout(() => {
          window.umami?.track(trackingData);
          console.log("Umami pageview tracked (timeout):", trackingData);
        }, 100);
      }
    }
  };

  // Track pageview on pathname change
  useEffect(() => {
    trackPageview();
  }, [pathname, searchParams]);

  return null;
};
