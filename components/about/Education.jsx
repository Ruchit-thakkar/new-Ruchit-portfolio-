"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const educationData = [
  {
    id: 1,
    title: "Information Technology",
    subtitle: "JG University",
    date: "2024 - 2028",
    tags: ["Software Architecture", "Data Analytics", "Algorithms", "Systems Engineering"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Full-Stack Mastery",
    subtitle: "Sheryians Coding School",
    date: "2024 - 2025",
    tags: ["MERN Stack", "GSAP Animations", "Next.js", "System Design"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Tech Fest Innovator",
    subtitle: "Hackathon Winner",
    date: "March 2025",
    tags: ["Rapid Prototyping", "Team Leadership", "AI APIs", "Presentation"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function Education({ isLoading = false }) {
  const sectionRef = useRef(null);
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

      // Set initial state for animations
      gsap.set(".edu-section-title", { opacity: 0, y: 30, filter: "blur(10px)" });
      gsap.set(".left-nav-container", { opacity: 0, x: -40 });
      gsap.set(".education-card", { opacity: 0, y: 40, pointerEvents: "none" });
      gsap.set(".creed-container", { opacity: 0, pointerEvents: "none" });
      gsap.set(".creed-underline", { scaleX: 0 });

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
        tl.to(".edu-section-title", { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 });
        tl.to(".education-card-0", { opacity: 1, y: 0, duration: 1 }, "-=0.3");
        return;
      }

      // --- MAIN SCROLL TIMELINE (0% to 100%) ---
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

      // Phase 1: Section Title Reveal (0% to 10%)
      mainTimeline.fromTo(
        ".edu-section-title",
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        0.1
      );

      // Phase 2: Navigation & Panel 1 Reveal (10% to 25%)
      mainTimeline.fromTo(
        ".left-nav-container",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        0.8
      );
      mainTimeline.to(".nav-item-0 .nav-title", { color: "#ff8000", scale: 1.05, duration: 0.4 }, 1.0);
      mainTimeline.to(".nav-item-0 .nav-dot-0 .dot-inner", { scale: 1, duration: 0.4 }, 1.0);
      mainTimeline.to(".nav-progress-bar", { scaleY: 0.05, duration: 0.4 }, 1.0);

      mainTimeline.to(".education-card-0", { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.8 }, 1.0);
      mainTimeline.fromTo(
        ".education-card-0 img",
        { scale: 1.15, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { scale: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.0, ease: "power3.out" },
        1.0
      );
      mainTimeline.fromTo(
        ".education-card-0 .skill-pill",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" },
        1.2
      );

      // Card 0 project counter animation
      const countObj0 = { val: 0 };
      mainTimeline.to(
        countObj0,
        {
          val: 25,
          duration: 1.0,
          onUpdate: () => {
            const el = document.querySelector(".education-card-0 .count-projects");
            if (el) el.textContent = Math.floor(countObj0.val) + "+";
          },
        },
        1.0
      );

      // Phase 3: Transition to Panel 2 (25% to 50%)
      mainTimeline.to(".education-card-0", { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" }, 2.5);
      mainTimeline.to(".nav-item-0 .nav-title", { color: "#9ca3af", scale: 1.0, duration: 0.4 }, 2.5);
      mainTimeline.to(".nav-item-0 .nav-dot-0 .dot-inner", { scale: 0, duration: 0.4 }, 2.5);

      // Watermark shift to 02
      mainTimeline.to(
        ".edu-watermark",
        {
          opacity: 0,
          y: -30,
          duration: 0.4,
          onComplete: () => {
            const el = document.querySelector(".edu-watermark");
            if (el) el.textContent = "02";
          },
        },
        2.5
      );
      mainTimeline.to(".edu-watermark", { opacity: 1, y: 0, duration: 0.4 }, 2.9);

      mainTimeline.to(".nav-item-1 .nav-title", { color: "#ff8000", scale: 1.05, duration: 0.4 }, 2.9);
      mainTimeline.to(".nav-item-1 .nav-dot-1 .dot-inner", { scale: 1, duration: 0.4 }, 2.9);
      mainTimeline.to(".nav-progress-bar", { scaleY: 0.5, duration: 0.4 }, 2.9);

      mainTimeline.to(".education-card-1", { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.8 }, 2.9);
      mainTimeline.fromTo(
        ".education-card-1 img",
        { scale: 1.15, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { scale: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.0, ease: "power3.out" },
        2.9
      );
      mainTimeline.fromTo(
        ".education-card-1 .skill-pill",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" },
        3.1
      );

      // Card 1 project counter animation
      const countObj1 = { val: 0 };
      mainTimeline.to(
        countObj1,
        {
          val: 15,
          duration: 1.0,
          onUpdate: () => {
            const el = document.querySelector(".education-card-1 .count-projects");
            if (el) el.textContent = Math.floor(countObj1.val) + "+";
          },
        },
        2.9
      );

      // Phase 4: Transition to Panel 3 (50% to 75%)
      mainTimeline.to(".education-card-1", { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" }, 4.5);
      mainTimeline.to(".nav-item-1 .nav-title", { color: "#9ca3af", scale: 1.0, duration: 0.4 }, 4.5);
      mainTimeline.to(".nav-item-1 .nav-dot-1 .dot-inner", { scale: 0, duration: 0.4 }, 4.5);

      // Watermark shift to 03
      mainTimeline.to(
        ".edu-watermark",
        {
          opacity: 0,
          y: -30,
          duration: 0.4,
          onComplete: () => {
            const el = document.querySelector(".edu-watermark");
            if (el) el.textContent = "03";
          },
        },
        4.5
      );
      mainTimeline.to(".edu-watermark", { opacity: 1, y: 0, duration: 0.4 }, 4.9);

      mainTimeline.to(".nav-item-2 .nav-title", { color: "#ff8000", scale: 1.05, duration: 0.4 }, 4.9);
      mainTimeline.to(".nav-item-2 .nav-dot-2 .dot-inner", { scale: 1, duration: 0.4 }, 4.9);
      mainTimeline.to(".nav-progress-bar", { scaleY: 1.0, duration: 0.4 }, 4.9);

      mainTimeline.to(".education-card-2", { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.8 }, 4.9);
      mainTimeline.fromTo(
        ".education-card-2 img",
        { scale: 1.15, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { scale: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.0, ease: "power3.out" },
        4.9
      );
      mainTimeline.fromTo(
        ".education-card-2 .skill-pill",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" },
        5.1
      );

      // Phase 5: Fadeout before Creed (75% to 90%)
      mainTimeline.to(".education-card-2", { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" }, 6.5);
      mainTimeline.to(".left-nav-container", { opacity: 0, x: -20, duration: 0.8 }, 6.5);
      mainTimeline.to(".edu-section-title", { opacity: 0, y: -20, duration: 0.8 }, 6.5);
      mainTimeline.to(".edu-watermark", { opacity: 0, duration: 0.6 }, 6.5);

      // Phase 6: final message (90% to 100%)
      mainTimeline.to(
        ".creed-container",
        { opacity: 1, pointerEvents: "auto", duration: 0.8, ease: "power2.out" },
        7.5
      );
      mainTimeline.to(
        ".creed-underline",
        { scaleX: 1, duration: 1.0, ease: "power3.inOut" },
        7.9
      );

      return () => {
        if (mainTimeline) mainTimeline.kill();
      };
    },
    { scope: sectionRef, dependencies: [mounted, isLoading] }
  );

  // 3D Card Hover & Spotlight
  const onMouseMoveImageCard = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    gsap.to(el, {
      rotateX: -relY * 0.012,
      rotateY: relX * 0.012,
      scale: 1.025,
      duration: 0.5,
      ease: "power2.out",
    });

    const spotlight = el.querySelector(".spotlight");
    if (spotlight) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      gsap.to(spotlight, {
        x: mouseX,
        y: mouseY,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const onMouseLeaveImageCard = (e) => {
    const el = e.currentTarget;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1.0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative w-full h-screen bg-[#050505] flex flex-col justify-center items-center overflow-hidden border-b border-white/[0.03]"
    >
      {/* Ambient background glow backing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[45vh] bg-[#ff8000]/[0.02] rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Large backdrop watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="edu-watermark font-sans font-black text-[30vw] text-white/[0.012] leading-none transition-all duration-500">
          01
        </span>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-20 h-full flex flex-col justify-center relative z-10">
        {/* Section title (Header) */}
        <div className="edu-section-title flex justify-between items-end border-b border-white/10 pb-6 mb-12 select-none w-full">
          <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-tighter text-white">
            Education
          </h2>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 text-right">
            02 // Knowledge Wall
          </span>
        </div>

        {/* Dashboard Stage Layout */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Sticky Navigation Column */}
          <div className="left-nav-container w-full lg:w-[28%] hidden lg:block relative py-6">
            
            {/* Orange progress bar line connector */}
            <div className="absolute left-[29px] top-1/2 -translate-y-1/2 h-[75%] w-[1.5px] bg-white/[0.08] z-0">
              <div className="nav-progress-bar absolute top-0 left-0 w-full bg-[#ff8000] origin-top scale-y-0 h-full" />
            </div>

            <div className="flex flex-col gap-14 relative z-10 pl-14">
              {educationData.map((item, idx) => (
                <div
                  key={item.id}
                  className={`nav-item nav-item-${idx} flex items-start gap-4 select-none`}
                >
                  <div className="relative mt-1.5">
                    <div
                      className={`nav-dot nav-dot-${idx} w-3 h-3 rounded-full border border-white/20 bg-zinc-950 flex items-center justify-center`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff8000] scale-0 dot-inner" />
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-widest leading-none mb-1">
                      0{item.id}
                    </span>
                    <h4 className="nav-title font-sans text-base font-bold uppercase tracking-tight text-zinc-500 transition-all duration-300">
                      {item.title}
                    </h4>
                    <span className="nav-sub font-mono text-[9px] uppercase tracking-wider text-zinc-600 block mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Display Panel Wrapper (Centered Content Stage) */}
          <div className="w-full lg:w-[72%] relative h-[65vh] md:h-[50vh] lg:h-[52vh] flex items-center">
            
            {educationData.map((item, idx) => (
              <div
                key={item.id}
                className={`education-card education-card-${idx} absolute inset-0 flex flex-col md:flex-row gap-8 lg:gap-12 w-full h-full pointer-events-none opacity-0`}
              >
                
                {/* 3D Editorial Image Card */}
                <div
                  onMouseMove={onMouseMoveImageCard}
                  onMouseLeave={onMouseLeaveImageCard}
                  className="image-card-frame w-full md:w-[42%] aspect-[16/9] md:aspect-[3/4] md:h-full rounded-[28px] border border-white/[0.08] bg-white/[0.01] backdrop-blur-[24px] overflow-hidden relative shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex-shrink-0 cursor-none pointer-events-auto"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out"
                  />
                  {/* Spotlight follower */}
                  <div
                    className="absolute w-[180px] h-[180px] bg-[#ff8000]/[0.15] rounded-full blur-[40px] pointer-events-none -translate-x-1/2 -translate-y-1/2 spotlight"
                    style={{ left: 0, top: 0 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff8000]">
                        Active Milestone
                      </p>
                      <p className="text-[9px] font-mono text-zinc-500 mt-1">
                        0{item.id} // {item.subtitle}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-zinc-900/60 text-white">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Details Information Panel */}
                <div className="details-card w-full md:w-[58%] flex flex-col justify-between py-2 pl-0 md:pl-6 select-none">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#ff8000] block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="font-sans text-2xl lg:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm lg:text-base text-zinc-400 font-light leading-relaxed mt-4 max-w-md">
                      {item.id === 1 && "Building a strong foundation in Software Engineering, Data Analytics, Systems Architecture, and Advanced Mathematics."}
                      {item.id === 2 && "Mastering complete full-stack web architectures, server orchestration, reactive layouts, and GSAP micro-interactions."}
                      {item.id === 3 && "Leading cross-functional software teams to conceptualize, design, and prototype AI-driven solutions under intense hackathon deadlines."}
                    </p>
                  </div>

                  {/* Skill Badges (Staggered Stagger) */}
                  <div className="mt-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-2">
                      // Core Focus
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="skill-pill px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-[9px] text-zinc-300 uppercase tracking-widest shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Counting Statistics Rows */}
                  <div className="mt-6 pt-4 border-t border-white/[0.05] flex flex-col gap-2 max-w-md">
                    <div className="flex justify-between items-center text-xs border-b border-white/[0.03] pb-2">
                      <span className="font-mono text-zinc-500 uppercase tracking-wider">Duration</span>
                      <span className="font-bold text-white font-mono tracking-wider">{item.date}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-white/[0.03] pb-2">
                      <span className="font-mono text-zinc-500 uppercase tracking-wider">Projects / Wins</span>
                      <span className="font-bold text-[#ff8000] font-mono tracking-wider count-projects font-semibold">
                        0+
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-white/[0.03] pb-2">
                      <span className="font-mono text-zinc-500 uppercase tracking-wider">Focus Area</span>
                      <span className="font-bold text-white font-mono tracking-wider">
                        {item.id === 1 ? "Modern Web" : item.id === 2 ? "Full-Stack" : "Rapid Dev"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-zinc-500 uppercase tracking-wider">Curriculum</span>
                      <span className="font-bold text-white font-mono tracking-wider">
                        {item.id === 1 ? "Continuous" : item.id === 2 ? "Advanced" : "Under Pressure"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Final creed message overlay (Placed outside content cards for absolute hero presence) */}
      <div className="creed-container absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20 pointer-events-none select-none">
        <p className="font-sans text-xl md:text-3xl lg:text-4xl text-zinc-200 font-light italic leading-relaxed max-w-3xl">
          "Education gave me the fundamentals.<br />
          <span className="text-[#ff8000] relative inline-block mt-2 font-bold font-sans">
            Building real products taught me everything else.
            <span className="creed-underline absolute bottom-[-8px] left-0 w-full h-[3px] bg-[#ff8000] scale-x-0 origin-left" />
          </span>
        </p>
      </div>

      {/* Bottom Scene Meta */}
      <div className="absolute bottom-8 font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 pointer-events-none select-none">
        // Academics &bull; Credentials &bull; Experience
      </div>
    </section>
  );
}
