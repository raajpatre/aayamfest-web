/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

function makeStrapTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#22d3ee";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(18, canvas.height);
  ctx.stroke();
  ctx.strokeStyle = "#d946ef";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(42, 0);
  ctx.lineTo(42, canvas.height);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(-4, 1);
  return texture;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true
}: {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function BadgeFace() {
  return (
    <group position={[0, 0, 0.03]}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.35, 1.92]} />
        <meshBasicMaterial color="#05070b" transparent opacity={0.96} />
      </mesh>

      <mesh position={[0, 0.73, 0.001]}>
        <planeGeometry args={[1.08, 0.22]} />
        <meshBasicMaterial color="#070d16" />
      </mesh>

      <mesh position={[-0.3, 0.12, 0.001]}>
        <planeGeometry args={[0.34, 0.58]} />
        <meshBasicMaterial color="#08131d" />
      </mesh>

      <mesh position={[0.26, -0.72, 0.001]}>
        <planeGeometry args={[0.46, 0.38]} />
        <meshBasicMaterial color="#05070b" />
      </mesh>

      <mesh position={[-0.28, -0.72, 0.001]}>
        <planeGeometry args={[0.46, 0.38]} />
        <meshBasicMaterial color="#05070b" />
      </mesh>

      <lineSegments position={[0, 0, 0.004]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.35, 1.92)]} />
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.28} />
      </lineSegments>

      <mesh position={[-0.3, 0.12, 0.004]}>
        <ringGeometry args={[0.12, 0.16, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false
}: {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps: any = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };
  const strapTexture = useMemo(() => makeStrapTexture(), []);
  const lineGeometry = useMemo(() => new MeshLineGeometry(), []);
  const lineMaterial = useMemo(
    () =>
      new MeshLineMaterial(
        {
          color: "white",
          depthTest: false,
          resolution: new THREE.Vector2(1000, isMobile ? 2000 : 1000),
          useMap: true,
          map: strapTexture,
          repeat: new THREE.Vector2(-4, 1),
          lineWidth: 1
        } as any
      ),
    [isMobile, strapTexture]
  );
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref: any) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      lineGeometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.05]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              const target = e.currentTarget as HTMLElement | null;
              if (target) target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              const target = e.currentTarget as HTMLElement | null;
              if (target) target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh>
              <boxGeometry args={[1.45, 2.08, 0.08]} />
              <meshPhysicalMaterial
                color="#1c2229"
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.78}
                metalness={0.7}
              />
            </mesh>

            <mesh position={[0, 0, 0.045]}>
              <boxGeometry args={[1.33, 1.95, 0.02]} />
              <meshStandardMaterial color="#06090d" emissive="#102331" emissiveIntensity={0.15} />
            </mesh>

            <BadgeFace />

            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.08, 32]} />
              <meshStandardMaterial color="#090b0f" emissive="#22d3ee" emissiveIntensity={0.28} />
            </mesh>

            <mesh position={[0, 1.36, -0.02]}>
              <boxGeometry args={[0.18, 0.18, 0.1]} />
              <meshStandardMaterial color="#8c96a4" metalness={1} roughness={0.28} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <primitive object={lineGeometry} attach="geometry" />
        <primitive object={lineMaterial} attach="material" />
      </mesh>
    </>
  );
}
