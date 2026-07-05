import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-foundation)] text-[var(--text-body)] border-t border-[var(--border-subtle)] py-12 px-4 sm:px-8">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center">
        <h2 className="text-[15vw] md:text-[12vw] font-heading text-[var(--text-heading)] uppercase leading-[0.8] tracking-tighter mb-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
          RUCHIT
        </h2>
        
        <div className="w-full flex justify-center gap-8 md:gap-16 mb-12">
          {["Github", "LinkedIn", "Twitter", "Instagram"].map(social => (
            <a 
              key={social} 
              href="#" 
              className="font-heading text-xl md:text-2xl uppercase tracking-widest hover:text-[var(--color-primary)] transition-colors"
            >
              {social}
            </a>
          ))}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs md:text-sm font-sans uppercase tracking-widest opacity-50 gap-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ruchit Thakkar.</p>
          <p>Always bringing the fight.</p>
        </div>
      </div>
    </footer>
  );
}
