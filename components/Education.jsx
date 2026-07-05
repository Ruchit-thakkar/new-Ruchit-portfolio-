import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    id: 1,
    title: "Information Technology",
    subtitle: "JG University",
    date: "2024 - 2028",
    tags: ["Data Analytics", "Software Architecture"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Full-Stack Mastery",
    subtitle: "Sheryians",
    date: "2024 - 2025",
    tags: ["MERN Stack", "GSAP Animations"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Tech Fest Innovator",
    subtitle: "Hackathon Winner",
    date: "March 2025",
    tags: ["Rapid Prototyping", "Team Lead"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function Education() {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);
  const imagesRef = useRef([]);
  const cursorFollowerRef = useRef(null);

  useGSAP(() => {
    // 1. Initial Scroll Reveal
    gsap.from(".edu-row", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      y: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out"
    });

    // 2. Cursor Event Listeners (Mouse tracking)
    let xTo = gsap.quickTo(cursorFollowerRef.current, "x", { duration: 0.4, ease: "power3" }),
        yTo = gsap.quickTo(cursorFollowerRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      // Calculate coordinates relative to the container instead of viewport to prevent jumping on scroll
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo(x);
      yTo(y);
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef });

  const handleMouseEnter = (index) => {
    // Show cursor container
    gsap.to(cursorFollowerRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    
    // Move corresponding image into view
    gsap.to(imagesRef.current, { yPercent: -100 * index, duration: 0.5, ease: "power3.inOut" });

    // Darken other rows slightly
    gsap.to(rowsRef.current.filter((_, i) => i !== index), { opacity: 0.2, duration: 0.4 });
    gsap.to(rowsRef.current[index], { x: 20, color: "var(--color-primary)", duration: 0.4 });
  };

  const handleMouseLeave = () => {
    // Hide cursor container
    gsap.to(cursorFollowerRef.current, { scale: 0.5, opacity: 0, duration: 0.4, ease: "power3.in" });

    // Restore rows
    gsap.to(rowsRef.current, { opacity: 1, x: 0, color: "var(--text-heading)", duration: 0.4 });
  };

  return (
    <section 
      id="education" 
      ref={containerRef}
      className="relative w-full bg-[var(--bg-foundation)] text-[var(--text-heading)] py-32 px-4 sm:px-8 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col pt-10 pb-20">
        
        {/* Title */}
        <div className="flex justify-between items-end border-b-2 border-[var(--text-heading)] pb-6 mb-12">
          <h2 className="text-5xl md:text-8xl font-heading uppercase tracking-tighter">
            Milestones
          </h2>
          <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-[var(--text-muted)] text-right">
            03 // Timeline
          </span>
        </div>

        {/* The Rows */}
        <div className="flex flex-col w-full group">
          {educationData.map((item, index) => (
            <div 
              key={item.id}
              ref={el => { rowsRef.current[index] = el; }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="edu-row group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-[var(--border-subtle)] cursor-pointer"
            >
              {/* Left Side Config */}
              <div className="flex flex-col md:w-1/2">
                <span className="font-mono text-sm text-[var(--color-primary)] mb-2 uppercase tracking-widest">
                  {item.date}
                </span>
                <h3 className="text-5xl md:text-7xl font-heading uppercase tracking-wider mb-2 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Right Side Config */}
              <div className="flex flex-row md:w-1/2 items-center justify-between mt-4 md:mt-0 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col gap-1">
                  <h4 className="font-sans text-xl md:text-2xl font-black italic uppercase tracking-wider">
                    {item.subtitle}
                  </h4>
                  <div className="flex gap-2 text-xs font-mono text-[var(--text-muted)] mt-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-[var(--bg-surface)] rounded">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="hidden md:flex w-16 h-16 rounded-full border border-[var(--color-primary)] items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-[var(--bg-surface)] text-[var(--color-primary)]">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cursor Image Reveal (Absolute, pointer-events-none) */}
      <div 
        ref={cursorFollowerRef}
        className="pointer-events-none absolute top-0 left-0 w-[400px] h-[300px] rounded-xl overflow-hidden shadow-2xl z-50 opacity-0 scale-50 hidden md:block"
        style={{ transformOrigin: "center center", transform: "translate(-50%, -50%)" }}
      >
        <div className="relative w-full h-full bg-[var(--bg-surface)]">
          {educationData.map((item, index) => (
            <div 
              key={item.id}
              ref={el => imagesRef.current[index] = el}
              className="absolute top-0 left-0 w-full h-[300px]"
              style={{ top: `${index * 100}%` }}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
