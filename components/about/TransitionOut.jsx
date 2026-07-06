"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function TransitionOut({ isLoading = false }) {
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
        end: "+=100%",
        pin: true,
        scrub: 1,
      }
    });

    if (!prefersReducedMotion) {
      tl.to(".outro-block", {
        scale: 0.85,
        opacity: 0,
        filter: "blur(12px)",
        duration: 1
      }, 0);

      tl.from(".outro-arrow", {
        y: -15,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 0.8
      }, 0.4);
    }

  }, { scope: sectionRef, dependencies: [mounted, isLoading] });

  if (!mounted) return null;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen flex flex-col justify-center items-center bg-[#050505] overflow-hidden"
    >
      <div className="outro-block max-w-4xl text-center select-none flex flex-col gap-6 items-center z-10 px-6">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff8000]">&bull; Conclusion</span>

        <h2 className="font-sans text-[7.5vw] md:text-[5vw] lg:text-[4vw] font-black leading-tight uppercase tracking-tight text-white">
          Now... Let's explore<br />my work.
        </h2>

        <div className="outro-arrow mt-8 flex justify-center items-center w-16 h-16 rounded-full border border-[#ff8000]/60 bg-[#111111] shadow-[0_0_20px_rgba(255,128,0,0.1)] cursor-pointer hover:border-[#ff8000] transition-colors duration-300">
          <ArrowRight size={24} className="text-[#ff8000] rotate-90" />
        </div>
      </div>

      <div className="absolute bottom-10 left-10 font-mono text-[9px] text-[#555555]">
        © {new Date().getFullYear()} Ruchit Thakkar
      </div>
    </section>
  );
}
