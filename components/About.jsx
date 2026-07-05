import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import SplitType from "split-type";

const aboutData = {
  title: "Off Track",
  subtitle: "Architecting logic. Building seamless experiences.",
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "20+", label: "Projects Built" },
    { value: "Full", label: "Stack" },
  ],
  bio: "I’m Ruchit Thakkar, a Full-Stack Web Developer and IMSC-IT student at JG University. I specialize in building modern web applications using technologies like React, Node.js, Express, and MongoDB, with a strong focus on clean architecture, security, and performance.",
  image: "/images/nanao_hero.png"
};

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Basic reveals
    gsap.from(".about-reveal", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });

    // Bio word-by-word reveal
    const splitBio = new SplitType(".bio-text", { types: "words" });
    
    gsap.fromTo(splitBio.words, 
      { opacity: 0.1, color: "var(--text-body)" },
      {
        opacity: 1,
        color: "var(--text-heading)",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".bio-text",
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1,
        }
      }
    );

    // Parallax text
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: "-20%",
      ease: "none"
    });

    return () => splitBio.revert();
  }, { scope: containerRef });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[var(--bg-foundation)] text-[var(--text-heading)] py-24 lg:py-40 px-4 sm:px-8 border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side - Large Image Masked */}
        <div className="w-full lg:w-1/2 about-reveal">
          <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden border border-[var(--border-subtle)] filter grayscale hover:grayscale-0 transition-all duration-700">
            <img 
              src={aboutData.image} 
              alt="About Me" 
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-foundation)]/80 to-transparent"></div>
            
            <h2 className="absolute bottom-8 left-8 text-[8vw] md:text-8xl font-heading text-[var(--color-primary)] uppercase leading-[0.8] tracking-tight mix-blend-difference">
              Off<br/>Track
            </h2>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 flex flex-col relative" ref={textRef}>
          <div className="flex items-center gap-4 mb-8 about-reveal">
            <div className="h-0.5 w-12 bg-[var(--color-primary)]"></div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-body)]">System Architecture</span>
          </div>

          <h3 className="text-4xl md:text-6xl font-heading uppercase tracking-wide text-[var(--text-heading)] mb-8 about-reveal">
            {aboutData.subtitle}
          </h3>

          {/* Word-by-word Reveal BIO */}
          <div className="bio-text font-sans text-lg md:text-2xl font-medium text-[var(--color-primary)] leading-relaxed mb-12 max-w-2xl about-reveal">
            {aboutData.bio}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 border-t border-[var(--border-subtle)] pt-12 about-reveal">
            {aboutData.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-heading text-6xl text-[var(--color-primary)] mb-2">{stat.value}</span>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-body)]">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 about-reveal mt-4">
            <a 
              href="/resumes/ruchit_full_stack.pdf" 
              target="_blank"
              data-magnetic
              className="group w-fit flex items-center justify-center gap-3 bg-[var(--text-heading)] text-[var(--bg-foundation)] px-6 py-3 rounded-full font-heading text-lg uppercase tracking-wider hover:bg-[var(--color-primary)] transition-colors duration-300"
            >
              CV / Full Stack
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="/resumes/ruchit_data_scientists.pdf" 
              target="_blank"
              data-magnetic
              className="group w-fit flex items-center justify-center gap-3 border border-[var(--border-subtle)] text-[var(--text-heading)] px-6 py-3 rounded-full font-heading text-lg uppercase tracking-wider hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300"
            >
              CV / Data Science
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
