/**
 * VIBEX celestial style: quiet-power darkness — vast negative space, drifting
 * nebula particles, one glowing core, and a dotted orbit path that connects
 * the story like a journey thread. Cursor-reactive, opt-out via reduced motion.
 */
import { useFrame, useThree } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Line } from "three";

function makeGlowSprite() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(235,245,220,0.55)");
  g.addColorStop(0.6, "rgba(215,255,54,0.18)");
  g.addColorStop(1, "rgba(215,255,54,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function CelestialScene({
  intensity = 1,
}: {
  intensity?: number;
  className?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pathRef = useRef<THREE.Line>(null);
  const target = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const particleCount = useMemo(() => Math.min(260, Math.floor((size.width * size.height) / 9000)), [size]);

  const [positions, scales, phases] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const scl = new Float32Array(particleCount);
    const phs = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = -1.2 - Math.random() * 4.5;
      scl[i] = Math.random() * 0.55 + 0.15;
      phs[i] = Math.random() * Math.PI * 2;
    }
    return [pos, scl, phs];
  }, [particleCount]);

  const matTex = useMemo(() => makeGlowSprite(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    target.current.x += (state.pointer.x - target.current.x) * delta * 0.8;
    target.current.y += (state.pointer.y - target.current.y) * delta * 0.8;
    const pts = pointsRef.current?.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (pts) {
      const arr = pts.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] += Math.sin(t * 0.35 + phases[i]) * 0.0012;
        arr[i * 3] += Math.cos(t * 0.28 + phases[i]) * 0.0008 + target.current.x * 0.0012;
      }
      pts.needsUpdate = true;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 0.9) * 0.045;
      coreRef.current.scale.set(s, s, s);
      coreRef.current.rotation.y = t * 0.12 + target.current.x * 0.35;
      coreRef.current.rotation.x = -0.15 + target.current.y * 0.25;
    }
    if (pathRef.current) {
      pathRef.current.rotation.z = t * 0.03;
    }
  });

  const pathPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segs = 110;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2.6;
      const r = 2.5 + Math.sin(a * 2) * 0.55;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.62, -0.7));
    }
    return pts;
  }, []);

  const pathGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(pathPoints), [pathPoints]);

  return (
    <>
      <Points ref={pointsRef} positions={positions} sizes={scales} stride={3}>
        <pointsMaterial
          map={matTex}
          size={0.14 * intensity}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          color="#efeede"
          opacity={0.85}
        />
      </Points>
      <mesh ref={coreRef} position={[0.6, -0.15, -0.4]}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshStandardMaterial
          color="#151717"
          metalness={0.9}
          roughness={0.25}
          emissive="#d7ff36"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh position={[0.6, -0.15, -0.4]} scale={1.18}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial map={matTex} transparent opacity={0.45 * intensity} blending={THREE.AdditiveBlending} color="#eaf5d8" />
      </mesh>
      <primitive object={new Line(pathGeo, new THREE.LineBasicMaterial({ color: "#d7ff36", transparent: true, opacity: 0.35 }))} ref={pathRef} position={[0.6, -0.15, -0.3]} />
      {/* the dotted orbit rings */}
      {[
        { r: 1.8, tilt: [0.42, 0.5, -0.2], dash: 2 },
        { r: 2.4, tilt: [-0.75, 0.3, 0.55], dash: 3 },
      ].map((ring, i) => {
        const ringPts: THREE.Vector3[] = [];
        for (let a = 0; a <= 2 * Math.PI; a += 0.05) {
          ringPts.push(new THREE.Vector3(Math.cos(a) * ring.r, Math.sin(a) * ring.r, 0));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(ringPts);
        const mat = new THREE.LineDashedMaterial({
          color: "#d7ff36",
          transparent: true,
          opacity: 0.3 - i * 0.08,
          dashSize: 0.32,
          gapSize: 0.3,
        });
        const ringLine = new Line(geo, mat);
        ringLine.computeLineDistances();
        ringLine.position.set(0.6, -0.15, -0.55);
        ringLine.rotation.set(ring.tilt[0] as number, ring.tilt[1] as number, ring.tilt[2] as number);
        const s = 1 + i * 0.12;
        ringLine.scale.set(s, s, s);
        return <primitive key={i} object={ringLine} />;
      })}
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2.5]} intensity={1.2} color="#eef6e2" />
      <pointLight position={[-1.6, -1.8, 1.2]} intensity={0.9} color="#d7ff36" />
    </>
  );
}
