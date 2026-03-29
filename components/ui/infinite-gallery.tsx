"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export type ImageItem = {
  src: string;
  alt?: string;
  name: string;
  role: string;
};

function ImagePlane({
  texture,
  index,
  total
}: {
  texture: ImageItem;
  index: number;
  total: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const imageTexture = useLoader(THREE.TextureLoader, texture.src);
  const { camera } = useThree();
  const baseAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);

  useEffect(() => {
    imageTexture.colorSpace = THREE.SRGBColorSpace;
  }, [imageTexture]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !materialRef.current) return;

    const t = clock.getElapsedTime() * 0.18;
    const angle = baseAngle + t;
    const radius = 4.6;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = Math.sin(angle * 1.35) * 0.25;

    groupRef.current.position.set(x, y, z);
    groupRef.current.lookAt(camera.position);

    const opacity = THREE.MathUtils.clamp(0.32 + ((z + radius) / (radius * 2)) * 0.78, 0.22, 1);
    materialRef.current.opacity = opacity;

    if (htmlRef.current) {
      htmlRef.current.style.opacity = `${opacity}`;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[1.9, 2.5]} />
        <meshBasicMaterial ref={materialRef} map={imageTexture} transparent opacity={1} toneMapped={false} />
        <Html center position={[0, -1.7, 0]} zIndexRange={[100, 0]} distanceFactor={4}>
          <div
            ref={htmlRef}
            className="pointer-events-none flex w-48 flex-col items-center text-center transition-opacity duration-300"
          >
            <span className="font-mono text-lg font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              {texture.name || "OPERATOR"}
            </span>
            <span className="mt-1 font-mono text-xs uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
              {texture.role || "CORE TEAM"}
            </span>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function GalleryScene({ images }: { images: ImageItem[] }) {
  return (
    <>
      <color attach="background" args={["#020202"]} />
      <fog attach="fog" args={["#020202", 6, 12]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[2, 4, 3]} intensity={1.4} color="#8be9ff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.8} color="#d946ef" />

      {images.map((image, index) => (
        <ImagePlane key={`${image.name}-${index}`} texture={image} index={index} total={images.length} />
      ))}
    </>
  );
}

export default function InfiniteGallery({
  images,
  className = ""
}: {
  images: ImageItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 8], fov: 42 }} dpr={[1, 1.75]}>
        <GalleryScene images={images} />
      </Canvas>
    </div>
  );
}
