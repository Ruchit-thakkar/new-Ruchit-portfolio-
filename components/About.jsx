"use client";

import React, { useRef, useState, useEffect } from "react";
import WhoAmI from "./about/WhoAmI";
import Philosophy from "./about/Philosophy";
import KineticSkills from "./about/KineticSkills";
import StatsVision from "./about/StatsVision";
import Education from "./about/Education";
export default function About({ isLoading = false }) {
  const containerRef = useRef(null);
  return (
    <div
      ref={containerRef}
      id="about"
      className="relative w-full bg-[#050505] text-white overflow-hidden"
    >
      <WhoAmI isLoading={isLoading} />
      <Philosophy isLoading={isLoading} />
      <KineticSkills isLoading={isLoading} />
      <Education isLoading={isLoading} />
      <StatsVision isLoading={isLoading} />
    </div>
  );
}
