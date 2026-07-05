import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id[0].toUpperCase() + entry.target.id.slice(1)));
    }, { rootMargin: "-45% 0px -45%" });
    links.forEach((name) => {
      const section = document.getElementById(name.toLowerCase());
      if (section) observer.observe(section);
    });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const go = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#home" aria-label="Ruchit home">
        <img src="/ruchit-logo.svg" alt="Ruchit" />
      </a>
      <nav className="desktop-nav">
        {links.map((name) => (
          <a key={name} className={active === name ? "active" : ""} href={`#${name.toLowerCase()}`}>{name}</a>
        ))}
      </nav>
      <a className="talk-button" href="#contact">Let&apos;s Talk <span><ArrowUpRight size={15} /></span></a>
      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
            {links.map((name) => <a key={name} href={`#${name.toLowerCase()}`} onClick={go}>{name}</a>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
