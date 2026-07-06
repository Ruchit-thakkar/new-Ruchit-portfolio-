"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const creativeSteps = [
  { step: "01", title: "Research", desc: "Deconstructing visual styles, assessing performance parameters, and planning custom schemas/logic flows." },
  { step: "02", title: "Wireframe", desc: "Mapping visual grid frameworks, layouts, and user interactions to align structure with storytelling." },
  { step: "03", title: "Design", desc: "Developing design tokens, curated typography setups, and premium dark/light mode accents." },
  { step: "04", title: "Development", desc: "Writing modular Next.js components, customizing hooks, and crafting performant GSAP timelines." },
  { step: "05", title: "Testing", desc: "Benchmarking frame speeds, verifying ScrollTriggers, and testing cross-device performance." },
  { step: "06", title: "Launch", desc: "Deploying optimized serverless structures with metadata tags, clean schema markups, and fast performance." }
];

export default function CreativeProcess({ isLoading = false }) {
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
        end: "+=400%",
        pin: true,
        scrub: 1,
      }
    });

    if (!prefersReducedMotion) {
      // Pin card overlays with customized motion pathways
      tl.to(".step-card-0", { scale: 0.85, opacity: 0, filter: "blur(8px)", duration: 1 }, 0);
      tl.from(".step-card-1", { xPercent: -100, opacity: 0, duration: 1 }, 0.5);

      tl.to(".step-card-1", { xPercent: 100, opacity: 0, duration: 1 }, 1.5);
      tl.from(".step-card-2", { rotateY: 90, z: -150, opacity: 0, duration: 1 }, 2);

      tl.to(".step-card-2", { rotateY: -90, z: -150, opacity: 0, duration: 1 }, 3);
      tl.from(".step-card-3", { clipPath: "circle(0% at 50% 50%)", opacity: 0, duration: 1 }, 3.5);

      tl.to(".step-card-3", { scale: 1.2, opacity: 0, duration: 1 }, 4.5);
      tl.from(".step-card-4", { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0, duration: 1 }, 5);

      tl.to(".step-card-4", { yPercent: -100, opacity: 0, duration: 1 }, 6);
      tl.from(".step-card-5", { scale: 0.2, z: -300, opacity: 0, duration: 1 }, 6.5);
    } else {
      // Reduced motion stack fading
      creativeSteps.forEach((_, idx) => {
        if (idx > 0) {
          tl.to(`.step-card-${idx-1}`, { opacity: 0, duration: 1 });
          tl.from(`.step-card-${idx}`, { opacity: 0, duration: 1 });
        }
      });
    }

  }, { scope: sectionRef, dependencies: [mounted, isLoading] });

  if (!mounted) return null;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#050505] overflow-hidden border-b border-white/[0.03]"
    >
      {/* Scene Header */}
      <div className="absolute top-10 md:top-14 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none select-none">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff8000]">&bull; Scene 05 // Creative Engine</span>
      </div>

      {/* Cards Deck Area */}
      <div className="absolute inset-0 flex items-center justify-center p-6" style={{ perspective: "1500px" }}>
        {creativeSteps.map((step, idx) => (
          <div
            key={idx}
            className={`step-card-${idx} absolute w-full max-w-3xl h-[60%] rounded-3xl border border-white/10 bg-[#111111] p-8 md:p-14 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.6)]`}
            style={{ zIndex: 10 + idx }}
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#ff8000]">
                Creative Process &bull; Step {step.step}
              </span>
              <span className="font-serif italic text-3xl text-[#94a3b8]/30">0{idx + 1}</span>
            </div>

            <div className="flex flex-col gap-4 my-auto">
              <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                {step.title}
              </h4>
              <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-light">
                {step.desc}
              </p>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-[#555555] pt-5 border-t border-white/5">
              <span>Ruchit Thakkar</span>
              <span>// Workflow Logic</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
