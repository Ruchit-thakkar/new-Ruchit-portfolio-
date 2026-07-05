"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const timelineData = [
  { year: "2024", title: "Started Full Stack Development", desc: "Began my coding journey focusing on core web technologies. Built my initial static sites and fell in love with designing interactive user interfaces." },
  { year: "2024", title: "Learned React & State Management", desc: "Mastered React component lifecycles, hooks, virtual DOM, and client-side rendering. Started building highly dynamic Single Page Applications." },
  { year: "2025", title: "Built MERN Applications", desc: "Integrated backend Node.js & Express systems with MongoDB databases. Developed secure authentication mechanisms and RESTful APIs." },
  { year: "2025", title: "Built DirectShare", desc: "Engineered a high-speed peer-to-peer file sharing platform utilizing WebRTC connection protocols and WebSockets for real-time signaling." },
  { year: "2025", title: "Built Herald", desc: "Developed an AI-assisted messaging and project workspace hub combining FastAPI and Claude AI for automated coding diagnostics." },
  { year: "2025", title: "Built MediaDrop", desc: "Created a cloud distribution platform utilizing Firebase Storage, MongoDB, and Next.js to provide drag-and-drop media sharing." },
  { year: "2026", title: "Learning AI & Large Language Models", desc: "Deepening my knowledge of AI prompt engineering, agentic systems, and custom LLM API integrations." },
  { year: "2026", title: "Building Better Products", desc: "Creating high-performance digital experiences emphasizing 60 FPS animations, clean codebases, and premium aesthetics." }
];

const statsData = [
  { value: 15, suffix: "+", label: "Projects Done" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 12, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "K+", label: "Lines of Code" },
  { value: 3, suffix: "", label: "Hackathons" }
];

const techNodes = [
  { name: "React", x: 200, y: 150, category: "frontend" },
  { name: "Next.js", x: 380, y: 100, category: "frontend" },
  { name: "Node.js", x: 500, y: 250, category: "backend" },
  { name: "MongoDB", x: 620, y: 350, category: "database" },
  { name: "FastAPI", x: 680, y: 180, category: "backend" },
  { name: "Firebase", x: 180, y: 380, category: "database" },
  { name: "WebRTC", x: 300, y: 280, category: "core" },
  { name: "TypeScript", x: 520, y: 80, category: "frontend" },
  { name: "Python", x: 740, y: 110, category: "core" },
  { name: "Docker", x: 850, y: 230, category: "devops" },
  { name: "Railway", x: 800, y: 380, category: "devops" },
  { name: "Tailwind", x: 350, y: 400, category: "frontend" },
  { name: "AI", x: 480, y: 460, category: "ai" },
  { name: "ChatGPT", x: 650, y: 480, category: "ai" },
  { name: "Claude", x: 220, y: 490, category: "ai" },
  { name: "Gemini", x: 100, y: 250, category: "ai" },
  { name: "Cursor AI", x: 920, y: 340, category: "ai" }
];

const techConnections = [
  [0, 1], [1, 7], [1, 2], [2, 3], [2, 4], [4, 8], [8, 9], [9, 10],
  [0, 5], [5, 11], [11, 12], [12, 13], [12, 14], [0, 15], [10, 16],
  [2, 6], [6, 12]
];

const projectsData = [
  {
    title: "DIRECTSHARE",
    category: "P2P WebRTC sharing platform",
    desc: "A high-performance peer-to-peer file sharing platform using WebRTC. DirectShare allows instant file transfers directly between browsers, meaning zero cloud server storage limits, enhanced privacy, and uncapped speeds.",
    tags: ["React", "WebRTC", "Socket.io", "Node.js", "Tailwind CSS", "Docker"],
    metrics: [
      { value: "0 MB", label: "Size Limit" },
      { value: "100%", label: "P2P Secure" },
      { value: "< 1s", label: "Signaling" }
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    demo: "https://github.com/Ruchit-thakkar"
  },
  {
    title: "HERALD",
    category: "AI-Assisted developer workspace",
    desc: "An advanced developer portal and messaging platform that connects to FastAPI backends. Herald uses artificial intelligence code models to run real-time workspace diagnostics and project file scanning.",
    tags: ["Next.js", "FastAPI", "Python", "PostgreSQL", "Gemini API", "Docker"],
    metrics: [
      { value: "< 50ms", label: "API Latency" },
      { value: "99.9%", label: "Server Uptime" },
      { value: "AI", label: "Copilot Integration" }
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    demo: "https://github.com/Ruchit-thakkar"
  },
  {
    title: "MEDIADROP",
    category: "Firebase media cloud storage",
    desc: "A secure cloud storage vault designed for photographers and graphic designers. Integrates custom Firebase dropzones and secure download links, delivering optimized media assets to clients worldwide.",
    tags: ["React", "Firebase Storage", "Express", "MongoDB", "Tailwind CSS", "Railway"],
    metrics: [
      { value: "AES-256", label: "Encryption" },
      { value: "Instant", label: "Media Links" },
      { value: "CDN", label: "Cached Delivery" }
    ],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2000&auto=format&fit=crop",
    demo: "https://github.com/Ruchit-thakkar"
  }
];

const educationData = [
  { date: "2024 - 2028", title: "Information Technology", subtitle: "JG University", tags: ["Data Analytics", "Software Architecture", "M.Sc IT Integrated"] },
  { date: "2024 - 2025", title: "Full-Stack Mastery", subtitle: "Sheryians", tags: ["MERN Stack", "GSAP Animations", "Visual Design"] },
  { date: "2025", title: "Tech Fest Innovator", subtitle: "Hackathon Winner", tags: ["Rapid Prototyping", "Team Lead", "AI Workspace integrations"] }
];

const workflowData = [
  { title: "Idea", desc: "Brainstorming solutions, defining functional requirements, and outlining the visual storytelling direction." },
  { title: "Research", desc: "Analyzing tech stacks, exploring competitive solutions, and designing database models." },
  { title: "AI Assistance", desc: "Leveraging Cursor, Claude, and Gemini to generate boilerplates, refactor systems, and debug structures." },
  { title: "Architecture", desc: "Creating secure JWT auth systems, API routes, and planning WebGL animations." },
  { title: "Coding", desc: "Writing modular, scalable code conforming to strict lint standards and modern styles." },
  { title: "Testing", desc: "Running local test builds, validating API responses, and checking cross-browser performance." },
  { title: "Deployment", desc: "Deploying code containerized via Docker on cloud services like Railway or Netlify." },
  { title: "Optimization", desc: "Polishing rendering speeds to preserve 60 FPS layouts and reviewing SEO parameters." }
];

export default function About({ isLoading = false }) {
  const containerRef = useRef(null);
  const statementRef = useRef(null);
  const introRef = useRef(null);
  
  const portraitContainerRef = useRef(null);
  const portraitMagnetRef = useRef(null);
  const portraitImgRef = useRef(null);

  const timelineContainerRef = useRef(null);
  const timelineLineRef = useRef(null);

  const statsContainerRef = useRef(null);

  const horizontalSectionRef = useRef(null);
  const horizontalPanelsRef = useRef(null);
  const svgRef = useRef(null);

  const educationTimelineRef = useRef(null);
  const philosophyRef = useRef(null);


  const [hoveredNode, setHoveredNode] = useState(null);

  useGSAP(() => {
    if (isLoading) return;

    // --- Scene 1: Statement character reveal ---
    const statementSplit = new SplitText(statementRef.current, { type: "chars" });
    gsap.set(statementSplit.chars, { opacity: 0, y: 50, filter: "blur(12px)" });
    
    gsap.to(statementSplit.chars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      stagger: 0.03,
      ease: "power4.out",
      scrollTrigger: {
        trigger: statementRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // --- Scene 2: Personal Intro line reveal ---
    gsap.from(".intro-line", {
      opacity: 0,
      y: 40,
      filter: "blur(8px)",
      duration: 1.0,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: introRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    // --- Scene 3: Portrait Parallax & Background Particles ---
    gsap.to(portraitImgRef.current, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: portraitContainerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(".portrait-particle", {
      y: -50,
      x: "random(-15, 15)",
      opacity: "random(0.15, 0.55)",
      duration: "random(3.5, 5.5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.08,
    });

    // Portrait Magnetic Mouse Interactions
    const box = portraitMagnetRef.current;
    const boxContainer = portraitContainerRef.current;
    
    const onMouseMove = (e) => {
      const rect = boxContainer.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(box, {
        x: relX * 0.1,
        y: relY * 0.1,
        rotateX: -relY * 0.04,
        rotateY: relX * 0.04,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    
    const onMouseLeave = () => {
      gsap.to(box, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.35)",
      });
    };
    
    boxContainer.addEventListener("mousemove", onMouseMove);
    boxContainer.addEventListener("mouseleave", onMouseLeave);

    // --- Scene 4: Story Timeline SVG drawing ---
    const lineElement = timelineLineRef.current;
    const height = timelineContainerRef.current.offsetHeight - 260;
    lineElement.setAttribute("d", `M 16 0 L 16 ${height}`);
    
    const lineLen = lineElement.getTotalLength();
    gsap.set(lineElement, { strokeDasharray: lineLen, strokeDashoffset: lineLen });
    
    gsap.to(lineElement, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: timelineContainerRef.current,
        start: "top 65%",
        end: "bottom 75%",
        scrub: true,
      }
    });

    // Story Timeline item highlight staggers
    const timelineItems = gsap.utils.toArray(".timeline-item");
    timelineItems.forEach((item) => {
      const dot = item.querySelector(".timeline-dot");
      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 72%",
          toggleActions: "play none none reverse",
        }
      })
      .to(item, { opacity: 1, duration: 0.5 })
      .to(dot, { scale: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.3");
    });

    // --- Scene 5: Stats count-up animation ---
    const numberElements = gsap.utils.toArray(".stat-number");
    numberElements.forEach((el, idx) => {
      const data = statsData[idx];
      const obj = { val: 0 };
      gsap.to(obj, {
        val: data.value,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsContainerRef.current,
          start: "top 78%",
          once: true,
        },
        onUpdate: () => {
          el.innerText = `${Math.floor(obj.val)}${data.suffix}`;
        }
      });
    });

    // --- Scene 6: Technology Universe Slow Drift & Pulse loops ---
    gsap.to(".universe-svg-content", {
      x: 12,
      y: 8,
      rotation: 0.8,
      duration: 6.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".universe-pulse-line", {
      strokeDashoffset: -120,
      duration: 3.5,
      repeat: -1,
      ease: "none"
    });

    // --- Scene 7: Projects Horizontal Panels Scrolling ---
    const panels = horizontalPanelsRef.current;
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.to(panels, {
        x: () => -(panels.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${panels.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        }
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile vertical scrolling staggers
      const mobilePanels = gsap.utils.toArray(".project-panel");
      mobilePanels.forEach((panel) => {
        gsap.from(panel, {
          y: 60,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 78%",
          }
        });
      });
    });

    // --- Scene 8: Education Card Reveals ---
    gsap.from(".edu-card", {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 1.0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: educationTimelineRef.current,
        start: "top 75%",
      }
    });

    // --- Scene 9: AI Workflow staggers ---
    gsap.from(".workflow-node", {
      opacity: 0,
      scale: 0.92,
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".workflow-node",
        start: "top 80%",
      }
    });

    // --- Scene 10: Philosophy slow premium character reveal ---
    const philSplit = new SplitText(philosophyRef.current, { type: "chars" });
    gsap.set(philSplit.chars, { opacity: 0, filter: "blur(10px)" });
    
    gsap.to(philSplit.chars, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.6,
      stagger: 0.022,
      ease: "power2.out",
      scrollTrigger: {
        trigger: philosophyRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    // Cleanup
    return () => {
      statementSplit.revert();
      philSplit.revert();
      mm.revert();
      boxContainer.removeEventListener("mousemove", onMouseMove);
      boxContainer.removeEventListener("mouseleave", onMouseLeave);
    };

  }, { scope: containerRef, dependencies: [isLoading] });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden text-white bg-[#020303]">
      
      {/* Scene 1: Large Statement */}
      <div id="about" className="relative w-full h-screen flex flex-col justify-center items-center px-4 overflow-hidden border-t border-white/5">
        <div className="max-w-5xl text-center select-none">
          <h2 ref={statementRef} className="font-heading text-[6.5vw] md:text-[5.2vw] leading-[1.05] tracking-tight uppercase">
            <span className="block text-[#a9a9aa]">Not Just</span>
            <span className="block text-[#ff8000] drop-shadow-[0_0_15px_rgba(255,128,0,0.3)]">A Developer.</span>
            <span className="block text-[#a9a9aa] mt-4">I Build</span>
            <span className="block text-white">Digital Experiences.</span>
          </h2>
        </div>
      </div>

      {/* Scene 2: Personal Introduction */}
      <div className="relative w-full min-h-screen flex flex-col justify-center py-24 px-8 md:px-24 max-w-7xl mx-auto overflow-hidden">
        <div ref={introRef} className="flex flex-col gap-10">
          <span className="font-mono text-sm uppercase tracking-widest text-[#ff8000]">&bull; Story Chapter</span>
          
          <div className="flex flex-col gap-6 font-heading text-4xl sm:text-6xl md:text-7xl leading-tight uppercase tracking-tight">
            <p className="intro-line text-white">My name is</p>
            <p className="intro-line text-[#ff8000] font-black drop-shadow-[0_0_15px_rgba(255,128,0,0.3)]">RUCHIT THAKKAR</p>
            <p className="intro-line text-[#a9a9aa] text-xl sm:text-2xl md:text-3xl font-normal lowercase tracking-widest font-mono">// Ahmedabad, Gujarat</p>
            <p className="intro-line text-white mt-6">MERN Stack Developer</p>
            <p className="intro-line text-[#ff8000]">AI-Assisted Developer</p>
            <p className="intro-line text-[#a9a9aa]">Problem Solver</p>
            <p className="intro-line text-white">Full Stack Engineer</p>
          </div>
        </div>
      </div>

      {/* Scene 3: Interactive Portrait */}
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-8 overflow-hidden bg-black/30">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => (
            <i
              key={i}
              className="portrait-particle absolute rounded-full bg-[#ff5f13]/30 shadow-[0_0_8px_#ff5f13]"
              style={{
                left: `${10 + (i * 8.5) % 80}%`,
                top: `${8 + (i * 11) % 84}%`,
                width: `${2.5 + i % 3.5}px`,
                height: `${2.5 + i % 3.5}px`,
              }}
            />
          ))}
        </div>

        <div ref={portraitContainerRef} className="relative z-10 flex flex-col items-center">
          <div
            ref={portraitMagnetRef}
            className="portrait-box will-change-transform relative w-[290px] h-[390px] sm:w-[350px] sm:h-[470px] rounded-2xl overflow-hidden border border-[#ff8000]/40 shadow-[0_0_40px_rgba(255,128,0,0.18)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              ref={portraitImgRef}
              src="https://ik.imagekit.io/devnext/Gemini_Generated_Image_8wt16z8wt16z8wt1.png"
              alt="Ruchit Portrait"
              className="w-full h-[120%] object-cover absolute -top-[10%] left-0 scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,128,0,0.14),transparent_40%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <h3 className="absolute bottom-6 left-6 font-heading text-2xl tracking-widest text-[#ff8000] uppercase mix-blend-difference">
              Ruchit Thakkar
            </h3>
          </div>
          <span className="mt-6 font-mono text-xs uppercase tracking-widest text-[#a9a9aa]">
            // CREATIVE VISION & ENGINEERING
          </span>
        </div>
      </div>

      {/* Scene 4: Story Timeline */}
      <div ref={timelineContainerRef} className="relative w-full py-32 px-8 max-w-5xl mx-auto overflow-hidden">
        <div className="flex flex-col gap-16 relative">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-sm uppercase tracking-widest text-[#ff8000]">&bull; Chronology</span>
            <h3 className="font-heading text-4xl md:text-6xl uppercase text-white">How It Unfolded</h3>
          </div>
          
          <div className="absolute left-6 top-40 bottom-10 w-1 pointer-events-none">
            <div className="w-[2px] h-full bg-[#ff8000]/10 absolute left-1/2 -translate-x-1/2" />
            <svg className="w-8 h-full -translate-x-1/2 overflow-visible">
              <path
                ref={timelineLineRef}
                fill="none"
                stroke="#ff8000"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="drop-shadow-[0_0_6px_#ff8000]"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-24 pl-16 sm:pl-24">
            {timelineData.map((item, i) => (
              <div
                key={i}
                className="timeline-item flex flex-col gap-3 relative opacity-10"
              >
                <i className="timeline-dot absolute left-[-80px] sm:left-[-112px] top-2.5 w-3.5 h-3.5 rounded-full bg-[#ff8000] shadow-[0_0_12px_#ff8000] scale-0" />
                <span className="font-mono text-xl font-bold text-[#ff8000] tracking-widest">{item.year}</span>
                <h4 className="font-heading text-2xl sm:text-4xl text-white uppercase">{item.title}</h4>
                <p className="font-sans text-sm sm:text-base text-[#a9a9aa] max-w-xl leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scene 5: Animated Numbers */}
      <div ref={statsContainerRef} className="relative w-full py-32 px-8 bg-black/20 border-y border-[#ff8000]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 text-center">
          {statsData.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#a9a9aa]">{stat.label}</span>
              <strong className="stat-number font-heading text-5xl sm:text-6xl md:text-7xl text-[#ff8000] leading-none drop-shadow-[0_0_12px_rgba(255,128,0,0.3)]">
                0
              </strong>
            </div>
          ))}
        </div>
      </div>

      {/* Scene 6: Technology Universe */}
      <div id="skills" className="relative w-full py-32 px-8 max-w-6xl mx-auto overflow-hidden">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-sm uppercase tracking-widest text-[#ff8000]">&bull; Constellation</span>
            <h3 className="font-heading text-4xl md:text-6xl uppercase text-white">Technology Universe</h3>
          </div>

          <div className="relative w-full aspect-[5/3] min-h-[350px] sm:min-h-[500px] border border-white/5 rounded-3xl bg-black/40 overflow-hidden">
            <svg
              ref={svgRef}
              viewBox="0 0 1000 600"
              className="universe-svg-content w-full h-full"
            >
              {/* Connection lines */}
              {techConnections.map(([fromIdx, toIdx], i) => {
                const fromNode = techNodes[fromIdx];
                const toNode = techNodes[toIdx];
                const isConnectedToHover = hoveredNode === fromIdx || hoveredNode === toIdx;
                return (
                  <line
                    key={i}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isConnectedToHover ? "#ff8000" : "rgba(255, 128, 0, 0.15)"}
                    strokeWidth={isConnectedToHover ? 2.2 : 1.2}
                    className="transition-all duration-300 pointer-events-none"
                  />
                );
              })}

              {/* Pulsing connection highlights */}
              {techConnections.map(([fromIdx, toIdx], i) => {
                const fromNode = techNodes[fromIdx];
                const toNode = techNodes[toIdx];
                return (
                  <line
                    key={`pulse-${i}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#ff8000"
                    strokeWidth="1.6"
                    strokeDasharray="12, 40"
                    className="universe-pulse-line pointer-events-none"
                    style={{ opacity: 0.35 }}
                  />
                );
              })}

              {/* Node Groups */}
              {techNodes.map((node, i) => (
                <g
                  key={i}
                  className="universe-node-group cursor-pointer"
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={hoveredNode === i ? 26 : 14}
                    fill="rgba(255, 128, 0, 0.08)"
                    stroke="#ff8000"
                    strokeWidth={hoveredNode === i ? 2.5 : 1.2}
                    className="transition-all duration-300"
                    style={{
                      filter: hoveredNode === i ? "drop-shadow(0 0 10px #ff8000)" : "none",
                    }}
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={hoveredNode === i ? 6 : 4}
                    fill={hoveredNode === i ? "#ffffff" : "#ff8000"}
                    className="transition-all duration-300"
                  />
                  <text
                    x={node.x}
                    y={node.y - 20}
                    textAnchor="middle"
                    fill={hoveredNode === i ? "#ffffff" : "#a9a9aa"}
                    className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider select-none transition-all duration-300"
                    style={{
                      textShadow: hoveredNode === i ? "0 0 8px rgba(255,255,255,0.6)" : "none"
                    }}
                  >
                    {node.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Scene 7: Featured Projects */}
      <div id="projects" ref={horizontalSectionRef} className="relative w-full overflow-hidden bg-[#000]">
        <div ref={horizontalPanelsRef} className="flex flex-col lg:flex-row flex-nowrap lg:w-[300vw] h-auto lg:h-screen">
          {projectsData.map((project, idx) => (
            <div
              key={idx}
              className="project-panel w-full lg:w-screen h-auto lg:h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-24 relative border-b border-white/5 lg:border-none py-20"
            >
              {/* Giant Background Title Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-heading text-[15vw] text-white/[0.015] leading-none uppercase tracking-tighter text-center w-full hidden lg:block">
                {project.title}
              </div>
              
              <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Info Text */}
                <div className="flex flex-col gap-6 order-2 lg:order-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ff8000]">
                    Project 0{idx + 1} / 03 &bull; {project.category}
                  </span>
                  <h4 className="font-heading text-4xl sm:text-6xl md:text-7xl uppercase text-white tracking-tight leading-none">
                    {project.title}
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-[#a9a9aa] leading-relaxed max-w-lg">
                    {project.desc}
                  </p>
                  
                  {/* Metrics */}
                  <div className="flex gap-8 border-y border-white/10 py-6 my-2">
                    {project.metrics.map((metric, midx) => (
                      <div key={midx} className="flex flex-col">
                        <span className="font-heading text-2xl sm:text-3xl text-[#ff8000]">{metric.value}</span>
                        <span className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-[#a9a9aa]">{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tidx) => (
                      <span key={tidx} className="px-2.5 py-1 bg-white/5 rounded-full text-[10px] font-mono text-[#a9a9aa] border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Demo link */}
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="group w-fit flex items-center gap-4 bg-white text-black px-5 py-2.5 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-[#ff8000] hover:text-white transition-colors duration-300 mt-4"
                  >
                    View Project <ArrowRight size={15} />
                  </a>
                </div>

                {/* Cover Frame */}
                <div className="w-full order-1 lg:order-2">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,128,0,0.06)] group">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10" />
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
      </div>

      {/* Scene 8: Education */}
      <div className="relative w-full py-32 px-8 max-w-5xl mx-auto overflow-hidden">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-sm uppercase tracking-widest text-[#ff8000]">&bull; Academic</span>
            <h3 className="font-heading text-4xl md:text-6xl uppercase text-white">Education Paths</h3>
          </div>

          <div ref={educationTimelineRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-12">
            {educationData.map((edu, i) => (
              <div
                key={i}
                className="edu-card relative flex flex-col gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ff8000]/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ff8000]/10 to-transparent pointer-events-none rounded-bl-full" />
                <span className="font-mono text-xs text-[#ff8000] tracking-widest">{edu.date}</span>
                <h4 className="font-heading text-xl sm:text-2xl text-white uppercase">{edu.title}</h4>
                <h5 className="font-sans font-bold text-base italic text-[#a9a9aa]">{edu.subtitle}</h5>
                <div className="flex flex-wrap gap-2 mt-4">
                  {edu.tags.map((tag, tidx) => (
                    <span key={tidx} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-[#a9a9aa]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scene 9: AI Workflow */}
      <div className="relative w-full py-32 px-8 bg-black/40 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-3 text-center">
            <span className="font-mono text-sm uppercase tracking-widest text-[#ff8000]">&bull; Methodology</span>
            <h3 className="font-heading text-4xl md:text-6xl uppercase text-white">AI-Assisted Workflow</h3>
            <p className="font-sans text-[#a9a9aa] text-sm sm:text-base max-w-lg mx-auto">
              How I leverage generative AI tools to accelerate research, design architecture, build scalability, and deliver optimized code.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative mt-8">
            {workflowData.map((step, i) => (
              <div
                key={i}
                className="workflow-node flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:border-[#ff8000]/30"
              >
                <div className="w-12 h-12 rounded-full border border-[#ff8000] bg-black flex items-center justify-center font-heading text-lg text-[#ff8000] mb-4 shadow-[0_0_15px_rgba(255,128,0,0.18)]">
                  0{i + 1}
                </div>
                <h4 className="font-heading text-base text-white uppercase mb-2">{step.title}</h4>
                <p className="font-sans text-xs text-[#a9a9aa] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scene 10: Philosophy */}
      <div className="relative w-full h-screen flex flex-col justify-center items-center px-4 overflow-hidden bg-gradient-to-b from-transparent to-[#020303] border-b border-white/5">
        <div className="max-w-4xl text-center select-none">
          <h2 ref={philosophyRef} className="font-heading text-[4.8vw] md:text-[3.5vw] leading-[1.1] tracking-tight uppercase">
            <span className="block text-[#a9a9aa] mb-2">I Don't Just Write Code.</span>
            <span className="block text-[#ff8000] font-black drop-shadow-[0_0_20px_rgba(255,128,0,0.38)]">I Build Experiences.</span>
            <span className="block text-white mt-4 mb-2">I Solve Problems.</span>
            <span className="block text-[#a9a9aa] font-light">I Never Stop Learning.</span>
          </h2>
        </div>
      </div>

    </div>
  );
}
