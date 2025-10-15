"use client";

import React from "react";
import { isHalloweenTheme } from "../theme-config";
import RopeCanvas from "./RopeCanvas";
import dynamic from "next/dynamic";

interface HalloweenThemeProviderProps {
  children: React.ReactNode;
}

/**
 * HalloweenThemeProvider
 *
 * A wrapper component that conditionally renders Halloween-themed effects
 * (like the RopeCanvas) based on the NEXT_PUBLIC_HALLOWEEN_THEME environment variable.
 *
 * Usage:
 * Wrap your app content in layout.tsx with this provider.
 */
const HalloweenThemeProvider: React.FC<HalloweenThemeProviderProps> = ({
  children,
}) => {
  const RopeCanvas = dynamic(() => import("./RopeCanvas"), { ssr: false });

  return (
    <>
      {isHalloweenTheme && (
        <RopeCanvas
          length={300}
          segments={100}
          anchorPoint={{ x: 100, y: 100 }}
          strokeColor="#FFFFFF"
          strokeWidth={3}
          cursorOffset={{ x: 8, y: 8 }}
        />
      )}
      {children}
    </>
  );
};

export default HalloweenThemeProvider;
