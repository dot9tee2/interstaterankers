"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import { ArrowRight, Check, Phone } from "lucide-react";
import * as THREE from "three";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/data/cta";
import { clientCount, guarantee } from "@/data/proof";

const trustPoints = [`Trusted by ${clientCount}+ businesses`, guarantee.title, "No long-term contracts"];

function CameraControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<ThreeOrbitControls | null>(null);
  React.useEffect(() => {
    const controls = new ThreeOrbitControls(camera, gl.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.6;
    controlsRef.current = controls;
    return () => controls.dispose();
  }, [camera, gl]);
  useFrame(() => {
    if (controlsRef.current) controlsRef.current.update();
  });
  return null;
}

function LogoCube() {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useLoader(THREE.TextureLoader, [
    "/logos/ads.png",
    "/logos/gmb.png",
    "/logos/meta.png",
    "/logos/linkedin.png",
    "/logos/nextjs.png",
    "/logos/calls.png",
  ]) as THREE.Texture[];

  const materials = useMemo(() => {
    const faces = textures.slice(0, 6);
    // Normalize texture settings for crisp transparent logos
    faces.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });
    return faces.map((tex) => new THREE.MeshStandardMaterial({ map: tex, transparent: true }));
  }, [textures]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t / 2) / 4 + 0.4;
    groupRef.current.rotation.y = t / 2;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Base rounded cube */}
      {(() => {
        const size = 1.8;
        const radius = 0.22;
        const smoothness = 8;
        const epsilon = 0.04; // push slightly outward to avoid any z-fighting with rounded edges
        const inset = radius * 1.05;
        const faceSize = size - 2 * inset;
        const half = size / 2;
        return (
          <>
            <RoundedBox args={[size, size, size]} radius={radius} smoothness={smoothness} castShadow receiveShadow>
              <meshStandardMaterial color="hsl(262, 47%, 38%)" metalness={0.6} roughness={0.35} />
            </RoundedBox>
            {/* Logo overlays on each face as slightly inset planes to preserve rounded edges */}
            {/* +X */}
            <mesh position={[half + epsilon, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow={false} receiveShadow={false} renderOrder={10}>
              <planeGeometry args={[faceSize, faceSize]} />
              <meshStandardMaterial map={materials[0].map as THREE.Texture} transparent depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            {/* -X */}
            <mesh position={[-half - epsilon, 0, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow={false} receiveShadow={false} renderOrder={10}>
              <planeGeometry args={[faceSize, faceSize]} />
              <meshStandardMaterial map={materials[1].map as THREE.Texture} transparent depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            {/* +Y */}
            <mesh position={[0, half + epsilon, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow={false} receiveShadow={false} renderOrder={10}>
              <planeGeometry args={[faceSize, faceSize]} />
              <meshStandardMaterial map={materials[2].map as THREE.Texture} transparent depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            {/* -Y (bottom): the spin never turns it toward the viewer, so it only shows when someone drags the cube */}
            <mesh position={[0, -half - epsilon, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow={false} receiveShadow={false} renderOrder={10}>
              <planeGeometry args={[faceSize, faceSize]} />
              <meshStandardMaterial map={materials[3].map as THREE.Texture} transparent depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            {/* +Z (front) */}
            <mesh position={[0, 0, half + epsilon]} rotation={[0, 0, 0]} castShadow={false} receiveShadow={false} renderOrder={10}>
              <planeGeometry args={[faceSize, faceSize]} />
              <meshStandardMaterial map={materials[4].map as THREE.Texture} transparent depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            {/* -Z (back) */}
            <mesh position={[0, 0, -half - epsilon]} rotation={[0, Math.PI, 0]} castShadow={false} receiveShadow={false} renderOrder={10}>
              <planeGeometry args={[faceSize, faceSize]} />
              <meshStandardMaterial map={materials[5].map as THREE.Texture} transparent depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
          </>
        );
      })()}
    </group>
  );
}

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden bg-background">
      <div className="container relative mx-auto px-4 pb-20 pt-32 md:px-6 lg:pb-24 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            {/* The leading line only shows in the left-aligned desktop layout; centered on a phone it would hang off a wrapped label */}
            <p className="mb-6 flex items-center justify-center gap-3 text-balance text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan lg:justify-start">
              <span aria-hidden="true" className="hidden h-px w-8 bg-accent-cyan lg:block" />
              Answering &amp; local SEO for US businesses
            </p>
            <h1 id="hero-heading" className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
              <span className="block">Get found on Google.</span>
              <span className="block text-brand">Never miss another lead.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-0">
              We improve your local search presence, then help your team answer enquiries and book appointments with human-led support and AI backup.
            </p>

            {/* MobileCTABar watches this id: its bar appears once these buttons have scrolled away */}
            <div id="hero-cta" className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="h-14 w-full rounded-xl px-8 text-base font-semibold sm:w-auto">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 w-full rounded-xl border-border bg-transparent px-8 text-base font-semibold text-foreground hover:bg-muted hover:text-foreground sm:w-auto">
                <a href="tel:+12816195295">
                  <Phone className="h-4 w-4" />
                  Talk to an Expert
                </a>
              </Button>
            </div>
            <p className="mt-4 text-pretty text-sm text-muted-foreground">{primaryCta.note}</p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border pt-8 lg:justify-start">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Check aria-hidden="true" className="h-4 w-4 text-accent-cyan" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full max-w-xl mx-auto lg:max-w-xl order-2 lg:order-2 perspective-1000">
            <div className="relative aspect-[4/3] w-full">
              <div className="absolute inset-0 rounded-3xl border border-border bg-card overflow-hidden">
                <Canvas shadows dpr={[1, 1.8]} camera={{ position: [0, 0, 4.2], fov: 45 }}>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[3, 3, 3]} intensity={1.5} castShadow />
                  <directionalLight position={[-3, -2, 2]} intensity={0.5} />
                  <LogoCube />
                  <CameraControls />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
