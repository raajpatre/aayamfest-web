"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  BloomEffect,
  ChromaticAberrationEffect,
  EffectComposer,
  EffectPass,
  RenderPass
} from "postprocessing";

type FaceApiModule = {
  nets: {
    tinyFaceDetector: {
      loadFromUri: (path: string) => Promise<void>;
    };
  };
  TinyFaceDetectorOptions: new (options: {
    inputSize: number;
    scoreThreshold: number;
  }) => unknown;
  detectSingleFace: (
    input: HTMLVideoElement,
    options: unknown
  ) => Promise<
    | {
        box: { x: number; y: number; width: number; height: number };
      }
    | undefined
  >;
};

declare global {
  interface Window {
    faceapi?: FaceApiModule;
  }
}

export type GridScanProps = {
  className?: string;
  style?: CSSProperties;
  linesColor?: string;
  scanColor?: string;
  gridScale?: number;
  enableWebcam?: boolean;
  enablePost?: boolean;
  modelsPath?: string;
  showPreview?: boolean;
  scanDuration?: number;
  scanDelay?: number;
  scanOpacity?: number;
  lineThickness?: number;
  bloomIntensity?: number;
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uTarget;
  uniform vec3 uLinesColor;
  uniform vec3 uScanColor;
  uniform float uGridScale;
  uniform float uLineThickness;
  uniform float uScanOpacity;
  uniform float uScanDuration;
  uniform float uScanDelay;

  float pingPong(float x) {
    float t = mod(x, 2.0);
    return t < 1.0 ? t : 2.0 - t;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / max(uResolution.y, 1.0);
    uv += uTarget * vec2(0.32, 0.18);

    float horizon = uv.y + 1.15;
    float perspective = 1.0 / max(0.18, horizon);
    vec2 gridUv = vec2(uv.x * perspective, perspective * 1.4 + uTime * 0.55);
    float scale = max(0.025, uGridScale);
    vec2 coord = gridUv / scale;
    vec2 cell = abs(fract(coord - 0.5) - 0.5) / max(fwidth(coord), vec2(0.0001));
    float line = 1.0 - min(min(cell.x, cell.y) / max(uLineThickness, 0.15), 1.0);

    float cycle = max(0.15, uScanDuration + uScanDelay);
    float phase = pingPong(uTime / cycle);
    float scanPos = mix(-0.4, 4.5, phase);
    float band = exp(-abs(gridUv.y - scanPos) * 3.5) * uScanOpacity;
    float glow = exp(-abs(gridUv.y - scanPos) * 1.6) * 0.45;

    float fadeUp = smoothstep(-0.95, -0.05, uv.y);
    float vignette = smoothstep(1.55, 0.18, length(vec2(uv.x * 0.78, uv.y + 0.1)));
    float baseAlpha = (line * 0.38 + band * 0.7 + glow * line * 0.4) * fadeUp * vignette;

    vec3 color = uLinesColor * line * 0.72;
    color += uScanColor * band;
    color += mix(uLinesColor, uScanColor, 0.55) * glow * 0.25;

    gl_FragColor = vec4(color, clamp(baseAlpha, 0.0, 1.0));
  }
`;

async function loadFaceApiScript() {
  if (typeof window === "undefined") {
    return null;
  }

  if (window.faceapi) {
    return window.faceapi;
  }

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-faceapi="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load face-api.js")), {
        once: true
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
    script.async = true;
    script.dataset.faceapi = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load face-api.js"));
    document.body.appendChild(script);
  });

  return window.faceapi || null;
}

export function GridScan({
  className,
  style,
  linesColor = "#392e4e",
  scanColor = "#FF9FFC",
  gridScale = 0.1,
  enableWebcam = false,
  enablePost = true,
  modelsPath = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights",
  showPreview = false,
  scanDuration = 2,
  scanDelay = 2,
  scanOpacity = 0.42,
  lineThickness = 1,
  bloomIntensity = 0.18
}: GridScanProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetRef = useRef(new THREE.Vector2(0, 0));
  const currentTargetRef = useRef(new THREE.Vector2(0, 0));
  const rafRef = useRef<number | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const [modelsReady, setModelsReady] = useState(false);
  const [faceTracking, setFaceTracking] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onMove = (event: MouseEvent) => {
      if (enableWebcam && modelsReady) return;
      const bounds = root.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      targetRef.current.set(x, -y);
    };

    const onLeave = () => {
      if (enableWebcam && modelsReady) return;
      targetRef.current.set(0, 0);
    };

    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [enableWebcam, modelsReady]);

  useEffect(() => {
    if (!enableWebcam) {
      setModelsReady(false);
      setFaceTracking(false);
      return;
    }

    let cancelled = false;
    let stream: MediaStream | null = null;
    let detectTimer: number | null = null;
    let faceApi: FaceApiModule | null = null;

    async function setupWebcamTracking() {
      try {
        faceApi = await loadFaceApiScript();
        if (!faceApi) {
          return;
        }
        await faceApi.nets.tinyFaceDetector.loadFromUri(modelsPath);

        if (cancelled) return;
        setModelsReady(true);

        const video = videoRef.current;
        if (!video) return;

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });

        if (cancelled) return;

        video.srcObject = stream;
        await video.play();

        const detectorOptions = new faceApi.TinyFaceDetectorOptions({
          inputSize: 224,
          scoreThreshold: 0.45
        });

        const detect = async () => {
          if (cancelled || !videoRef.current || !faceApi) return;
          try {
            const result = await faceApi.detectSingleFace(videoRef.current, detectorOptions);
            if (result) {
              const centerX = result.box.x + result.box.width / 2;
              const centerY = result.box.y + result.box.height / 2;
              const x = (centerX / Math.max(videoRef.current.videoWidth, 1)) * 2 - 1;
              const y = (centerY / Math.max(videoRef.current.videoHeight, 1)) * 2 - 1;
              targetRef.current.set(Math.max(-1, Math.min(1, x)), -Math.max(-1, Math.min(1, y)));
              setFaceTracking(true);
            } else {
              setFaceTracking(false);
            }
          } catch {
            setFaceTracking(false);
          }
        };

        detectTimer = window.setInterval(detect, 140);
        void detect();
      } catch {
        if (!cancelled) {
          setModelsReady(false);
          setFaceTracking(false);
        }
      }
    }

    void setupWebcamTracking();

    return () => {
      cancelled = true;
      if (detectTimer) window.clearInterval(detectTimer);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.srcObject = null;
      }
    };
  }, [enableWebcam, modelsPath]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(root.clientWidth, root.clientHeight);
    renderer.setClearColor(0x000000, 0);
    root.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uResolution: { value: new THREE.Vector2(root.clientWidth, root.clientHeight) },
        uTime: { value: 0 },
        uTarget: { value: new THREE.Vector2(0, 0) },
        uLinesColor: { value: new THREE.Color(linesColor).convertSRGBToLinear() },
        uScanColor: { value: new THREE.Color(scanColor).convertSRGBToLinear() },
        uGridScale: { value: gridScale },
        uLineThickness: { value: lineThickness },
        uScanOpacity: { value: scanOpacity },
        uScanDuration: { value: scanDuration },
        uScanDelay: { value: scanDelay }
      },
      vertexShader,
      fragmentShader
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    if (enablePost) {
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(
        new EffectPass(
          camera,
          new BloomEffect({
            intensity: bloomIntensity,
            luminanceThreshold: 0.1,
            luminanceSmoothing: 0.15
          }),
          new ChromaticAberrationEffect({
            offset: new THREE.Vector2(0.0014, 0.0014),
            radialModulation: true,
            modulationOffset: 0
          })
        )
      );
      composerRef.current = composer;
    } else {
      composerRef.current = null;
    }

    const resizeObserver = new ResizeObserver(() => {
      renderer.setSize(root.clientWidth, root.clientHeight);
      material.uniforms.uResolution.value.set(root.clientWidth, root.clientHeight);
      composerRef.current?.setSize(root.clientWidth, root.clientHeight);
    });
    resizeObserver.observe(root);

    const clock = new THREE.Clock();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      currentTargetRef.current.lerp(targetRef.current, 0.06);
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uTarget.value.copy(currentTargetRef.current);
      material.uniforms.uLinesColor.value.set(linesColor).convertSRGBToLinear();
      material.uniforms.uScanColor.value.set(scanColor).convertSRGBToLinear();
      material.uniforms.uGridScale.value = gridScale;
      material.uniforms.uLineThickness.value = lineThickness;
      material.uniforms.uScanOpacity.value = scanOpacity;
      material.uniforms.uScanDuration.value = scanDuration;
      material.uniforms.uScanDelay.value = scanDelay;

      if (composerRef.current) {
        composerRef.current.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      composerRef.current?.dispose();
      composerRef.current = null;
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      root.removeChild(renderer.domElement);
    };
  }, [
    bloomIntensity,
    enablePost,
    gridScale,
    lineThickness,
    linesColor,
    scanColor,
    scanDelay,
    scanDuration,
    scanOpacity
  ]);

  return (
    <div ref={rootRef} className={`gridscan absolute inset-0 overflow-hidden ${className || ""}`} style={style}>
      {showPreview ? (
        <div className="pointer-events-none absolute bottom-3 right-3 z-10 h-[132px] w-[220px] overflow-hidden border border-white/20 bg-black/80 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
          <video ref={videoRef} muted playsInline autoPlay className="h-full w-full scale-x-[-1] object-cover" />
          <div className="absolute left-2 top-2 bg-black/50 px-2 py-1 text-[11px] text-white backdrop-blur-sm">
            {enableWebcam ? (modelsReady ? (faceTracking ? "Face: tracking" : "Face: searching") : "Loading models") : "Webcam disabled"}
          </div>
        </div>
      ) : (
        <video ref={videoRef} muted playsInline autoPlay className="hidden" />
      )}
    </div>
  );
}
