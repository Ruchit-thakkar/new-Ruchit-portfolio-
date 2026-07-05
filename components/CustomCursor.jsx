import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const follower = cursorFollowerRef.current;

    // QuickTo for high-performance mouse tracking
    const xToFull = gsap.quickTo(follower, "x", { duration: 0.15, ease: "power3" });
    const yToFull = gsap.quickTo(follower, "y", { duration: 0.15, ease: "power3" });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });

    const moveCursor = (e) => {
      xToFull(e.clientX);
      yToFull(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Magnetic and interact elements
    const elements = document.querySelectorAll("a, button, [data-magnetic]");
    const handleEnter = () => {
      gsap.to(follower, { scale: 3, backgroundColor: "var(--color-primary)", mixBlendMode: "difference", duration: 0.3 });
      gsap.to(dot, { opacity: 0, duration: 0.1 });
    };
    const handleLeave = () => {
      gsap.to(follower, { scale: 1, backgroundColor: "transparent", mixBlendMode: "normal", duration: 0.3 });
      gsap.to(dot, { opacity: 1, duration: 0.1 });
    };

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
      
      // Magnetic effect logic
      if (el.hasAttribute("data-magnetic")) {
        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
          gsap.to(el, { x, y, duration: 0.4, ease: "power3.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        });
      }
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
        el.removeEventListener("mousemove", null); // Simplistic cleanup
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorFollowerRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-[var(--color-primary)] rounded-full pointer-events-none z-[9999]"
      />
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-[var(--color-primary)] rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
}
