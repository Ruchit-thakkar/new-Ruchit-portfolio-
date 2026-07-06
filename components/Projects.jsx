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
    challenge: "How can browsers share files securely without cloud storage?",
    solution: "WebRTC + Chunk Transfer + IndexedDB + Recovery",
    color: "#ff8000",
    metrics: [
      { label: "Transfer Speed", value: "40MB/s+" },
      { label: "Browser Based", value: "100%" },
      { label: "End-to-End", value: "Secure" },
      { label: "Direct Connection", value: "P2P" }
    ],
    features: ["React", "Next.js", "FastAPI", "WebRTC", "Docker"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop"
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
      { label: "Latency", value: "100ms" },
      { label: "Sync Rate", value: "100%" },
      { label: "Session Auth", value: "Secure" },
      { label: "Alert Status", value: "Active" }
    ],
    features: ["Firebase", "React", "ImageKit", "Cloud Messaging", "Tailwind"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "MediaDrop",
    category: "Streaming & yt-dlp API",
    url: "mediadrop.app",
    demo: "https://mediadrop-ruchit.netlify.app",
    github: "https://github.com/Ruchit-thakkar/MediaDrop.git",
    challenge: "Large media processing inside the browser.",
    solution: "Flask Backend + FFmpeg Engine + yt-dlp Downloader + Streaming",
    color: "#8a2be2",
    metrics: [
      { label: "Resolution", value: "1080p" },
      { label: "Processing", value: "8x Speed" },
      { label: "REST APIs", value: "Protected" },
      { label: "Pipeline", value: "Direct" }
    ],
    features: ["Flask", "FFmpeg", "yt-dlp", "React", "Tailwind", "Python"],
    image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=2574&auto=format&fit=crop"
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

      // Set initial state for poster cards
      gsap.set(".poster-card", {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: 320,
        height: 450,
        borderRadius: 24,
      });

      gsap.set(".projects-intro-title", { opacity: 0, y: 30, filter: "blur(10px)" });
      gsap.set(".project-stage", { opacity: 0, xPercent: 100 });
      gsap.set(".editorial-overlay", { opacity: 0, pointerEvents: "none" });

      if (prefersReducedMotion) {
        // Fallback for reduced motion
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          },
        });
        tl.to(".projects-intro-title", { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 });
        tl.to(".project-stage-0", { opacity: 1, xPercent: 0, duration: 1 }, "-=0.3");
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

      // Phase 1: Section Title Reveal (0% to 10%)
      mainTimeline.fromTo(
        ".projects-intro-title",
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        0.1
      );

      // Phase 2: Slide 1 Entrance (10% to 30%)
      mainTimeline.to(".projects-intro-title", { opacity: 0, y: -20, duration: 0.6 }, 0.8);
      mainTimeline.fromTo(
        ".project-stage-0",
        { opacity: 0, xPercent: 100 },
        { opacity: 1, xPercent: 0, duration: 1.0, ease: "power2.out" },
        1.0
      );
      mainTimeline.to(".project-spotlight", { backgroundColor: "rgba(255, 128, 0, 0.025)", duration: 0.8 }, 1.0);

      // Project 1 expands
      mainTimeline.to(
        ".poster-card-0",
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          duration: 1.2,
          ease: "power2.inOut",
        },
        1.2
      );
      mainTimeline.to(".poster-card-0 .poster-image", { scale: 1.05, duration: 1.2, ease: "power2.inOut" }, 1.2);
      mainTimeline.to(".poster-card-0 .poster-details", { opacity: 0, duration: 0.4 }, 1.2);
      mainTimeline.to(".editorial-overlay-0", { opacity: 1, pointerEvents: "auto", duration: 0.6 }, 1.8);

      // Phase 3: Transition to Project 2 (30% to 55%)
      mainTimeline.to(".editorial-overlay-0", { opacity: 0, pointerEvents: "none", duration: 0.6 }, 2.6);
      mainTimeline.to(
        ".poster-card-0",
        {
          width: 320,
          height: 450,
          borderRadius: 24,
          duration: 1.0,
          ease: "power2.inOut",
        },
        2.8
      );
      mainTimeline.to(".poster-card-0 .poster-image", { scale: 1.2, duration: 1.0, ease: "power2.inOut" }, 2.8);
      mainTimeline.to(".poster-card-0 .poster-details", { opacity: 1, duration: 0.4 }, 3.4);
      mainTimeline.to(".project-stage-0", { xPercent: -100, opacity: 0, duration: 1.0, ease: "power2.inOut" }, 2.8);

      // Project 2 Slides In
      mainTimeline.fromTo(
        ".project-stage-1",
        { opacity: 0, xPercent: 100 },
        { opacity: 1, xPercent: 0, duration: 1.0, ease: "power2.out" },
        3.2
      );
      mainTimeline.to(".project-spotlight", { backgroundColor: "rgba(0, 102, 204, 0.025)", duration: 0.8 }, 3.2);

      // Project 2 expands
      mainTimeline.to(
        ".poster-card-1",
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          duration: 1.2,
          ease: "power2.inOut",
        },
        3.6
      );
      mainTimeline.to(".poster-card-1 .poster-image", { scale: 1.05, duration: 1.2, ease: "power2.inOut" }, 3.6);
      mainTimeline.to(".poster-card-1 .poster-details", { opacity: 0, duration: 0.4 }, 3.6);
      mainTimeline.to(".editorial-overlay-1", { opacity: 1, pointerEvents: "auto", duration: 0.6 }, 4.2);

      // Phase 4: Transition to Project 3 (55% to 80%)
      mainTimeline.to(".editorial-overlay-1", { opacity: 0, pointerEvents: "none", duration: 0.6 }, 5.0);
      mainTimeline.to(
        ".poster-card-1",
        {
          width: 320,
          height: 450,
          borderRadius: 24,
          duration: 1.0,
          ease: "power2.inOut",
        },
        5.2
      );
      mainTimeline.to(".poster-card-1 .poster-image", { scale: 1.2, duration: 1.0, ease: "power2.inOut" }, 5.2);
      mainTimeline.to(".poster-card-1 .poster-details", { opacity: 1, duration: 0.4 }, 5.8);
      mainTimeline.to(".project-stage-1", { xPercent: -100, opacity: 0, duration: 1.0, ease: "power2.inOut" }, 5.2);

      // Project 3 Slides In
      mainTimeline.fromTo(
        ".project-stage-2",
        { opacity: 0, xPercent: 100 },
        { opacity: 1, xPercent: 0, duration: 1.0, ease: "power2.out" },
        5.6
      );
      mainTimeline.to(".project-spotlight", { backgroundColor: "rgba(138, 43, 226, 0.025)", duration: 0.8 }, 5.6);

      // Project 3 expands
      mainTimeline.to(
        ".poster-card-2",
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          duration: 1.2,
          ease: "power2.inOut",
        },
        6.0
      );
      mainTimeline.to(".poster-card-2 .poster-image", { scale: 1.05, duration: 1.2, ease: "power2.inOut" }, 6.0);
      mainTimeline.to(".poster-card-2 .poster-details", { opacity: 0, duration: 0.4 }, 6.0);
      mainTimeline.to(".editorial-overlay-2", { opacity: 1, pointerEvents: "auto", duration: 0.6 }, 6.6);

      // Phase 5: Transition to Ending Finale (80% to 100%)
      mainTimeline.to(".editorial-overlay-2", { opacity: 0, pointerEvents: "none", duration: 0.6 }, 7.4);
      mainTimeline.to(
        ".poster-card-2",
        {
          width: 320,
          height: 450,
          borderRadius: 24,
          duration: 1.0,
          ease: "power2.inOut",
        },
        7.6
      );
      mainTimeline.to(".poster-card-2 .poster-image", { scale: 1.2, duration: 1.0, ease: "power2.inOut" }, 7.6);
      mainTimeline.to(".poster-card-2 .poster-details", { opacity: 1, duration: 0.4 }, 8.2);
      mainTimeline.to(".project-stage-2", { xPercent: -100, opacity: 0, duration: 1.0, ease: "power2.inOut" }, 7.6);

      // Finale Slides In
      mainTimeline.fromTo(
        ".project-stage-finale",
        { opacity: 0, xPercent: 100 },
        { opacity: 1, xPercent: 0, duration: 1.0, ease: "power2.out" },
        8.0
      );
      mainTimeline.to(".project-spotlight", { backgroundColor: "rgba(255, 128, 0, 0.015)", duration: 0.8 }, 8.0);

      // Finale expands
      mainTimeline.to(
        ".poster-card-finale",
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          duration: 1.2,
          ease: "power2.inOut",
        },
        8.4
      );
      mainTimeline.to(".poster-card-finale .poster-image", { scale: 1.05, duration: 1.2, ease: "power2.inOut" }, 8.4);
      mainTimeline.to(".poster-card-finale .poster-details", { opacity: 0, duration: 0.4 }, 8.4);
      mainTimeline.to(".editorial-overlay-finale", { opacity: 1, pointerEvents: "auto", duration: 0.6 }, 9.0);
    },
    { scope: containerRef, dependencies: [mounted, isLoading] }
  );

  // 3D Tilt on centered poster cards (before they expand)
  const onMouseMovePoster = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    if (el.offsetWidth > 400) return; // Prevent tilt on full-screen cover

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    gsap.to(el, {
      rotateX: -relY * 0.018,
      rotateY: relX * 0.018,
      scale: 1.025,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onMouseLeavePoster = (e) => {
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
      ref={containerRef}
      id="projects"
      className="relative w-full h-screen bg-[#050505] flex flex-col justify-center items-center overflow-hidden border-b border-white/[0.03]"
    >
      {/* Background radial spotlight glow backing */}
      <div className="project-spotlight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-[#ff8000]/[0.02] rounded-full blur-[140px] pointer-events-none z-0 transition-colors duration-700" />

      {/* Decorative dark grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Projects introductory title */}
      <div className="projects-intro-title absolute text-center z-10 pointer-events-none select-none">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff8000] mb-2 block">
          Featured Work
        </span>
        <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
          Exhibition
        </h2>
      </div>

      {/* Project Stages Container */}
      <div className="relative w-full h-full flex justify-center items-center">
        
        {projectsData.map((project, idx) => (
          <div
            key={project.id}
            className={`project-stage project-stage-${idx} absolute inset-0 w-full h-full flex flex-col justify-center items-center pointer-events-none`}
          >
            
            {/* Center Poster Card */}
            <div
              onMouseMove={onMouseMovePoster}
              onMouseLeave={onMouseLeavePoster}
              className={`poster-card poster-card-${idx} rounded-[24px] border border-white/10 bg-zinc-950 overflow-hidden relative shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-10 flex-shrink-0 cursor-none pointer-events-auto`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover poster-image select-none pointer-events-none scale-125"
              />
              <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none text-left poster-details transition-opacity duration-300">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#ff8000]">
                  Exhibition Poster
                </span>
                <h4 className="font-sans text-2xl font-black uppercase tracking-tight text-white mt-1 leading-none">
                  {project.title}
                </h4>
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mt-1.5">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Editorial Overlays (problem/solution/outcome/specs/buttons) */}
            <div
              className={`editorial-overlay editorial-overlay-${idx} absolute inset-0 w-full h-full z-20 flex flex-col justify-between p-8 md:p-12 lg:p-16 pointer-events-none`}
            >
              {/* Top row */}
              <div className="flex justify-between items-start w-full">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Selected Work
                  </span>
                  <h3 className="font-sans text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mt-1 leading-none">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#ff8000] block mt-1.5">
                    // {project.category}
                  </span>
                </div>
                <div className="font-mono text-xs text-zinc-500">
                  <span className="text-white font-bold">0{project.id}</span> / 03
                </div>
              </div>

              {/* Middle row: Problem vs Solution */}
              <div className="flex flex-col md:flex-row gap-8 lg:gap-16 w-full justify-between items-start my-auto">
                
                {/* Left: Problem */}
                <div className="w-full md:w-[48%] text-left">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 block mb-2">
                    The Challenge
                  </span>
                  <h4 className="font-serif italic text-lg md:text-xl lg:text-2xl font-light text-zinc-300 leading-relaxed max-w-xl">
                    {project.challenge}
                  </h4>
                </div>

                {/* Right: Solution Vertical Stream */}
                <div className="w-full md:w-[45%] text-left flex flex-col gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#ff8000] block mb-1">
                    The Solution
                  </span>
                  <div className="flex flex-wrap md:flex-col gap-2.5">
                    {project.solution.split(" + ").map((solNode, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3 solution-step">
                        <span className="font-mono text-[9px] text-[#ff8000]">0{sIdx + 1}</span>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-white font-semibold">
                          {solNode}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom row: Outcomes & Tech specs */}
              <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8">
                
                {/* Left: Outcomes */}
                <div className="flex flex-wrap gap-8 text-left">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="outcome-item flex flex-col justify-center">
                      <strong className="font-sans text-xl md:text-3xl font-black text-white leading-none">
                        {metric.value}
                      </strong>
                      <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 mt-1.5">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right: Built With Specs & Buttons */}
                <div className="flex flex-col gap-4 text-right items-end w-full md:w-auto">
                  <div className="flex flex-wrap gap-2 justify-end">
                    {project.features.map((feat) => (
                      <span
                        key={feat}
                        className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-zinc-950 font-mono text-[8px] text-zinc-400 uppercase tracking-widest shadow-md"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-2">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2 rounded-full bg-white text-black hover:bg-[#ff8000] hover:text-white font-mono text-[9px] uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 pointer-events-auto shadow-lg"
                    >
                      Open Live Site
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white hover:border-white/20 font-mono text-[9px] uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 pointer-events-auto"
                      >
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Finale Stage (More coming soon) */}
        <div className="project-stage project-stage-finale absolute inset-0 w-full h-full flex flex-col justify-center items-center pointer-events-none">
          
          {/* Centered Poster Card Finale */}
          <div
            onMouseMove={onMouseMovePoster}
            onMouseLeave={onMouseLeavePoster}
            className="poster-card poster-card-finale rounded-[24px] border border-white/10 bg-zinc-950 overflow-hidden relative shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-10 flex-shrink-0 cursor-none pointer-events-auto"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              alt="Exhibition Finale"
              className="w-full h-full object-cover poster-image select-none pointer-events-none scale-125"
            />
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none text-left poster-details transition-opacity duration-300">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#ff8000]">
                Exhibition Ending
              </span>
              <h4 className="font-sans text-2xl font-black uppercase tracking-tight text-white mt-1 leading-none">
                More coming soon
              </h4>
            </div>
          </div>

          {/* Finale Overlay */}
          <div className="editorial-overlay editorial-overlay-finale absolute inset-0 w-full h-full z-20 flex flex-col justify-between p-8 md:p-12 lg:p-16 pointer-events-none">
            <div className="flex justify-between items-start w-full">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                  Exhibition Finale
                </span>
                <h3 className="font-sans text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#ff8000] mt-1 leading-none">
                  More Coming Soon.
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-6 text-center my-auto max-w-xl mx-auto">
              <h4 className="font-sans text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Currently building next-gen digital experiences.
              </h4>
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                {["AI Products", "Automation Tools", "Developer Tools", "WebGPU"].map((focus) => (
                  <span
                    key={focus}
                    className="px-5 py-2.5 rounded-xl border border-white/10 bg-zinc-950 font-mono text-[10px] text-zinc-300 uppercase tracking-widest shadow-md"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full text-center font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
              // AI &bull; WebGPU &bull; Creative Technology
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Scene metadata */}
      <div className="absolute bottom-8 font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 pointer-events-none select-none z-10">
        // Architecture &bull; Engineering &bull; Exhibition
      </div>
    </section>
  );
}
