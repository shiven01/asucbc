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
  const [anchorPoint, setAnchorPoint] = useState(initialAnchorPoint);

  const resetRopeCanvas = (anchor = anchorPoint) => {
    const spacing = length / segments;
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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gravity = 0.5;
    const friction = 0.98;
    const iterations = 50;
    const spacing = length / segments;

    resetRopeCanvas(anchorPoint);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX + cursorOffset.x;
      mouseRef.current.y = e.clientY + cursorOffset.y;
    };

    const handleClick = (e: MouseEvent) => {
      // Apply cursor offset to click position before snapping
      const clickX = e.clientX + cursorOffset.x;
      const clickY = e.clientY + cursorOffset.y;
      const snappedX = Math.round(clickX / 20) * 20;
      const snappedY = Math.round(clickY / 20) * 20;
      const newAnchor = { x: snappedX, y: snappedY };
      setAnchorPoint(newAnchor);
      resetRopeCanvas(newAnchor);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
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
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(update);
    };

    // Start animation loop
    animationRef.current = requestAnimationFrame(update);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [anchorPoint, length, segments, strokeColor, strokeWidth]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        background: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default RopeCanvas;
