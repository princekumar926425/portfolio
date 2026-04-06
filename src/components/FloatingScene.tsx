import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

interface FloatingBoxProps {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  speed?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
}

const FloatingBox = ({ position, scale, color, speed = 1, rotationSpeed = 0.3, floatIntensity = 1 }: FloatingBoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.002 * rotationSpeed;
    meshRef.current.rotation.y += 0.003 * rotationSpeed;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3 * floatIntensity;
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={floatIntensity * 0.5}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <roundedBoxGeometry args={[1, 1, 1, 4, 0.15]} />
        <MeshTransmissionMaterial
          color={color}
          thickness={0.5}
          roughness={0.1}
          transmission={0.6}
          ior={1.5}
          chromaticAberration={0.03}
          backside
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
};

const MouseParallax = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.05;
    target.current.y += (mouse.current.y - target.current.y) * 0.05;
    camera.position.x = target.current.x * 0.8;
    camera.position.y = target.current.y * 0.5;
    camera.lookAt(0, 0, 0);
  });

  useThree(({ gl }) => {
    const handler = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    gl.domElement.addEventListener("mousemove", handler);
    return () => gl.domElement.removeEventListener("mousemove", handler);
  });

  return null;
};

const boxes = [
  { position: [-3, 1.5, -2] as [number, number, number], scale: [0.8, 0.8, 0.8] as [number, number, number], color: "#ff69b4", speed: 0.8 },
  { position: [2.5, -1, -1] as [number, number, number], scale: [1.2, 0.6, 0.6] as [number, number, number], color: "#8b5cf6", speed: 1.2 },
  { position: [-1.5, -1.5, -3] as [number, number, number], scale: [0.6, 1, 0.6] as [number, number, number], color: "#3b82f6", speed: 0.6 },
  { position: [3, 2, -4] as [number, number, number], scale: [1, 0.5, 1] as [number, number, number], color: "#22c55e", speed: 1 },
  { position: [-2.5, 0, -1.5] as [number, number, number], scale: [0.5, 0.5, 0.5] as [number, number, number], color: "#ec4899", speed: 1.4 },
  { position: [1, 1, -2.5] as [number, number, number], scale: [0.7, 0.7, 0.7] as [number, number, number], color: "#a855f7", speed: 0.9 },
  { position: [0, -2, -3.5] as [number, number, number], scale: [0.9, 0.4, 0.9] as [number, number, number], color: "#06b6d4", speed: 0.7 },
  { position: [-3.5, -0.5, -4] as [number, number, number], scale: [0.6, 0.6, 0.6] as [number, number, number], color: "#10b981", speed: 1.1 },
  { position: [3.5, 0, -3] as [number, number, number], scale: [0.4, 0.8, 0.4] as [number, number, number], color: "#f472b6", speed: 0.5 },
  { position: [0.5, 2.5, -5] as [number, number, number], scale: [1.1, 0.5, 0.5] as [number, number, number], color: "#7c3aed", speed: 1.3 },
];

const FloatingScene = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0612"]} />
        <fog attach="fog" args={["#0a0612", 5, 15]} />

        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
        <pointLight position={[-5, -3, 3]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[0, 3, 2]} intensity={0.6} color="#ec4899" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#22c55e" />

        {boxes.map((box, i) => (
          <FloatingBox key={i} {...box} rotationSpeed={0.2 + i * 0.05} floatIntensity={0.5 + i * 0.1} />
        ))}

        <MouseParallax />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default FloatingScene;
