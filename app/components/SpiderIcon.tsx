"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useHalloweenTheme } from "./HalloweenThemeProvider";

const SpiderIcon: React.FC = () => {
  const { ropeEndpoint } = useHalloweenTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile (no fine pointer = touch device)
    const checkMobile = () => {
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(hasCoarsePointer);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Don't render on desktop
  if (!isMobile) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: ropeEndpoint.x - window.scrollX - 10,
        top: ropeEndpoint.y - window.scrollY - 10,
        width: "20px",
        height: "20px",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <Image
        src="/claude.svg"
        alt="Spider cursor"
        width={20}
        height={20}
        priority
      />
    </div>
  );
};

export default SpiderIcon;
