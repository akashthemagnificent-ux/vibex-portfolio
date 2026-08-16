/**
 * VIBEX / The Memory Observatory
 * A real WebGL world: every story chapter has a physical landmark, camera stop, hover response, and focus state.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import * as THREE from "three";

export const observatoryLandmarks = [
  { short: "Vibex", title: "The Vibex Star-Mark", meta: "Identity / 00", description: "A symbol instead of a portrait. Three glass arms orbit a living core — the person behind the name, still in motion." },
  { short: "Origin", title: "The First Frame", meta: "2020 / Age 11", description: "A suspended editing screen remembers the first failed attempts in Alight Motion — and the moment copying became creating." },
  { short: "Archive", title: "The Edit Archive", meta: "6 years / 116 released", description: "A field of unfinished shards and finished signals. 54 public edits are online; almost a thousand more taught Ash how to find a signature." },
  { short: "Nebula", title: "The Nebula Core", meta: "AI / In progress", description: "A custom language model trained on public developer data. It is not a finished product. It is proof that curiosity can become a system." },
  { short: "Future", title: "The Open Portal", meta: "Next / Unknown", description: "The destination has no final label yet. The intention does: keep building work that evolves beyond any one medium." },
] as const;

type WorldProps = { activeIndex: number; onSelect: (index: number) => void; reduceMotion: boolean };
const cameraStops = [
  { position: [0, 0.15, 11], look: [0, 0, -1] },
  { position: [-0.8, 0.5, 9.2], look: [-3.9, 0.35, -2.2] },
  { position: [0.7, 0.25, 9.4], look: [3.7, 0.55, -2.9] },
  { position: [-0.6, -0.15, 8.7], look: [0.7, -2.45, -1.6] },
  { position: [0.8, -0.55, 9.3], look: [3.95, -3.0, -4] },
] as const;

function CameraPilot({ activeIndex, reduceMotion }: Pick<WorldProps, "activeIndex" | "reduceMotion">) {
  const { camera, pointer } = useThree();
  const position = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  useFrame((_, delta) => {
    const stop = cameraStops[activeIndex];
    position.current.set(stop.position[0] + pointer.x * 0.32, stop.position[1] + pointer.y * 0.22, stop.position[2]);
    target.current.set(stop.look[0] + pointer.x * 0.17, stop.look[1] + pointer.y * 0.13, stop.look[2]);
    camera.position.lerp(position.current, reduceMotion ? 1 : Math.min(0.065 * delta * 60, 0.11));
    camera.lookAt(target.current);
  });
  return null;
}

function HoverGroup({ children, index, onSelect, position, rotation = [0, 0, 0] }: { children: React.ReactNode; index: number; onSelect: (index: number) => void; position: [number, number, number]; rotation?: [number, number, number] }) {
  const [hovered, setHovered] = useState(false);
  const group = useRef<Group>(null);
  useEffect(() => {
    if (!hovered) return;
    const current = document.body.style.cursor;
    document.body.style.cursor = "pointer";
    return () => { document.body.style.cursor = current; };
  }, [hovered]);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.scale.lerp(new THREE.Vector3(hovered ? 1.14 : 1, hovered ? 1.14 : 1, hovered ? 1.14 : 1), Math.min(delta * 6, 1));
  });
  return <group ref={group} position={position} rotation={rotation} onClick={(event) => { event.stopPropagation(); onSelect(index); }} onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)}>{children}</group>;
}

function VibexStar({ onSelect }: Pick<WorldProps, "onSelect">) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.18, 0.035);
  });
  return (
    <HoverGroup index={0} onSelect={onSelect} position={[0, 0.05, -1]}>
      <group ref={group}>
        <mesh position={[-0.52, 0.08, 0]} rotation={[0.28, 0.2, 0.58]}><boxGeometry args={[0.3, 2.65, 0.22]} /><meshPhysicalMaterial color="#cbd8ff" emissive="#3353cb" emissiveIntensity={0.44} metalness={0.12} roughness={0.08} transparent opacity={0.78} /></mesh>
        <mesh position={[0.52, 0.08, 0]} rotation={[0.28, -0.2, -0.58]}><boxGeometry args={[0.3, 2.65, 0.22]} /><meshPhysicalMaterial color="#d7e1ff" emissive="#3353cb" emissiveIntensity={0.44} metalness={0.12} roughness={0.08} transparent opacity={0.78} /></mesh>
        <mesh position={[0, -0.42, 0.24]} rotation={[0.28, 0, 0]}><boxGeometry args={[0.24, 1.2, 0.2]} /><meshPhysicalMaterial color="#eef2ff" emissive="#5b7cff" emissiveIntensity={0.8} roughness={0.05} transparent opacity={0.86} /></mesh>
        <mesh><sphereGeometry args={[0.26, 32, 32]} /><meshStandardMaterial color="#f5f7ff" emissive="#8ba6ff" emissiveIntensity={3.2} /></mesh>
        <mesh rotation={[1.22, 0.2, 0]}><torusGeometry args={[1.8, 0.015, 8, 86]} /><meshBasicMaterial color="#8fa9ff" transparent opacity={0.42} /></mesh>
        <mesh rotation={[0.34, 0.5, 0.5]}><torusGeometry args={[2.25, 0.012, 8, 86]} /><meshBasicMaterial color="#bdccff" transparent opacity={0.22} /></mesh>
      </group>
    </HoverGroup>
  );
}

function OriginArtifact({ onSelect }: Pick<WorldProps, "onSelect">) {
  const lines = [-0.62, -0.3, 0.02, 0.34, 0.65];
  return <Float floatIntensity={0.65} rotationIntensity={0.18} speed={1.1}><HoverGroup index={1} onSelect={onSelect} position={[-4.1, 0.4, -2.3]} rotation={[0.05, 0.43, 0]}>
    <mesh><boxGeometry args={[2.45, 1.48, 0.09]} /><meshPhysicalMaterial color="#0d1530" emissive="#17265a" emissiveIntensity={0.28} metalness={0.52} roughness={0.28} transparent opacity={0.94} /></mesh>
    <mesh position={[0, 0, 0.061]}><planeGeometry args={[2.15, 1.2]} /><meshBasicMaterial color="#030718" /></mesh>
    {lines.map((y, index) => <mesh key={y} position={[-0.65 + index * 0.08, y, 0.09]}><boxGeometry args={[index === 0 ? 1.2 : 1.65 - index * 0.16, 0.045, 0.02]} /><meshBasicMaterial color={index === 0 ? "#bcd0ff" : "#3456c6"} transparent opacity={0.65 - index * 0.06} /></mesh>)}
    <mesh position={[0, 0, 0.11]}><boxGeometry args={[2.48, 1.5, 0.03]} /><meshBasicMaterial color="#8ba6ff" wireframe transparent opacity={0.36} /></mesh>
  </HoverGroup></Float>;
}

function ArchiveArtifact({ onSelect }: Pick<WorldProps, "onSelect">) {
  const shards = useMemo(() => Array.from({ length: 24 }, (_, index) => ({
    position: [((index * 41) % 10) / 3.1 - 1.45, ((index * 19) % 10) / 4.7 - 0.9, ((index * 11) % 10) / 7] as [number, number, number],
    rotation: [index * 0.47, index * 0.79, index * 0.31] as [number, number, number],
    scale: 0.08 + (index % 5) * 0.045,
  })), []);
  return <Float floatIntensity={0.9} rotationIntensity={0.25} speed={0.9}><HoverGroup index={2} onSelect={onSelect} position={[3.7, 0.8, -2.95]}>
    <group>{shards.map((shard, index) => <mesh key={index} position={shard.position} rotation={shard.rotation} scale={shard.scale}><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color={index % 4 === 0 ? "#f2f5ff" : "#5374eb"} emissive={index % 4 === 0 ? "#7e9dff" : "#183587"} emissiveIntensity={index % 4 === 0 ? 1.1 : 0.45} roughness={0.2} metalness={0.7} /></mesh>)}</group>
    <mesh rotation={[0.82, 0.2, 0]}><torusGeometry args={[1.85, 0.015, 8, 64]} /><meshBasicMaterial color="#8aa5ff" transparent opacity={0.5} /></mesh>
  </HoverGroup></Float>;
}

function NebulaArtifact({ onSelect }: Pick<WorldProps, "onSelect">) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y -= delta * 0.18; });
  return <HoverGroup index={3} onSelect={onSelect} position={[0.72, -2.45, -1.7]}>
    <group ref={group}>
      <mesh><icosahedronGeometry args={[0.9, 5]} /><MeshDistortMaterial color="#a59cff" emissive="#4f3cdd" emissiveIntensity={1.8} distort={0.48} speed={1.6} roughness={0.18} metalness={0.25} /></mesh>
      <mesh rotation={[1.48, 0.3, 0.65]}><torusGeometry args={[1.45, 0.035, 12, 88]} /><meshBasicMaterial color="#b9b1ff" transparent opacity={0.68} /></mesh>
      <mesh rotation={[0.74, 0.95, 0.15]}><torusGeometry args={[1.8, 0.012, 8, 88]} /><meshBasicMaterial color="#7e93ff" transparent opacity={0.44} /></mesh>
      <pointLight color="#9689ff" intensity={12} distance={5} />
    </group>
  </HoverGroup>;
}

function ClientArtifact({ onSelect }: Pick<WorldProps, "onSelect">) {
  const rows = [0.45, 0.18, -0.09, -0.36];
  return <Float floatIntensity={0.45} rotationIntensity={0.12} speed={1.4}><HoverGroup index={3} onSelect={onSelect} position={[-3.05, -2.55, -3.3]} rotation={[0.1, 0.18, -0.16]}>
    <mesh><boxGeometry args={[2.05, 1.28, 0.12]} /><meshStandardMaterial color="#091027" emissive="#12276b" emissiveIntensity={0.4} metalness={0.62} roughness={0.28} /></mesh>
    {rows.map((y, index) => <mesh key={y} position={[-0.15, y, 0.085]}><boxGeometry args={[1.25 - index * 0.12, 0.05, 0.02]} /><meshBasicMaterial color={index === 0 ? "#d6e0ff" : "#5275ef"} transparent opacity={.77} /></mesh>)}
    <mesh position={[-0.85, 0.45, 0.09]}><sphereGeometry args={[0.045, 12, 12]} /><meshBasicMaterial color="#c6d7ff" /></mesh>
  </HoverGroup></Float>;
}

function FuturePortal({ onSelect }: Pick<WorldProps, "onSelect">) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.z += delta * 0.08; });
  return <HoverGroup index={4} onSelect={onSelect} position={[4.05, -3.15, -4]}>
    <group ref={group}>
      <mesh><torusGeometry args={[1.15, 0.1, 16, 92]} /><meshStandardMaterial color="#d8e3ff" emissive="#4165ee" emissiveIntensity={1.3} roughness={0.16} metalness={0.8} /></mesh>
      <mesh><circleGeometry args={[1.05, 64]} /><meshBasicMaterial color="#102464" transparent opacity={0.34} /></mesh>
      <mesh rotation={[0.3, 0.5, 0]}><torusGeometry args={[1.55, 0.018, 8, 92]} /><meshBasicMaterial color="#899fff" transparent opacity={0.47} /></mesh>
      <pointLight color="#6382ff" intensity={8} distance={5} />
    </group>
  </HoverGroup>;
}

function MemoryPath() {
  return <Line points={[[-4.1, 0.2, -2.45], [-1.8, -0.22, -1.55], [0, 0, -1], [3.7, 0.7, -2.95], [0.72, -2.45, -1.7], [4.05, -3.15, -4]]} color="#819cff" lineWidth={0.7} dashed dashSize={0.12} gapSize={0.18} transparent opacity={0.46} />;
}

function ObservatoryWorld({ activeIndex, onSelect, reduceMotion }: WorldProps) {
  return <>
    <color attach="background" args={["#02050f"]} />
    <fog attach="fog" args={["#02050f", 10, 26]} />
    <ambientLight intensity={0.42} color="#a9b8ff" />
    <pointLight position={[0, 2, 2]} intensity={4} color="#6c88ff" />
    <pointLight position={[-5, -1, -1]} intensity={2.1} color="#3567ff" />
    <Stars radius={32} depth={20} count={1100} factor={2.1} saturation={0.1} fade speed={reduceMotion ? 0 : 0.45} />
    <Sparkles count={115} scale={[12, 8, 8]} size={1.4} speed={reduceMotion ? 0 : 0.18} color="#b7c8ff" opacity={0.65} />
    <MemoryPath />
    <VibexStar onSelect={onSelect} />
    <OriginArtifact onSelect={onSelect} />
    <ArchiveArtifact onSelect={onSelect} />
    <NebulaArtifact onSelect={onSelect} />
    <ClientArtifact onSelect={onSelect} />
    <FuturePortal onSelect={onSelect} />
    <CameraPilot activeIndex={activeIndex} reduceMotion={reduceMotion} />
  </>;
}

export default function MemoryObservatory({ activeIndex, onSelect, reduceMotion }: WorldProps) {
  const landmark = observatoryLandmarks[activeIndex];
  return <div className="memory-observatory" aria-label="Interactive 3D WebGL memory observatory">
    <Canvas dpr={[1, 1.55]} gl={{ antialias: true, powerPreference: "high-performance", alpha: false }} camera={{ position: [0, 0.15, 11], fov: 42 }}>
      <ObservatoryWorld activeIndex={activeIndex} onSelect={onSelect} reduceMotion={reduceMotion} />
    </Canvas>
    <div className="observatory-hud" aria-live="polite">
      <span className="observatory-hud__index">{String(activeIndex + 1).padStart(2, "0")}</span>
      <span className="observatory-hud__line" />
      <p>{landmark.meta}</p>
    </div>
    <nav className="observatory-dock" aria-label="Explore the 3D landmarks">
      {observatoryLandmarks.map((item, index) => <button type="button" key={item.short} aria-pressed={activeIndex === index} className={activeIndex === index ? "is-active" : ""} onClick={() => onSelect(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.short}</button>)}
    </nav>
  </div>;
}
