"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Philosophy({ isLoading = false }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted || isLoading) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Set initial states for clean entrance reveals
      gsap.set(".scene-title-header", { opacity: 0, y: 30, filter: "blur(10px)" });
      gsap.set(".glass-card-wrapper", { opacity: 0, scale: 0.85, borderRadius: "40px" });
      gsap.set(".narrative-card", { opacity: 0, y: 30, pointerEvents: "none" });
      gsap.set(".manifesto-container", { opacity: 0, pointerEvents: "none" });

      // Prep Slide 2 Word Splitting Reveals
      gsap.set(".card-2 .word-2-1, .card-2 .word-2-2", { yPercent: 110 });

      // Prep Slide 3 Word Reveal
      gsap.set(".card-3 .word-3", { yPercent: 110 });
      gsap.set(".card-3 .icon-activity", { scale: 0, opacity: 0 });

      // Prep Slide 4 badging
      gsap.set(".card-4 .tech-badge", { opacity: 0, y: 15 });

      if (prefersReducedMotion) {
        // Reduced motion fallback: simple pinned fade-in
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          },
        });
        tl.to(".scene-title-header", { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 });
        tl.to(".glass-card-wrapper", { opacity: 1, scale: 1, duration: 1 }, "-=0.3");
        return;
      }

      // --- MAIN CINEMATIC SCROLL TIMELINE (0% to 100%) ---
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Scene Introduction Title (0% to 15%)
      mainTimeline.fromTo(
        ".scene-title-header",
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
        0.2
      );

      // Phase 2: Premium Box Reveal (15% to 30%)
      mainTimeline.to(
        ".scene-title-header",
        { opacity: 0, y: -30, filter: "blur(8px)", duration: 0.8, ease: "power2.in" },
        1.3
      );
      mainTimeline.to(
        ".glass-card-wrapper",
        {
          opacity: 1,
          scale: 1.0,
          borderRadius: "28px",
          duration: 1.2,
          ease: "power2.out",
        },
        1.5
      );

      // Phase 3: First Statement (30% to 45%)
      mainTimeline.to(
        ".narrative-card.card-1",
        { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.8 },
        2.7
      );
      mainTimeline.to(
        ".current-progress",
        {
          onStart: () => {
            const el = document.querySelector(".current-progress");
            if (el) el.textContent = "01";
          },
        },
        2.7
      );

      // Phase 4 & 5: Transition to Second Card (45% to 60%)
      mainTimeline.to(
        ".narrative-card.card-1",
        { opacity: 0, y: -60, duration: 0.6, ease: "power2.in" },
        4.3
      );
      mainTimeline.to(
        ".narrative-card.card-2",
        { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.6, ease: "power2.out" },
        4.9
      );
      mainTimeline.to(
        ".current-progress",
        {
          onStart: () => {
            const el = document.querySelector(".current-progress");
            if (el) el.textContent = "02";
          },
        },
        4.9
      );
      mainTimeline.to(
        ".card-2 .word-2-1, .card-2 .word-2-2",
        { yPercent: 0, stagger: 0.04, duration: 0.6, ease: "power2.out" },
        5.1
      );

      // Phase 6: Transition to Third Card (60% to 75%)
      mainTimeline.to(
        ".narrative-card.card-2",
        { opacity: 0, y: -60, duration: 0.6, ease: "power2.in" },
        6.0
      );
      mainTimeline.to(
        ".narrative-card.card-3",
        { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.6, ease: "power2.out" },
        6.6
      );
      mainTimeline.to(
        ".current-progress",
        {
          onStart: () => {
            const el = document.querySelector(".current-progress");
            if (el) el.textContent = "03";
          },
        },
        6.6
      );
      mainTimeline.to(
        ".card-3 .word-3",
        { yPercent: 0, stagger: 0.04, duration: 0.6, ease: "power2.out" },
        6.8
      );
      mainTimeline.to(
        ".card-3 .icon-activity",
        { scale: 1, opacity: 1, rotate: 360, duration: 0.6, ease: "back.out(1.5)" },
        6.8
      );

      // Phase 7: Technology / Features Card (75% to 90%)
      mainTimeline.to(
        ".narrative-card.card-3",
        { opacity: 0, y: -60, duration: 0.6, ease: "power2.in" },
        7.7
      );
      mainTimeline.to(
        ".narrative-card.card-4",
        { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.6, ease: "power2.out" },
        8.3
      );
      mainTimeline.to(
        ".current-progress",
        {
          onStart: () => {
            const el = document.querySelector(".current-progress");
            if (el) el.textContent = "04";
          },
        },
        8.3
      );
      mainTimeline.to(
        ".card-4 .tech-badge",
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "back.out(1.5)" },
        8.5
      );

      // Phase 8: Philosophy Summary Manifesto (90% to 100%)
      mainTimeline.to(
        ".glass-card-wrapper",
        { opacity: 0, scale: 1.05, duration: 0.6, ease: "power2.in" },
        9.2
      );
      mainTimeline.to(
        ".manifesto-container",
        { opacity: 1, pointerEvents: "auto", duration: 0.6, ease: "power2.out" },
        9.2
      );
      mainTimeline.to(
        ".current-progress",
        {
          onStart: () => {
            const el = document.querySelector(".current-progress");
            if (el) el.textContent = "05";
          },
        },
        9.2
      );
      mainTimeline.to(
        ".manifesto-underline",
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        9.5
      );

      return () => {
        if (mainTimeline) mainTimeline.kill();
      };
    },
    { scope: sectionRef, dependencies: [mounted, isLoading] }
  );

  // 3D Card Hover Tilt Effects
  const onMouseMoveCard = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    gsap.to(el, {
      rotateX: -relY * 0.015,
      rotateY: relX * 0.015,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(".glow-backing", {
      x: relX * 0.06,
      y: relY * 0.06,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onMouseLeaveCard = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
    });

    gsap.to(".glow-backing", {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col justify-center items-center bg-[#050505] px-6 overflow-hidden border-b border-white/[0.03]"
    >
      {/* Background radial orange glow backing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vh] bg-gradient-to-r from-[#ff8000]/[0.025] to-transparent rounded-full blur-[140px] pointer-events-none z-0 glow-backing" />

      {/* Decorative dark grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Scene Introduction Title (shows first, then hides) */}
      <div className="scene-title-header absolute text-center z-10 pointer-events-none select-none">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff8000] mb-2 block">
          Scene 03
        </span>
        <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
          Philosophy
        </h2>
      </div>

      {/* Primary Glass Card Container */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMoveCard}
        onMouseLeave={onMouseLeaveCard}
        className="glass-card-wrapper max-w-4xl w-full h-[55vh] md:h-[48vh] lg:h-[50vh] rounded-[40px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-[24px] overflow-hidden relative shadow-[0_0_80px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-between"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dynamic Glowing dot (Top Left) */}
        <div className="absolute top-6 left-8 flex items-center gap-2 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000] animate-pulse shadow-[0_0_8px_#ff8000]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#ff8000]/80">
            Active
          </span>
        </div>

        {/* Dynamic Card Progress (Top Right) */}
        <div className="absolute top-6 right-8 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 pointer-events-none">
          <span className="current-progress text-[#ff8000] font-semibold">01</span> / 05
        </div>

        {/* Card stage contents (Middle) */}
        <div className="relative w-full h-full">
          {/* Card 1: Websites statement */}
          <div className="narrative-card card-1 absolute inset-0 flex flex-col justify-center gap-4 px-8 md:px-16 lg:px-20 w-full h-full pointer-events-none">
            <span className="card-label font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff8000] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000]" />
              01 // Concept
            </span>
            <h3 className="card-title-1 font-sans text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
              I don't build websites.
            </h3>
            <p className="card-desc-1 text-sm md:text-base text-zinc-400 font-light max-w-lg leading-relaxed mt-2">
              Anyone can build pages. I build digital experiences that feel intentional, memorable, and alive.
            </p>
          </div>

          {/* Card 2: Communication statement */}
          <div className="narrative-card card-2 absolute inset-0 flex flex-col justify-center gap-4 px-8 md:px-16 lg:px-20 w-full h-full pointer-events-none">
            <span className="card-label font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff8000] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000]" />
              02 // Message
            </span>
            <h3 className="card-title-2 font-sans text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
              {"DESIGN isn't decoration.".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block overflow-hidden mr-1.5 py-0.5">
                  <span className="word-2-1 inline-block">{word}</span>
                </span>
              ))}
              <br />
              {"It's communication.".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block overflow-hidden mr-1.5 py-0.5 text-[#ff8000]">
                  <span className="word-2-2 inline-block">{word}</span>
                </span>
              ))}
            </h3>
            <p className="card-desc-2 text-sm md:text-base text-zinc-400 font-light max-w-lg leading-relaxed mt-2">
              Every interaction should guide, delight, and solve.
            </p>
          </div>

          {/* Card 3: Motion Purpose */}
          <div className="narrative-card card-3 absolute inset-0 flex flex-col justify-center gap-4 px-8 md:px-16 lg:px-20 w-full h-full pointer-events-none">
            <span className="card-label font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff8000] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000]" />
              03 // Motion
            </span>
            <div className="flex items-center gap-4">
              <h3 className="card-title-3 font-sans text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                {"Motion has a purpose.".split(" ").map((word, wIdx) => (
                  <span key={wIdx} className="inline-block overflow-hidden mr-1.5 py-0.5">
                    <span className="word-3 inline-block">{word}</span>
                  </span>
                ))}
              </h3>
              <Activity className="icon-activity text-[#ff8000] w-6 h-6 md:w-8 md:h-8" />
            </div>
            <p className="card-desc-3 text-sm md:text-base text-zinc-400 font-light max-w-lg leading-relaxed mt-2">
              Animations should improve clarity and guide the user's focus, never distract or create noise.
            </p>
          </div>

          {/* Card 4: Dev meets Creativity */}
          <div className="narrative-card card-4 absolute inset-0 flex flex-col justify-center gap-4 px-8 md:px-16 lg:px-20 w-full h-full pointer-events-none">
            <span className="card-label font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff8000] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000]" />
              04 // Tech Stack
            </span>
            <h3 className="card-title-4 font-sans text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
              Development meets creativity.
            </h3>
            <div className="flex flex-wrap gap-3 mt-3">
              {["React", "Next.js", "GSAP"].map((tech) => (
                <div
                  key={tech}
                  className="tech-badge px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-[10px] text-zinc-300 uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer (Static) */}
        <div className="absolute bottom-6 left-8 right-8 flex justify-between items-center border-t border-white/[0.04] pt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 pointer-events-none">
          <span>Scene 03 // Philosophy</span>
          <div className="flex gap-4">
            <span className="hidden sm:inline">Design</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Logic</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Motion</span>
            <span>&bull;</span>
            <span>Performance</span>
          </div>
        </div>
      </div>

      {/* Card 5: Final Summary Manifesto (Placed outside the glass card wrapper for hero presence) */}
      <div className="manifesto-container absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20 pointer-events-none select-none">
        <h2 className="manifesto-title font-sans text-[6vw] md:text-[4vw] font-black uppercase tracking-tighter leading-none text-white">
          I DON'T BUILD WEBSITES.<br />
          <span className="text-[#ff8000] relative inline-block mt-2">
            I CREATE EXPERIENCES.
            <span className="manifesto-underline absolute bottom-[-8px] left-0 w-full h-[3px] bg-[#ff8000] scale-x-0 origin-left" />
          </span>
        </h2>
      </div>

      {/* Bottom Scene metadata */}
      <div className="absolute bottom-16 font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 pointer-events-none select-none">
        // Design &bull; Logic &bull; Motion
      </div>
    </section>
  );
}
