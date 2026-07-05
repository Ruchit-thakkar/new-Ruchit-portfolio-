import React, { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowDownToLine,
  ArrowRight,
  Github,
  Instagram,
  Linkedin,
  Mouse,
  Twitter,
} from "lucide-react";
import FluidRevealCanvas from "./FluidRevealCanvas";

const ruchitImg = "https://ik.imagekit.io/devnext/Gemini_Generated_Image_8wt16z8wt16z8wt1.png";
const ruchitRevealedImg = "https://ik.imagekit.io/devnext/ChatGPT%20Image%20Jul%205,%202026,%2001_30_56%20PM.png";

const socialLinks = [
  { Icon: Github, href: "https://github.com/Ruchit-thakkar", label: "GitHub" },
  { Icon: Linkedin, href: "http://www.linkedin.com/in/ruchit-thakkar-38ab37379", label: "LinkedIn" },
  { Icon: Twitter, href: "https://x.com/RuchitThakkar19", label: "X" },
  { Icon: Instagram, href: "https://www.instagram.com/ruchit1744", label: "Instagram" },
];

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Projects Done" },
  { value: "5+", label: "Technologies" },
];

function ParticleField() {
  const particles = useMemo(() => Array.from({ length: 42 }, (_, index) => ({
    id: index,
    left: `${38 + ((index * 37) % 59)}%`,
    top: `${6 + ((index * 53) % 88)}%`,
    size: 1 + (index % 3),
    delay: (index % 9) * 0.18,
  })), []);

  return (
    <div className="particles-layer pointer-events-none absolute inset-0 z-[4] hidden overflow-hidden md:block">
      {particles.map((particle) => (
        <i
          key={particle.id}
          className="particle absolute rounded-full bg-[#ff5f13] shadow-[0_0_8px_#ff5f13]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size, animationDelay: `${particle.delay}s` }}
        />
      ))}
    </div>
  );
}

function SocialRail() {
  return (
    <aside className="absolute bottom-[100px] left-[3.2vw] z-20 hidden flex-col items-center gap-4 md:flex" aria-label="Social links">
      <div className="h-[300px] w-px bg-gradient-to-b from-[#ff6a13] via-[#ff6a13]/50 to-transparent" />
      {socialLinks.map(({ Icon, href, label }) => (
        <React.Fragment key={label}>
          <a className="text-[#b3b3b3] transition duration-300 hover:-translate-y-0.5 hover:text-[#ff681c]" href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <Icon size={20} strokeWidth={1.8} />
          </a>
          <span className="h-4 w-px bg-[#ff681c]/80 last:h-20" />
        </React.Fragment>
      ))}
    </aside>
  );
}

function StatsPanel() {
  return (
    <div className="mt-7 grid grid-cols-3 rounded-[20px] border border-[#ff681c]/30 bg-black/35 px-2 py-5 backdrop-blur-md sm:px-5 md:mt-9 md:max-w-[535px] md:py-7">
      {stats.map((stat, index) => (
        <div key={stat.label} className={`flex min-w-0 flex-col px-2 sm:px-5 ${index ? "border-l border-white/15" : ""}`}>
          <strong className="text-[25px] font-semibold leading-none text-[#ff681c] sm:text-[32px] md:text-[40px]">{stat.value}</strong>
          <span className="mt-3 text-[9px] leading-tight text-[#a9a9aa] sm:text-xs md:text-sm">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdvancedHero() {
  const heroRef = useRef(null);
  const portraitRef = useRef(null);
  const dividerRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .from(".hero-enter", { opacity: 0, y: 34, duration: 0.9, stagger: 0.09 })
      .from(portraitRef.current, { opacity: 0, duration: 1.35 }, "-=1")
      .from(dividerRef.current, { opacity: 0, scaleY: 0.55, duration: 1.3 }, "-=1.1")
      .from(".particle", { opacity: 0, scale: 0, duration: 1, stagger: 0.018 }, "-=.8");

    gsap.to(dividerRef.current, {
      filter: "drop-shadow(0 0 18px rgba(255,86,10,.95))",
      opacity: 0.82,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".particle", { y: -16, opacity: 0.25, duration: 2.4, repeat: -1, yoyo: true, stagger: 0.08, ease: "sine.inOut" });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} id="home" className="relative isolate min-h-[900px] overflow-hidden bg-[#020303] text-white md:min-h-[760px] md:h-[100svh]">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_38%,rgba(255,46,14,.22),transparent_38%),radial-gradient(circle_at_48%_55%,rgba(255,104,28,.08),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(0deg,#020303_18%,transparent_50%),linear-gradient(90deg,#020303_0%,#020303_34%,rgba(2,3,3,.76)_45%,transparent_68%)]" />
      <ParticleField />
      <SocialRail />

      <div ref={dividerRef} className="energy-divider pointer-events-none absolute -top-[15%] left-[35%] z-[7] hidden h-[130%] w-[25%] origin-center rounded-[50%] border-r-2 border-[#ff681c] drop-shadow-[0_0_10px_#ff4d00] md:block" />

      <div className="absolute bottom-[58px] left-5 right-5 z-10 sm:left-8 sm:right-8 md:bottom-auto md:left-[8.3vw] md:right-auto md:top-[51%] md:w-[min(535px,36vw)] md:-translate-y-1/2">
        <p className="hero-enter mb-2 text-sm font-semibold tracking-[.28em] text-[#ff681c] md:mb-3 md:text-base">HEY, I’M</p>
        <h1 className="hero-enter font-sans text-[clamp(66px,20vw,94px)] font-semibold leading-none tracking-[-.07em] text-[#f5f5f5] md:text-[clamp(76px,8vw,132px)]">Ruchit</h1>
        <div className="hero-enter my-3 flex items-center gap-3 md:my-4"><span className="h-[3px] w-[118px] bg-gradient-to-r from-[#ff681c] to-[#ff681c]/60" /><i className="h-1.5 w-1.5 rounded-full bg-[#ff681c] shadow-[0_0_8px_#ff681c]" /></div>
        <h2 className="hero-enter text-lg font-normal leading-[1.35] sm:text-xl md:text-[clamp(21px,1.7vw,29px)]">MERN Stack Developer |<br /><span className="text-[#ff681c]">AI-Assisted</span> Web Developer</h2>
        <p className="hero-enter mt-4 max-w-[475px] text-[13px] leading-[1.65] text-[#aaa] md:mt-5 md:text-base">I build modern, responsive, and high-performance web applications with clean code and great user experience.</p>

        <div className="hero-enter mt-5 flex items-center gap-4 md:mt-7">
          <a className="flex h-12 items-center gap-7 rounded-full border border-[#ff681c]/70 px-6 text-sm font-medium text-[#ff7a24] transition hover:bg-[#ff681c] hover:text-black md:h-14 md:px-9 md:text-base" href="#projects" data-magnetic>View My Work <ArrowRight size={18} /></a>
          <a className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-[#ff681c] transition hover:border-[#ff681c] md:h-14 md:w-14" href="/resumes/ruchit_full_stack.pdf" target="_blank" aria-label="Download resume"><ArrowDownToLine size={20} /></a>
        </div>
        <div className="hero-enter"><StatsPanel /></div>
      </div>

      {/* Portrait Graphics Container Box */}
      <div
        ref={portraitRef}
        className="portrait absolute right-0 top-[6%] z-[2] h-[48%] w-[94%] overflow-hidden [--reveal-x:55%] [--reveal-y:42%] sm:w-[82%] md:top-[3%] md:h-[97%] md:w-[58%]"
      >
        <FluidRevealCanvas
          ruchitImg={ruchitImg}
          ruchitRevealedImg={ruchitRevealedImg}
        />

        <div className="pointer-events-none absolute inset-0 z-[4] shadow-[inset_0_-120px_100px_#020303] md:shadow-[inset_110px_0_100px_#020303,inset_0_-90px_90px_rgba(2,3,3,.45)]" />
      </div>

      <div className="hero-enter absolute bottom-[44px] right-[4vw] z-20 hidden min-w-[330px] items-center gap-4 rounded-[20px] border border-[#ff681c]/60 bg-black/60 px-7 py-5 backdrop-blur-xl md:flex">
        <i className="h-4 w-4 rounded-full bg-[#ff681c] shadow-[0_0_16px_#ff681c]" />
        <div className="flex flex-1 flex-col gap-1"><strong className="text-sm font-medium">Available for work</strong><span className="text-xs text-[#999]">Freelance / Fulltime</span></div>
        <i className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_14px_#22c55e]" />
      </div>
    </section>
  );
}
