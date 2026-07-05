import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const progressPathRef = useRef(null);

  // 1. Monitor scroll visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 2. GSAP Logic for Visibility and Circular Progress
  useGSAP(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    // Circular Progress Logic
    gsap.to(progressPathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.2,
      },
    });
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={buttonRef}
      className="fixed bottom-8 right-8 z-[100] opacity-0 translate-y-5 scale-75"
    >
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl backdrop-blur-xl transition-colors hover:border-[var(--color-primary)]/50 active:scale-90"
        aria-label="Scroll to top"
      >
        {/* Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-white/5"
          />
          {/* Animated Path */}
          <circle
            ref={progressPathRef}
            cx="50"
            cy="50"
            r="46"
            stroke="var(--color-primary)"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray="290" // Approx 2 * PI * R
            strokeDashoffset="290"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_var(--color-primary)]"
          />
        </svg>

        <ArrowUp
          size={20}
          className="relative z-10 text-[var(--text-muted)] group-hover:text-[var(--color-primary)] group-hover:-translate-y-1 transition-all duration-300"
        />
      </button>
    </div>
  );
}
