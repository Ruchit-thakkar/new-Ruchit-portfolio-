"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, Phone, MapPin, Github, Linkedin, FileText } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact({ isLoading = false }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted || isLoading) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Set initial states for entrance triggers
      gsap.set(".contact-title-header", { opacity: 0, y: 30, filter: "blur(10px)" });
      gsap.set(".contact-heading-line", { yPercent: 110 });
      gsap.set(".contact-subtitle", { opacity: 0, y: 20 });
      gsap.set(".contact-glass-card", { opacity: 0, scale: 0.9, y: 40 });
      gsap.set(".contact-row-item", { opacity: 0, x: -20 });
      gsap.set(".social-card", { opacity: 0, y: 20 });
      gsap.set(".float-stat", { opacity: 0, scale: 0.8 });
      gsap.set(".contact-cta-btn", { opacity: 0, y: 20 });
      gsap.set(".contact-quote-text", { opacity: 0 });
      gsap.set(".contact-quote-underline", { scaleX: 0 });

      if (prefersReducedMotion) {
        gsap.to(".contact-title-header, .contact-subtitle, .contact-glass-card, .contact-quote-text", {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.15,
        });
        return;
      }

      // 1. Slow infinite floating loops for background watermarks & stats
      gsap.to(".float-stat", {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".contact-watermark", {
        y: -30,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Entrance ScrollTrigger Timeline
      const entranceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 90%",
          scrub: 1,
        },
      });

      entranceTimeline
        .to(".contact-title-header", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 0.1)
        .to(".contact-heading-line", { yPercent: 0, stagger: 0.15, duration: 1.0, ease: "power3.out" }, 0.3)
        .to(".contact-subtitle", { opacity: 1, y: 0, duration: 0.8 }, 0.8)
        .to(".contact-glass-card", { opacity: 1, scale: 1.0, y: 0, duration: 1.2, ease: "power3.out" }, 1.0)
        .to(".contact-row-item", { opacity: 1, x: 0, stagger: 0.12, duration: 0.8 }, 1.3)
        .to(".social-card", { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.5)" }, 1.6)
        .to(".float-stat", { opacity: 0.7, scale: 1.0, stagger: 0.15, duration: 0.8, ease: "back.out(1.5)" }, 1.8)
        .to(".contact-cta-btn", { opacity: 1, y: 0, duration: 0.8 }, 2.0)
        .to(".contact-quote-text", { opacity: 1, duration: 1.0 }, 2.2)
        .to(".contact-quote-underline", { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 2.5);

      // 3. Cinematic Scale Down ending at page bottom
      const endingTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 98%",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      endingTimeline
        .to(".contact-viewport-wrapper", { scale: 0.96, duration: 1.0, ease: "power2.inOut" }, 0)
        .to(".contact-backing-glow", { opacity: 0.4, scale: 1.2, duration: 1.0 }, 0)
        .to(".thank-you-watermark", { opacity: 1, duration: 1.0 }, 0);
    },
    { scope: containerRef, dependencies: [mounted, isLoading] }
  );

  // 3D Card Hover & Spotlight Follower
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

  const onMouseLeaveCard = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
    });
  };

  // Copy to Clipboard Feedback Toast
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setToastMsg(`${label} copied to clipboard!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-center items-center py-24 md:py-32 px-4 sm:px-8 border-t border-white/[0.03] overflow-hidden select-none"
    >
      {/* Pinned Scale-down Wrapper */}
      <div className="contact-viewport-wrapper w-full h-full flex flex-col items-center justify-center relative z-10 transition-transform duration-500">
        
        {/* Background ambient radial glow backing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[55vh] bg-gradient-to-r from-[#ff8000]/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none z-0 contact-backing-glow" />

        {/* Decorative dark grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] pointer-events-none z-0" />

        {/* Translucent Backdrop watermarks */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <span className="contact-watermark font-sans font-black text-[25vw] text-white/[0.008] leading-none select-none tracking-tighter uppercase">
            CONNECT
          </span>
        </div>

        {/* End scroll THANK YOU reveal */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-0 thank-you-watermark transition-opacity duration-700">
          <span className="font-sans font-black text-[20vw] text-[#ff8000]/[0.04] leading-none tracking-tighter uppercase">
            THANK YOU
          </span>
        </div>

        {/* Main Content Area */}
        <div className="max-w-6xl w-full flex flex-col items-center justify-center text-center relative z-10">
          
          {/* Availability Pulse Badge */}
          <div className="contact-title-header inline-flex items-center gap-2.5 px-4 py-2 border border-white/10 rounded-full mb-8 bg-white/[0.02]">
            <span className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse shadow-[0_0_8px_#27c93f]" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#27c93f] font-semibold">
              Currently Available &bull; Ahmedabad, India
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[9vw] md:text-[5vw] font-sans font-black uppercase leading-[1.05] tracking-tight mb-6 text-white max-w-4xl overflow-hidden py-1">
            <span className="contact-heading-line block">Let's Build</span>
            <span className="contact-heading-line block text-[#ff8000]">Something Amazing.</span>
          </h2>

          {/* Subtitle */}
          <p className="contact-subtitle font-sans text-sm md:text-lg text-zinc-400 max-w-xl mx-auto mb-16 leading-relaxed font-light">
            Available for freelance, full-time opportunities, collaborations, and ambitious ideas.
          </p>

          {/* Centered Dashboard Card grid */}
          <div className="w-full flex flex-col lg:flex-row gap-12 items-center justify-center relative mt-4">
            
            {/* Left Floating Stat Cards */}
            <div className="hidden lg:flex flex-col gap-10 absolute left-[-4%] top-1/2 -translate-y-1/2 z-20 w-44">
              <div className="float-stat p-5 rounded-2xl border border-white/5 bg-[#111111]/40 backdrop-blur-md text-left shadow-lg">
                <strong className="font-mono text-2xl font-black text-[#ff8000] block leading-none">3+</strong>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mt-2 block">Major Projects</span>
              </div>
              <div className="float-stat p-5 rounded-2xl border border-white/5 bg-[#111111]/40 backdrop-blur-md text-left shadow-lg">
                <strong className="font-mono text-2xl font-black text-white block leading-none">2027</strong>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mt-2 block">Graduation</span>
              </div>
            </div>

            {/* Main Interactive Glass Card */}
            <div
              ref={cardRef}
              onMouseMove={onMouseMoveCard}
              onMouseLeave={onMouseLeaveCard}
              className="contact-glass-card max-w-xl w-full rounded-[32px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-[28px] p-8 md:p-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 flex flex-col gap-8 text-left"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Spotlight */}
              <div
                className="absolute w-[200px] h-[200px] bg-[#ff8000]/[0.1] rounded-full blur-[40px] pointer-events-none -translate-x-1/2 -translate-y-1/2 spotlight z-0"
                style={{ left: 0, top: 0 }}
              />

              <div className="relative z-10 flex flex-col gap-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">// READY TO START?</span>
                
                {/* Contact Rows with Copy */}
                <div className="flex flex-col gap-5">
                  <div
                    onClick={() => copyToClipboard("ruchitthakkar12@gmail.com", "Email")}
                    className="contact-row-item group/row flex justify-between items-center py-4 border-b border-white/[0.05] cursor-pointer"
                  >
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block mb-1">Email</span>
                      <span className="font-sans text-sm md:text-base font-semibold text-zinc-300 group-hover/row:text-[#ff8000] transition-colors duration-300">
                        ruchitthakkar12@gmail.com
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 group-hover/row:border-[#ff8000] group-hover/row:text-[#ff8000] group-hover/row:bg-white/[0.01] transition-all duration-300">
                      <Mail size={12} />
                    </div>
                  </div>

                  <div
                    onClick={() => copyToClipboard("+91 9726207797", "Phone")}
                    className="contact-row-item group/row flex justify-between items-center py-4 border-b border-white/[0.05] cursor-pointer"
                  >
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block mb-1">Phone</span>
                      <span className="font-sans text-sm md:text-base font-semibold text-zinc-300 group-hover/row:text-[#ff8000] transition-colors duration-300">
                        +91 9726207797
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 group-hover/row:border-[#ff8000] group-hover/row:text-[#ff8000] group-hover/row:bg-white/[0.01] transition-all duration-300">
                      <Phone size={12} />
                    </div>
                  </div>

                  <div className="contact-row-item group/row flex justify-between items-center py-4">
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block mb-1">Location</span>
                      <span className="font-sans text-sm md:text-base font-semibold text-zinc-300">
                        Ahmedabad, Gujarat, India
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400">
                      <MapPin size={12} />
                    </div>
                  </div>
                </div>

                {/* Social Badges Grid */}
                <div className="grid grid-cols-3 gap-3.5 mt-2">
                  <a
                    href="https://github.com/Ruchit-thakkar"
                    target="_blank"
                    rel="noreferrer"
                    className="social-card p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col justify-between aspect-square group/sc shadow-md transition-all duration-500 hover:translate-y-[-5px] hover:border-white/15 hover:bg-white/[0.03]"
                  >
                    <div className="flex justify-between items-start text-zinc-500 group-hover/sc:text-[#ff8000] transition-colors">
                      <Github size={16} />
                      <ArrowRight size={10} className="-rotate-45 group-hover/sc:rotate-0 transition-transform duration-300" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] font-bold text-white block">GitHub</span>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 mt-1 block">View Code</span>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/ruchit-thakkar-9400aa282"
                    target="_blank"
                    rel="noreferrer"
                    className="social-card p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col justify-between aspect-square group/sc shadow-md transition-all duration-500 hover:translate-y-[-5px] hover:border-white/15 hover:bg-white/[0.03]"
                  >
                    <div className="flex justify-between items-start text-zinc-500 group-hover/sc:text-[#ff8000] transition-colors">
                      <Linkedin size={16} />
                      <ArrowRight size={10} className="-rotate-45 group-hover/sc:rotate-0 transition-transform duration-300" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] font-bold text-white block">LinkedIn</span>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 mt-1 block">Connect</span>
                    </div>
                  </a>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="social-card p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col justify-between aspect-square group/sc shadow-md transition-all duration-500 hover:translate-y-[-5px] hover:border-white/15 hover:bg-white/[0.03]"
                  >
                    <div className="flex justify-between items-start text-zinc-500 group-hover/sc:text-[#ff8000] transition-colors">
                      <FileText size={16} />
                      <ArrowRight size={10} className="-rotate-45 group-hover/sc:rotate-0 transition-transform duration-300" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] font-bold text-white block">Resume</span>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 mt-1 block">Download</span>
                    </div>
                  </a>
                </div>

              </div>
            </div>

            {/* Right Floating Stat Cards */}
            <div className="hidden lg:flex flex-col gap-10 absolute right-[-4%] top-1/2 -translate-y-1/2 z-20 w-44">
              <div className="float-stat p-5 rounded-2xl border border-white/5 bg-[#111111]/40 backdrop-blur-md text-left shadow-lg">
                <strong className="font-mono text-2xl font-black text-white block leading-none">MERN</strong>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mt-2 block">Core Stack</span>
              </div>
              <div className="float-stat p-5 rounded-2xl border border-white/5 bg-[#111111]/40 backdrop-blur-md text-left shadow-lg">
                <strong className="font-mono text-2xl font-black text-[#ff8000] block leading-none">AI</strong>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mt-2 block">Developer</span>
              </div>
            </div>

          </div>

          {/* Premium CTA Button */}
          <a
            href="mailto:ruchitthakkar12@gmail.com"
            className="contact-cta-btn group relative max-w-md w-full h-[76px] rounded-2xl mt-12 bg-white text-black font-sans text-base font-bold uppercase tracking-widest flex items-center justify-between px-8 border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 hover:text-white pointer-events-auto"
          >
            {/* Hover Background Fill */}
            <div className="absolute inset-0 bg-[#ff8000] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 z-0" />
            
            <span className="relative z-10 pointer-events-none tracking-[0.15em] font-black text-sm">Start a Project</span>
            <div className="relative z-10 w-9 h-9 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Creed Bottom Quote */}
          <div className="mt-20 flex flex-col items-center">
            <p className="contact-quote-text font-serif italic text-lg md:text-xl lg:text-2xl text-zinc-300 relative inline-block">
              "Every great product starts with a conversation."
              <span className="contact-quote-underline absolute bottom-[-6px] left-0 w-full h-[1.5px] bg-[#ff8000] scale-x-0 origin-left" />
            </p>
          </div>

        </div>

      </div>

      {/* Clipboard Copy Toast */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-[#ff8000] text-white font-mono text-[10px] uppercase tracking-widest shadow-2xl z-50 transition-all duration-300 pointer-events-none ${
          showToast ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        {toastMsg}
      </div>
    </section>
  );
}
