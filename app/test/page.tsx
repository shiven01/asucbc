"use client";

import dynamic from "next/dynamic";
import Rope from "../components/RopeCanvas";

export default function Test() {
  const RopeCanvas = dynamic(() => import("../components/RopeCanvas"), {
    ssr: false,
  });

  return (
    <div className="min-h-screen">
      <RopeCanvas
        anchorPoint={{ x: 240, y: 100 }}
        length={300}
        segments={100}
        strokeColor="#ffffff"
        strokeWidth={3}
      />

      <div className="max-w-4xl mx-auto p-8 text-white space-y-6">
        <h1 className="text-4xl font-bold text-center mt-20">
          Verlet Physics Spider Silk
        </h1>

        <div className="bg-black/50 p-6 rounded-lg border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">Features:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>High precision Verlet integration physics</li>
            <li>Ultra-stable simulation (no exploding!)</li>
            <li>Natural gravity and hanging behavior</li>
            <li>Smooth rope-like movement</li>
            <li>Lightweight and performant</li>
          </ul>
        </div>

        <div className="bg-black/50 p-6 rounded-lg border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">Configuration:</h2>
          <p className="mb-3">Edit CONFIG in SpiderCursorVerlet.tsx:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>GRAVITY</strong>: {"{x: 0, y: 2000}"} (higher y = more
              droop)
            </li>
            <li>
              <strong>RESOLUTION</strong>: 8 (smaller = more segments)
            </li>
            <li>
              <strong>MASS</strong>: 0.5 (higher = heavier silk)
            </li>
            <li>
              <strong>DAMPING</strong>: 0.98 (lower = more bouncy)
            </li>
            <li>
              <strong>SOLVER_ITERATIONS</strong>: 50 (higher = more rigid)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
