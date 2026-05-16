'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function FloatingGlyph() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#7c3aed'),
        emissive: new THREE.Color('#7c3aed'),
        emissiveIntensity: 1.4,
        metalness: 0.2,
        roughness: 0.1,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!mesh.current) return;
    mesh.current.rotation.x = t * 0.35;
    mesh.current.rotation.y = t * 0.45;
    mesh.current.position.x = Math.sin(t * 0.4) * 0.25;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.7} floatIntensity={0.9}>
      <mesh ref={mesh} material={material}>
        <icosahedronGeometry args={[1.05, 1]} />
      </mesh>
    </Float>
  );
}

function ParticleRing() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 1400;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = 2.2 + Math.sin(i * 0.15) * 0.12;
      positions[i * 3 + 0] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.35;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }

    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.012,
        color: new THREE.Color('#67e8f9'),
        opacity: 0.9,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.getElapsedTime();
    points.current.rotation.y = t * 0.15;
    points.current.rotation.x = Math.sin(t * 0.15) * 0.15;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

export default function HeroCanvasClient() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 5], fov: 50 }}
    >
      <color attach="background" args={[0x000000]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} />

      <Suspense fallback={null}>
        <ParticleRing />
        <FloatingGlyph />
        <Environment preset="city" />

        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.8} />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
