"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Text3D,
  Center,
  Environment,
  MeshTransmissionMaterial,
  Trail,
} from "@react-three/drei";
import * as THREE from "three";

function DeliveryBox({
  position,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
      meshRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <boxGeometry args={[1, 0.8, 1]} />
        <meshStandardMaterial
          color="#e8590c"
          roughness={0.3}
          metalness={0.6}
        />
        {/* Tape stripe */}
        <mesh position={[0, 0.01, 0]} scale={[1.01, 0.82, 0.15]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#c84a08"
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>
      </mesh>
    </Float>
  );
}

function GlowingSphere({
  position,
  color,
  size = 0.15,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

function RouteLine() {
  const ref = useRef<THREE.Mesh>(null!);
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 50; i++) {
      const t = (i / 50) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.sin(t) * 3,
          Math.cos(t * 2) * 0.5 - 1,
          Math.cos(t) * 2 - 2
        )
      );
    }
    return pts;
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, true), [points]);
  const tubeGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 100, 0.02, 8, true),
    [curve]
  );

  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity =
        1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    }
  });

  return (
    <mesh ref={ref} geometry={tubeGeometry}>
      <meshStandardMaterial
        color="#e8590c"
        emissive="#e8590c"
        emissiveIntensity={1.5}
        toneMapped={false}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function MovingParticle() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * 0.3) % 1;
      const angle = t * Math.PI * 2;
      ref.current.position.set(
        Math.sin(angle) * 3,
        Math.cos(angle * 2) * 0.5 - 1,
        Math.cos(angle) * 2 - 2
      );
    }
  });

  return (
    <Trail
      width={0.3}
      length={8}
      color={new THREE.Color("#e8590c")}
      attenuation={(w: number) => w * w}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ff6b2b"
          emissive="#ff6b2b"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshStandardMaterial
        color="#0d1117"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function GlassPanel() {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh position={[2.5, 0.5, -1]} rotation={[0, -0.3, 0]}>
        <planeGeometry args={[2, 2.5]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.3}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          transmission={0.95}
          color="#1a2035"
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#e8590c" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#3b82f6" />

      {/* Main delivery box */}
      <DeliveryBox position={[-1.5, 0.5, 0]} scale={1.2} speed={0.8} />

      {/* Secondary boxes */}
      <DeliveryBox position={[1.8, -0.5, -1.5]} scale={0.7} speed={1.2} />
      <DeliveryBox position={[-0.5, -1, -2]} scale={0.5} speed={1} />

      {/* Glowing waypoints */}
      <GlowingSphere position={[-3, 0, -1]} color="#e8590c" size={0.12} />
      <GlowingSphere position={[0, -0.5, -3]} color="#3b82f6" size={0.1} />
      <GlowingSphere position={[3, 0.5, 0]} color="#e8590c" size={0.08} />
      <GlowingSphere position={[-1, 1, -2]} color="#22c55e" size={0.1} />

      {/* Route visualization */}
      <RouteLine />
      <MovingParticle />

      {/* Glass panel effect */}
      <GlassPanel />

      {/* Grid floor */}
      <GridFloor />

      <Environment preset="night" />
    </>
  );
}

export default function DeliveryScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
