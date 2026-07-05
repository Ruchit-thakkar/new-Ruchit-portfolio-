import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL", "Socket.io"]
  },
  {
    title: "Data",
    skills: ["PostgreSQL", "MongoDB", "Python", "Data Analysis", "Redis"]
  },
  {
    title: "DevOps",
    skills: ["Git & GitHub", "Docker", "AWS", "CI/CD", "Linux"]
  }
];

export default function Skills() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(() => {
    // Marquee effect
    gsap.to(scrollRef.current, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
    
    // Fade up items
    gsap.from(".skill-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  // Duplicate items for seamless marquee
  const allSkills = skillCategories.flatMap(c => c.skills);
  const marqueeItems = [...allSkills, ...allSkills, ...allSkills];

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative w-full bg-[var(--color-primary)] text-[var(--bg-foundation)] py-24 sm:py-32 overflow-hidden border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-16">
        <h2 className="text-5xl md:text-8xl font-heading uppercase tracking-tight text-[var(--bg-foundation)]">
          The Toolbox
        </h2>
      </div>

      {/* Massive Marquee */}
      <div className="relative w-full flex overflow-hidden py-10 rotate-[-2deg] scale-110 bg-[var(--text-heading)] mb-20 shadow-2xl">
        <div ref={scrollRef} className="flex whitespace-nowrap items-center min-w-max">
          {marqueeItems.map((skill, i) => (
            <div key={i} className="flex items-center">
              <span className="text-6xl md:text-9xl font-heading text-[var(--bg-foundation)] uppercase px-8">
                {skill}
              </span>
              <span className="text-[var(--color-primary)] text-6xl">&bull;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="flex flex-col skill-item">
            <h4 className="font-heading text-3xl uppercase border-b-4 border-[var(--bg-foundation)] pb-4 mb-6">
              {category.title}
            </h4>
            <ul className="flex flex-col gap-4">
              {category.skills.map((skill, i) => (
                <li key={i} className="font-sans font-bold text-lg tracking-wide uppercase">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
