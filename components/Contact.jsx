import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Continuous slow pulse on the title
    gsap.to(textRef.current, {
      scale: 1.02,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative w-full bg-[var(--bg-foundation)] text-[var(--text-heading)] py-32 md:py-48 px-4 sm:px-8 border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col items-center justify-center text-center relative z-10">
        
        <div className="inline-flex items-center gap-3 px-6 py-2 border border-[var(--border-subtle)] rounded-full mb-12 bg-[var(--bg-surface)] hover:border-[var(--color-primary)] transition-colors duration-500" data-magnetic>
          <span className="w-3 h-3 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span className="font-sans text-xs md:text-sm tracking-widest uppercase font-medium">Available for new opportunities</span>
        </div>

        <h2 
          ref={textRef}
          className="text-[12vw] md:text-[10vw] font-heading font-black uppercase leading-[0.8] tracking-tighter mb-16 mix-blend-difference"
        >
          Let&apos;s <span className="text-[var(--color-primary)]">Talk.</span>
        </h2>

        <p className="font-sans text-lg md:text-2xl text-[var(--text-body)] max-w-2xl mx-auto mb-20">
          Whether you have a project in mind or just want to say hi, I&apos;m always open to discussing new opportunities, architecture, and tech.
        </p>

        <a 
          href="mailto:ruchitthakkar12@gmail.com" 
          data-magnetic
          className="group relative flex items-center justify-center gap-6 bg-[var(--text-heading)] text-[var(--bg-foundation)] px-12 md:px-16 py-6 md:py-8 rounded-full font-heading text-2xl md:text-3xl uppercase tracking-wider hover:bg-[var(--color-primary)] transition-colors duration-500 overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(255,128,0,0.4)]"
        >
          <span className="relative z-10 pointer-events-none">Send a Message</span>
          <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--bg-foundation)] flex items-center justify-center group-hover:bg-[var(--text-heading)] transition-colors duration-500 text-[var(--text-heading)] group-hover:text-[var(--bg-foundation)] pointer-events-none">
            <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  );
}
