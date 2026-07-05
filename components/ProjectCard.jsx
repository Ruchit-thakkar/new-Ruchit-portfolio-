import React from "react";
import { Github, ExternalLink } from "lucide-react";
// eslint-disable-next-line
import { motion } from "framer-motion";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative w-full rounded-3xl"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#111] border border-white/10 aspect-[4/3] md:aspect-[16/10]">
        {/* --- 1. Background Image --- */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
        </div>

        {/* --- 2. Top Bar (Category & Tech) --- */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20">
          {/* Category Badge */}
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white tracking-wide uppercase">
            {project.category || "Development"}
          </span>

          {/* Links Circle Buttons 
                FIXED HERE:
                - opacity-100: Visible by default (Mobile)
                - md:opacity-0: Hidden by default on Desktop (Medium screens+)
                - md:group-hover:opacity-100: Visible on Desktop Hover
            */}
          <div
            className="flex gap-2 transition-all duration-300 
                            opacity-100 translate-y-0 
                            md:opacity-0 md:translate-y-[-10px] md:group-hover:opacity-100 md:group-hover:translate-y-0"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white text-black hover:bg-purple-400 transition-colors shadow-lg shadow-white/10"
              title="View Code"
            >
              <Github size={18} />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:border-purple-500 hover:text-purple-400 transition-colors"
              title="Live Demo"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        {/* --- 3. Bottom Content --- */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 transform transition-transform duration-500">
          <div className="mb-2 overflow-hidden">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 translate-y-0 transition-transform duration-300">
              {project.title}
            </h3>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4 md:mb-6 max-w-md opacity-100 md:opacity-80 md:group-hover:opacity-100 transition-opacity">
            {project.description}
          </p>

          {/* Tech Stack Pills 
                Kept visible on mobile, animated on desktop
            */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-[10px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded 
                                   opacity-100 translate-y-0
                                   md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 
                                   transition-all duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 border-2 border-white/0 rounded-3xl group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
