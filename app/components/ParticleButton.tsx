"use client";

import React, { useRef } from "react";

type ParticleButtonProps = {
  label?: string;
  colors?: string[];
  shapes?: string[];
};

const defaultColors = ["#3B3B3B", "#242424", "#333"];

const defaultShapes = [
  `<path class="bat" d="M475.504,199.888c-31.897-63.168-72.205-95.894-84.65-106.11c-17.172-14.109-31.107-12.578-30.201,1.688c2.757,59.34-32.482,96.547-36.653,100.133c-4.288,3.664-7.358,6.133-10.428,0.606c-3.059-5.516-29.744-71.152-29.744-71.152l-27.832,34.356l-27.834-34.356c0,0-26.673,65.637-29.744,71.152c-3.06,5.527-6.129,3.058-10.427-0.606c-4.162-3.586-39.411-40.793-36.644-100.133c0.916-14.266-13.029-15.797-30.21-1.688c-12.436,10.215-52.743,42.942-84.65,106.11C7.437,257.427,0,332.994,0,348.326c0.605,11.644,9.805,17.16,19.326,10.414c6.266-4.442,43.552-23.301,47.84-24.539c4.298-1.226,11.032-4.59,14.716,4.602c1.384,3.469,6.412,14.305,7.368,16.566c4.6,11.043,14.014,9.434,18.399,4.602c22.074-24.383,41.263-45.902,56.427-13.488c8.888,19.004,15.028,23.914,26.06,11.656c11.607-12.906,17.19-17.172,30.679,7.348c13.487,24.539,24.832,52.762,24.832,52.762c3.684,7.961,6.452,9.805,10.35,9.805c3.908,0,6.665-1.844,10.35-9.805c0,0,11.354-28.222,24.851-52.762c13.488-24.52,19.063-20.254,30.66-7.348c11.032,12.258,17.172,7.348,26.069-11.656c15.154-32.414,34.353-10.894,56.436,13.488c4.375,4.832,13.8,6.441,18.389-4.602c0.946-2.262,5.975-13.098,7.368-16.566c3.674-9.191,10.419-5.828,14.707-4.602c4.307,1.238,41.574,20.098,47.85,24.539c9.512,6.746,18.712,1.23,19.325-10.414C512,332.994,504.564,257.427,475.504,199.888z" transform="scale(0.07)"/>`,
];

export const ParticleButton: React.FC<ParticleButtonProps> = ({
  label = "Click Me!",
  colors = defaultColors,
  shapes = defaultShapes,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const boom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const particles = particlesRef.current;
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!particles || !containerRect) return;

    const group: { shape: SVGSVGElement; x: number; y: number }[] = [];
    const num = Math.floor(Math.random() * 50) + 30; // random number of particles (between 30 & 50)

    for (let i = 0; i < num; i++) {
      const randBG = Math.floor(Math.random() * colors.length);
      const getShape = Math.floor(Math.random() * shapes.length);
      const scale = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
      const x = Math.floor(Math.random() * (150 + 100)) - 100;
      const y = Math.floor(Math.random() * (150 + 100)) - 100;
      const sec = Math.floor(Math.random() * 1700) + 1000;

      const wrapper = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      wrapper.setAttribute("class", "shape");
      wrapper.setAttribute("viewBox", "0 0 50 50");
      wrapper.style.position = "absolute";
      wrapper.style.width = "50px";
      wrapper.style.height = "50px";
      wrapper.style.fill = colors[randBG];
      wrapper.style.transition = `all ${sec}ms ease-out`;
      wrapper.style.transform = `scale(0.${scale})`;
      wrapper.style.pointerEvents = "none";

      // Position relative to the container, starting from mouse position
      // Subtract half the SVG size (25px) to center on cursor
      const startLeft = e.clientX - containerRect.left - 25;
      const startTop = e.clientY - containerRect.top - 25;

      wrapper.style.left = `${startLeft}px`;
      wrapper.style.top = `${startTop}px`;
      wrapper.innerHTML = shapes[getShape];

      particles.appendChild(wrapper);
      group.push({ shape: wrapper, x, y });
    }

    // Animate particles outward
    setTimeout(() => {
      for (let a = 0; a < group.length; a++) {
        const { shape, x, y } = group[a];
        shape.style.left = `${x + 50}px`;
        shape.style.top = `${y + 15}px`;
        shape.style.transform = "scale(0)";
      }
    }, 10);

    // Cleanup after animation
    setTimeout(() => {
      group.forEach(({ shape }) => shape.remove());
    }, 2000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[200px] h-[100px] flex items-center justify-center"
    >
      <button
        onMouseEnter={boom}
        className="absolute z-10 bg-[#333] text-white px-6 py-3 rounded transition-all duration-200 hover:text-white focus:outline-none focus:text-white active:scale-90 active:translate-x-[5%] active:translate-y-[5%]"
        style={{
          boxShadow: "0px 1px 5px 2px #BFCEEF",
        }}
      >
        {label}
      </button>

      <div
        ref={particlesRef}
        className="absolute w-full h-full overflow-visible z-0"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default ParticleButton;
