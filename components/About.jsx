"use client";

import React, { useRef, useState, useEffect } from "react";
import WhoAmI from "./about/WhoAmI";
import Philosophy from "./about/Philosophy";
import KineticSkills from "./about/KineticSkills";
import StatsVision from "./about/StatsVision";

export default function About({ isLoading = false }) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#050505]" />;
  }

  return (
    <div 
      ref={containerRef} 
      id="about" 
      className="relative w-full bg-[#050505] text-white overflow-hidden"
    >
      <WhoAmI isLoading={isLoading} />
      <Philosophy isLoading={isLoading} />
      <KineticSkills isLoading={isLoading} />
      <StatsVision isLoading={isLoading} />
    </div>
  );
}
