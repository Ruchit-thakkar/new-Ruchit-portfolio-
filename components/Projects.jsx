"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projectsData = [
  {
    id: 1,
    title: "DirectShare",
    category: "P2P WebRTC Transfer",
    url: "directshare.app",
    demo: "https://directshare-ruchit.netlify.app",
    github: "https://github.com/Ruchit-thakkar/DirectShare.git",
    challenge: "Reliable browser-to-browser large file transfers.",
    solution: "WebRTC + Chunked Transfer + IndexedDB + Recovery System",
    color: "#ff8000",
    metrics: [
      { label: "Technologies", value: "15+" },
      { label: "WebRTC", value: "Real-Time" },
      { label: "Railway", value: "Production" },
      { label: "FastAPI", value: "Backend" }
    ],
    architecture: ["Browser", "Next.js", "API", "FastAPI", "WebRTC", "IndexedDB"],
    features: ["WebRTC", "IndexedDB", "Web Workers", "FastAPI", "Docker", "Railway"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
    performance: ["PWA", "Responsive", "Secure", "Optimized", "Production Ready"]
  },
  {
    id: 2,
    title: "Herald",
    category: "Real-Time Chat & Alerts",
    url: "herald.app",
    demo: "https://herald-chat-ruchit.netlify.app",
    github: "https://github.com/Ruchit-thakkar/Herald.git",
    challenge: "Real-time communication with secure authentication.",
    solution: "Firebase Auth + Realtime DB + Cloud Messaging + ImageKit",
    color: "#0066cc",
    metrics: [
      { label: "Technologies", value: "10+" },
      { label: "Firebase", value: "Auth" },
      { label: "Realtime", value: "Sync" },
      { label: "Push Alerts", value: "Active" }
    ],
    architecture: ["Browser", "React", "Firebase", "Realtime DB", "Cloud Messaging", "ImageKit"],
    features: ["Firebase", "React", "ImageKit", "Cloud Messaging", "Tailwind"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
    performance: ["Secure", "Responsive", "Cloud Sync", "Optimized", "Active Alerts"]
  },
  {
    id: 3,
    title: "MediaDrop",
    category: "Streaming & yt-dlp API",
    url: "mediadrop.app",
    demo: "https://mediadrop-ruchit.netlify.app",
    github: "https://github.com/Ruchit-thakkar/MediaDrop.git",
    challenge: "Large media processing inside the browser.",
    solution: "Flask Backend + FFmpeg + yt-dlp + Streaming pipeline",
    color: "#8a2be2",
    metrics: [
      { label: "Technologies", value: "8+" },
      { label: "FFmpeg", value: "Pipeline" },
      { label: "Flask", value: "API" },
      { label: "yt-dlp", value: "Engine" }
    ],
    architecture: ["Browser", "React", "Flask", "FFmpeg", "yt-dlp", "Streaming"],
    features: ["Flask", "FFmpeg", "yt-dlp", "React", "Tailwind", "Python"],
    image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=2574&auto=format&fit=crop",
    performance: ["FFmpeg", "PWA", "Secure", "Optimized", "Direct Stream"]
  }
];

export default function Projects({ isLoading = false }) {
  const containerRef = useRef(null);
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

      // Set initial states for entrance reveals
      gsap.set(".projects-header-title", { opacity: 0, y: 30, filter: "blur(10px)" });
      gsap.set(".left-progress-container", { opacity: 0, x: -30 });
      gsap.set(".project-showcase-card", { opacity: 0, y: 50, pointerEvents: "none" });
      gsap.set(".creed-cta-card", { opacity: 0, pointerEvents: "none" });
      gsap.set(".cta-underline", { scaleX: 0 });

      // Prep first metrics & arch lines
      gsap.set(".arch-line", { scaleX: 0 });
      gsap.set(".project-p-0, .project-p-1, .project-p-2", { color: "#52525b" });

      if (prefersReducedMotion) {
        // Fallback for reduced motion: simple page reveals
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          },
        });
        tl.to(".projects-header-title", { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 });
        tl.to(".project-showcase-card-0", { opacity: 1, y: 0, duration: 1 }, "-=0.3");
        return;
      }

      // --- MAIN CINEMATIC SCROLL TIMELINE (0% to 100%) ---
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Orbiting text floats
      gsap.to(".bg-tech-orbit", {
        y: "random(-15, 15)",
        x: "random(-15, 15)",
        duration: "random(5, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Phase 1: Section Title Reveal (0% to 10%)
      mainTimeline.fromTo(
        ".projects-header-title",
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        0.1
      );

      // Phase 2: Navigation & Project 1 Reveal (10% to 25%)
      mainTimeline.fromTo(
        ".left-progress-container",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        0.8
      );
      mainTimeline.to(".project-p-0", { color: "#ff8000", duration: 0.4 }, 1.0);
      mainTimeline.to(".project-progress-bar", { scaleY: 0.05, duration: 0.4 }, 1.0);
      mainTimeline.to(".project-spotlight", { backgroundColor: "rgba(255, 128, 0, 0.025)", duration: 0.8 }, 1.0);

      mainTimeline.to(".project-showcase-card-0", { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.8 }, 1.0);
      mainTimeline.fromTo(
        ".project-showcase-card-0 .browser-window-wrapper",
        { scale: 0.9, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 1.0, ease: "power3.out" },
        1.0
      );
      mainTimeline.to(".project-showcase-card-0 .arch-line", { scaleX: 1, stagger: 0.15, duration: 0.8, ease: "power2.inOut" }, 1.3);

      // Metric Counter Animation (DirectShare: 15+ Techs)
      const countObj0 = { val: 0 };
      mainTimeline.to(
        countObj0,
        {
          val: 15,
          duration: 1.0,
          onUpdate: () => {
            const el = document.querySelector(".project-showcase-card-0 .count-tech");
            if (el) el.textContent = Math.floor(countObj0.val) + "+";
          },
        },
        1.0
      );

      // Phase 3: Transition to Project 2 (25% to 50%)
      mainTimeline.to(".project-showcase-card-0", { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" }, 2.5);
      mainTimeline.to(".project-p-0", { color: "#52525b", duration: 0.4 }, 2.5);

      // Spotlight shift to Blue
      mainTimeline.to(".project-spotlight", { backgroundColor: "rgba(0, 102, 204, 0.025)", duration: 0.8 }, 2.7);

      mainTimeline.to(".project-p-1", { color: "#0066cc", duration: 0.4 }, 2.9);
      mainTimeline.to(".project-progress-bar", { scaleY: 0.5, duration: 0.4 }, 2.9);

      mainTimeline.to(".project-showcase-card-1", { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.8 }, 2.9);
      mainTimeline.fromTo(
        ".project-showcase-card-1 .browser-window-wrapper",
        { scale: 0.9, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 1.0, ease: "power3.out" },
        2.9
      );
      mainTimeline.to(".project-showcase-card-1 .arch-line", { scaleX: 1, stagger: 0.15, duration: 0.8, ease: "power2.inOut" }, 3.2);

      // Metric Counter Animation (Herald: 10+ Techs)
      const countObj1 = { val: 0 };
      mainTimeline.to(
        countObj1,
        {
          val: 10,
          duration: 1.0,
          onUpdate: () => {
            const el = document.querySelector(".project-showcase-card-1 .count-tech");
            if (el) el.textContent = Math.floor(countObj1.val) + "+";
          },
        },
        2.9
      );

      // Phase 4: Transition to Project 3 (50% to 75%)
      mainTimeline.to(".project-showcase-card-1", { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" }, 4.5);
      mainTimeline.to(".project-p-1", { color: "#52525b", duration: 0.4 }, 4.5);

      // Spotlight shift to Purple
      mainTimeline.to(".project-spotlight", { backgroundColor: "rgba(138, 43, 226, 0.025)", duration: 0.8 }, 4.7);

      mainTimeline.to(".project-p-2", { color: "#8a2be2", duration: 0.4 }, 4.9);
      mainTimeline.to(".project-progress-bar", { scaleY: 1.0, duration: 0.4 }, 4.9);

      mainTimeline.to(".project-showcase-card-2", { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.8 }, 4.9);
      mainTimeline.fromTo(
        ".project-showcase-card-2 .browser-window-wrapper",
        { scale: 0.9, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 1.0, ease: "power3.out" },
        4.9
      );
      mainTimeline.to(".project-showcase-card-2 .arch-line", { scaleX: 1, stagger: 0.15, duration: 0.8, ease: "power2.inOut" }, 5.2);

      // Metric Counter Animation (MediaDrop: 8+ Techs)
      const countObj2 = { val: 0 };
      mainTimeline.to(
        countObj2,
        {
          val: 8,
          duration: 1.0,
          onUpdate: () => {
            const el = document.querySelector(".project-showcase-card-2 .count-tech");
            if (el) el.textContent = Math.floor(countObj2.val) + "+";
          },
        },
        4.9
      );

      // Phase 5: Fadeout before Creed CTA (75% to 90%)
      mainTimeline.to(".project-showcase-card-2", { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" }, 6.5);
      mainTimeline.to(".left-progress-container", { opacity: 0, x: -20, duration: 0.8 }, 6.5);
      mainTimeline.to(".projects-header-title", { opacity: 0, y: -20, duration: 0.8 }, 6.5);
      mainTimeline.to(".project-spotlight", { backgroundColor: "rgba(255, 128, 0, 0.015)", duration: 0.8 }, 6.5);

      // Phase 6: Final Creed CTA (90% to 100%)
      mainTimeline.to(
        ".creed-cta-card",
        { opacity: 1, pointerEvents: "auto", duration: 0.8, ease: "power2.out" },
        7.5
      );
      mainTimeline.to(
        ".cta-underline",
        { scaleX: 1, duration: 1.0, ease: "power3.inOut" },
        7.9
      );

      return () => {
        if (mainTimeline) mainTimeline.kill();
      };
    },
    { scope: containerRef, dependencies: [mounted, isLoading] }
  );

  // 3D Tilt & Spotlight Follower inside the Browser window wrapper
  const onMouseMoveBrowser = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    // Subtle 3D tilt
    gsap.to(el, {
      rotateX: -relY * 0.01,
      rotateY: relX * 0.01,
      duration: 0.5,
      ease: "power2.out",
    });

    // Translate glass reflection and backing lights
    const reflection = el.querySelector(".browser-reflection");
    if (reflection) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      gsap.to(reflection, {
        x: mouseX - 100,
        y: mouseY - 100,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const onMouseLeaveBrowser = (e) => {
    const el = e.currentTarget;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
    });
  };

  if (!mounted) return null;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] flex flex-col justify-center items-center overflow-hidden border-b border-white/[0.03]"
    >
      {/* Background radial spotlight glow backing */}
      <div className="project-spotlight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[45vh] bg-[#ff8000]/[0.02] rounded-full blur-[150px] pointer-events-none z-0 transition-colors duration-700" />

      {/* Decorative dark grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-20 h-full flex flex-col justify-center relative z-10">
        
        {/* Header section */}
        <div className="projects-header-title flex justify-between items-end border-b border-white/10 pb-6 mb-12 select-none w-full">
          <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-tighter text-white">
            Projects
          </h2>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 text-right">
            03 // Showcase
          </span>
        </div>

        {/* Dashboard layout Stage */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Vertical Progress Navigation */}
          <div className="left-progress-container w-full lg:w-[15%] hidden lg:flex flex-col items-start gap-6 select-none pl-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">// METRICS</span>
            <div className="h-44 w-[1.5px] bg-white/[0.08] relative">
              <div className="project-progress-bar absolute top-0 left-0 w-full bg-[#ff8000] origin-top scale-y-0 h-full" />
            </div>
            <div className="flex flex-col gap-4 font-mono text-[10px]">
              <span className="project-p-0 font-bold tracking-widest block transition-colors duration-300">01 / DirectShare</span>
              <span className="project-p-1 font-bold tracking-widest block transition-colors duration-300">02 / Herald</span>
              <span className="project-p-2 font-bold tracking-widest block transition-colors duration-300">03 / MediaDrop</span>
            </div>
          </div>

          {/* Right Presentation Dashboard Panel */}
          <div className="w-full lg:w-[85%] relative h-[70vh] md:h-[52vh] lg:h-[55vh] flex items-center">
            
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                className={`project-showcase-card project-showcase-card-${idx} absolute inset-0 flex flex-col md:flex-row gap-8 lg:gap-16 w-full h-full pointer-events-none opacity-0`}
              >
                
                {/* 3D Browser Mockup Column */}
                <div
                  onMouseMove={onMouseMoveBrowser}
                  onMouseLeave={onMouseLeaveBrowser}
                  className="browser-window-wrapper w-full md:w-[48%] aspect-[4/3] md:h-full rounded-[20px] border border-white/[0.08] bg-white/[0.01] backdrop-blur-[20px] overflow-hidden relative shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex-shrink-0 group pointer-events-auto cursor-none flex flex-col justify-between"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* Floating ambient tech name orbit */}
                  <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
                    {project.features.map((tech, tIdx) => {
                      const positions = [
                        "top-[12%] left-[12%]",
                        "top-[18%] right-[15%]",
                        "bottom-[22%] left-[10%]",
                        "bottom-[18%] right-[12%]",
                        "top-[55%] left-[8%]",
                        "bottom-[50%] right-[6%]"
                      ];
                      return (
                        <span
                          key={tech}
                          className={`absolute font-mono text-[10px] uppercase tracking-widest bg-tech-orbit text-zinc-500 opacity-10 ${positions[tIdx % positions.length]}`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* Browser Window Header */}
                  <div className="browser-window-header h-9 px-4 flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-md relative z-20 pointer-events-none">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                      <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-zinc-950/40 border border-white/5 w-[140px] md:w-[180px] justify-center">
                      <svg className="w-2 h-2 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="font-mono text-[8px] text-zinc-500 tracking-wide">{project.url}</span>
                    </div>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[8px] uppercase tracking-wider text-[#ff8000] flex items-center gap-1 hover:opacity-85 pointer-events-auto"
                    >
                      Live ↗
                    </a>
                  </div>

                  {/* Browser Window Body (Overlapping Mockup Layers) */}
                  <div className="browser-body relative w-full h-full overflow-hidden flex items-center justify-center pointer-events-none z-10">
                    
                    {/* Glass Reflection spotlight */}
                    <div
                      className="absolute w-[200px] h-[200px] bg-white/[0.04] rounded-full blur-[40px] pointer-events-none -translate-x-1/2 -translate-y-1/2 browser-reflection"
                      style={{ left: 0, top: 0 }}
                    />

                    {/* Desktop Screenshot */}
                    <div className="screenshot-layer desktop-layer w-[72%] aspect-[16/10] rounded-lg border border-white/10 overflow-hidden shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.03] group-hover:rotate-1">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Tablet Screenshot */}
                    <div className="screenshot-layer tablet-layer absolute w-[30%] aspect-[3/4] bottom-6 left-6 rounded-lg border border-white/10 overflow-hidden shadow-2xl z-20 hidden md:block transition-transform duration-500 group-hover:scale-[1.05] group-hover:-rotate-3 group-hover:-translate-x-2">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover saturate-[0.8]" />
                    </div>

                    {/* Mobile Screenshot */}
                    <div className="screenshot-layer mobile-layer absolute w-[16%] aspect-[9/19] bottom-6 right-6 rounded-md border border-white/10 overflow-hidden shadow-2xl z-30 hidden md:block transition-transform duration-500 group-hover:scale-[1.08] group-hover:rotate-3 group-hover:translate-y-[-8px]">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover saturate-[1.2]" />
                    </div>

                  </div>
                </div>

                {/* Technical Description & Analytics Column */}
                <div className="w-full md:w-[52%] flex flex-col justify-between py-2 select-none">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 block mb-1">
                      Featured Project // {project.category}
                    </span>
                    <h3 className="font-sans text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mt-1 hover:text-[#ff8000] transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  {/* Interactive Metric Cards */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {project.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="metric-card px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex flex-col justify-center transition-all duration-500 hover:translate-y-[-4px] hover:border-white/10 hover:bg-white/[0.04]"
                      >
                        <span className="font-mono text-[18px] font-black text-white tracking-tight leading-none count-tech">
                          {mIdx === 0 ? "0+" : metric.value}
                        </span>
                        <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 mt-1">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Challenge -> Solution Panel */}
                  <div className="challenge-solution-card group/cs bg-white/[0.015] border border-white/5 rounded-2xl p-4 mt-4 relative overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-white/[0.025]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                      <div className="w-full md:w-[46%] transition-transform duration-500 group-hover/cs:-translate-x-2">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 block mb-1">Challenge</span>
                        <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                      <div className="hidden md:block w-[8%] h-[1px] bg-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#ff8000] transition-transform duration-500 scale-x-0 group-hover/cs:scale-x-100 origin-left" />
                      </div>
                      <div className="w-full md:w-[46%] transition-transform duration-500 translate-y-1.5 group-hover/cs:translate-y-0">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#ff8000] block mb-1">Solution</span>
                        <p className="text-[11px] text-white font-medium leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Diagram Nodes */}
                  <div className="architecture-diagram flex items-center justify-between bg-white/[0.015] border border-white/5 rounded-xl p-3.5 mt-4 relative overflow-hidden">
                    {project.architecture.map((node, nodeIdx) => (
                      <React.Fragment key={node}>
                        <div className="arch-node px-2.5 py-1.5 rounded-lg border border-white/10 bg-zinc-950 font-mono text-[8px] text-zinc-400 uppercase tracking-wider relative z-10 shadow-lg">
                          {node}
                        </div>
                        {nodeIdx < project.architecture.length - 1 && (
                          <div className="flex-grow h-[1px] relative bg-white/15 z-0 mx-1.5">
                            <div className="absolute top-0 left-0 h-full bg-[#ff8000] arch-line origin-left scale-x-0 w-full" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Staggered Actions & Pills */}
                  <div className="flex flex-wrap gap-3 items-center mt-5">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="group px-5 py-2.5 rounded-full bg-white text-black font-mono text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#ff8000] hover:text-white transition-all duration-300 pointer-events-auto shadow-md"
                    >
                      Open Project
                      <ArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="group px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white font-mono text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:border-white/20 transition-all duration-300 pointer-events-auto"
                      >
                        View Code
                      </a>
                    )}
                    <div className="flex gap-1.5 ml-auto">
                      {project.performance.slice(0, 2).map((perf, pIdx) => (
                        <span key={pIdx} className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.05] font-mono text-[8px] text-zinc-500 uppercase tracking-wider">
                          ✓ {perf}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Final Premium CTA Slide */}
      <div className="creed-cta-card absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20 pointer-events-none opacity-0 select-none">
        
        {/* Massive watermark background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <span className="font-sans font-black text-[28vw] text-white/[0.015] leading-none tracking-tighter select-none">
            BUILD.
          </span>
        </div>

        <div className="relative z-10 max-w-2xl flex flex-col items-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff8000] mb-6 block">
            Next Challenge
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            I'm always building,<br />
            learning, and shipping<br />
            <span className="text-[#ff8000] relative inline-block mt-2">
              better products.
              <span className="cta-underline absolute bottom-[-8px] left-0 w-full h-[3px] bg-[#ff8000] scale-x-0 origin-left" />
            </span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full justify-center">
            <a
              href="https://github.com/Ruchit-thakkar"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl border border-white/10 hover:border-[#ff8000]/40 bg-white/[0.02] text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 pointer-events-auto"
            >
              Explore GitHub
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl border border-white/10 hover:border-[#ff8000]/40 bg-white/[0.02] text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 pointer-events-auto"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-xl bg-[#ff8000] hover:bg-[#e07000] text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 pointer-events-auto shadow-[0_0_20px_rgba(255,128,0,0.2)]"
            >
              Let's Build Together
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Scene metadata */}
      <div className="absolute bottom-8 font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 pointer-events-none select-none z-10">
        // Architecture &bull; Engineering &bull; Products
      </div>
    </section>
  );
}
