"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useHalloweenTheme } from "./HalloweenThemeProvider";

const SpiderIcon: React.FC = () => {
  const { ropeEndpointRef } = useHalloweenTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const animationFrameRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (!isMobile) return;

    // Animation loop to update position from ref
    const updatePosition = () => {
      setPosition({
        x: ropeEndpointRef.current.x,
        y: ropeEndpointRef.current.y,
      });
      animationFrameRef.current = requestAnimationFrame(updatePosition);
    };

    animationFrameRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, ropeEndpointRef]);

  // Don't render on desktop
  if (!isMobile) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: position.x - window.scrollX - 10,
        top: position.y - window.scrollY - 10,
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
