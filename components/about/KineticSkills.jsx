"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================================================
   ABSTRACT BLUEPRINT SVG COMPONENTS (MONOCHROME WITH ORANGE ACCENTS)
   ========================================================================== */

// Workbench 01: Programming Languages -> Blueprint papers with technical grid & markings
const BlueprintLanguages = () => (
  <svg className="w-full h-full text-zinc-500/40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1}>
    {/* Outline frame & Technical grid overlay */}
    <rect x={15} y={15} width={170} height={170} rx={1} stroke="currentColor" strokeOpacity={0.15} strokeDasharray="3,3" />
    <line x1={15} y1={100} x2={185} y2={100} stroke="currentColor" strokeOpacity={0.1} strokeDasharray="2,2" />
    <line x1={100} y1={15} x2={100} y2={185} stroke="currentColor" strokeOpacity={0.1} strokeDasharray="2,2" />
    
    {/* Overlapping sheets */}
    <rect x={35} y={35} width={110} height={115} rx={2} stroke="currentColor" strokeOpacity={0.3} />
    <rect x={50} y={45} width={115} height={115} rx={2} stroke="#ff8000" strokeOpacity={0.65} strokeWidth={1.2} />
    
    {/* Blueprint drafting markers & measurements */}
    <line x1={25} y1={35} x2={25} y2={150} stroke="currentColor" strokeOpacity={0.4} />
    <path d="M23 39 L25 35 L27 39 M23 146 L25 150 L27 146" stroke="currentColor" strokeOpacity={0.5} />
    <text x={16} y={98} fill="currentColor" fillOpacity={0.4} fontSize={6} fontFamily="monospace" transform="rotate(-90 16 98)">H: 115.0mm</text>
    
    <line x1={50} y1={170} x2={165} y2={170} stroke="currentColor" strokeOpacity={0.4} />
    <path d="M54 168 L50 170 L54 172 M161 168 L165 170 L161 172" stroke="currentColor" strokeOpacity={0.5} />
    <text x={108} y={178} fill="currentColor" fillOpacity={0.4} fontSize={6} fontFamily="monospace" textAnchor="middle">W: 115.0mm</text>

    {/* Logic flowchart layout */}
    <rect x={65} y={60} width={45} height={16} rx={1} stroke="currentColor" strokeOpacity={0.5} fill="#050505" />
    <text x={87.5} y={70} fill="currentColor" fontSize={5.5} fontFamily="monospace" textAnchor="middle">entry()</text>
    <path d="M87.5 76 L87.5 94" stroke="#ff8000" />
    <path d="M85 90 L87.5 94 L90 90" fill="#ff8000" stroke="none" />
    
    <polygon points="87.5,94 112.5,104 87.5,114 62.5,104" stroke="currentColor" strokeOpacity={0.5} fill="#050505" />
    <text x={87.5} y={106} fill="currentColor" fontSize={4.5} fontFamily="monospace" textAnchor="middle">IF_VALID</text>
    
    <path d="M112.5 104 L132.5 104 L132.5 125" stroke="currentColor" strokeOpacity={0.4} />
    <path d="M130 121 L132.5 125 L135 121" fill="currentColor" fillOpacity={0.4} stroke="none" />
    <rect x={110} y={125} width={45} height={16} rx={1} stroke="currentColor" strokeOpacity={0.5} fill="#050505" />
    <text x={132.5} y={135} fill="currentColor" fontSize={5.5} fontFamily="monospace" textAnchor="middle">compile()</text>
    
    {/* CAD Coordinates */}
    <text x={145} y={30} fill="#ff8000" fillOpacity={0.8} fontSize={5} fontFamily="monospace">RAD_ALIGN: 0.12</text>
  </svg>
);

// Workbench 02: Frontend Stack -> Responsive wireframes & flex layouts
const BlueprintFrontend = () => (
  <svg className="w-full h-full text-zinc-500/40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1}>
    {/* Outer technical boundaries */}
    <rect x={15} y={15} width={170} height={170} rx={1} stroke="currentColor" strokeOpacity={0.15} strokeDasharray="3,3" />
    
    {/* Browser outline frame */}
    <rect x={25} y={35} width={130} height={100} rx={3} stroke="currentColor" strokeOpacity={0.6} />
    {/* Browser UI header */}
    <line x1={25} y1={50} x2={155} y2={50} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={33} cy={42} r={2} fill="currentColor" fillOpacity={0.3} />
    <circle cx={41} cy={42} r={2} fill="currentColor" fillOpacity={0.3} />
    <circle cx={49} cy={42} r={2} fill="currentColor" fillOpacity={0.3} />
    <rect x={60} y={39} width={75} height={7} rx={1.5} stroke="currentColor" strokeOpacity={0.3} />
    <text x={64} y={44} fill="currentColor" fillOpacity={0.4} fontSize={4} fontFamily="monospace">localhost:3000</text>
    
    {/* Columns guides */}
    <line x1={60} y1={50} x2={60} y2={135} strokeDasharray="1.5,1.5" />
    <line x1={120} y1={50} x2={120} y2={135} strokeDasharray="1.5,1.5" />
    
    {/* Navigation side panel */}
    <rect x={30} y={58} width={22} height={8} stroke="currentColor" strokeOpacity={0.3} />
    <line x1={30} y1={74} x2={52} y2={74} strokeDasharray="1,1" />
    <line x1={30} y1={80} x2={48} y2={80} strokeDasharray="1,1" />
    <line x1={30} y1={86} x2={52} y2={86} strokeDasharray="1,1" />
    
    {/* Main container layout (highlighted) */}
    <rect x={67} y={58} width={46} height={42} rx={2} stroke="#ff8000" strokeOpacity={0.8} />
    <path d="M67 58 L113 100 M113 58 L67 100" stroke="#ff8000" strokeOpacity={0.15} />
    <text x={90} y={82} fill="#ff8000" fillOpacity={0.6} fontSize={5} fontFamily="monospace" textAnchor="middle">IMG_HOLDER</text>
    
    {/* Secondary content cards */}
    <rect x={67} y={107} width={20} height={20} rx={1} stroke="currentColor" strokeOpacity={0.4} />
    <rect x={93} y={107} width={20} height={20} rx={1} stroke="currentColor" strokeOpacity={0.4} />
    
    {/* Mobile device outline (overlays browser wireframe) */}
    <rect x={140} y={75} width={35} height={70} rx={4} stroke="currentColor" strokeOpacity={0.7} fill="#050505" />
    <line x1={140} y1={83} x2={175} y2={83} stroke="currentColor" strokeOpacity={0.4} />
    <circle cx={157.5} cy={140} r={1.5} stroke="currentColor" strokeOpacity={0.4} />
    <rect x={145} y={88} width={25} height={45} rx={1} stroke="#ff8000" strokeOpacity={0.4} />
    
    {/* Technical specifications overlay */}
    <text x={25} y={150} fill="currentColor" fillOpacity={0.5} fontSize={5.5} fontFamily="monospace">GRID_SYSTEM: FLEXBOX_V2</text>
    <text x={25} y={158} fill="currentColor" fillOpacity={0.5} fontSize={5.5} fontFamily="monospace">REFLOW_VAL: 1024px_BREAK</text>
  </svg>
);

// Workbench 03: Backend Architectures -> 3D server cabinet & request routing
const BlueprintBackend = () => (
  <svg className="w-full h-full text-zinc-500/40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1}>
    <rect x={15} y={15} width={170} height={170} rx={1} stroke="currentColor" strokeOpacity={0.15} strokeDasharray="3,3" />
    
    {/* Isometric server cabinet frame */}
    <path d="M55 35 L125 35 L142 52 L72 52 Z" stroke="currentColor" strokeOpacity={0.5} />
    <path d="M55 35 L55 140 L72 158 L72 52 Z" stroke="currentColor" strokeOpacity={0.5} />
    <path d="M125 35 L125 140 L142 158 L142 52 Z" stroke="currentColor" strokeOpacity={0.5} />
    <path d="M72 158 L142 158" stroke="currentColor" strokeOpacity={0.5} />
    
    {/* Unit Rack 01 */}
    <path d="M72 65 L142 65" stroke="currentColor" strokeOpacity={0.4} />
    <rect x={79} y={58} width={56} height={6} rx={0.5} stroke="#ff8000" strokeOpacity={0.7} />
    <circle cx={84} cy={61} r={0.7} fill="#ff8000" />
    <circle cx={88} cy={61} r={0.7} fill="#ff8000" />
    <line x1={96} y1={61} x2={130} y2={61} strokeDasharray="1,1" strokeOpacity={0.6} />

    {/* Unit Rack 02 */}
    <path d="M72 90 L142 90" stroke="currentColor" strokeOpacity={0.4} />
    <rect x={79} y={83} width={56} height={6} rx={0.5} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={84} cy={86} r={0.7} fill="currentColor" fillOpacity={0.5} />
    <line x1={92} y1={86} x2={126} y2={86} strokeDasharray="1,1" strokeOpacity={0.4} />
    <circle cx={131} cy={86} r={0.7} fill="#ff8000" />

    {/* Unit Rack 03 */}
    <path d="M72 115 L142 115" stroke="currentColor" strokeOpacity={0.4} />
    <rect x={79} y={108} width={56} height={6} rx={0.5} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={84} cy={111} r={0.7} fill="currentColor" fillOpacity={0.5} />
    <line x1={92} y1={111} x2={131} y2={111} strokeDasharray="1,1" strokeOpacity={0.4} />

    {/* Vent lines */}
    <line x1={77} y1={130} x2={137} y2={130} strokeDasharray="2,2" />
    <line x1={77} y1={135} x2={137} y2={135} strokeDasharray="2,2" />
    
    {/* Connection wiring */}
    <path d="M125 61 L160 61 L160 100 L142 111" stroke="#ff8000" strokeOpacity={0.5} />
    <circle cx={160} cy={100} r={1.5} fill="#ff8000" />
    
    {/* Port markers */}
    <text x={165} y={64} fill="#ff8000" fillOpacity={0.8} fontSize={5.5} fontFamily="monospace">PORT: 443</text>
    <text x={165} y={88} fill="currentColor" fillOpacity={0.4} fontSize={5.5} fontFamily="monospace">BALANCER</text>
    <text x={165} y={114} fill="currentColor" fillOpacity={0.4} fontSize={5.5} fontFamily="monospace">NODE_RUN</text>
  </svg>
);

// Workbench 04: Database Storage -> Cylinder databases & data block sectors
const BlueprintDatabase = () => (
  <svg className="w-full h-full text-zinc-500/40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1}>
    <rect x={15} y={15} width={170} height={170} rx={1} stroke="currentColor" strokeOpacity={0.15} strokeDasharray="3,3" />
    
    {/* Cylinder top ellipse */}
    <ellipse cx={100} cy={45} rx={42} ry={11} stroke="currentColor" strokeOpacity={0.7} />
    
    {/* Cylinder body boundaries */}
    <line x1={58} y1={45} x2={58} y2={145} stroke="currentColor" strokeOpacity={0.7} />
    <line x1={142} y1={45} x2={142} y2={145} stroke="currentColor" strokeOpacity={0.7} />
    
    {/* Cylinder subdivisions (layers) */}
    <path d="M58 78 A 42 11 0 0 0 142 78" stroke="currentColor" strokeOpacity={0.4} strokeDasharray="2,2" />
    <path d="M58 111 A 42 11 0 0 0 142 111" stroke="#ff8000" strokeOpacity={0.75} strokeWidth={1.2} />
    <path d="M58 145 A 42 11 0 0 0 142 145" stroke="currentColor" strokeOpacity={0.7} />
    
    {/* Internal shaft line */}
    <line x1={100} y1={56} x2={100} y2={145} strokeDasharray="2,2" strokeOpacity={0.25} />

    {/* Reading arm schematic */}
    <path d="M142 111 L170 111 L160 90" stroke="#ff8000" />
    <circle cx={160} cy={90} r={2} fill="#ff8000" stroke="none" />
    <text x={166} y={88} fill="#ff8000" fillOpacity={0.8} fontSize={5.5} fontFamily="monospace">R/W_HEAD</text>
    
    {/* Data queries flow lines */}
    <path d="M30 65 L58 78" stroke="currentColor" strokeOpacity={0.4} />
    <circle cx={30} cy={65} r={1.5} fill="currentColor" fillOpacity={0.5} />
    <text x={12} y={62} fill="currentColor" fillOpacity={0.4} fontSize={5} fontFamily="monospace">SQL_GET</text>

    <path d="M22 120 L58 111" stroke="#ff8000" strokeOpacity={0.5} />
    <circle cx={22} cy={120} r={1.5} fill="#ff8000" stroke="none" />
    <text x={2} y={127} fill="#ff8000" fillOpacity={0.8} fontSize={5} fontFamily="monospace">PK_INDEX</text>
    
    {/* Sector annotations */}
    <text x={100} y={164} fill="currentColor" fillOpacity={0.4} fontSize={5.5} fontFamily="monospace" textAnchor="middle">SHARD_ID: AF_098 // ENGINE: INNODB</text>
  </svg>
);

// Workbench 05: Security Protocols -> Vault combination mechanism & gears
const BlueprintSecurity = () => (
  <svg className="w-full h-full text-zinc-500/40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1}>
    <rect x={15} y={15} width={170} height={170} rx={1} stroke="currentColor" strokeOpacity={0.15} strokeDasharray="3,3" />
    
    {/* Outer mechanical dial rings */}
    <circle cx={100} cy={100} r={65} stroke="currentColor" strokeOpacity={0.3} strokeDasharray="3,3" />
    <circle cx={100} cy={100} r={52} stroke="currentColor" strokeOpacity={0.5} />
    
    {/* Angle ticks on combinations dial */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = 100 + Math.cos(angle) * 52;
      const y1 = 100 + Math.sin(angle) * 52;
      const x2 = 100 + Math.cos(angle) * 46;
      const y2 = 100 + Math.sin(angle) * 46;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity={0.4} />;
    })}

    {/* Center dial structure */}
    <circle cx={100} cy={100} r={32} stroke="#ff8000" strokeWidth={1.3} />
    <circle cx={100} cy={100} r={7} fill="#ff8000" stroke="none" />
    
    {/* Mechanical locking notches */}
    <path d="M100 68 L100 82 M100 118 L100 132 M68 100 L82 100 M118 100 L132 100" stroke="#ff8000" strokeWidth={1.3} />
    
    {/* Deadbolt latch locking blocks */}
    <path d="M100 28 L100 42" stroke="currentColor" strokeOpacity={0.4} />
    <rect x={95} y={14} width={10} height={14} stroke="currentColor" strokeOpacity={0.4} fill="#050505" />
    <path d="M100 158 L100 172" stroke="currentColor" strokeOpacity={0.4} />
    <rect x={95} y={172} width={10} height={14} stroke="currentColor" strokeOpacity={0.4} fill="#050505" />

    {/* Cryptography status overlay */}
    <text x={140} y={35} fill="currentColor" fillOpacity={0.5} fontSize={5} fontFamily="monospace" textAnchor="middle">KEY_LEN: 256B</text>
    <text x={140} y={43} fill="#ff8000" fillOpacity={0.8} fontSize={5} fontFamily="monospace" textAnchor="middle">STATE: SECURED</text>
    <text x={60} y={160} fill="currentColor" fillOpacity={0.3} fontSize={5} fontFamily="monospace">HMAC_VERIFY: PASS</text>
  </svg>
);

// Workbench 06: AI & Automations -> Neural node sculptures
const BlueprintAI = () => (
  <svg className="w-full h-full text-zinc-500/40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1}>
    <rect x={15} y={15} width={170} height={170} rx={1} stroke="currentColor" strokeOpacity={0.15} strokeDasharray="3,3" />
    
    {/* Geometry ring guides */}
    <circle cx={100} cy={100} r={60} stroke="currentColor" strokeOpacity={0.08} />
    <circle cx={100} cy={100} r={35} stroke="currentColor" strokeOpacity={0.08} />
    
    {/* Neural Layer Nodes */}
    {/* Input Nodes */}
    <circle cx={45} cy={60} r={2.5} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={45} cy={100} r={2.5} stroke="#ff8000" fill="#ff8000" fillOpacity={0.2} />
    <circle cx={45} cy={140} r={2.5} stroke="currentColor" strokeOpacity={0.5} />

    {/* Hidden Layer Nodes */}
    <circle cx={85} cy={50} r={2.5} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={85} cy={83} r={2.5} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={85} cy={116} r={2.5} stroke="#ff8000" strokeWidth={1.2} />
    <circle cx={85} cy={150} r={2.5} stroke="currentColor" strokeOpacity={0.5} />

    {/* Hidden Layer 2 Nodes */}
    <circle cx={120} cy={50} r={2.5} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={120} cy={83} r={2.5} stroke="#ff8000" fill="#ff8000" stroke="none" />
    <circle cx={120} cy={116} r={2.5} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={120} cy={150} r={2.5} stroke="currentColor" strokeOpacity={0.5} />

    {/* Output Nodes */}
    <circle cx={155} cy={80} r={2.5} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={155} cy={120} r={2.5} stroke="#ff8000" fill="#ff8000" fillOpacity={0.2} />

    {/* Synaptic Connections (Weight links) */}
    <line x1={47.5} y1={60} x2={82.5} y2={50} strokeOpacity={0.15} />
    <line x1={47.5} y1={60} x2={82.5} y2={83} strokeOpacity={0.15} />
    <line x1={47.5} y1={100} x2={82.5} y2={50} strokeOpacity={0.15} />
    <line x1={47.5} y1={100} x2={82.5} y2={83} strokeOpacity={0.15} />
    <line x1={47.5} y1={100} x2={82.5} y2={116} stroke="#ff8000" strokeOpacity={0.35} />
    <line x1={47.5} y1={100} x2={82.5} y2={150} strokeOpacity={0.15} />
    <line x1={47.5} y1={140} x2={82.5} y2={116} strokeOpacity={0.15} />
    <line x1={47.5} y1={140} x2={82.5} y2={150} strokeOpacity={0.15} />

    <line x1={87.5} y1={50} x2={117.5} y2={50} strokeOpacity={0.15} />
    <line x1={87.5} y1={83} x2={117.5} y2={83} stroke="#ff8000" strokeOpacity={0.3} />
    <line x1={87.5} y1={116} x2={117.5} y2={83} stroke="#ff8000" strokeOpacity={0.5} strokeWidth={1.3} />
    <line x1={87.5} y1={116} x2={117.5} y2={116} strokeOpacity={0.15} />
    <line x1={87.5} y1={150} x2={117.5} y2={150} strokeOpacity={0.15} />

    <line x1={122.5} y1={50} x2={152.5} y2={80} strokeOpacity={0.15} />
    <line x1={122.5} y1={83} x2={152.5} y2={80} stroke="#ff8000" strokeOpacity={0.5} />
    <line x1={122.5} y1={83} x2={152.5} y2={120} stroke="#ff8000" strokeOpacity={0.3} />
    <line x1={122.5} y1={116} x2={152.5} y2={120} strokeOpacity={0.15} />
    <line x1={122.5} y1={150} x2={152.5} y2={120} strokeOpacity={0.15} />

    {/* Technical formulas & data labels */}
    <text x={85} y={35} fill="currentColor" fillOpacity={0.4} fontSize={5} fontFamily="monospace">sigmoid(W*x + b)</text>
    <text x={150} y={68} fill="#ff8000" fillOpacity={0.8} fontSize={5.5} fontFamily="monospace">Y_EST</text>
    <text x={20} y={163} fill="currentColor" fillOpacity={0.3} fontSize={5} fontFamily="monospace">BACKPROPAGATION AUTOMATIONS</text>
  </svg>
);

// Workbench 07: Developer Tools -> Terminal command lines & Git branching tree
const BlueprintTools = () => (
  <svg className="w-full h-full text-zinc-500/40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1}>
    <rect x={15} y={15} width={170} height={170} rx={1} stroke="currentColor" strokeOpacity={0.15} strokeDasharray="3,3" />
    
    {/* Monospace terminal window frame */}
    <rect x={22} y={35} width={76} height={115} rx={2} stroke="currentColor" strokeOpacity={0.5} />
    <line x1={22} y1={47} x2={98} y2={47} stroke="currentColor" strokeOpacity={0.4} />
    <circle cx={28} cy={41} r={1.5} fill="currentColor" fillOpacity={0.3} />
    <circle cx={34} cy={41} r={1.5} fill="currentColor" fillOpacity={0.3} />
    <circle cx={40} cy={41} r={1.5} fill="currentColor" fillOpacity={0.3} />
    
    {/* Terminal Command logs */}
    <text x={28} y={58} fill="currentColor" fontSize={5} fontFamily="monospace">$ git init</text>
    <text x={28} y={67} fill="currentColor" fillOpacity={0.4} fontSize={4.5} fontFamily="monospace">Initialized empty...</text>
    <text x={28} y={77} fill="currentColor" fontSize={5} fontFamily="monospace">$ git commit -m</text>
    <text x={28} y={86} fill="#ff8000" fillOpacity={0.8} fontSize={4.5} fontFamily="monospace">"feat: workshop"</text>
    <text x={28} y={98} fill="currentColor" fontSize={5} fontFamily="monospace">$ docker build .</text>
    <text x={28} y={108} fill="currentColor" fillOpacity={0.4} fontSize={4.5} fontFamily="monospace">Sending environment...</text>
    <text x={28} y={118} fill="currentColor" fontSize={5} fontFamily="monospace">$ vercel --prod</text>
    <text x={28} y={128} fill="#ff8000" fillOpacity={0.8} fontSize={4.5} fontFamily="monospace">✓ Done in 3.9s</text>
    
    {/* Git Tree Diagram (Right panel) */}
    <line x1={125} y1={45} x2={125} y2={145} stroke="currentColor" strokeOpacity={0.5} />
    <circle cx={125} cy={55} r={2} fill="currentColor" fillOpacity={0.6} />
    <circle cx={125} cy={90} r={2} fill="currentColor" fillOpacity={0.6} />
    <circle cx={125} cy={125} r={2} fill="currentColor" fillOpacity={0.6} />
    
    {/* Feature Branch routing */}
    <path d="M125 55 Q150 72.5 150 92.5 Q150 112.5 125 125" stroke="#ff8000" strokeWidth={1} strokeOpacity={0.7} />
    <circle cx={150} cy={82} r={2} fill="#ff8000" stroke="none" />
    <circle cx={150} cy={105} r={2} fill="#ff8000" stroke="none" />
    
    {/* Branch markers */}
    <text x={117} y={57} fill="currentColor" fillOpacity={0.4} fontSize={4.5} fontFamily="monospace" textAnchor="end">main</text>
    <text x={158} y={95} fill="#ff8000" fillOpacity={0.7} fontSize={4.5} fontFamily="monospace">dev/workshop</text>
    <text x={117} y={127} fill="currentColor" fillOpacity={0.4} fontSize={4.5} fontFamily="monospace" textAnchor="end">merge</text>
    
    <text x={100} y={164} fill="currentColor" fillOpacity={0.4} fontSize={5.5} fontFamily="monospace" textAnchor="middle">CLI_ORCHESTRATION: PIPELINE_STRICT</text>
  </svg>
);

// Final Slide 08: Core Values -> Geometric compass star
const BlueprintValues = () => (
  <svg className="w-full h-full text-zinc-500/40" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1}>
    <rect x={15} y={15} width={170} height={170} rx={1} stroke="currentColor" strokeOpacity={0.15} strokeDasharray="3,3" />
    
    {/* Geometry rings */}
    <circle cx={100} cy={100} r={62} stroke="currentColor" strokeOpacity={0.25} />
    <circle cx={100} cy={100} r={44} stroke="currentColor" strokeOpacity={0.4} strokeDasharray="3,3" />
    
    {/* Structural cross lines */}
    <line x1={38} y1={38} x2={162} y2={162} stroke="currentColor" strokeOpacity={0.15} />
    <line x1={162} y1={38} x2={38} y2={162} stroke="currentColor" strokeOpacity={0.15} />
    <line x1={100} y1={25} x2={100} y2={175} stroke="currentColor" strokeOpacity={0.15} />
    <line x1={25} y1={100} x2={175} y2={100} stroke="currentColor" strokeOpacity={0.15} />

    {/* Dual star alignment frames */}
    <rect x={68} y={68} width={64} height={64} stroke="#ff8000" strokeOpacity={0.65} strokeWidth={1.2} />
    <rect x={68} y={68} width={64} height={64} transform="rotate(45 100 100)" stroke="currentColor" strokeOpacity={0.35} />

    {/* Center node */}
    <circle cx={100} cy={100} r={9} stroke="#ff8000" strokeWidth={1.3} fill="#050505" />
    <circle cx={100} cy={100} r={2.5} fill="#ff8000" stroke="none" />
    
    {/* Outer coordinate points */}
    <circle cx={100} cy={44} r={3} fill="currentColor" stroke="none" />
    <circle cx={100} cy={156} r={3} fill="currentColor" stroke="none" />
    <circle cx={44} cy={100} r={3} fill="currentColor" stroke="none" />
    <circle cx={156} cy={100} r={3} fill="currentColor" stroke="none" />

    {/* Monospace direction labels */}
    <text x={100} y={22} fill="currentColor" fillOpacity={0.5} fontSize={5.5} fontFamily="monospace" textAnchor="middle">CURIOSITY</text>
    <text x={100} y={185} fill="currentColor" fillOpacity={0.5} fontSize={5.5} fontFamily="monospace" textAnchor="middle">CRAFTSMANSHIP</text>
    <text x={172} y={102} fill="currentColor" fillOpacity={0.5} fontSize={5.5} fontFamily="monospace">CONSISTENCY</text>
    <text x={28} y={102} fill="currentColor" fillOpacity={0.5} fontSize={5.5} fontFamily="monospace" textAnchor="end">SOLVING</text>
  </svg>
);


/* ==========================================================================
   AMBIENT FLOATING DUST PARTICLES (LIGHTWEIGHT CANVAS INTEGRATION)
   ========================================================================== */
function DustParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial particle seeds
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.3,
        dx: (Math.random() - 0.5) * 0.12,
        dy: -(Math.random() * 0.18 + 0.08),
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 128, 0, ${p.opacity})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "#ff8000";
        ctx.fill();

        // Vector shifts
        p.x += p.dx;
        p.y += p.dy;

        // Boundaries looping
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }
      });
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />;
}


/* ==========================================================================
   WORKBENCH INTEGRATION DATA CONFIGURATION
   ========================================================================== */
const skillsData = [
  {
    id: 1,
    title: "Programming Languages",
    slug: "LANGUAGES",
    color: "#ff8000",
    tagline: "Foundation of everything I build.",
    hudSpecs: ["SYS_VER: v4.21", "CLOCK: 3.8GHz", "LOAD: nominal"],
    skills: [
      { name: "JavaScript", rating: "Primary Engine", desc: "Built every day. Core interactive engine.", note: "Primary language used in most web projects. Asynchronous execution & event loops." },
      { name: "TypeScript", rating: "Type Safety", desc: "Strictly typed applications at scale.", note: "Enforces strict type contracts in large systems, preventing runtime exceptions." },
      { name: "Python", rating: "Automation", desc: "Data pipelines, scripts, and AI processing.", note: "Powering data analytics pipeline structures, automated scripting, and AI completions." },
      { name: "C++", rating: "Low Level", desc: "Low level data structure manipulation.", note: "Solid foundation in custom memory management, compiler behaviors, and fast computing." },
      { name: "HTML5 & CSS3", rating: "Structural", desc: "Responsive layout and semantic structures.", note: "Responsive flex layout design tokens, custom layout properties, and semantic structures." }
    ],
    visual: <BlueprintLanguages />
  },
  {
    id: 2,
    title: "Frontend Stack",
    slug: "INTERFACES",
    color: "#ff8000",
    tagline: "Crafting interfaces that feel alive.",
    hudSpecs: ["ENGINE: VIRTUAL_DOM", "CSS_TOKENS: TIGHT", "FPS: 60"],
    skills: [
      { name: "React.js", rating: "Component Engine", desc: "Declarative component-driven states.", note: "Virtual DOM diffing logic, stateful component orchestrations, and context hooks." },
      { name: "Next.js", rating: "Framework", desc: "Hybrid server-side rendering pipelines.", note: "Server-side rendering, static site generation, API routing, and SEO optimization." },
      { name: "Tailwind CSS", rating: "Styling", desc: "Utility-first rapid layout creation.", note: "Highly responsive layouts using predefined design token configurations." },
      { name: "GSAP", rating: "Animation", desc: "Cinematic timeline-based choreographies.", note: "Complex scroll-driven timeline choreographies, pins, and custom spring eases." }
    ],
    visual: <BlueprintFrontend />
  },
  {
    id: 3,
    title: "Backend Architectures",
    slug: "SYSTEMS",
    color: "#ff8000",
    tagline: "Scalable, efficient, and robust servers.",
    hudSpecs: ["PROTOCOL: HTTPS/WSS", "ROUTING: DYNAMIC", "CONN: active"],
    skills: [
      { name: "Node.js", rating: "Server Runtime", desc: "Async event-driven server processes.", note: "High concurrency non-blocking I/O event loops for scaling request rates." },
      { name: "Express.js", rating: "Routing Micro", desc: "Flexible routing pipelines and middlewares.", note: "Streamlined middleware integration and fast API routing pipelines." },
      { name: "REST APIs", rating: "Transmission", desc: "Clean transmission schema endpoints.", note: "Clean routing contracts, JSON serialization, HTTP method constraints." },
      { name: "FastAPI", rating: "Performance", desc: "High-speed backend processing.", note: "Asynchronous Python backend processing, automatic OpenAPI/Swagger parsing." }
    ],
    visual: <BlueprintBackend />
  },
  {
    id: 4,
    title: "Database Storage",
    slug: "DATABASES",
    color: "#ff8000",
    tagline: "Designing secure, performant, and reliable data.",
    hudSpecs: ["SHARDS: 2", "BACKUP: AUTOMATED", "INDEX: PK_BTREE"],
    skills: [
      { name: "MongoDB", rating: "Document Store", desc: "Flexible NoSQL document validation schemas.", note: "Dynamic schema design, aggregation pipeline queries, indexing strategies." },
      { name: "PostgreSQL", rating: "Relational SQL", desc: "Structured query optimization schemas.", note: "Relational table schemas, joint table optimization, ACID transactions." },
      { name: "Firebase", rating: "Realtime Sync", desc: "Instant database state synchronization.", note: "Realtime WebSockets sync listeners, offline data support, instant sync." },
      { name: "Redis", rating: "Caching", desc: "Microsecond RAM caching layer.", note: "Fast in-memory key-value storage caching, session token store management." }
    ],
    visual: <BlueprintDatabase />
  },
  {
    id: 5,
    title: "Security Protocols",
    slug: "SECURITY",
    color: "#ff8000",
    hudSpecs: ["CRYPT: AES-256", "HASH: BCRYPT", "TOKENS: JWT"],
    tagline: "Securing user data and verifying identity.",
    skills: [
      { name: "JWT Authorization", rating: "Verification", desc: "Decentralized claim signature contracts.", note: "Sessionless security tokens, cryptographically signed headers and payloads." },
      { name: "OAuth 2.0 Flow", rating: "Delegation", desc: "Third-party authorization handshakes.", note: "Secure auth delegations between third-party systems (Google, GitHub, etc.)." },
      { name: "AES Encryption", rating: "Cryptography", desc: "Symmetric key encipherment structures.", note: "Secure encipherment models for protecting sensitive user data at rest." }
    ],
    visual: <BlueprintSecurity />
  },
  {
    id: 6,
    title: "AI & Automations",
    slug: "INTEGRATIONS",
    color: "#ff8000",
    hudSpecs: ["LLM: GEMINI/GPT4", "AGENTS: ACTIVE", "EMBEDDING: cosine"],
    tagline: "Integrating intelligent reasoning and agents.",
    skills: [
      { name: "Prompt Design", rating: "Contextual", desc: "Structural prompt tuning validations.", note: "Context windows tuning, few-shot engineering, structural JSON output instructions." },
      { name: "Gemini / OpenAI API", rating: "LLM Exec", desc: "Chained AI model completions.", note: "Connecting next-gen multimodal reasoning models into client-facing workflows." },
      { name: "LangChain Engine", rating: "Agents", desc: "Cognitive chain decision workflows.", note: "Self-correcting agent chains, memory logs vectors search, and tool calling bindings." }
    ],
    visual: <BlueprintAI />
  },
  {
    id: 7,
    title: "Developer Tools",
    slug: "PIPELINE",
    color: "#ff8000",
    hudSpecs: ["VCS: GIT", "RUNTIME: DOCKER", "DEPLOY: RAILWAY"],
    tagline: "Optimizing the development loop and pipelines.",
    skills: [
      { name: "Git & GitHub", rating: "Version Control", desc: "Collaborative pipeline orchestrations.", note: "Branching protocols, pull requests reviews, and version history trees." },
      { name: "Docker Container", rating: "Virtualization", desc: "Isolated environment virtualization builds.", note: "Packaging applications into consistent container images to align dev and prod." },
      { name: "Linux Bash", rating: "System Script", desc: "Automation scripts and OS configurations.", note: "Shell task automations, file system operations, and server administration scripts." },
      { name: "Vercel / Railway", rating: "Cloud Orchestrator", desc: "Serverless scaling cloud platforms.", note: "Continuous deployments integrations with automated builds and preview branches." }
    ],
    visual: <BlueprintTools />
  }
];

// Combine standard categories and the values workbench
const allBenchesData = [
  ...skillsData,
  {
    id: 8,
    title: "Core Engineering Values",
    slug: "SOUL // CODE",
    color: "#ff8000",
    tagline: "The mindset behind the tools.",
    hudSpecs: ["HEURISTICS: PASS", "INTEGRITY: 1.0", "ALIGNMENT: GOOD"],
    skills: [
      { name: "Craftsmanship", rating: "Details", desc: "Writing clean, readable, and highly maintainable code. Pride in the details.", note: "Code is read 10x more than it is written. I prioritize structure and readability." },
      { name: "Curiosity", rating: "Growth", desc: "Constantly exploring new tools, patterns, and paradigms. Always a student.", note: "Staying ahead of trends by experimenting with beta frameworks and sandboxes." },
      { name: "Consistency", rating: "Compounding", desc: "Showing up every single day to iterate, build, and ship. Compounding gains.", note: "Big systems are constructed through small, persistent, daily refinements." },
      { name: "Problem Solving", rating: "Impact", desc: "Understanding the business goals first, then engineering the solution.", note: "Software exists to solve real problems, not just print lines of code." }
    ],
    visual: <BlueprintValues />
  }
];


/* ==========================================================================
   MAIN COMPONENT IMPLEMENTATION: THE WORKSHOP
   ========================================================================== */
export default function KineticSkills({ isLoading = false }) {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted || isLoading) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".workbench-card", { opacity: 1, scale: 1, x: 0, z: 0, visibility: "visible", pointerEvents: "auto" });
        gsap.set(".tech-line", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop Sequence Config (Pinned Mechanical Scroll)
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray(".workbench-card");
        const totalSlides = cards.length; // 8 workbenches + 1 ending = 9 slides total

        const pinTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${(totalSlides - 1) * 100}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Set initial positions
        cards.forEach((card, idx) => {
          if (idx === 0) {
            gsap.set(card, { opacity: 1, scale: 1, x: 0, z: 0, visibility: "visible", pointerEvents: "auto" });
            gsap.set(card.querySelectorAll(".tech-line"), { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
          } else {
            gsap.set(card, { opacity: 0, scale: 0.92, x: 200, z: -100, visibility: "hidden", pointerEvents: "none" });
            gsap.set(card.querySelectorAll(".tech-line"), { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)" });
          }
        });

        // Loop card transitions
        for (let i = 0; i < totalSlides - 1; i++) {
          const currentCard = cards[i];
          const nextCard = cards[i + 1];
          const startTime = i;

          // Transition CURRENT card OUT (mechanical slide backwards & fade)
          pinTimeline.to(currentCard, {
            x: -200,
            scale: 0.88,
            z: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          }, startTime);
          
          pinTimeline.set(currentCard, { visibility: "hidden", pointerEvents: "none" }, startTime + 0.5);

          // Transition NEXT card IN (slide forward & scale expand)
          pinTimeline.set(nextCard, { visibility: "visible", pointerEvents: "auto" }, startTime + 0.2);
          
          pinTimeline.fromTo(nextCard,
            { x: 200, scale: 0.94, z: 100, opacity: 0 },
            {
              x: 0,
              scale: 1,
              z: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            },
            startTime + 0.2
          );

          // Clear hovered tech to avoid carrying state over during transitions
          pinTimeline.call(() => {
            setHoveredTech(null);
          }, null, startTime + 0.2);

          // Text Engraving Mask Reveal for tech rows (staggered)
          if (i < totalSlides - 2) {
            pinTimeline.fromTo(nextCard.querySelectorAll(".tech-line"),
              { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)" },
              {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                stagger: 0.06,
                duration: 0.4,
                ease: "power1.out"
              },
              startTime + 0.4
            );
          }

          // Blueprint SVG fade-in
          pinTimeline.fromTo(nextCard.querySelector(".blueprint-visual"),
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power1.out"
            },
            startTime + 0.3
          );
        }

        // Workshop lights dimming effect during ending scene transition
        const lastIndex = totalSlides - 2; // Values workbench
        pinTimeline.to(".workshop-grid", { opacity: 0.03, duration: 0.6 }, lastIndex + 0.3);
        pinTimeline.to(".workshop-subgrid", { opacity: 0.01, duration: 0.6 }, lastIndex + 0.3);
        pinTimeline.to(".ambient-orange-light", { opacity: 0.1, scale: 0.5, duration: 0.6 }, lastIndex + 0.3);

        // Ending outro text entry
        const endingCard = cards[totalSlides - 1];
        pinTimeline.fromTo(endingCard.querySelector(".outro-creed"),
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          lastIndex + 0.4
        );
        pinTimeline.fromTo(endingCard.querySelector(".ending-underline"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
          lastIndex + 0.7
        );
      });

      // Mobile Display Progression Config
      mm.add("(max-width: 1023px)", () => {
        gsap.set(".workbench-card", { opacity: 1, scale: 1, x: 0, z: 0, visibility: "visible", pointerEvents: "auto" });
        gsap.set(".tech-line", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });

        const cards = gsap.utils.toArray(".workbench-card");
        cards.forEach((card, idx) => {
          if (idx === cards.length - 1) {
            // Outro card viewport entry on mobile
            gsap.fromTo(card.querySelector(".outro-creed"),
              { opacity: 0, y: 35 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  end: "top 50%",
                  scrub: true,
                }
              }
            );
            gsap.fromTo(card.querySelector(".ending-underline"),
              { scaleX: 0 },
              {
                scaleX: 1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 75%",
                  end: "top 55%",
                  scrub: true,
                }
              }
            );
          } else {
            // Blueprint details entry on mobile
            gsap.fromTo(card.querySelector(".blueprint-visual"),
              { opacity: 0, scale: 0.9 },
              {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  end: "top 60%",
                  scrub: true,
                }
              }
            );
          }
        });
      });
    },
    { scope: sectionRef, dependencies: [mounted, isLoading] }
  );

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full min-h-screen lg:h-screen bg-[#050505] overflow-visible lg:overflow-hidden border-b border-white/[0.03] py-20 lg:py-0 flex flex-col justify-center"
    >
      {/* Background radial spotlight glow */}
      <div className="ambient-orange-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[75vh] bg-[#ff8000]/[0.015] rounded-full blur-[150px] pointer-events-none z-0 transition-colors duration-700" />

      {/* Workshop Grid Backdrops */}
      <div className="workshop-grid absolute inset-0 bg-[linear-gradient(to_right,rgba(255,128,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,128,0,0.012)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none" />
      <div className="workshop-subgrid absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:8px_8px] opacity-40 pointer-events-none" />

      {/* Floating Dust Particles */}
      <DustParticles />

      {/* Persistent Technical Section Header */}
      <div className="absolute top-8 left-6 md:left-16 z-20 select-none hidden lg:flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500">
            THE WORKSHOP
          </span>
        </div>
        <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1 font-bold">
          Where ideas become products.
        </h2>
      </div>

      {/* Workbench Deck Container */}
      <div className="relative w-full h-auto lg:h-[650px] max-w-[1250px] mx-auto px-6 md:px-16 flex flex-col gap-12 lg:gap-0 lg:block">

        {allBenchesData.map((workbench, idx) => (
          <div
            key={workbench.id}
            className={`workbench-card workbench-${idx} w-full flex-shrink-0 relative lg:absolute lg:inset-x-0 lg:mx-auto lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center transition-opacity duration-300 lg:duration-0 ${
              idx === 0 
                ? "opacity-100 pointer-events-auto lg:opacity-100 lg:pointer-events-auto" 
                : "opacity-100 pointer-events-auto lg:opacity-0 lg:pointer-events-none"
            }`}
          >
            {/* The physical CAD-inspired plate */}
            <div className="w-full max-w-[1200px] bg-[#090a0f]/85 border border-white/[0.04] rounded-lg p-6 md:p-10 lg:p-12 relative flex flex-col justify-between backdrop-blur-md shadow-2xl">
              
              {/* Mechanical Corner Braces */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-orange-500/35 -translate-x-[1px] -translate-y-[1px]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-orange-500/35 translate-x-[1px] -translate-y-[1px]" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-orange-500/35 -translate-x-[1px] translate-y-[1px]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-orange-500/35 translate-x-[1px] translate-y-[1px]" />
              
              {/* Inner alignment ticks */}
              <div className="absolute top-6 left-6 w-2 h-2 border-t border-l border-zinc-700/50" />
              <div className="absolute top-6 right-6 w-2 h-2 border-t border-r border-zinc-700/50" />
              <div className="absolute bottom-6 left-6 w-2 h-2 border-b border-l border-zinc-700/50" />
              <div className="absolute bottom-6 right-6 w-2 h-2 border-b border-r border-zinc-700/50" />
              
              {/* HUD Header */}
              <div className="flex justify-between items-start border-b border-white/[0.04] pb-5 select-none">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-[pulse_2s_infinite]" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                      WORKBENCH 0{workbench.id} // CORE ASSEMBLY
                    </span>
                  </div>
                  <h3 className="font-sans text-xl md:text-2xl font-black uppercase tracking-tight text-white mt-1">
                    {workbench.title}
                  </h3>
                </div>
                <div className="flex flex-col items-end font-mono text-[8px] md:text-[9px] text-zinc-500 leading-none">
                  <span>SYS_LOC: STN_0{workbench.id}</span>
                  <span className="text-orange-500/70 font-semibold mt-1">READY</span>
                </div>
              </div>

              {/* Central Contents division */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between my-auto py-5 relative z-10">
                
                {/* Left Column: Tech Lines */}
                <div className="w-full lg:w-[48%] flex flex-col gap-2.5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-orange-500/60 block mb-1">
                    // ENGRAVING PORT ACTIVE
                  </span>
                  
                  <div className="flex flex-col gap-1.5">
                    {workbench.skills.map((skill, sIdx) => {
                      const isHovered = hoveredTech === skill.name;
                      const isAnyHovered = hoveredTech !== null;
                      return (
                        <div
                          key={sIdx}
                          onMouseEnter={() => setHoveredTech(skill.name)}
                          onMouseLeave={() => setHoveredTech(null)}
                          className={`tech-line flex flex-col py-2 border-b border-white/[0.02] cursor-pointer transition-all duration-300 ${
                            isAnyHovered && !isHovered ? "opacity-20 blur-[0.8px] scale-[0.98]" : "opacity-100 scale-100"
                          }`}
                        >
                          <div className="flex justify-between items-end">
                            <span className="font-sans text-base md:text-lg font-bold uppercase tracking-tight text-white transition-colors duration-300"
                                  style={{ color: isHovered ? "#ff8000" : "#ffffff" }}>
                              {skill.name}
                            </span>
                            <span className="font-mono text-[8px] md:text-[9px] text-zinc-500">
                              {skill.rating}
                            </span>
                          </div>
                          
                          {/* Expanding orange underline */}
                          <div className="relative w-full h-[1px] bg-white/[0.03] mt-1 overflow-hidden">
                            <div 
                              className="absolute top-0 left-0 h-full bg-[#ff8000] transition-transform duration-500 origin-left w-full"
                              style={{ transform: isHovered ? "scaleX(1)" : "scaleX(0)" }}
                            />
                          </div>

                          {/* Revealable description */}
                          <div 
                            className={`grid transition-all duration-300 ${
                              isHovered ? "grid-rows-[1fr] opacity-100 mt-1.5" : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="text-[11px] text-orange-400/90 font-mono pl-3 border-l border-orange-500/40 py-0.5 leading-relaxed">
                                {skill.note}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: CAD ring with Abstract Blueprint SVG */}
                <div className="hidden lg:flex w-[42%] justify-center items-center relative select-none">
                  <div className="blueprint-visual flex items-center justify-center p-6 rounded-full border border-white/5 bg-zinc-950/30 backdrop-blur-sm aspect-square relative shadow-lg w-[290px] md:w-[330px] lg:w-[350px]">
                    {/* Concentric rotating grids */}
                    <div className="absolute inset-0 border border-dashed border-orange-500/10 rounded-full animate-[spin_80s_linear_infinite]" />
                    <div className="absolute inset-3 border border-dashed border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                    <div className="w-full h-full p-2">
                      {workbench.visual}
                    </div>
                  </div>
                </div>

              </div>

              {/* HUD Footer */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 border-t border-white/[0.04] pt-5 select-none font-mono text-[8px] md:text-[9px] text-zinc-500">
                <div className="flex gap-4">
                  {workbench.hudSpecs.map((spec, sIdx) => (
                    <span key={sIdx}>{spec}</span>
                  ))}
                </div>
                <div className="text-zinc-400 text-[10px] md:text-[11px]">
                  {workbench.tagline}
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Slide 09: Final Outro Creed */}
        <div className="workbench-card workbench-ending w-full flex-shrink-0 relative lg:absolute lg:inset-x-0 lg:mx-auto lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center transition-opacity duration-300 lg:duration-0 opacity-100 pointer-events-auto lg:opacity-0 lg:pointer-events-none select-none">
          <div className="outro-creed max-w-2xl text-center px-6 flex flex-col items-center z-10 py-16">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-orange-500 mb-5 block select-none">
              // CORE MINDSET
            </span>
            <h3 className="font-sans text-2xl md:text-4xl text-zinc-100 font-extrabold uppercase tracking-tight mb-8 select-none max-w-xl leading-snug">
              The tools will change.<br />The mindset stays.
            </h3>
            
            {/* expanding orange divider */}
            <div className="ending-underline w-64 h-[1.5px] bg-[#ff8000] origin-center scale-x-0" />
            
            <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-600 mt-8 select-none">
              // CONTINUOUS LEARNING &bull; ENGINEERING CRAFTSMAN
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Scene metadata */}
      <div className="absolute bottom-6 left-6 md:left-12 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/10 pointer-events-none select-none z-10 hidden lg:block">
        // ENGINE_WORKBENCH // EST_1998 // CODE_MAINTENANCE_LEVEL_A
      </div>
    </section>
  );
}