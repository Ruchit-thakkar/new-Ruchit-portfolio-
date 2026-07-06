"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const skillsData = [
  { category: "Frontend", items: ["React", "Next.js", "GSAP", "Three.js", "Tailwind CSS", "TypeScript", "Framer Motion"] },
  { category: "Backend & Cloud", items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Socket.io", "Firebase", "Redis"] },
  { category: "Data & Systems", items: ["PostgreSQL", "MongoDB", "Python", "Data Analysis", "Linux", "Git & GitHub", "Docker"] }
];

export default function KineticSkills({ isLoading = false }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || isLoading) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skillNodes = gsap.utils.toArray(".skill-badge");

    if (!prefersReducedMotion) {
      // Auto-drift loop
      skillNodes.forEach((node, index) => {
        gsap.to(node, {
          y: "random(-10, 10)",
          x: "random(-8, 8)",
          rotation: "random(-5, 5)",
          duration: "random(4, 7)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.08
        });
      });

      // Magnetic mouse hover interaction
      const containerEl = containerRef.current;
      const onMouseMove = (e) => {
        const rect = containerEl.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        skillNodes.forEach((node) => {
          const nRect = node.getBoundingClientRect();
          const nodeX = nRect.left - rect.left + nRect.width / 2;
          const nodeY = nRect.top - rect.top + nRect.height / 2;

          const dx = mouseX - nodeX;
          const dy = mouseY - nodeY;
          const dist = Math.hypot(dx, dy);

          if (dist < 150) {
            const force = (150 - dist) / 150;
            const moveX = -(dx / dist) * force * 35;
            const moveY = -(dy / dist) * force * 35;

            gsap.to(node, {
              x: moveX,
              y: moveY,
              scale: 1.08,
              borderColor: "rgba(255, 128, 0, 0.4)",
              color: "#ff8000",
              duration: 0.35,
              ease: "power2.out"
            });
          } else {
            gsap.to(node, {
              x: 0,
              y: 0,
              scale: 1,
              borderColor: "rgba(255, 255, 255, 0.06)",
              color: "#ffffff",
              duration: 0.6,
              ease: "power3.out"
            });
          }
        });
      };

      containerEl.addEventListener("mousemove", onMouseMove);
      return () => {
        containerEl.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, { scope: sectionRef, dependencies: [mounted, isLoading] });

  if (!mounted) return null;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen py-24 flex flex-col justify-center items-center bg-[#0000] px-6 overflow-hidden border-b border-white/[0.03]"
    >
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff8000] mb-6">&bull; Scene 04 // Capabilities</span>
      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 select-none">
        Constellation of Skills
      </h3>
      <p className="text-sm text-[#94a3b8] max-w-md text-center leading-relaxed font-light mb-16 select-none">
        Move your cursor across the grid fields to disrupt the magnetic flow of my tech stack.
      </p>

      {/* Main skills interactive board */}
      <div 
        ref={containerRef} 
        className="w-full max-w-5xl flex flex-col gap-12 p-8 md:p-12 rounded-3xl border border-white/5 bg-[#111111]/30 backdrop-blur-md overflow-hidden select-none"
      >
        {skillsData.map((categoryGroup, index) => (
          <div key={index} className="flex flex-col gap-6 relative z-10">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#ff8000]/60 border-b border-white/5 pb-2 w-fit">
              {categoryGroup.category}
            </h4>
            <div className="flex flex-wrap gap-4 md:gap-6">
              {categoryGroup.items.map((skill, idx) => (
                <div
                  key={idx}
                  className="skill-badge cursor-pointer px-5 py-3 rounded-xl border border-white/[0.06] bg-[#161618]/60 text-white font-mono text-sm md:text-base tracking-tight leading-none transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(255,128,0,0.05)]"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
