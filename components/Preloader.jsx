import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    // Initial Setup
    gsap.set(".r-logo-impact", { scale: 3, opacity: 0, force3D: true });
    gsap.set(".r-drift", { scale: 1, force3D: true });
    // Shrink the UI brackets initially so they pop out
    gsap.set(".ui-bracket", { scale: 0.8, opacity: 0, transformOrigin: "center" });

    const stroke1 = containerRef.current.querySelector(".rt-stroke-1");
    const stroke2 = containerRef.current.querySelector(".rt-stroke-2");

    const len1 = stroke1.getTotalLength();
    const len2 = stroke2.getTotalLength();

    // Set initial dasharray and dashoffset
    gsap.set(stroke1, { strokeDasharray: len1, strokeDashoffset: len1 });
    gsap.set(stroke2, { strokeDasharray: len2, strokeDashoffset: len2 });

    // Infinite hand-drawn looping timeline
    const loopTl = gsap.timeline({ repeat: -1 });
    loopTl
      .to(stroke1, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut"
      })
      .to(stroke2, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut"
      }, "-=0.6")
      .to({}, { duration: 0.8 }) // Hold visible briefly
      .to(stroke1, {
        strokeDashoffset: -len1,
        duration: 1.2,
        ease: "power2.inOut"
      })
      .to(stroke2, {
        strokeDashoffset: -len2,
        duration: 1.0,
        ease: "power2.inOut"
      }, "-=0.5")
      .to({}, { duration: 0.4 }); // Hold invisible briefly

    const proxy = { value: 0 };

    const mainTl = gsap.timeline({
      onComplete: () => {
        // Immediately stop the looping animation
        loopTl.kill();

        // Complete the current draw if needed (smoothly animate both paths to 0 offset)
        gsap.timeline({
          onComplete: () => {
            const exitTl = gsap.timeline({
              onComplete: () => {
                setTimeout(() => onComplete(), 100);
              }
            });

            // 1. THE GTA STAMP IMPACT
            exitTl
              .to(".r-logo-impact", {
                scale: 0.95,
                duration: 0.15,
                ease: "power2.out"
              })
              .to(".r-fill", {
                opacity: 1,
                duration: 0.1,
              }, "<")
              .to(".r-logo-impact", {
                scale: 1,
                duration: 0.3,
                ease: "back.out(3)"
              })

              // 2. UI CLEANUP & OPTIMIZATION
              .to([".loading-hud", ".ui-bracket", ".ghost-track"], {
                opacity: 0,
                y: 10,
                duration: 0.3,
                ease: "power2.in"
              }, "-=0.2")
              .to(".r-fill", {
                filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
                duration: 0.1
              }, "-=0.1")

              // 3. THE LENS REVEAL
              .to(".r-logo-impact", {
                scale: 150,
                opacity: 0,
                duration: 1.5,
                ease: "expo.in",
                force3D: true,
              }, "+=0.3")
              .to(".loader-bg", {
                yPercent: -100,
                duration: 1.2,
                ease: "expo.inOut",
                stagger: 0.1
              }, "<0.2");
          }
        })
        .to(stroke1, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" })
        .to(stroke2, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, "<");
      }
    });

    // --- ENTRANCE ---
    mainTl.to(".r-logo-impact", {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "expo.out"
    });

    // Pop the targeting brackets in
    mainTl.to(".ui-bracket", {
      scale: 1,
      opacity: 0.5,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.1
    }, "-=1.2");

    // --- 10 SECOND LOADING SEQUENCE ---
    mainTl.to(".r-drift", {
      scale: 1.15,
      duration: 10,
      ease: "none"
    }, "<");

    mainTl.to(proxy, {
      value: 100,
      duration: 10,
      ease: "power1.inOut",
      onUpdate: () => {
        const val = Math.floor(proxy.value);
        if (progressRef.current) progressRef.current.innerText = val;
      },
    }, "<");

    // Blinking "Loading" text effect
    gsap.to(".blink-text", {
      opacity: 0.3,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background Curtains */}
      <div className="loader-bg absolute inset-0 bg-black z-0" />
      <div className="loader-bg absolute inset-0 bg-black z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">

        <div className="r-drift absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="r-logo-impact will-change-transform relative w-full max-w-[550px] aspect-[792/612]">

            <svg viewBox="0 0 792 612" className="w-full h-full overflow-visible">
              {/* HUD Targeting Brackets */}
              <g className="stroke-[#ff8000] stroke-2 fill-transparent">
                <path className="ui-bracket" d="M 30 80 L 30 30 L 80 30" style={{ transformOrigin: '30px 30px' }} />
                <path className="ui-bracket" d="M 762 80 L 762 30 L 712 30" style={{ transformOrigin: '762px 30px' }} />
                <path className="ui-bracket" d="M 30 532 L 30 582 L 80 582" style={{ transformOrigin: '30px 582px' }} />
                <path className="ui-bracket" d="M 762 532 L 762 582 L 712 582" style={{ transformOrigin: '762px 582px' }} />
              </g>

              {/* The RT Logo Group */}
              <g>
                {/* 1. Ghost Track (Sits behind the animation) */}
                <g className="ghost-track fill-none stroke-[#ff8000] opacity-[0.12]" strokeWidth="1">
                  <path d="M309.99,285.14c3.38,3.07,6.26,5.77,9.22,8.38c36.8,32.37,73.61,64.73,110.43,97.07c4.04,3.55,8.14,7.04,12.3,10.44c2.33,1.9,2.56,3.72,0.97,6.33c-11.62,19.01-23.19,38.05-34.61,57.18c-2.2,3.68-4.02,3.17-6.76,0.76c-17.97-15.86-36.08-31.57-54.03-47.45c-32.1-28.41-64.12-56.92-96.18-85.38c-16.66-14.79-33.42-29.47-49.94-44.41c-3.24-2.93-6.51-3.99-10.74-3.97c-27.51,0.13-55.02,0.08-82.52,0.09c-0.92,0-1.84,0.01-2.77,0c-6.28-0.06-6.54-0.5-3.3-6.1c3.62-6.25,7.29-12.47,10.99-18.67c7.8-13.06,15.85-25.97,23.36-39.2c2.82-4.97,6.29-6.53,11.84-6.52c74.38,0.16,148.76,0,223.14,0.23c11.38,0.04,19.66-3.71,25.77-13.52c6.49-10.42,13.79-20.35,20.88-30.39c3.75-5.31,6.24-10.78,2.95-17.12c-3.37-6.5-9.55-8.56-16.24-8.67c-14.44-0.24-28.89-0.03-43.34-0.03c-99.89,0.01-199.78,0.02-299.68-0.02c-2.54,0-6.07,1.18-7.4-1.02c-1.55-2.57,1.51-4.97,2.86-7.25c11.44-19.3,23.03-38.5,34.38-57.85c2.05-3.5,4.46-4.88,8.48-4.88c100.66,0.07,201.32-0.15,301.98,0.15c27.98,0.08,53.4,8.35,73.43,29.02c12.79,13.19,21.9,28.57,24.12,47.19c1.86,15.57-0.58,30.69-9.3,43.78c-14.99,22.5-30.01,45.08-46.59,66.4c-13.24,17.03-32.38,24.36-54.01,24.43c-24.28,0.08-48.56,0.01-72.84,0.05C314.92,284.18,312.89,283.82,309.99,285.14z" />
                  <path d="M636.51,213.08c41.18,0,82.36-0.02,123.54,0.04c2.68,0,6.41-1.29,7.81,1.1c1.6,2.75-1.77,5.17-3.22,7.53c-11.17,18.2-22.58,36.26-33.67,54.5c-2.7,4.43-5.87,6.2-11.16,6.15c-26.73-0.25-53.47-0.04-80.21-0.19c-4.37-0.03-6.91,1.49-9.21,5.24c-45.97,74.9-92.08,149.72-138.16,224.55c-8.54,13.87-17.2,27.66-25.59,41.62c-2.23,3.7-4.82,5.32-9.23,5.29c-24.12-0.19-48.25-0.1-72.37-0.16c-1.78,0-4.09,0.73-5.18-0.98c-1.18-1.84,0.83-3.37,1.72-4.86c51.02-85.13,102.71-169.86,154.46-254.55c2.4-3.93,4.76-7.89,7.15-11.83c1.79-2.95,0.81-4.22-2.48-4.21c-6.61,0.02-13.21-0.02-19.82-0.03c-19.05,0-38.11,0.02-57.16-0.01c-1.63,0-3.8,0.7-4.75-0.86c-1.16-1.92,0.9-3.36,1.89-4.78c13.56-19.57,27.24-39.06,40.7-58.7c2.45-3.57,5.27-4.92,9.55-4.91c41.79,0.12,83.59,0.07,125.39,0.07C636.51,213.1,636.51,213.09,636.51,213.08z" />
                </g>

                {/* 2. The Main Animated Stroke */}
                <g className="fill-none stroke-[#ff8000] stroke-[3.5]" style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  <path className="rt-stroke-1" d="M309.99,285.14c3.38,3.07,6.26,5.77,9.22,8.38c36.8,32.37,73.61,64.73,110.43,97.07c4.04,3.55,8.14,7.04,12.3,10.44c2.33,1.9,2.56,3.72,0.97,6.33c-11.62,19.01-23.19,38.05-34.61,57.18c-2.2,3.68-4.02,3.17-6.76,0.76c-17.97-15.86-36.08-31.57-54.03-47.45c-32.1-28.41-64.12-56.92-96.18-85.38c-16.66-14.79-33.42-29.47-49.94-44.41c-3.24-2.93-6.51-3.99-10.74-3.97c-27.51,0.13-55.02,0.08-82.52,0.09c-0.92,0-1.84,0.01-2.77,0c-6.28-0.06-6.54-0.5-3.3-6.1c3.62-6.25,7.29-12.47,10.99-18.67c7.8-13.06,15.85-25.97,23.36-39.2c2.82-4.97,6.29-6.53,11.84-6.52c74.38,0.16,148.76,0,223.14,0.23c11.38,0.04,19.66-3.71,25.77-13.52c6.49-10.42,13.79-20.35,20.88-30.39c3.75-5.31,6.24-10.78,2.95-17.12c-3.37-6.5-9.55-8.56-16.24-8.67c-14.44-0.24-28.89-0.03-43.34-0.03c-99.89,0.01-199.78,0.02-299.68-0.02c-2.54,0-6.07,1.18-7.4-1.02c-1.55-2.57,1.51-4.97,2.86-7.25c11.44-19.3,23.03-38.5,34.38-57.85c2.05-3.5,4.46-4.88,8.48-4.88c100.66,0.07,201.32-0.15,301.98,0.15c27.98,0.08,53.4,8.35,73.43,29.02c12.79,13.19,21.9,28.57,24.12,47.19c1.86,15.57-0.58,30.69-9.3,43.78c-14.99,22.5-30.01,45.08-46.59,66.4c-13.24,17.03-32.38,24.36-54.01,24.43c-24.28,0.08-48.56,0.01-72.84,0.05C314.92,284.18,312.89,283.82,309.99,285.14z" />
                  <path className="rt-stroke-2" d="M636.51,213.08c41.18,0,82.36-0.02,123.54,0.04c2.68,0,6.41-1.29,7.81,1.1c1.6,2.75-1.77,5.17-3.22,7.53c-11.17,18.2-22.58,36.26-33.67,54.5c-2.7,4.43-5.87,6.2-11.16,6.15c-26.73-0.25-53.47-0.04-80.21-0.19c-4.37-0.03-6.91,1.49-9.21,5.24c-45.97,74.9-92.08,149.72-138.16,224.55c-8.54,13.87-17.2,27.66-25.59,41.62c-2.23,3.7-4.82,5.32-9.23,5.29c-24.12-0.19-48.25-0.1-72.37-0.16c-1.78,0-4.09,0.73-5.18-0.98c-1.18-1.84,0.83-3.37,1.72-4.86c51.02-85.13,102.71-169.86,154.46-254.55c2.4-3.93,4.76-7.89,7.15-11.83c1.79-2.95,0.81-4.22-2.48-4.21c-6.61,0.02-13.21-0.02-19.82-0.03c-19.05,0-38.11,0.02-57.16-0.01c-1.63,0-3.8,0.7-4.75-0.86c-1.16-1.92,0.9-3.36,1.89-4.78c13.56-19.57,27.24-39.06,40.7-58.7c2.45-3.57,5.27-4.92,9.55-4.91c41.79,0.12,83.59,0.07,125.39,0.07C636.51,213.1,636.51,213.09,636.51,213.08z" />
                </g>

                {/* 3. The Solid Impact Fill */}
                <g className="r-fill opacity-0 fill-[#ff8000]" style={{ filter: 'drop-shadow(0 0 25px rgba(255, 128, 0, 0.6))' }}>
                  <path d="M309.99,285.14c3.38,3.07,6.26,5.77,9.22,8.38c36.8,32.37,73.61,64.73,110.43,97.07c4.04,3.55,8.14,7.04,12.3,10.44c2.33,1.9,2.56,3.72,0.97,6.33c-11.62,19.01-23.19,38.05-34.61,57.18c-2.2,3.68-4.02,3.17-6.76,0.76c-17.97-15.86-36.08-31.57-54.03-47.45c-32.1-28.41-64.12-56.92-96.18-85.38c-16.66-14.79-33.42-29.47-49.94-44.41c-3.24-2.93-6.51-3.99-10.74-3.97c-27.51,0.13-55.02,0.08-82.52,0.09c-0.92,0-1.84,0.01-2.77,0c-6.28-0.06-6.54-0.5-3.3-6.1c3.62-6.25,7.29-12.47,10.99-18.67c7.8-13.06,15.85-25.97,23.36-39.2c2.82-4.97,6.29-6.53,11.84-6.52c74.38,0.16,148.76,0,223.14,0.23c11.38,0.04,19.66-3.71,25.77-13.52c6.49-10.42,13.79-20.35,20.88-30.39c3.75-5.31,6.24-10.78,2.95-17.12c-3.37-6.5-9.55-8.56-16.24-8.67c-14.44-0.24-28.89-0.03-43.34-0.03c-99.89,0.01-199.78,0.02-299.68-0.02c-2.54,0-6.07,1.18-7.4-1.02c-1.55-2.57,1.51-4.97,2.86-7.25c11.44-19.3,23.03-38.5,34.38-57.85c2.05-3.5,4.46-4.88,8.48-4.88c100.66,0.07,201.32-0.15,301.98,0.15c27.98,0.08,53.4,8.35,73.43,29.02c12.79,13.19,21.9,28.57,24.12,47.19c1.86,15.57-0.58,30.69-9.3,43.78c-14.99,22.5-30.01,45.08-46.59,66.4c-13.24,17.03-32.38,24.36-54.01,24.43c-24.28,0.08-48.56,0.01-72.84,0.05C314.92,284.18,312.89,283.82,309.99,285.14z" />
                  <path d="M636.51,213.08c41.18,0,82.36-0.02,123.54,0.04c2.68,0,6.41-1.29,7.81,1.1c1.6,2.75-1.77,5.17-3.22,7.53c-11.17,18.2-22.58,36.26-33.67,54.5c-2.7,4.43-5.87,6.2-11.16,6.15c-26.73-0.25-53.47-0.04-80.21-0.19c-4.37-0.03-6.91,1.49-9.21,5.24c-45.97,74.9-92.08,149.72-138.16,224.55c-8.54,13.87-17.2,27.66-25.59,41.62c-2.23,3.7-4.82,5.32-9.23,5.29c-24.12-0.19-48.25-0.1-72.37-0.16c-1.78,0-4.09,0.73-5.18-0.98c-1.18-1.84,0.83-3.37,1.72-4.86c51.02-85.13,102.71-169.86,154.46-254.55c2.4-3.93,4.76-7.89,7.15-11.83c1.79-2.95,0.81-4.22-2.48-4.21c-6.61,0.02-13.21-0.02-19.82-0.03c-19.05,0-38.11,0.02-57.16-0.01c-1.63,0-3.8,0.7-4.75-0.86c-1.16-1.92,0.9-3.36,1.89-4.78c13.56-19.57,27.24-39.06,40.7-58.7c2.45-3.57,5.27-4.92,9.55-4.91c41.79,0.12,83.59,0.07,125.39,0.07C636.51,213.1,636.51,213.09,636.51,213.08z" />
                </g>
              </g>
            </svg>

          </div>
        </div>

        {/* HUD UI */}
        <div className="loading-hud absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-end gap-1 text-right">
          <span className="blink-text font-mono text-[11px] md:text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Loading Story Mode...
          </span>
          <span className="font-heading font-black italic text-5xl md:text-7xl text-[var(--text-heading)] drop-shadow-md">
            <span ref={progressRef}>0</span>
            <span className="text-[var(--text-muted)] text-3xl md:text-4xl ml-1">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}