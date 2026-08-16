/**
 * Orbiting Monolith style: One tactile 3D object, sparse material palette,
 * and cursor-responsive movement that feels like handling a physical artifact.
 */
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function Monolith() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = state.pointer.y * 0.3;
    const targetY = state.pointer.x * 0.45;
    group.current.rotation.x += (targetX - group.current.rotation.x) * delta * 1.7;
    group.current.rotation.y += (targetY - group.current.rotation.y) * delta * 1.7;
    group.current.rotation.z += delta * 0.09;
  });

  return (
    <group ref={group} rotation={[-0.16, -0.3, 0.08]}>
      <Float speed={1.15} rotationIntensity={0.14} floatIntensity={0.65}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.25, 3]} />
          <MeshDistortMaterial
            color="#111314"
            metalness={0.88}
            roughness={0.27}
            distort={0.16}
            speed={1.35}
          />
        </mesh>
        <mesh rotation={[0.4, 0.55, -0.16]}>
          <torusGeometry args={[1.74, 0.035, 16, 130]} />
          <meshStandardMaterial color="#d9ddda" metalness={1} roughness={0.2} />
        </mesh>
        <mesh rotation={[-0.8, 0.25, 0.65]}>
          <torusGeometry args={[2.08, 0.028, 16, 130]} />
          <meshStandardMaterial color="#d7ff36" emissive="#91ae17" emissiveIntensity={2.2} metalness={0.72} roughness={0.32} />
        </mesh>
        <mesh position={[0.28, -0.2, 1.05]}>
          <sphereGeometry args={[0.12, 28, 28]} />
          <meshStandardMaterial color="#e0ff50" emissive="#d7ff36" emissiveIntensity={5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function OrbitalMonolith() {
  return (
    <div className="orbital-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 40 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.42} />
        <directionalLight position={[3.5, 4, 5]} intensity={2.8} color="#f4f2e9" />
        <directionalLight position={[-4, -2, 2]} intensity={1.6} color="#c7f455" />
        <pointLight position={[0.7, -1.3, 2.5]} intensity={1.8} color="#d7ff36" />
        <Sparkles count={48} scale={[6, 5, 3]} size={1.2} speed={0.18} opacity={0.5} color="#e8e6de" />
        <Monolith />
      </Canvas>
    </div>
  );
}
