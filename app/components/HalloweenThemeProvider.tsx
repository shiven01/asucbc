"use client";

import React, { createContext, useContext } from "react";
import { isHalloweenTheme } from "../theme-config";
import dynamic from "next/dynamic";

interface HalloweenThemeContextType {
  isHalloween: boolean;
}

const HalloweenThemeContext = createContext<HalloweenThemeContextType>({
  isHalloween: false,
});

/**
 * useHalloweenTheme hook
 *
 * Access the Halloween theme state from any component within the HalloweenThemeProvider.
 *
 * @returns {HalloweenThemeContextType} Object containing isHalloween boolean
 *
 * @example
 * const { isHalloween } = useHalloweenTheme();
 * if (!isHalloween) return null;
 */
export const useHalloweenTheme = () => {
  const context = useContext(HalloweenThemeContext);
  if (context === undefined) {
    throw new Error(
      "useHalloweenTheme must be used within a HalloweenThemeProvider"
    );
  }
  return context;
};

interface HalloweenThemeProviderProps {
  children: React.ReactNode;
}

/**
 * HalloweenThemeProvider
 *
 * A wrapper component that provides Halloween theme state via React Context
 * and conditionally renders Halloween-themed effects (like the RopeCanvas)
 * based on the NEXT_PUBLIC_HALLOWEEN_THEME environment variable.
 *
 * Usage:
 * Wrap your app content in layout.tsx with this provider.
 * Access theme state in child components using the useHalloweenTheme() hook.
 */
const HalloweenThemeProvider: React.FC<HalloweenThemeProviderProps> = ({
  children,
}) => {
  const RopeCanvas = dynamic(() => import("./RopeCanvas"), { ssr: false });

  return (
    <HalloweenThemeContext.Provider value={{ isHalloween: isHalloweenTheme }}>
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
    </HalloweenThemeContext.Provider>
  );
};

export default HalloweenThemeProvider;
