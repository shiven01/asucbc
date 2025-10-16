import React, { useEffect, useRef, useState } from "react";

interface RopeCanvasProps {
  length?: number;
  segments?: number;
  anchorPoint?: { x: number; y: number };
  strokeColor?: string;
  strokeWidth?: number;
  cursorOffset?: { x: number; y: number };
}

interface Point {
  x: number;
  y: number;
  oldx: number;
  oldy: number;
}

const RopeCanvas: React.FC<RopeCanvasProps> = ({
  length = 200,
  segments = 20,
  anchorPoint: initialAnchorPoint = { x: 100, y: 100 },
  strokeColor = "#FFFFFF",
  strokeWidth = 2,
  cursorOffset = { x: 8, y: 8 },
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const animationRef = useRef<number | null>(null);

  // Load anchor point from localStorage on mount, or use initial value
  const [anchorPoint, setAnchorPoint] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ropeAnchorPoint');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialAnchorPoint;
        }
      }
    }
    return initialAnchorPoint;
  });

  // Save anchor point to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ropeAnchorPoint', JSON.stringify(anchorPoint));
    }
  }, [anchorPoint]);

  const resetRopeCanvas = (anchor = anchorPoint) => {
    const newPoints: Point[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = anchor.x + (mouseRef.current.x - anchor.x) * t;
      const y = anchor.y + (mouseRef.current.y - anchor.y) * t;
      newPoints.push({ x, y, oldx: x, oldy: y });
    }

    pointsRef.current = newPoints;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to viewport (we handle scroll offsets in drawing)
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    const gravity = 0.5;
    const friction = 0.98;
    const iterations = 50;
    const spacing = length / segments;

    resetRopeCanvas(anchorPoint);

    const handleMouseMove = (e: MouseEvent) => {
      // Add scroll offset to track position relative to document, not viewport
      mouseRef.current.x = e.clientX + window.scrollX + cursorOffset.x;
      mouseRef.current.y = e.clientY + window.scrollY + cursorOffset.y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault(); // Prevent scrolling while dragging rope
        const touch = e.touches[0];
        mouseRef.current.x = touch.clientX + window.scrollX + cursorOffset.x;
        mouseRef.current.y = touch.clientY + window.scrollY + cursorOffset.y;
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Apply cursor offset and scroll position to click position before snapping
      const clickX = e.clientX + window.scrollX + cursorOffset.x;
      const clickY = e.clientY + window.scrollY + cursorOffset.y;
      const snappedX = Math.round(clickX / 20) * 20;
      const snappedY = Math.round(clickY / 20) * 20;
      const newAnchor = { x: snappedX, y: snappedY };
      setAnchorPoint(newAnchor);
      resetRopeCanvas(newAnchor);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const clickX = touch.clientX + window.scrollX + cursorOffset.x;
        const clickY = touch.clientY + window.scrollY + cursorOffset.y;
        const snappedX = Math.round(clickX / 20) * 20;
        const snappedY = Math.round(clickY / 20) * 20;
        const newAnchor = { x: snappedX, y: snappedY };
        setAnchorPoint(newAnchor);
        resetRopeCanvas(newAnchor);
      }
    };

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("resize", handleResize);

    const update = () => {
      const pts = pointsRef.current;

      // Verlet integration
      for (let i = 1; i < pts.length - 1; i++) {
        const p = pts[i];
        const vx = (p.x - p.oldx) * friction;
        const vy = (p.y - p.oldy) * friction;

        p.oldx = p.x;
        p.oldy = p.y;
        p.x += vx;
        p.y += vy + gravity;
      }

      // Apply constraints
      for (let k = 0; k < iterations; k++) {
        for (let i = 0; i < pts.length - 1; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist === 0) continue;
          const diff = (spacing - dist) / dist;
          const ox = dx * diff * 0.5;
          const oy = dy * diff * 0.5;

          if (i === 0) {
            p2.x += ox * 2;
            p2.y += oy * 2;
          } else if (i === pts.length - 2) {
            p1.x -= ox * 2;
            p1.y -= oy * 2;
          } else {
            p1.x -= ox;
            p1.y -= oy;
            p2.x += ox;
            p2.y += oy;
          }
        }

        // Pin the endpoints
        pts[0].x = anchorPoint.x;
        pts[0].y = anchorPoint.y;
        const last = pts.length - 1;
        pts[last].x = mouseRef.current.x;
        pts[last].y = mouseRef.current.y;
      }

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();

      // Adjust drawing position based on scroll offset
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      ctx.moveTo(pts[0].x - scrollX, pts[0].y - scrollY);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x - scrollX, pts[i].y - scrollY);
      }
      ctx.stroke();

      animationRef.current = requestAnimationFrame(update);
    };

    // Start animation loop
    animationRef.current = requestAnimationFrame(update);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
    };
  }, [anchorPoint, length, segments, strokeColor, strokeWidth, cursorOffset]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default RopeCanvas;
