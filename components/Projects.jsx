import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "NutriGen",
    category: "Full-Stack Web App",
    description: "A full-stack nutrition and admin management platform with JWT auth and React.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2564&auto=format&fit=crop",
    demo: "https://nutrigen-khwj.onrender.com/",
    github: null
  },
  {
    id: 2,
    title: "SecureGen",
    category: "Encrypted Vault",
    description: "A secure password vault using AES-256 encryption, Google OAuth, and protected REST APIs.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2564&auto=format&fit=crop",
    demo: "https://securegen-encrypted-vault-1.netlify.app/",
    github: "https://github.com/Ruchit-thakkar/SecureGen-Encrypted-Vault.git"
  },
  {
    id: 3,
    title: "Portfolio",
    category: "Interactive 3D Experience",
    description: "A modern, cinematic portfolio built with React, GSAP, and advanced responsive animations.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    demo: "https://ruchit-portfolio007.netlify.app/",
    github: null
  },
  {
    id: 4,
    title: "BitBeats",
    category: "Music Platform",
    description: "A dynamic streaming platform designed for music discovery and seamless playback.",
    image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=2574&auto=format&fit=crop",
    demo: "https://bitbeats-music-platform.onrender.com/",
    github: "https://github.com/Ruchit-thakkar/bitbeats-music-platform.git"
  },
  {
    id: 5,
    title: "CapCraft",
    category: "Vision AI Tool",
    description: "AI-powered image caption and hashtag generator leveraging MERN, Socket.io, and Vision APIs.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    demo: "https://capcraft.onrender.com/",
    github: "https://github.com/Ruchit-thakkar/CapCraft-AI-Powered-Image-Caption-Hashtag-Generator-MERN-Socket.io-Vision-AI-.git"
  },
  {
    id: 6,
    title: "NutriAI",
    category: "AI Nutrition Assistant",
    description: "A personalized AI nutrition assistant creating tailored health data using advanced prompting.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2564&auto=format&fit=crop",
    demo: "https://nutriai-nyed.onrender.com/",
    github: "https://github.com/Ruchit-thakkar/NutriAI-Personalized-AI-Nutrition-Assistant.git"
  },
  {
    id: 7,
    title: "Visual Vault",
    category: "Discovery Engine",
    description: "A high-performance infinite scroll gallery with Framer Motion and caching.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    demo: "https://gallery-ruchit.netlify.app/",
    github: null
  },
  {
    id: 8,
    title: "CineVerse",
    category: "Movie Platform",
    description: "Immersive movie discovery powered by OMDb API with real-time search.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
    demo: "https://cineverse-ruchit.netlify.app/",
    github: null
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const bgTextRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Background massive text move
      gsap.to(bgTextRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
        },
        x: "-50vw",
        ease: "none",
      });

      // Horizontal Scroll for Projects
      const sections = gsap.utils.toArray(".project-panel");
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + horizontalScrollRef.current.offsetWidth,
        }
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Simple fade up for mobile
      const sections = gsap.utils.toArray(".project-panel");
      sections.forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="relative w-full bg-[var(--bg-surface)] text-[var(--text-heading)] overflow-hidden lg:h-[100svh]"
    >
      {/* Massive Background Text - Lando Style */}
      <h2 
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 text-[35vw] font-heading font-black text-[var(--text-body)] opacity-5 whitespace-nowrap select-none pointer-events-none z-0"
      >
        LATEST WORK &bull; LATEST WORK &bull;
      </h2>

      {/* Main title */}
      <div className="absolute top-10 lg:top-20 left-4 lg:left-12 z-20">
         <h3 className="font-heading text-6xl md:text-8xl text-[var(--color-primary)] uppercase tracking-tight">On Track</h3>
      </div>

      <div 
        ref={horizontalScrollRef} 
        className="relative z-10 w-full lg:h-full flex flex-col lg:flex-row flex-nowrap pt-32 lg:pt-0"
      >
        {projectsData.map((project, index) => (
          <div 
            key={project.id} 
            className="project-panel w-full lg:w-screen lg:h-screen flex-shrink-0 flex items-center justify-center p-4 lg:p-12"
          >
            <div className="flex flex-col lg:flex-row w-full max-w-7xl items-center gap-8 lg:gap-16">
              
              <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1">
                <p className="font-mono text-[var(--color-primary)] text-sm tracking-[0.2em] uppercase mb-4">0{index + 1} / 0{projectsData.length} - {project.category}</p>
                <h4 className="font-heading text-5xl md:text-7xl mb-6 uppercase text-[var(--text-heading)] tracking-wider">
                  {project.title}
                </h4>
                <p className="font-sans text-[var(--text-body)] text-lg mb-8 max-w-lg leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4 flex-wrap">
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer"
                    data-magnetic
                    className="group w-fit flex items-center justify-center gap-4 bg-[var(--text-heading)] text-[var(--bg-foundation)] px-6 py-3 rounded-full font-heading text-lg uppercase tracking-wider hover:bg-[var(--color-primary)] transition-colors duration-300 shadow-xl"
                  >
                    View Project
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-foundation)] flex items-center justify-center group-hover:bg-[var(--text-heading)] transition-colors duration-300 text-[var(--text-heading)] group-hover:text-[var(--bg-foundation)]">
                      <ArrowRight size={16} />
                    </div>
                  </a>
                  
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      data-magnetic
                      className="group w-fit flex items-center justify-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-heading)] px-6 py-3 rounded-full font-heading text-lg uppercase tracking-wider hover:border-[var(--text-heading)] hover:text-[var(--bg-foundation)] hover:bg-[var(--text-heading)] transition-all duration-300 shadow-md"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="relative aspect-video lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-subtle)] group">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
