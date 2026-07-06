"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer({ isLoading = false }) {
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

      // Set initial states
      gsap.set(".footer-content-wrap", { opacity: 0, y: 50 });
      gsap.set(".footer-divider-fill", { scaleX: 0 });
      gsap.set(".footer-stat-card", { opacity: 0, scale: 0.9, y: 15 });
      gsap.set(".footer-nav-link", { opacity: 0, y: 10 });
      gsap.set(".footer-svg-sig", { opacity: 0 });
      gsap.set(".footer-bg-name", { opacity: 0.03, scale: 0.98 });

      if (prefersReducedMotion) {
        gsap.to(".footer-content-wrap, .footer-stat-card, .footer-nav-link", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          stagger: 0.1,
        });
        return;
      }

      // Parallax year scroll
      gsap.to(".footer-bg-year", {
        y: -40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Main footer reveal timeline
      const footerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      footerTimeline
        .to(".footer-content-wrap", { opacity: 1, y: 0, duration: 1.0 }, 0)
        .to(".footer-divider-fill", { scaleX: 1, duration: 1.0, ease: "power2.inOut" }, 0.2)
        .to(".footer-nav-link", { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 }, 0.4)
        .to(".footer-stat-card", { opacity: 0.6, scale: 1.0, y: 0, stagger: 0.1, duration: 0.6 }, 0.6);

      // Final scroll target: absolute page bottom
      const endScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 99%",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      endScrollTimeline
        .to(".footer-bg-name", { opacity: 0.08, scale: 1.0, duration: 1.0, ease: "power2.out" }, 0)
        .to(".footer-backing-glow", { scale: 1.25, opacity: 0.6, duration: 1.0 }, 0)
        .to(".footer-svg-sig", { opacity: 1, duration: 1.0 }, 0.3);
    },
    { scope: containerRef, dependencies: [mounted, isLoading] }
  );

  // Spotlight Follower
  const onMouseMoveFooter = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    gsap.to(el.querySelector(".spotlight"), {
      x: mouseX,
      y: mouseY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <footer
      ref={containerRef}
      onMouseMove={onMouseMoveFooter}
      className="relative w-full bg-[#050505] text-zinc-400 py-16 px-6 md:px-12 lg:px-20 border-t border-white/[0.03] overflow-hidden select-none"
    >
      {/* Background radial orange glow backing */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[30vh] bg-gradient-to-r from-[#ff8000]/[0.015] to-transparent rounded-full blur-[130px] pointer-events-none z-0 footer-backing-glow" />

      {/* Decorative dark grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Cursor spotlight */}
      <div
        className="absolute w-[240px] h-[240px] bg-[#ff8000]/[0.035] rounded-full blur-[55px] pointer-events-none -translate-x-1/2 -translate-y-1/2 spotlight mix-blend-screen z-0"
        style={{ left: 0, top: 0 }}
      />

      {/* Giant Signature Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="footer-bg-name font-sans font-black text-[22vw] text-white select-none tracking-tighter leading-none transition-all duration-500">
          RUCHIT
        </span>
      </div>

      {/* Translucent year watermark */}
      <div className="absolute right-12 bottom-12 font-sans font-black text-[12vw] text-white/[0.006] leading-none select-none tracking-tighter pointer-events-none footer-bg-year z-0">
        2026
      </div>

      {/* Main Wrapper */}
      <div className="footer-content-wrap max-w-6xl mx-auto flex flex-col items-center justify-center text-center relative z-10 transition-transform duration-500">
        
        {/* Elegant Headline and Sub */}
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#ff8000] mb-3 block">
          Final Frame
        </span>
        <h3 className="font-serif italic text-2xl md:text-3xl text-white font-light tracking-tight leading-relaxed max-w-xl">
          Ruchit Thakkar
        </h3>
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 mt-1 max-w-md">
          Full Stack Developer &bull; AI Assisted Developer &bull; UI Engineer
        </p>

        {/* Hand drawn simulated signature path */}
        <svg
          className="w-36 h-12 text-[#ff8000]/50 relative z-10 mt-4 footer-svg-sig transition-opacity duration-700 pointer-events-none select-none"
          viewBox="0 0 160 60"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M20,40 Q40,15 50,22 T70,32 T90,26 T110,36 Q130,22 140,42"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Animated Divider */}
        <div className="w-full h-[1px] bg-white/[0.04] relative my-10 overflow-hidden z-10">
          <div className="footer-divider-fill absolute inset-0 bg-[#ff8000]/50 origin-left scale-x-0 w-full h-full" />
        </div>

        {/* Footer Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl px-4 mt-2">
          <div className="footer-stat-card p-5 rounded-2xl border border-white/5 bg-[#111111]/30 backdrop-blur-md text-center shadow-lg">
            <strong className="font-mono text-xl font-black text-[#ff8000] block leading-none">03</strong>
            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 mt-2 block">Featured Projects</span>
          </div>
          <div className="footer-stat-card p-5 rounded-2xl border border-white/5 bg-[#111111]/30 backdrop-blur-md text-center shadow-lg">
            <strong className="font-mono text-xl font-black text-white block leading-none">20+</strong>
            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 mt-2 block">Technologies</span>
          </div>
          <div className="footer-stat-card p-5 rounded-2xl border border-white/5 bg-[#111111]/30 backdrop-blur-md text-center shadow-lg">
            <strong className="font-mono text-xl font-black text-white block leading-none">2027</strong>
            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 mt-2 block">Graduation</span>
          </div>
          <div className="footer-stat-card p-5 rounded-2xl border border-white/5 bg-[#111111]/30 backdrop-blur-md text-center shadow-lg">
            <strong className="font-mono text-xl font-black text-[#ff8000] block leading-none">Always</strong>
            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 mt-2 block">Learning</span>
          </div>
        </div>

        {/* Navigation & Built With Badge */}
        <div className="flex flex-col md:flex-row md:justify-between items-center w-full max-w-4xl mt-12 gap-8 border-b border-white/[0.03] pb-10">
          
          {/* Social Links */}
          <div className="flex flex-wrap gap-8 justify-center relative z-10">
            {[
              { name: "GitHub", url: "https://github.com/Ruchit-thakkar" },
              { name: "LinkedIn", url: "https://linkedin.com/in/ruchit-thakkar-9400aa282" },
              { name: "Resume", url: "/resume.pdf" },
              { name: "Email", url: "mailto:ruchitthakkar12@gmail.com" }
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="footer-nav-link group font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-[#ff8000] transition-colors duration-300 flex items-center gap-1"
              >
                <span>{link.name}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#ff8000] opacity-0 group-hover:opacity-100">↗</span>
              </a>
            ))}
          </div>

          {/* Built With */}
          <div className="px-5 py-2.5 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-md font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-3">
            <span>Built with:</span>
            <span className="text-zinc-400">Next.js &bull; React &bull; GSAP &bull; Tailwind &bull; TS</span>
          </div>
        </div>

        {/* Personal creed and pulse indicator */}
        <div className="flex flex-col items-center mt-8 gap-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            // Design with purpose. Code with precision.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse shadow-[0_0_8px_#27c93f]" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
              Active Status &bull; Available
            </span>
          </div>
        </div>

        {/* Bottom Closing Copyright Block */}
        <div className="w-full text-center border-t border-white/[0.03] pt-6 mt-10 font-mono text-[9px] text-zinc-600 uppercase tracking-widest relative z-10 flex flex-col md:flex-row md:justify-between items-center gap-4">
          <span>&copy; 2026 Ruchit Thakkar &bull; All Rights Reserved</span>
          <span>Designed & Developed from Ahmedabad, India</span>
          <span>Thanks for visiting.</span>
        </div>

      </div>
    </footer>
  );
}
