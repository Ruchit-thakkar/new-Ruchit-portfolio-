import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Float, Torus, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

export default function Scene3D() {
  const groupRef = useRef();
  const liquidCoreRef = useRef();

  // useThree gives us the viewport dimensions so we can calculate exactly
  // how far to push the sphere regardless of screen size
  const { viewport } = useThree();

  useGSAP(
    () => {
      // Create a master timeline tied to the main scroll container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#main-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // The 1.5 adds a slight delay for a buttery, heavy liquid feel
        },
      });

      // 1. Tumble the entire group (rings + core + nodes)
      tl.to(
        groupRef.current.rotation,
        {
          y: Math.PI * 4, // 2 full rotations horizontally
          x: Math.PI * 2, // 1 full rotation vertically
          ease: "none",
        },
        0,
      );

      // 2. Parallax shift the liquid core slightly off-center as you scroll
      tl.to(
        liquidCoreRef.current.position,
        {
          x: viewport.width * 0.15, // Shift right
          y: -viewport.height * 0.15, // Shift down
          ease: "power1.inOut",
        },
        0,
      );
    },
    { dependencies: [viewport] },
  ); // Re-run if screen size changes

  return (
    // Float adds that ambient, breathing up-and-down movement when NOT scrolling
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* 1. Liquid Central Core */}
        <Sphere ref={liquidCoreRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#0d1b2a" // Your Cobalt Blue
            attach="material"
            distort={0.4} // Controls the liquid warp effect
            speed={2} // How fast it bubbles
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>

        {/* 2. Inner Orbiting Tech Ring */}
        <Torus args={[2.5, 0.015, 16, 100]} rotation={[Math.PI / 2, 0.5, 0]}>
          <meshStandardMaterial
            color="#ff8000" // Your Solar Amber
            emissive="#ff8000"
            emissiveIntensity={0.8}
          />
        </Torus>

        {/* 3. Outer Glass/Ghost Ring */}
        <Torus args={[3.4, 0.02, 16, 100]} rotation={[0, 0.5, Math.PI / 3]}>
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.15}
            roughness={0}
          />
        </Torus>

        {/* 4. Floating Satellites (Data Nodes) */}
        <Sphere args={[0.12, 16, 16]} position={[2.5, 0, 1.2]}>
          <meshStandardMaterial
            color="var(--color-success)"
            emissive="var(--color-success)"
            emissiveIntensity={1.5}
          />
        </Sphere>
        <Sphere args={[0.08, 16, 16]} position={[-1.5, 2.5, 0]}>
          <meshStandardMaterial color="#ff8000" />
        </Sphere>
        <Sphere args={[0.15, 16, 16]} position={[0, -3.4, 1]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
      </group>
    </Float>
  );
}
