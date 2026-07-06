"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const statCounters = [
  { id: "stat-1", label: "Projects Done", end: 20, suffix: "+" },
  { id: "stat-2", label: "Technologies", end: 15, suffix: "+" },
  { id: "stat-3", label: "Hours Learning", end: 1200, suffix: "+" },
  { id: "stat-4", label: "Curiosity Rate", end: 100, suffix: "%" }
];

export default function StatsVision({ isLoading = false }) {
  const sectionRef = useRef(null);
  const visionRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || isLoading) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Timeline for stats cards reveal + counter triggering
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1,
      }
    });

    if (!prefersReducedMotion) {
      tl.from(".stat-box", {
        scale: 0.35,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out"
      }, 0);

      tl.from(".orbit-circle", {
        scale: 0,
        rotate: 180,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, 0);

      // Trigger counter value transitions
      statCounters.forEach((counter) => {
        const obj = { val: 0 };
        tl.to(obj, {
          val: counter.end,
          duration: 1.5,
          ease: "power1.out",
          onUpdate: () => {
            const el = document.getElementById(counter.id);
            if (el) {
              el.innerText = `${Math.floor(obj.val)}${counter.suffix}`;
            }
          }
        }, 0.25);
      });

      // Vision slides transition
      tl.to(".stat-grid-container", { opacity: 0, scale: 0.9, duration: 1, pointerEvents: "none" }, 1.5);

      tl.fromTo(".vision-slide-1", 
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 1 },
        2
      );
      tl.to(".vision-slide-1", { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0, duration: 1 }, 3);

      tl.fromTo(".vision-slide-2",
        { rotateX: 90, opacity: 0 },
        { rotateX: 0, opacity: 1, duration: 1 },
        3.5
      );
      tl.to(".vision-slide-2", { rotateX: -90, opacity: 0, duration: 1 }, 4.5);

      tl.fromTo(".vision-slide-3",
        { scale: 0.3, filter: "blur(15px)", opacity: 0 },
        { scale: 1, filter: "blur(0px)", opacity: 1, duration: 1 },
        5
      );
      tl.to(".vision-slide-3", { scale: 2.5, filter: "blur(18px)", opacity: 0, duration: 1 }, 6);

      tl.fromTo(".vision-slide-4",
        { xPercent: 100, skewX: -20, opacity: 0 },
        { xPercent: 0, skewX: 0, opacity: 1, duration: 1 },
        6.5
      );
    } else {
      // Reduced motion counters
      statCounters.forEach((counter) => {
        const el = document.getElementById(counter.id);
        if (el) el.innerText = `${counter.end}${counter.suffix}`;
      });
      tl.from(".stat-grid-container", { opacity: 0, duration: 1.5 });
    }

  }, { scope: sectionRef, dependencies: [mounted, isLoading] });

  if (!mounted) return null;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex flex-col justify-center items-center bg-[#0d0d0d] overflow-hidden border-b border-white/[0.03]"
    >
      {/* Background Orbits */}
      <div className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full border border-white/[0.015] pointer-events-none z-0 flex items-center justify-center">
        <div className="orbit-circle absolute w-[55vw] h-[55vw] md:w-[42vw] md:h-[42vw] rounded-full border border-[#ff8000]/10 border-dashed" />
      </div>

      {/* Container 1: Grid of Stats */}
      <div className="stat-grid-container relative z-10 w-full max-w-6xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {statCounters.map((counter, idx) => (
          <div 
            key={idx} 
            className="stat-box flex flex-col items-center justify-center p-8 bg-[#111111]/70 rounded-3xl border border-white/5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-[#ff8000]/30 transition-all duration-500"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#aaaaaa] mb-4">
              {counter.label}
            </span>
            <strong 
              id={counter.id} 
              className="font-mono text-5xl md:text-7xl font-black text-[#ff8000] leading-none select-none tracking-tight"
            >
              0{counter.suffix}
            </strong>
          </div>
        ))}
      </div>

      {/* Container 2: Vision Slider */}
      <div ref={visionRef} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        {/* Slide 1: Design */}
        <h2 className="vision-slide-1 absolute text-[13vw] md:text-[9vw] font-black uppercase tracking-tight text-white/10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
          Design.
        </h2>

        {/* Slide 2: Code */}
        <h2 className="vision-slide-2 absolute text-[13vw] md:text-[9vw] font-black uppercase tracking-tight text-[#ff8000]" style={{ transformStyle: "preserve-3d" }}>
          Code.
        </h2>

        {/* Slide 3: Create */}
        <h2 className="vision-slide-3 absolute text-[13vw] md:text-[9vw] font-black uppercase tracking-tight text-white">
          Create.
        </h2>

        {/* Slide 4: Repeat */}
        <h2 className="vision-slide-4 absolute text-[13vw] md:text-[9vw] font-black uppercase tracking-tight text-[#ff8000]">
          Repeat.
        </h2>
      </div>
    </section>
  );
}
