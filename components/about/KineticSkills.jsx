"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillsData = [
  {
    id: 1,
    title: "Programming Languages",
    slug: "LANGUAGES",
    color: "#ff8000",
    skills: [
      { name: "JavaScript", rating: "Primary", desc: "Built every day. Core interactive engine." },
      { name: "TypeScript", rating: "Type Safety", desc: "Strictly typed applications at scale." },
      { name: "Python", rating: "Automation", desc: "Data pipelines, scripts, and AI processing." },
      { name: "C++", rating: "Systems", desc: "Low level data structure manipulation." },
      { name: "HTML5 & CSS3", rating: "Markup", desc: "Responsive layout and semantic structures." }
    ],
    specs: [
      { label: "Core", value: "JavaScript" },
      { label: "Types", value: "TypeScript" },
      { label: "Data", value: "Python" }
    ],
    visual: (
      <svg className="w-64 h-64 text-[#ff8000]/20 transition-transform duration-700 hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1}>
        <path d="M20 30 L10 50 L20 70 M80 30 L90 50 L80 70 M45 75 L55 25" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={50} cy={50} r={10} strokeDasharray="2,2" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Frontend Stack",
    slug: "INTERFACES",
    color: "#0066cc",
    skills: [
      { name: "React.js", rating: "Component Engine", desc: "Declarative component-driven states." },
      { name: "Next.js", rating: "Framework", desc: "Hybrid server-side rendering pipelines." },
      { name: "Tailwind CSS", rating: "Styling", desc: "Utility-first rapid layout creation." },
      { name: "GSAP", rating: "Animation", desc: "Cinematic timeline-based choreographies." }
    ],
    specs: [
      { label: "Engine", value: "React" },
      { label: "Render", value: "Next.js" },
      { label: "Styles", value: "Tailwind" }
    ],
    visual: (
      <svg className="w-64 h-64 text-[#0066cc]/20 transition-transform duration-700 hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1}>
        <rect x={10} y={15} width={80} height={70} rx={4} />
        <line x1={10} y1={35} x2={90} y2={35} />
        <rect x={20} y={45} width={25} height={30} rx={2} />
        <rect x={55} y={45} width={25} height={10} rx={2} />
        <line x1={55} y1={65} x2={80} y2={65} />
        <line x1={55} y1={72} x2={75} y2={72} />
      </svg>
    )
  },
  {
    id: 3,
    title: "Backend Architectures",
    slug: "SYSTEMS",
    color: "#27c93f",
    skills: [
      { name: "Node.js", rating: "Server Runtime", desc: "Async event-driven server processes." },
      { name: "Express.js", rating: "Routing Micro", desc: "Flexible routing pipelines and middlewares." },
      { name: "REST APIs", rating: "Transmission", desc: "Clean transmission schema endpoints." },
      { name: "FastAPI", rating: "Performance", desc: "High-speed backend processing." }
    ],
    specs: [
      { label: "Runtime", value: "Node.js" },
      { label: "Router", value: "Express" },
      { label: "Speed", value: "FastAPI" }
    ],
    visual: (
      <svg className="w-64 h-64 text-[#27c93f]/20 transition-transform duration-700 hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1}>
        <circle cx={50} cy={50} r={6} fill="currentColor" />
        <circle cx={20} cy={30} r={5} />
        <circle cx={80} cy={30} r={5} />
        <circle cx={20} cy={70} r={5} />
        <circle cx={80} cy={70} r={5} />
        <line x1={24} y1={33} x2={46} y2={47} />
        <line x1={76} y1={33} x2={54} y2={47} />
        <line x1={24} y1={67} x2={46} y2={53} />
        <line x1={76} y1={67} x2={54} y2={53} />
      </svg>
    )
  },
  {
    id: 4,
    title: "Database Storage",
    slug: "DATABASES",
    color: "#8a2be2",
    skills: [
      { name: "MongoDB", rating: "Document Store", desc: "Flexible NoSQL document validation schemas." },
      { name: "PostgreSQL", rating: "Relational SQL", desc: "Structured query optimization schemas." },
      { name: "Firebase", rating: "Realtime Sync", desc: "Instant database state synchronization." },
      { name: "Redis", rating: "Caching", desc: "Microsecond RAM caching layer." }
    ],
    specs: [
      { label: "NoSQL", value: "MongoDB" },
      { label: "SQL", value: "Postgres" },
      { label: "Sync", value: "Firebase" }
    ],
    visual: (
      <svg className="w-64 h-64 text-[#8a2be2]/20 transition-transform duration-700 hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1}>
        <ellipse cx={50} cy={30} rx={30} ry={10} />
        <path d="M20 30 V50 Q50 60 80 50 V30" />
        <path d="M20 50 V70 Q50 80 80 70 V50" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Security Protocols",
    slug: "SECURITY",
    color: "#ffcc00",
    skills: [
      { name: "JWT Authorization", rating: "Verification", desc: "Decentralized claim signature contracts." },
      { name: "OAuth 2.0 Flow", rating: "Delegation", desc: "Third-party authorization handshakes." },
      { name: "AES Encryption", rating: "Cryptography", desc: "Symmetric key encipherment structures." }
    ],
    specs: [
      { label: "Auth", value: "JWT / Token" },
      { label: "Flows", value: "OAuth 2.0" },
      { label: "Crypto", value: "AES-256" }
    ],
    visual: (
      <svg className="w-64 h-64 text-[#ffcc00]/20 transition-transform duration-700 hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1}>
        <rect x={25} y={45} width={50} height={40} rx={6} />
        <path d="M35 45 V30 A15 15 0 0 1 65 30 V45" />
        <circle cx={50} cy={60} r={4} fill="currentColor" />
        <path d="M50 64 V73" />
      </svg>
    )
  },
  {
    id: 6,
    title: "AI & Automations",
    slug: "INTEGRATIONS",
    color: "#ff3b30",
    skills: [
      { name: "Prompt Design", rating: "Contextual", desc: "Structural prompt tuning validations." },
      { name: "Gemini / OpenAI API", rating: "LLM Exec", desc: "Chained AI model completions." },
      { name: "LangChain Engine", rating: "Agents", desc: "Cognitive chain decision workflows." }
    ],
    specs: [
      { label: "LLM API", value: "Gemini / GPT" },
      { label: "Agent", value: "LangChain" },
      { label: "Focus", value: "Contextual" }
    ],
    visual: (
      <svg className="w-64 h-64 text-[#ff3b30]/20 transition-transform duration-700 hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1}>
        <circle cx={50} cy={50} r={12} strokeDasharray="3,3" />
        <circle cx={50} cy={50} r={4} fill="currentColor" />
        <path d="M50 15 V38 M50 62 V85 M15 50 H38 M62 50 H85" strokeLinecap="round" />
        <circle cx={50} cy={15} r={3} />
        <circle cx={50} cy={85} r={3} />
        <circle cx={15} cy={50} r={3} />
        <circle cx={85} cy={50} r={3} />
      </svg>
    )
  },
  {
    id: 7,
    title: "Developer Tools",
    slug: "PIPELINE",
    color: "#8e8e93",
    skills: [
      { name: "Git & GitHub", rating: "Version Control", desc: "Collaborative pipeline orchestrations." },
      { name: "Docker Container", rating: "Virtualization", desc: "Isolated environment virtualization builds." },
      { name: "Linux Bash", rating: "System Script", desc: "Automation scripts and OS configurations." },
      { name: "Vercel / Railway", rating: "Cloud Orchestrator", desc: "Serverless scaling cloud platforms." }
    ],
    specs: [
      { label: "VCS", value: "Git/GitHub" },
      { label: "Containers", value: "Docker" },
      { label: "Hosting", value: "Railway" }
    ],
    visual: (
      <svg className="w-64 h-64 text-[#8e8e93]/20 transition-transform duration-700 hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1}>
        <rect x={10} y={20} width={80} height={60} rx={4} />
        <path d="M18 35 L28 42 L18 49" strokeLinecap="round" strokeLinejoin="round" />
        <line x1={32} y1={49} x2={47} y2={49} strokeWidth={2} />
      </svg>
    )
  }
];

export default function KineticSkills({ isLoading = false }) {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted || isLoading) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".tech-line-mask", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
        gsap.set(".slide-bg-visual", { scale: 1.0, opacity: 1 });
        gsap.set(".slide-spec-row", { y: 0, opacity: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop Sequence Config (Pinned Scroll Injection)
      mm.add("(min-width: 1024px)", () => {
        const totalSlides = skillsData.length + 1; // 7 skills + 1 outro layout frame

        const pinTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${(totalSlides - 1) * 100}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Move the slider viewport track horizontally
        pinTimeline.fromTo(
          ".skills-slide-track",
          { xPercent: 0 },
          {
            xPercent: -100 * ((totalSlides - 1) / totalSlides),
            ease: "none",
            duration: totalSlides - 1,
          },
          0
        );

        // 2. Continuous two-way scrub mapping logic for all slides
        skillsData.forEach((cat, idx) => {
          const startTime = idx;

          // For slide 0, set visible state directly; clean execution window on reverse
          if (idx === 0) {
            pinTimeline.fromTo(`.slide-${idx} .tech-line-mask`,
              { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
              { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.1 },
              0
            );
            pinTimeline.fromTo(`.slide-${idx} .slide-bg-visual`, { scale: 1, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.1 }, 0);
            pinTimeline.fromTo(`.slide-${idx} .slide-spec-row`, { y: 0, opacity: 1 }, { y: 0, opacity: 1, duration: 0.1 }, 0);
            pinTimeline.to(".skills-backing-glow", { backgroundColor: `${cat.color}07`, duration: 0.5 }, 0);
            return;
          }

          // Use fromTo constraints everywhere else so backward scrolls cleanly reset state positions
          pinTimeline.fromTo(
            `.slide-${idx} .tech-line-mask`,
            { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)" },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              stagger: 0.08,
              duration: 0.5,
              ease: "power2.out",
            },
            startTime + 0.1
          );

          pinTimeline.fromTo(
            `.slide-${idx} .slide-bg-visual`,
            { scale: 1.25, opacity: 0 },
            { scale: 1.0, opacity: 1, duration: 0.5, ease: "power2.out" },
            startTime
          );

          pinTimeline.fromTo(
            `.slide-${idx} .slide-spec-row`,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            startTime + 0.2
          );

          pinTimeline.to(
            ".skills-backing-glow",
            { backgroundColor: `${cat.color}07`, duration: 0.5 },
            startTime
          );
        });

        // Outro card viewport visibility logic
        pinTimeline.fromTo(
          ".slide-outro .outro-creed",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          skillsData.length
        );
      });

      // Mobile Display Progression Config
      mm.add("(max-width: 1023px)", () => {
        skillsData.forEach((_, idx) => {
          const mobileTl = gsap.timeline({
            scrollTrigger: {
              trigger: `.slide-${idx}`,
              start: "top 75%",
              end: "top 25%",
              scrub: 1,
            }
          });

          mobileTl.fromTo(`.slide-${idx} .tech-line-mask`,
            { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)" },
            { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", stagger: 0.08 },
            0
          )
            .fromTo(`.slide-${idx} .slide-bg-visual`,
              { opacity: 0, scale: 1.25 },
              { opacity: 1, scale: 1.0 },
              0
            )
            .fromTo(`.slide-${idx} .slide-spec-row`,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0 },
              0.2
            );
        });

        gsap.fromTo(
          ".slide-outro .outro-creed",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: ".slide-outro",
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [mounted, isLoading] }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full min-h-screen lg:h-screen bg-[#050505] overflow-visible lg:overflow-hidden border-b border-white/[0.03]"
    >
      {/* Background radial spotlight glow */}
      <div className="skills-backing-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[55vh] bg-[#ff8000]/[0.015] rounded-full blur-[140px] pointer-events-none z-0 transition-colors duration-700" />

      {/* Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Slide Track Container */}
      <div className="skills-slide-track flex flex-col lg:flex-row w-full lg:w-[800vw] h-auto lg:h-full relative z-10">

        {skillsData.map((category, idx) => (
          <div
            key={category.id}
            className={`slide-${idx} w-full lg:w-screen h-screen flex-shrink-0 relative flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16`}
          >
            {/* Giant Background Category Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
              <span className="font-sans font-black text-[22vw] text-white/[0.012] tracking-tighter leading-none uppercase">
                {category.slug}
              </span>
            </div>

            <div className="max-w-[1400px] w-full mx-auto flex flex-col h-full justify-between relative z-10">

              {/* Header Info */}
              <div className="flex justify-between items-start w-full select-none pt-4">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                    Engineering Chapter
                  </span>
                  <h3 className="font-sans text-2xl lg:text-3xl font-black uppercase tracking-tight text-white leading-none mt-1">
                    {category.title}
                  </h3>
                </div>
                <div className="font-mono text-xs text-zinc-500">
                  <span className="text-white font-bold">0{category.id}</span> / 07
                </div>
              </div>

              {/* Main Content Split Area */}
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between my-auto w-full">

                {/* Left Column: Technology Story Lines */}
                <div className="w-full lg:w-[48%] flex flex-col gap-4 text-left">
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] block mb-2 select-none" style={{ color: category.color }}>
                    // Core Stack
                  </span>

                  <div className="flex flex-col gap-3">
                    {category.skills.map((skill, sIdx) => {
                      const isHovered = hoveredTech === skill.name;
                      const isAnyHovered = hoveredTech !== null;
                      return (
                        <div
                          key={sIdx}
                          onMouseEnter={() => setHoveredTech(skill.name)}
                          onMouseLeave={() => setHoveredTech(null)}
                          className={`tech-line-mask flex flex-col py-3 border-b border-white/[0.04] transition-[opacity,transform,filter] duration-500 ${isAnyHovered && !isHovered ? "blur-[2px] opacity-20 scale-[0.98]" : "opacity-100 scale-100"
                            }`}
                          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                        >
                          <div className="flex justify-between items-end">
                            <h4
                              className="font-sans text-2xl md:text-3xl font-black uppercase tracking-tight text-white transition-colors duration-300"
                              style={{ color: isHovered ? category.color : "#ffffff" }}
                            >
                              {skill.name}
                            </h4>
                            <span
                              className="font-mono text-[10px] transition-colors duration-300"
                              style={{ color: isHovered ? "#ffffff" : "#4b5563" }}
                            >
                              {skill.rating}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 leading-relaxed">
                            {skill.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Abstract illustration SVG visual */}
                <div className="hidden lg:flex w-[40%] justify-center items-center relative select-none">
                  <div className="slide-bg-visual flex items-center justify-center p-8 rounded-full border border-white/5 bg-[#111111]/10 backdrop-blur-sm aspect-square relative shadow-lg">
                    {category.visual}
                  </div>
                </div>

              </div>

              {/* Bottom specs row */}
              <div className="slide-spec-row flex flex-wrap justify-between items-center w-full border-t border-white/[0.04] pt-6 pb-4 gap-4 select-none">
                <div className="flex flex-wrap gap-8">
                  {category.specs.map((spec, specIdx) => (
                    <div key={specIdx} className="flex flex-col text-left">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500">
                        {spec.label}
                      </span>
                      <strong className="font-sans text-sm font-bold text-white mt-1">
                        {spec.value}
                      </strong>
                    </div>
                  ))}
                </div>
                <div className="font-mono text-[8px] uppercase tracking-widest text-zinc-500">
                  // {category.slug} SPECIFICATION DETAILS
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Slide 8: Final Outro Creed */}
        <div className="slide-outro w-full lg:w-screen h-screen flex-shrink-0 relative flex flex-col justify-center items-center text-center p-8 bg-[#050505] overflow-hidden">
          {/* Radial outro glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[45vh] bg-[#ff8000]/[0.012] rounded-full blur-[140px] pointer-events-none z-0" />

          <div className="outro-creed max-w-2xl relative z-10 px-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff8000] mb-4 block select-none">
              Outro
            </span>
            <h3 className="font-serif italic text-2xl md:text-4xl text-zinc-100 leading-relaxed font-light mb-8 select-none">
              "Technology evolves. Learning never stops. Every project teaches me something new."
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 select-none">
              // Continuous Exploration &bull; Engineering Craftsman
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Scene metadata */}
      <div className="absolute bottom-6 left-12 font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 pointer-events-none select-none z-10">
        // Architecture &bull; Engineering &bull; Stories
      </div>
    </section>
  );
}