"use client";

import { useEffect, useRef } from "react";

/**
 * SpiderCursor Component
 *
 * Creates a Halloween-themed spider cursor effect where the cursor appears to hang
 * from a silk string when moving downward from the top portion of the viewport.
 *
 * Features:
 * - Canvas-based silk string rendering for optimal performance
 * - Silk stays attached to cursor (spider) at all times
 * - Gradual fade-out/dissolve effect from the anchor point DOWNWARD
 * - Only activates when moving downward from the top threshold
 */

// ==================== CONFIGURATION ====================
const CONFIG = {
  // Vertical threshold: silk appears when starting from top X% of viewport
  ACTIVATION_THRESHOLD: 0.3, // 30% from top

  // Cursor offset: Adjust these to align silk with center of your spider cursor
  // These values offset from the cursor hotspot (usually top-left) to the visual center
  CURSOR_OFFSET_X: 10, // Pixels to the right from cursor hotspot
  CURSOR_OFFSET_Y: 10, // Pixels down from cursor hotspot

  // Silk visual properties
  SILK_COLOR: "rgba(255, 255, 255, 0.8)", // White, semi-transparent
  SILK_WIDTH: 2, // Line thickness in pixels
  SILK_SHADOW_BLUR: 5, // Glow effect strength
  SILK_SHADOW_COLOR: "rgba(255, 255, 255, 0.5)",

  // Animation timing
  FADE_SPEED: 0.012, // How fast the silk dissolves (higher = faster)

  // Silk behavior
  WAVINESS: 2, // How much the silk waves (0 = straight, higher = more wave)
  WAVE_FREQUENCY: 0.05, // Wave oscillation speed
  MAX_SILK_LENGTH: 1000, // Maximum silk length in pixels
  WAVE_END_DAMPING: 0.15, // Distance from end where wave stops (0-1, higher = more damping)
};
// =======================================================

export default function SpiderCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anchorPointRef = useRef<{ x: number; y: number } | null>(null);
  const currentCursorPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);
  const isActiveRef = useRef(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const fadeProgressRef = useRef<number>(0); // 0 = fully visible, 1 = fully faded
  const timeRef = useRef<number>(0); // For wave animation

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ==================== MOUSE MOVEMENT HANDLER ====================
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const viewportHeight = window.innerHeight;

      // Always update current cursor position with offset to center of spider cursor
      // This ensures the silk connects to the visual center of the spider, not the hotspot
      currentCursorPosRef.current = {
        x: currentX + CONFIG.CURSOR_OFFSET_X,
        y: currentY + CONFIG.CURSOR_OFFSET_Y,
      };

      // Check if we're in the activation zone (top portion of screen)
      const isInActivationZone =
        currentY < viewportHeight * CONFIG.ACTIVATION_THRESHOLD;

      if (lastPositionRef.current) {
        const deltaY = currentY - lastPositionRef.current.y;

        // Detect downward movement from activation zone to START silk
        if (
          isInActivationZone &&
          deltaY > 0 && // Moving down
          !isActiveRef.current
        ) {
          // Start new silk descent - anchor point is where silk begins (with offset)
          isActiveRef.current = true;
          anchorPointRef.current = {
            x: currentX + CONFIG.CURSOR_OFFSET_X,
            y: currentY + CONFIG.CURSOR_OFFSET_Y,
          };
          fadeProgressRef.current = 0; // Reset fade
          console.log("Spider silk activated!", anchorPointRef.current);
        }

        // Continue tracking silk if active
        if (isActiveRef.current && anchorPointRef.current) {
          // Stop if moving upward significantly or if silk is too long
          const silkLength = Math.hypot(
            currentX - anchorPointRef.current.x,
            currentY - anchorPointRef.current.y
          );

          if (deltaY < -5 || silkLength > CONFIG.MAX_SILK_LENGTH) {
            isActiveRef.current = false;
            console.log("Spider silk deactivated");
          }
        }
      }

      lastPositionRef.current = { x: currentX, y: currentY };
    };

    // ==================== ANIMATION LOOP ====================
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Increment time for wave animation
      timeRef.current += 1;

      // Update and render silk
      if (anchorPointRef.current && currentCursorPosRef.current) {
        const anchor = anchorPointRef.current;
        const cursor = currentCursorPosRef.current;

        // Calculate total silk length
        const totalLength = Math.hypot(
          cursor.x - anchor.x,
          cursor.y - anchor.y
        );

        // If not active, increase fade progress (silk dissolves)
        if (!isActiveRef.current) {
          fadeProgressRef.current += CONFIG.FADE_SPEED;

          // Clear anchor if fully faded
          if (fadeProgressRef.current >= 1) {
            anchorPointRef.current = null;
            fadeProgressRef.current = 0;
          }
        } else {
          // Keep silk visible when active
          fadeProgressRef.current = 0;
        }

        // Draw silk if anchor still exists and not fully faded
        if (
          anchorPointRef.current &&
          fadeProgressRef.current < 1 &&
          totalLength > 5
        ) {
          ctx.save();

          // Calculate base opacity for entire silk based on fade progress
          const baseOpacity = (1 - fadeProgressRef.current) * 0.8;

          // Set line style for silk
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = CONFIG.SILK_WIDTH;
          ctx.strokeStyle = `rgba(255, 255, 255, ${baseOpacity})`;

          // Add glow effect
          ctx.shadowBlur = CONFIG.SILK_SHADOW_BLUR;
          ctx.shadowColor = CONFIG.SILK_SHADOW_COLOR;

          // Draw silk with multiple segments for smooth curve and wave effect
          const segments = Math.max(30, Math.floor(totalLength / 5));

          ctx.beginPath();
          ctx.moveTo(anchor.x, anchor.y);

          for (let i = 1; i <= segments; i++) {
            const t = i / segments; // 0 to 1 from anchor to cursor

            // Linear interpolation between anchor and cursor
            const baseX = anchor.x + (cursor.x - anchor.x) * t;
            const baseY = anchor.y + (cursor.y - anchor.y) * t;

            // Apply wave only in the middle section, keep ends straight
            let x, y;

            // No wave for the last 15% (ensures cursor connection is perfect)
            if (t > (1 - CONFIG.WAVE_END_DAMPING)) {
              // Straight line to cursor - no wave offset
              x = baseX;
              y = baseY;
            } else if (t < CONFIG.WAVE_END_DAMPING) {
              // Straight line from anchor - no wave offset
              x = baseX;
              y = baseY;
            } else {
              // Add wave motion in the middle section (perpendicular to the silk line)
              const angle = Math.atan2(cursor.y - anchor.y, cursor.x - anchor.x);
              const perpAngle = angle + Math.PI / 2;

              // Smooth transition into/out of wave zone
              const waveZoneT = (t - CONFIG.WAVE_END_DAMPING) / (1 - 2 * CONFIG.WAVE_END_DAMPING);
              const smoothFactor = Math.sin(waveZoneT * Math.PI); // Smooth in/out

              const wave =
                Math.sin(
                  t * Math.PI * 3 + timeRef.current * CONFIG.WAVE_FREQUENCY
                ) *
                CONFIG.WAVINESS *
                smoothFactor;

              x = baseX + Math.cos(perpAngle) * wave;
              y = baseY + Math.sin(perpAngle) * wave;
            }

            ctx.lineTo(x, y);
          }

          ctx.stroke();

          // Draw gradient fade effect from top (anchor) to bottom (cursor)
          // We'll draw multiple strokes with decreasing opacity toward the anchor
          if (!isActiveRef.current && fadeProgressRef.current > 0) {
            const fadeSegments = 10;
            for (let f = 0; f < fadeSegments; f++) {
              const fadeT = f / fadeSegments;
              const fadeOpacity = baseOpacity * (1 - fadeT);

              ctx.strokeStyle = `rgba(255, 255, 255, ${fadeOpacity})`;
              ctx.lineWidth = CONFIG.SILK_WIDTH * (1 - fadeT * 0.5);

              ctx.beginPath();
              const startT = fadeT;
              const endT = Math.min(1, fadeT + 1 / fadeSegments);

              const startSegment = Math.floor(startT * segments);
              const endSegment = Math.floor(endT * segments);

              for (let i = startSegment; i <= endSegment; i++) {
                const t = i / segments;
                const baseX = anchor.x + (cursor.x - anchor.x) * t;
                const baseY = anchor.y + (cursor.y - anchor.y) * t;

                // Apply same wave logic as main silk
                let x, y;

                if (t > (1 - CONFIG.WAVE_END_DAMPING)) {
                  x = baseX;
                  y = baseY;
                } else if (t < CONFIG.WAVE_END_DAMPING) {
                  x = baseX;
                  y = baseY;
                } else {
                  const angle = Math.atan2(
                    cursor.y - anchor.y,
                    cursor.x - anchor.x
                  );
                  const perpAngle = angle + Math.PI / 2;
                  const waveZoneT = (t - CONFIG.WAVE_END_DAMPING) / (1 - 2 * CONFIG.WAVE_END_DAMPING);
                  const smoothFactor = Math.sin(waveZoneT * Math.PI);

                  const wave =
                    Math.sin(
                      t * Math.PI * 3 + timeRef.current * CONFIG.WAVE_FREQUENCY
                    ) *
                    CONFIG.WAVINESS *
                    smoothFactor;

                  x = baseX + Math.cos(perpAngle) * wave;
                  y = baseY + Math.sin(perpAngle) * wave;
                }

                if (i === startSegment) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }
              }
              ctx.stroke();
            }
          }

          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animate();

    // Add mouse listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        // Ensure canvas doesn't interfere with page interactions
        pointerEvents: "none",
      }}
    />
  );
}
