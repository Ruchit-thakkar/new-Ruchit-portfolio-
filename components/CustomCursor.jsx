import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const follower = cursorFollowerRef.current;
    if (!dot || !follower) return;

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

    // Event delegation for hover states
    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, [data-magnetic]");
      if (target) {
        gsap.to(follower, {
          scale: 3,
          backgroundColor: "var(--color-primary)",
          mixBlendMode: "difference",
          duration: 0.3
        });
        gsap.to(dot, {
          opacity: 0,
          duration: 0.1
        });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("a, button, [data-magnetic]");
      if (target) {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          mixBlendMode: "normal",
          duration: 0.3
        });
        gsap.to(dot, {
          opacity: 1,
          duration: 0.1
        });
      }
    };

    // Event delegation for magnetic movement
    const handleMouseMoveMagnetic = (e) => {
      const target = e.target.closest("[data-magnetic]");
      if (target) {
        const rect = target.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        gsap.to(target, { x, y, duration: 0.4, ease: "power3.out" });
      }
    };

    const handleMouseOutMagnetic = (e) => {
      const target = e.target.closest("[data-magnetic]");
      if (target) {
        const relatedTarget = e.relatedTarget;
        // Only reset if cursor has actually left the magnetic boundary
        if (!relatedTarget || !target.contains(relatedTarget)) {
          gsap.to(target, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousemove", handleMouseMoveMagnetic);
    document.addEventListener("mouseout", handleMouseOutMagnetic);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousemove", handleMouseMoveMagnetic);
      document.removeEventListener("mouseout", handleMouseOutMagnetic);
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
