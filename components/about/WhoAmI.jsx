"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function WhoAmI({ isLoading = false }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const introTextRef = useRef(null);
  const subTextRef = useRef(null);
  const portraitContainerRef = useRef(null);
  const philosophyTextRef = useRef(null);
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

      const splits = [];
      const cleanupFns = [];

      /* =========================================================
         ENTRANCE ANIMATION (page load only, plays once)
         Locks scroll until it finishes so it never fights the
         scroll-driven timeline below.
      ========================================================= */
      const introLinesSplit = new SplitText(introTextRef.current, {
        type: "lines",
        linesClass: "overflow-hidden py-0.5 inline-block w-full",
      });
      const introWordsSplit = new SplitText(introLinesSplit.lines, {
        type: "words",
      });
      splits.push(introLinesSplit, introWordsSplit);

      const previousOverflow = document.documentElement.style.overflow;
      let mainTimeline = null;

      const entranceTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onStart: () => {
          if (!prefersReducedMotion) {
            document.documentElement.style.overflow = "hidden";
          }
        },
        onComplete: () => {
          document.documentElement.style.overflow = previousOverflow;
          if (!prefersReducedMotion) buildScrollTimeline();
        },
      });

      entranceTl
        .from(".intro-label", { opacity: 0, x: -20, duration: 0.6 })
        .from(
          introWordsSplit.words,
          {
            opacity: 0,
            y: 16,
            filter: "blur(10px)",
            stagger: 0.018,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.35"
        )
        .from(
          subTextRef.current,
          { y: 18, opacity: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          portraitContainerRef.current,
          { opacity: 0, scale: 0.92, y: "-45%" },
          { opacity: 1, scale: 1, y: "-50%", duration: 1, ease: "power3.out" },
          "-=0.7"
        );

      /* =========================================================
         Reduced-motion fallback: simple pinned crossfade
      ========================================================= */
      if (prefersReducedMotion) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          },
        });
        tl.to(".intro-container", { opacity: 0, y: -20, duration: 1 });
        tl.to(".narrative-col", { opacity: 1, y: 0, duration: 1 }, "-=0.5");
        return () => {
          splits.forEach((s) => s && s.revert());
          document.documentElement.style.overflow = previousOverflow;
        };
      }

      /* =========================================================
         PREP: build the four narrative slides' hidden start-states
      ========================================================= */
      gsap.set(".narrative-slide", { opacity: 0, pointerEvents: "none" });
      gsap.set(".narrative-watermark", { opacity: 0, y: 20 });

      // Slide 1 — WHO AM I — Line Box Reveal (one line at a time)
      let block1Split;
      const block1Text = document.querySelector(".narrative-block-1-text");
      if (block1Text) {
        block1Split = new SplitText(block1Text, { type: "lines" });
        splits.push(block1Split);
        block1Split.lines.forEach((line, idx) => {
          const parent = line.parentNode;
          const wrapper = document.createElement("div");
          wrapper.className = `line-wrapper-${idx} relative overflow-hidden inline-block w-full py-1`;
          parent.insertBefore(wrapper, line);
          wrapper.appendChild(line);

          const overlay = document.createElement("div");
          overlay.className = `box-reveal-overlay-${idx} absolute inset-0 bg-[#ff8000] z-20 origin-left scale-x-0`;
          wrapper.appendChild(overlay);

          gsap.set(line, { opacity: 0 });
        });
      }

      // Slide 2 — BACKGROUND — Character Reveal Prep
      gsap.set(".narrative-slide-2 .bg-char", { opacity: 0, filter: "blur(6px)", y: 8 });

      // Slide 3 — WHAT I BUILD — Word Reveal Prep
      gsap.set(".narrative-slide-3 .word-inner", { yPercent: 110, opacity: 0 });
      gsap.set(
        document.querySelectorAll(".narrative-slide-3 span.rounded-full"),
        { scale: 0, opacity: 0 }
      );

      // Slide 4 — PHILOSOPHY — Mask/Clip-path Reveal
      gsap.set(philosophyTextRef.current, { letterSpacing: "0.06em", opacity: 0 });

      /* =========================================================
         MAIN CINEMATIC SCROLL TIMELINE
      ========================================================= */
      function buildScrollTimeline() {
        mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=600%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        const ctx = gsap.matchMedia();
        cleanupFns.push(() => ctx.revert());

        const buildPhases = (isMobile) => {
          const portraitX = isMobile ? undefined : "-48vw";
          const portraitY = isMobile ? "-110%" : undefined;

          // PHASE 1 — intro exits
          mainTimeline.to(
            ".intro-container",
            {
              opacity: 0,
              x: isMobile ? 0 : -80,
              y: isMobile ? -60 : 0,
              duration: 1.0,
              ease: "power2.inOut",
            },
            0
          );

          // PHASE 2 — portrait travels to its resting slot
          mainTimeline.to(
            portraitContainerRef.current,
            {
              x: portraitX,
              y: portraitY,
              scale: isMobile ? 0.85 : 0.95,
              duration: 1.5,
              ease: "power2.inOut",
            },
            1.0
          );

          if (!isMobile) {
            mainTimeline.to(
              ".portrait-inner-frame",
              { rotateY: -12, duration: 1.5, ease: "power2.inOut" },
              1.0
            );
          }

          // Subtle parallax on ambient light layers
          mainTimeline.to(
            ".ambient-glow-1",
            { y: -30, opacity: 0.5, duration: 3.0, ease: "none" },
            0
          );
          mainTimeline.to(
            ".ambient-glow-2",
            { y: 30, opacity: 0.4, duration: 3.0, ease: "none" },
            0
          );

          // =========================================================
          // EDITORIAL MOMENTS SEQUENCE
          // =========================================================

          // --- Slide 1 Entrance (WHO AM I) ---
          mainTimeline.to(".narrative-slide-1", { opacity: 1, pointerEvents: "auto", duration: 0.4 }, 2.5);
          mainTimeline.from(".narrative-label-1", { opacity: 0, y: 15, duration: 0.4 }, 2.5);
          mainTimeline.to(".narrative-watermark", { opacity: 1, y: 0, duration: 0.4 }, 2.5);
          
          if (block1Split && block1Split.lines.length > 0) {
            block1Split.lines.forEach((line, idx) => {
              const t = 2.6 + idx * 0.25;
              mainTimeline.to(
                `.box-reveal-overlay-${idx}`,
                { scaleX: 1, transformOrigin: "left", duration: 0.35, ease: "power3.inOut" },
                t
              );
              mainTimeline.to(line, { opacity: 1, duration: 0.01 }, t + 0.35);
              mainTimeline.to(
                `.box-reveal-overlay-${idx}`,
                { scaleX: 0, transformOrigin: "right", duration: 0.35, ease: "power3.inOut" },
                t + 0.36
              );
            });
          }

          // --- Slide 1 Exit & Watermark Transition to 02 ---
          mainTimeline.to(".narrative-slide-1", { opacity: 0, y: -20, duration: 0.4 }, 3.5);
          mainTimeline.to(".narrative-watermark", {
            opacity: 0,
            y: -20,
            duration: 0.2,
            onComplete: () => {
              const watermark = document.querySelector(".narrative-watermark");
              if (watermark) watermark.textContent = "02";
            }
          }, 3.5);
          mainTimeline.to(".narrative-watermark", { opacity: 1, y: 0, duration: 0.2 }, 3.7);

          // --- Slide 2 Entrance (BACKGROUND) ---
          mainTimeline.to(".narrative-slide-2", { opacity: 1, pointerEvents: "auto", duration: 0.4 }, 3.8);
          mainTimeline.from(".narrative-label-2", { opacity: 0, y: 15, duration: 0.4 }, 3.8);
          
          const bgChars = document.querySelectorAll(".narrative-slide-2 .bg-char");
          if (bgChars.length > 0) {
            mainTimeline.to(
              bgChars,
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                stagger: 0.008,
                duration: 0.5,
                ease: "power2.out"
              },
              3.9
            );
          }

          // --- Slide 2 Exit & Watermark Transition to 03 ---
          mainTimeline.to(".narrative-slide-2", { opacity: 0, y: -20, duration: 0.4 }, 4.8);
          mainTimeline.to(".narrative-watermark", {
            opacity: 0,
            y: -20,
            duration: 0.2,
            onComplete: () => {
              const watermark = document.querySelector(".narrative-watermark");
              if (watermark) watermark.textContent = "03";
            }
          }, 4.8);
          mainTimeline.to(".narrative-watermark", { opacity: 1, y: 0, duration: 0.2 }, 5.0);

          // --- Slide 3 Entrance (WHAT I BUILD) ---
          mainTimeline.to(".narrative-slide-3", { opacity: 1, pointerEvents: "auto", duration: 0.4 }, 5.1);
          mainTimeline.from(".narrative-label-3", { opacity: 0, y: 15, duration: 0.4 }, 5.1);

          document.querySelectorAll(".narrative-slide-3 .narrative-build-item").forEach((item, i) => {
            const t = 5.2 + i * 0.25;
            const bullet = item.querySelector("span.rounded-full");
            const words = item.querySelectorAll(".word-inner");
            mainTimeline.to(
              bullet,
              { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.8)" },
              t
            );
            if (words.length > 0) {
              mainTimeline.to(
                words,
                { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.45, ease: "power2.out" },
                t + 0.08
              );
            }
          });

          // --- Slide 3 Exit & Watermark Transition to 04 ---
          mainTimeline.to(".narrative-slide-3", { opacity: 0, y: -20, duration: 0.4 }, 6.3);
          mainTimeline.to(".narrative-watermark", {
            opacity: 0,
            y: -20,
            duration: 0.2,
            onComplete: () => {
              const watermark = document.querySelector(".narrative-watermark");
              if (watermark) watermark.textContent = "04";
            }
          }, 6.3);
          mainTimeline.to(".narrative-watermark", { opacity: 1, y: 0, duration: 0.2 }, 6.5);

          // --- Slide 4 Entrance (PHILOSOPHY) ---
          mainTimeline.to(".narrative-slide-4", { opacity: 1, pointerEvents: "auto", duration: 0.4 }, 6.6);
          mainTimeline.from(".narrative-label-4", { opacity: 0, y: 15, duration: 0.4 }, 6.6);
          mainTimeline.fromTo(
            philosophyTextRef.current,
            { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)", opacity: 0.3, letterSpacing: "0.06em" },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              opacity: 1,
              letterSpacing: "0em",
              duration: 1.0,
              ease: "power2.out"
            },
            6.7
          );
        };

        ctx.add("(min-width: 1024px)", () => buildPhases(false));
        ctx.add("(max-width: 1023px)", () => buildPhases(true));

        ScrollTrigger.refresh();
      }

      return () => {
        splits.forEach((s) => s && s.revert());
        if (mainTimeline) mainTimeline.kill();
        cleanupFns.forEach((fn) => fn());
        document.documentElement.style.overflow = previousOverflow;
      };
    },
    { scope: sectionRef, dependencies: [mounted, isLoading] }
  );

  // Portrait 3D tilt
  const onMouseMovePortrait = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      rotateX: -relY * 0.03,
      rotateY: relX * 0.03,
      x: relX * 0.02,
      y: relY * 0.02,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onMouseLeavePortrait = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#030303] overflow-hidden select-none"
    >
      {/* Ambient light layers */}
      <div className="ambient-glow-1 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#ff8000]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="ambient-glow-2 absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] bg-[#ff8000]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div
        ref={containerRef}
        className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between"
      >
        {/* Intro */}
        <div className="intro-container w-full lg:w-[48%] flex flex-col justify-center text-left relative z-10 h-full lg:h-auto pt-24 lg:pt-0">
          <span className="intro-label font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff8000] mb-5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000] shadow-[0_0_8px_#ff8000]" />
            Introduction
          </span>
          <h2
            ref={introTextRef}
            className="text-[8vw] md:text-[5vw] lg:text-[3.4vw] font-black uppercase tracking-tight leading-[1.05] text-white"
          >
            Not just another <span className="text-[#ff8000]">developer</span>.<br />
            I design digital <span className="text-zinc-100">experiences</span><br />
            that people <span className="text-[#ff8000]">remember</span>.
          </h2>
          <div
            ref={subTextRef}
            className="mt-8 flex flex-col gap-1.5 border-l-2 border-[#ff8000] pl-5"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
              Ahmedabad, India
            </span>
            <span className="text-xs font-semibold tracking-wide text-zinc-500">
              MERN Stack &bull; UI/UX Craft &bull; Interactive Tech
            </span>
          </div>
        </div>

        {/* Narrative Container — absolute frame containing absolute slides */}
        <div className="narrative-col w-full lg:w-[42%] h-[60vh] flex items-center justify-start relative z-10 lg:ml-auto pb-24 lg:pb-0">
          
          {/* Giant background watermarks for the active slide numbers */}
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none select-none overflow-hidden z-0">
            <span className="narrative-watermark font-sans font-black text-[30vw] lg:text-[18vw] text-white/[0.012] leading-none select-none pointer-events-none transition-all duration-300">
              01
            </span>
          </div>

          <div className="relative w-full h-full flex flex-col justify-center z-10">
            {/* Slide 1: WHO AM I */}
            <div className="narrative-slide narrative-slide-1 absolute inset-0 flex flex-col justify-center gap-4 w-full">
              <span className="narrative-label-1 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff8000] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000]" />
                01 // Concept
              </span>
              <h3 className="narrative-block-1-text font-serif italic text-3xl md:text-[36px] lg:text-[42px] font-light leading-[1.3] tracking-tight text-white max-w-xl">
                I build digital interfaces that feel inevitable.
              </h3>
            </div>

            {/* Slide 2: BACKGROUND */}
            <div className="narrative-slide narrative-slide-2 absolute inset-0 flex flex-col justify-center gap-5 w-full">
              <span className="narrative-label-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff8000] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000]" />
                02 // Background
              </span>
              <div className="narrative-block-2-text text-[16px] md:text-[18px] text-zinc-400 font-light leading-relaxed tracking-wide flex flex-col gap-3 max-w-lg">
                <div className="bg-line-1">
                  {"Studying Information Technology.".split("").map((char, cIdx) => (
                    <span key={cIdx} className="bg-char inline-block">{char === " " ? "\u00A0" : char}</span>
                  ))}
                </div>
                <div className="bg-line-2">
                  {"Self-taught, curious by design, driven by craft.".split("").map((char, cIdx) => (
                    <span key={cIdx} className="bg-char inline-block">{char === " " ? "\u00A0" : char}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide 3: WHAT I BUILD */}
            <div className="narrative-slide narrative-slide-3 absolute inset-0 flex flex-col justify-center gap-6 w-full">
              <span className="narrative-label-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff8000] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000]" />
                03 // Craft
              </span>
              <div className="narrative-block-3-list flex flex-col gap-4">
                {[
                  "Full-stack applications",
                  "Real-time platforms",
                  "AI-assisted tools",
                  "Modern UI engineering",
                ].map((item) => (
                  <div
                    key={item}
                    className="narrative-build-item text-[16px] md:text-[18px] text-zinc-300 font-light tracking-wide flex items-center gap-4"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000] shadow-[0_0_6px_#ff8000]" />
                    <span className="build-item-text text-white">
                      {item.split(" ").map((word, wIdx) => (
                        <span key={wIdx} className="inline-block overflow-hidden mr-1.5 py-0.5 align-middle">
                          <span className="word-inner inline-block">{word}</span>
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide 4: PHILOSOPHY */}
            <div className="narrative-slide narrative-slide-4 absolute inset-0 flex flex-col justify-center gap-4 w-full">
              <span className="narrative-label-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff8000] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000]" />
                04 // Creed
              </span>
              <p
                ref={philosophyTextRef}
                className="narrative-block-4-text text-[22px] md:text-[24px] lg:text-[28px] text-zinc-200 font-light italic tracking-wide leading-relaxed max-w-xl"
              >
                Good code is invisible. Great design isn&rsquo;t.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Hero portrait — untouched: same right-to-left concept, same pin */}
      <div
        ref={portraitContainerRef}
        className="absolute z-20 left-[56vw] top-[50%] flex justify-center items-center pointer-events-none lg:pointer-events-auto"
        style={{ width: "360px", height: "480px" }}
      >
        <div
          className="portrait-inner-frame will-change-transform w-[280px] h-[380px] sm:w-[350px] sm:h-[460px] rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-zinc-900 relative cursor-none"
          style={{ transformStyle: "preserve-3d" }}
          onMouseMove={onMouseMovePortrait}
          onMouseLeave={onMouseLeavePortrait}
        >
          <img
            src="https://ik.imagekit.io/devnext/Gemini_Generated_Image_8wt16z8wt16z8wt1.png"
            alt="Ruchit Thakkar Portrait"
            className="w-full h-full object-cover scale-[1.12] select-none pointer-events-none transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,128,0,0.08),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 pointer-events-none">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#ff8000]">
              Ruchit Thakkar
            </p>
            <p className="text-[10px] font-mono text-zinc-500 mt-1">
              // Creative Tech Developer
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 pointer-events-none z-30">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
          Scroll Scene
        </span>
        <ArrowDown size={11} className="animate-bounce text-[#ff8000]" />
      </div>
    </section>
  );
}