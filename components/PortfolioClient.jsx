"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// --- Components ---
import Navbar from "./Navbar";
import Scene3D from "./Scene3D";
import AdvancedHero from "./AdvancedHero";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function PortfolioClient() {
  const [isLoading, setIsLoading] = useState(true);

  // Sync GSAP ScrollTrigger ticker updates
  useEffect(() => {
    gsap.ticker.add(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.update();
      });
    });
  }, []);

  // Initialize ScrollSmoother and control its play/paused state based on loader status
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    if (isLoading) {
      smoother.paused(true);
    } else {
      smoother.paused(false);
    }
  }, [isLoading]);

  // Global anchor click smooth scrolling via ScrollSmoother
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest("a");
      const href = anchor?.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const smoother = ScrollSmoother.get();
          if (smoother) {
            smoother.scrollTo(target, true);
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="relative bg-[var(--bg-foundation)] text-[var(--text-body)] selection:bg-[var(--color-primary)] selection:text-black">
      <CustomCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div
        className={`transition-opacity duration-1000 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        {/* FIXED BACKGROUND IMAGE LAYER */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <img
            src="/images/ruchit-bg.png"
            alt="Background Overlay"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c10]/60 via-[#0b0c10]/90 to-[#0b0c10]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0b0c10_100%)] opacity-70" />
        </div>

        {/* GLOBAL FIXED 3D CANVAS LAYER */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 7], fov: 50 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              color="#ff9f1c"
            />
            <spotLight
              position={[-10, -10, -5]}
              intensity={1}
              color="#457b9d"
            />
            <Scene3D />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* SCROLLABLE CONTENT LAYER */}
        <div id="smooth-wrapper">
          <div id="smooth-content" className="relative z-10 flex flex-col">
            <Navbar isLoading={isLoading} />

            <main>
              <AdvancedHero isLoading={isLoading} />
              <About isLoading={isLoading} />
              <Contact />
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </div>
      </div>
    </div>
  );
}
