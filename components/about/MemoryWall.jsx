"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const memoryCards = [
  {
    classes: "mem-node-1 left-[5%] top-[10%]",
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600",
    title: "System Code",
    desc: "// Robust logic foundations",
    defaultPos: { xPercent: -15, rotate: -8, z: 80 }
  },
  {
    classes: "mem-node-2 right-[8%] top-[5%]",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600",
    title: "UI / UX Canvas",
    desc: "// Premium interface details",
    defaultPos: { xPercent: 12, rotate: 6, z: -100 }
  },
  {
    classes: "mem-node-3 left-[12%] bottom-[12%]",
    img: "https://images.unsplash.com/photo-1581291518655-9523c932dedf?q=80&w=600",
    title: "Concept Wireframes",
    desc: "// Layout structure plans",
    defaultPos: { yPercent: -12, rotate: 4, z: 60 }
  },
  {
    classes: "mem-node-4 right-[5%] bottom-[15%]",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
    title: "Workspace Terminal",
    desc: "// Active production stream",
    defaultPos: { yPercent: 18, rotate: -6, z: -40 }
  }
];

export default function MemoryWall({ isLoading = false }) {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || isLoading) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=160%",
        pin: true,
        scrub: 1,
      }
    });

    if (!prefersReducedMotion) {
      // Pin movement cards
      tl.to(".mem-node-1", { scale: 1.15, z: 120, xPercent: -20, rotate: -10, filter: "blur(0px)", duration: 1 }, 0);
      tl.to(".mem-node-2", { scale: 0.85, z: -110, xPercent: 18, rotate: 8, filter: "blur(2px)", duration: 1 }, 0);
      tl.to(".mem-node-3", { scale: 1.12, z: 70, yPercent: -14, rotate: 5, filter: "blur(0px)", duration: 1 }, 0);
      tl.to(".mem-node-4", { scale: 0.95, z: -50, yPercent: 18, rotate: -8, filter: "blur(1.5px)", duration: 1 }, 0);

      // Interactive mouse tilt parallax effect
      const onMouseMove = (e) => {
        const rect = sectionRef.current.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        gsap.to(".mem-node", {
          x: (i) => relX * 0.05 * (i + 1),
          y: (i) => relY * 0.05 * (i + 1),
          rotateY: (i) => relX * 0.015 * (i + 1),
          rotateX: (i) => -relY * 0.015 * (i + 1),
          duration: 0.5,
          ease: "power2.out"
        });
      };

      const sectionEl = sectionRef.current;
      sectionEl.addEventListener("mousemove", onMouseMove);

      return () => {
        sectionEl.removeEventListener("mousemove", onMouseMove);
      };
    } else {
      // Reduced motion styling
      tl.from(".mem-node", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1
      });
    }

  }, { scope: sectionRef, dependencies: [mounted, isLoading] });

  if (!mounted) return null;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex flex-col justify-center items-center bg-[#050505] overflow-hidden border-b border-white/[0.03]"
      style={{ perspective: "1400px" }}
    >
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff8000] mb-12 z-10">&bull; Scene 06 // Space</span>

      {/* Floating gallery deck */}
      <div className="relative w-full max-w-5xl h-[65%] select-none overflow-visible z-10">
        {memoryCards.map((card, idx) => (
          <div
            key={idx}
            className={`mem-node ${card.classes} absolute w-[220px] h-[150px] sm:w-[290px] sm:h-[200px] rounded-2xl overflow-hidden border border-white/10 bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,128,0,0.1)]`}
            style={{ 
              transformStyle: "preserve-3d", 
              zIndex: 10 + idx,
              transform: `translate3d(0, 0, ${card.defaultPos.z}px) rotate(${card.defaultPos.rotate}deg)` 
            }}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover opacity-50 transition-opacity duration-500 group-hover:opacity-85"
            />
            {/* Visual glow gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-5 z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#ff8000]">
                {card.title}
              </span>
              <p className="text-[10px] text-[#aaaaaa] mt-1 font-mono">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 font-mono text-[9px] uppercase tracking-widest text-white/35 z-10">
        Move cursor to skew active 3D coordinates
      </p>
    </section>
  );
}
