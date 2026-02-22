'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HandParticlesPage() {
  const t = useTranslations('studio.priceTool');
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<1 | 2>(1);
  const [shape, setShape] = useState('cube');
  const appRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pCanvasRef = useRef<HTMLCanvasElement>(null);
  const hCanvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ReturnType<typeof createEngine> | null>(null);

  const handleStart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: mobile ? 640 : 1280, height: mobile ? 480 : 720, facingMode: 'user' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Load MediaPipe scripts
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1675466862/camera_utils.min.js');

      const engine = createEngine(
        pCanvasRef.current!,
        hCanvasRef.current!,
        bgCanvasRef.current!,
        videoRef.current!,
      );
      engineRef.current = engine;
      engine.start();

      setStarted(true);
      setLoading(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      engineRef.current?.destroy();
    };
  }, []);

  // Hide header/footer
  useEffect(() => {
    const footer = document.querySelector('footer') as HTMLElement | null;
    const header = document.querySelector('header') as HTMLElement | null;
    if (footer) footer.style.display = 'none';
    if (header) header.style.display = 'none';
    return () => {
      if (footer) footer.style.display = '';
      if (header) header.style.display = '';
    };
  }, []);

  return (
    <div className="h-dvh flex flex-col overflow-hidden px-4 sm:px-6 pt-20 sm:pt-24 pb-6 sm:pb-8">
      {!started && (
        <div className="w-full max-w-2xl mx-auto flex flex-col flex-1 min-h-0">
          {/* Header */}
          <div className="shrink-0">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 text-muted hover:opacity-70 transition-opacity text-sm mb-4 sm:mb-6"
            >
              <ArrowLeft size={16} />
              {t('back')}
            </Link>

            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Hand Particles
              </h1>
              <p className="text-muted text-sm sm:text-base mt-2">
                Qo&apos;l harakati bilan zarrachalarni boshqaring
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center">
            <div
              className="rounded-xl sm:rounded-2xl p-6 sm:p-10 text-center w-full max-w-md"
              style={{
                backgroundColor: '#000000',
                border: '1px solid var(--color-border)',
              }}
            >
              <Sparkles size={36} className="mx-auto mb-4 opacity-70" />

              <p className="text-muted text-sm sm:text-base mb-6 leading-relaxed">
                Kameraga ruxsat bering va qo&apos;l harakatingiz bilan zarrachalarni boshqaring.
              </p>

              {!loading && !error && (
                <button
                  onClick={handleStart}
                  className="px-6 py-3 rounded-full text-sm font-medium transition-opacity flex items-center gap-2 mx-auto cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-fg)',
                    color: 'var(--color-bg)',
                  }}
                >
                  Boshlash
                </button>
              )}

              {loading && (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full animate-spin"
                    style={{
                      border: '2px solid var(--color-border)',
                      borderTopColor: 'var(--color-fg)',
                    }}
                  />
                  <span className="text-muted text-xs">
                    AI model yuklanmoqda...
                  </span>
                </div>
              )}

              {error && (
                <div className="text-center">
                  <p className="text-sm" style={{ color: '#f472b6' }}>
                    Kameraga ruxsat berilmadi
                  </p>
                  <p className="text-muted text-xs mt-2 mb-4">
                    Davom etish uchun kameraga ruxsat bering.
                  </p>
                  <button
                    onClick={() => { setError(null); handleStart(); }}
                    className="px-5 py-2 rounded-full text-xs font-medium cursor-pointer"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    Qayta urinish
                  </button>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="flex gap-6 mt-6">
              {[
                { label: '5 rejim' },
                { label: '3D effekt' },
                { label: 'AI MediaPipe' },
              ].map((f) => (
                <span key={f.label} className="text-muted text-xs">
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* App canvases — always mounted, visible only when started */}
      <div ref={appRef} className={`fixed inset-0 ${started ? '' : 'invisible pointer-events-none'}`} style={{ backgroundColor: '#06060f', zIndex: started ? 50 : -1 }}>
        <canvas ref={bgCanvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)', opacity: 0.1 }}
        />
        <canvas ref={pCanvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
        <canvas
          ref={hCanvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'scaleX(-1)', zIndex: 2 }}
        />
        {started && (
          <>
            <Link
              href="/studio"
              className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 text-muted hover:opacity-70 transition-opacity text-sm"
            >
              <ArrowLeft size={16} />
              {t('back')}
            </Link>
            <button
              onClick={() => {
                const newMode = mode === 1 ? 2 : 1;
                setMode(newMode);
                engineRef.current?.setMode(newMode);
              }}
              className="absolute top-6 right-6 z-50 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                backdropFilter: 'blur(8px)',
              }}
            >
              {mode === 1 ? '3D' : 'Zarrachalar'}
            </button>
            {mode === 2 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                {(['cube', 'sphere', 'pyramid', 'cylinder', 'torus', 'cone'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setShape(s);
                      engineRef.current?.setShape(s);
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all"
                    style={{
                      backgroundColor: shape === s ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      border: shape === s ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#fff',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {{ cube: 'Kub', sphere: 'Shar', pyramid: 'Piramida', cylinder: 'Silindr', torus: 'Torus', cone: 'Konus' }[s]}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// =========== Script Loader ===========
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(script);
  });
}

// =========== Particle Engine ===========
function createEngine(
  pCanvas: HTMLCanvasElement,
  hCanvas: HTMLCanvasElement,
  bgCanvas: HTMLCanvasElement,
  video: HTMLVideoElement,
) {
  const pCtx = pCanvas.getContext('2d')!;
  const hCtx = hCanvas.getContext('2d')!;
  const bgCtx = bgCanvas.getContext('2d')!;

  let destroyed = false;
  let animId = 0;
  let currentMode: 1 | 2 = 1;

  // Cube state
  let cubeRotX = -0.4;
  let cubeRotY = 0.6;
  let cubeVelX = 0;
  let cubeVelY = 0;
  let cubeScale = 1;
  let cubeTargetScale = 1;
  let prevPalmX = -1;
  let prevPalmY = -1;
  let cubeHandActive = false;
  // Zoom gesture state
  let zoomPinched = false;
  let zoomHoldStart = 0;
  let zoomDirection: 'none' | 'in' | 'out' = 'none';
  let zoomBaselineDist = 0;
  let zoomBaselineScale = 1;
  let zoomPeakDist = 0; // ratchet: max dist for 'in', min dist for 'out'
  // Zone-crossing swipe state
  let swipePhase: 'none' | 'outside' | 'crossing' = 'none';
  let swipeEntryPalmX = 0;
  let swipeEntryPalmY = 0;
  let swipeEntryTime = 0;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
  const MAX_PARTICLES = isMobile ? 1000 : 3000;

  interface Particle {
    x: number; y: number; vx: number; vy: number;
    size: number; color: string; rgb: { r: number; g: number; b: number };
    alpha: number; life: number; decay: number;
    permanent: boolean; hasTrail: boolean; trail: { x: number; y: number; alpha: number }[];
    z: number; shape: string;
    twinkle?: number;
    spherePhi?: number; sphereTheta?: number;
    saturnRole?: 'body' | 'ring';
    katovBaseZ?: number;
    textTargetX?: number; textTargetY?: number; textTargetZ?: number;
  }

  let particles: Particle[] = [];
  let attractTarget: { x: number; y: number } | null = null;
  let twoHandMidpoint: { x: number; y: number } | null = null;
  let textFormation: { cx: number; cy: number; text: string } | null = null;
  let snowMode = false;
  let wasBothFist = false;
  let blastEffect: { x: number; y: number; time: number } | null = null;
  let lastRandomText = '';
  let prevTextGesture = '';

  const randomTexts = ['SALOM', 'YOQDIMI?', 'ZERIKMAYAPSIZMI?'];

  // Returns points centered at (0,0)
  function getTextPoints(text: string, maxW: number) {
    const tmp = document.createElement('canvas');
    const size = isMobile ? Math.min(maxW * 0.7, 500) : Math.min(maxW * 0.9, 800);
    tmp.width = size; tmp.height = size * 0.4;
    const tc = tmp.getContext('2d')!;
    let fontSize = Math.floor(tmp.height * 0.7);
    tc.font = `900 ${fontSize}px 'Inter', sans-serif`;
    while (tc.measureText(text).width > tmp.width * 0.9 && fontSize > 12) {
      fontSize -= 2;
      tc.font = `900 ${fontSize}px 'Inter', sans-serif`;
    }
    tc.textAlign = 'center'; tc.textBaseline = 'middle';
    tc.fillStyle = '#fff';
    tc.fillText(text, tmp.width / 2, tmp.height / 2);
    const imgData = tc.getImageData(0, 0, tmp.width, tmp.height).data;
    const pts: { x: number; y: number }[] = [];
    let step = isMobile ? 2 : 3;
    while (step < 12) {
      pts.length = 0;
      for (let y = 0; y < tmp.height; y += step) {
        for (let x = 0; x < tmp.width; x += step) {
          if (imgData[(y * tmp.width + x) * 4 + 3] > 128) {
            pts.push({ x: x - tmp.width / 2, y: y - tmp.height / 2 });
          }
        }
      }
      if (pts.length <= MAX_PARTICLES) break;
      step++;
    }
    return pts;
  }

  // Returns smiley face points centered at (0,0)
  function getSmileyPoints(radius: number) {
    const tmp = document.createElement('canvas');
    const size = Math.ceil(radius * 3);
    tmp.width = size; tmp.height = size;
    const tc = tmp.getContext('2d')!;
    const cx = size / 2, cy = size / 2, r = radius;

    tc.fillStyle = '#fff'; tc.strokeStyle = '#fff';

    // Thick face outline
    tc.lineWidth = r * 0.12;
    tc.beginPath(); tc.arc(cx, cy, r, 0, Math.PI * 2); tc.stroke();

    // Left eye - oval
    tc.beginPath(); tc.ellipse(cx - r * 0.32, cy - r * 0.2, r * 0.08, r * 0.14, 0, 0, Math.PI * 2); tc.fill();

    // Right eye - oval
    tc.beginPath(); tc.ellipse(cx + r * 0.32, cy - r * 0.2, r * 0.08, r * 0.14, 0, 0, Math.PI * 2); tc.fill();

    // Wide smile
    tc.lineWidth = r * 0.1;
    tc.lineCap = 'round';
    tc.beginPath(); tc.arc(cx, cy, r * 0.52, 0.2 * Math.PI, 0.8 * Math.PI); tc.stroke();

    const imgData = tc.getImageData(0, 0, size, size).data;
    const pts: { x: number; y: number }[] = [];
    // Adaptive step: ensure points fit within particle count
    let step = 3;
    while (step < 12) {
      pts.length = 0;
      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          if (imgData[(y * size + x) * 4 + 3] > 60) {
            pts.push({ x: x - cx, y: y - cy });
          }
        }
      }
      if (pts.length <= MAX_PARTICLES) break;
      step++;
    }
    return pts;
  }

  // Returns heart shape points centered at (0,0)
  function getHeartPoints(radius: number) {
    const tmp = document.createElement('canvas');
    const size = Math.ceil(radius * 3);
    tmp.width = size; tmp.height = size;
    const tc = tmp.getContext('2d')!;
    const cx = size / 2, cy = size / 2;

    tc.fillStyle = '#fff';
    tc.beginPath();
    // Heart using parametric equation: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
    const scale = radius * 0.065;
    for (let t = 0; t <= Math.PI * 2; t += 0.01) {
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const px = cx + hx * scale;
      const py = cy + hy * scale;
      if (t === 0) tc.moveTo(px, py);
      else tc.lineTo(px, py);
    }
    tc.closePath();
    tc.fill();
    // Thick outline for more visible particles
    tc.strokeStyle = '#fff';
    tc.lineWidth = radius * 0.08;
    tc.stroke();

    const imgData = tc.getImageData(0, 0, size, size).data;
    const pts: { x: number; y: number }[] = [];
    let step = 3;
    while (step < 12) {
      pts.length = 0;
      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          if (imgData[(y * size + x) * 4 + 3] > 60) {
            pts.push({ x: x - cx, y: y - cy });
          }
        }
      }
      if (pts.length <= MAX_PARTICLES) break;
      step++;
    }
    return pts;
  }

  // Returns square outline points centered at (0,0)
  function getSquarePoints(size: number) {
    const pts: { x: number; y: number }[] = [];
    const half = size / 2;
    const step = 3;
    // Four edges
    for (let i = -half; i <= half; i += step) {
      pts.push({ x: i, y: -half }); // top
      pts.push({ x: i, y: half });  // bottom
      pts.push({ x: -half, y: i }); // left
      pts.push({ x: half, y: i });  // right
    }
    return pts;
  }

  // Returns circle outline points centered at (0,0)
  function getCirclePoints(radius: number) {
    const pts: { x: number; y: number }[] = [];
    const count = Math.floor(radius * 2.5);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pts.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
    }
    return pts;
  }

  // =========== 3D Shape Geometry ===========
  const SHAPE_SCALE = isMobile ? 100 : 150;

  interface CubePoint {
    x: number; y: number; z: number;
    isEdge: boolean;
    faceIdx: number;
    twinkle: number;
  }

  interface ShapeData {
    points: CubePoint[];
    colors: { r: number; g: number; b: number }[];
    normals: [number, number, number][];
  }

  // ---- Cube ----
  function generateCubePoints(): ShapeData {
    const S = SHAPE_SCALE;
    const pts: CubePoint[] = [];
    const faces: { o: [number, number, number]; u: [number, number, number]; v: [number, number, number] }[] = [
      { o: [-S, -S, -S], u: [2 * S, 0, 0], v: [0, 2 * S, 0] },
      { o: [-S, -S, S], u: [2 * S, 0, 0], v: [0, 2 * S, 0] },
      { o: [-S, -S, -S], u: [2 * S, 0, 0], v: [0, 0, 2 * S] },
      { o: [-S, S, -S], u: [2 * S, 0, 0], v: [0, 0, 2 * S] },
      { o: [-S, -S, -S], u: [0, 2 * S, 0], v: [0, 0, 2 * S] },
      { o: [S, -S, -S], u: [0, 2 * S, 0], v: [0, 0, 2 * S] },
    ];
    const gridN = isMobile ? 10 : 14;
    for (let fi = 0; fi < faces.length; fi++) {
      const f = faces[fi];
      for (let i = 0; i <= gridN; i++) {
        for (let j = 0; j <= gridN; j++) {
          const u = i / gridN, v = j / gridN;
          const isEdge = i === 0 || i === gridN || j === 0 || j === gridN;
          pts.push({
            x: f.o[0] + f.u[0] * u + f.v[0] * v,
            y: f.o[1] + f.u[1] * u + f.v[1] * v,
            z: f.o[2] + f.u[2] * u + f.v[2] * v,
            isEdge, faceIdx: fi, twinkle: Math.random() * Math.PI * 2,
          });
        }
      }
    }
    return {
      points: pts,
      colors: [
        { r: 200, g: 200, b: 210 }, { r: 180, g: 200, b: 230 },
        { r: 200, g: 210, b: 190 }, { r: 210, g: 195, b: 210 },
        { r: 195, g: 205, b: 215 }, { r: 215, g: 205, b: 195 },
      ],
      normals: [[0, 0, -1], [0, 0, 1], [0, -1, 0], [0, 1, 0], [-1, 0, 0], [1, 0, 0]],
    };
  }

  // ---- Sphere ----
  function generateSpherePoints(): ShapeData {
    const R = SHAPE_SCALE;
    const pts: CubePoint[] = [];
    const latBands = 8;
    const lonSteps = isMobile ? 18 : 26;
    const latSteps = isMobile ? 12 : 18;
    for (let i = 0; i <= latSteps; i++) {
      const phi = (i / latSteps) * Math.PI;
      const isEdgeLat = i === 0 || i === latSteps;
      const band = Math.min(latBands - 1, Math.floor((i / latSteps) * latBands));
      for (let j = 0; j < lonSteps; j++) {
        const theta = (j / lonSteps) * Math.PI * 2;
        pts.push({
          x: R * Math.sin(phi) * Math.cos(theta),
          y: R * Math.cos(phi),
          z: R * Math.sin(phi) * Math.sin(theta),
          isEdge: isEdgeLat || j % Math.floor(lonSteps / 4) === 0,
          faceIdx: band, twinkle: Math.random() * Math.PI * 2,
        });
      }
    }
    const colors = [];
    const normals: [number, number, number][] = [];
    for (let b = 0; b < latBands; b++) {
      const t = b / (latBands - 1);
      colors.push({ r: Math.round(180 + 30 * t), g: Math.round(195 + 15 * Math.sin(t * Math.PI)), b: Math.round(220 - 30 * t) });
      const midPhi = ((b + 0.5) / latBands) * Math.PI;
      normals.push([0, Math.cos(midPhi), Math.sin(midPhi)]);
    }
    return { points: pts, colors, normals };
  }

  // ---- Pyramid ----
  function generatePyramidPoints(): ShapeData {
    const S = SHAPE_SCALE;
    const H = S * 1.4;
    const pts: CubePoint[] = [];
    const gridN = isMobile ? 10 : 14;
    const apex: [number, number, number] = [0, -H, 0];
    const base: [number, number, number][] = [[-S, H * 0.4, -S], [S, H * 0.4, -S], [S, H * 0.4, S], [-S, H * 0.4, S]];
    // 4 side faces
    for (let fi = 0; fi < 4; fi++) {
      const b0 = base[fi], b1 = base[(fi + 1) % 4];
      for (let i = 0; i <= gridN; i++) {
        for (let j = 0; j <= gridN; j++) {
          const u = i / gridN, v = j / gridN;
          const edgeU = u * (1 - v);
          const bx = b0[0] + (b1[0] - b0[0]) * edgeU;
          const by = b0[1] + (b1[1] - b0[1]) * edgeU;
          const bz = b0[2] + (b1[2] - b0[2]) * edgeU;
          pts.push({
            x: bx + (apex[0] - bx) * v,
            y: by + (apex[1] - by) * v,
            z: bz + (apex[2] - bz) * v,
            isEdge: i === 0 || i === gridN || j === 0 || j === gridN,
            faceIdx: fi, twinkle: Math.random() * Math.PI * 2,
          });
        }
      }
    }
    // Base face
    for (let i = 0; i <= gridN; i++) {
      for (let j = 0; j <= gridN; j++) {
        const u = i / gridN, v = j / gridN;
        pts.push({
          x: -S + 2 * S * u, y: H * 0.4, z: -S + 2 * S * v,
          isEdge: i === 0 || i === gridN || j === 0 || j === gridN,
          faceIdx: 4, twinkle: Math.random() * Math.PI * 2,
        });
      }
    }
    const sideNormals: [number, number, number][] = [[0, 0.4, -1], [1, 0.4, 0], [0, 0.4, 1], [-1, 0.4, 0]];
    const normals: [number, number, number][] = sideNormals.map(n => {
      const len = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
      return [n[0] / len, n[1] / len, n[2] / len];
    });
    normals.push([0, 1, 0]);
    return {
      points: pts,
      colors: [
        { r: 220, g: 195, b: 180 }, { r: 195, g: 210, b: 200 },
        { r: 200, g: 195, b: 220 }, { r: 210, g: 210, b: 195 },
        { r: 190, g: 200, b: 210 },
      ],
      normals,
    };
  }

  // ---- Cylinder ----
  function generateCylinderPoints(): ShapeData {
    const R = SHAPE_SCALE * 0.7;
    const H = SHAPE_SCALE;
    const pts: CubePoint[] = [];
    const segments = 6;
    const angSteps = isMobile ? 20 : 30;
    const hSteps = isMobile ? 10 : 16;
    // Side surface
    for (let i = 0; i <= hSteps; i++) {
      const y = -H + (2 * H * i) / hSteps;
      for (let j = 0; j < angSteps; j++) {
        const theta = (j / angSteps) * Math.PI * 2;
        const seg = Math.min(segments - 1, Math.floor((j / angSteps) * segments));
        pts.push({
          x: R * Math.cos(theta), y, z: R * Math.sin(theta),
          isEdge: i === 0 || i === hSteps,
          faceIdx: seg, twinkle: Math.random() * Math.PI * 2,
        });
      }
    }
    // Top and bottom caps
    const capSteps = isMobile ? 6 : 10;
    for (let cap = 0; cap < 2; cap++) {
      const cy = cap === 0 ? -H : H;
      const fi = segments + cap;
      for (let ri = 0; ri <= capSteps; ri++) {
        const r = (ri / capSteps) * R;
        const count = Math.max(1, Math.floor(angSteps * (ri / capSteps)));
        for (let j = 0; j < count; j++) {
          const theta = (j / count) * Math.PI * 2;
          pts.push({
            x: r * Math.cos(theta), y: cy, z: r * Math.sin(theta),
            isEdge: ri === capSteps,
            faceIdx: fi, twinkle: Math.random() * Math.PI * 2,
          });
        }
      }
    }
    const colors = [];
    const normals: [number, number, number][] = [];
    for (let s = 0; s < segments; s++) {
      const t = s / segments;
      colors.push({ r: Math.round(190 + 25 * Math.cos(t * Math.PI * 2)), g: Math.round(200 + 15 * Math.sin(t * Math.PI * 2)), b: Math.round(210 + 10 * Math.cos(t * Math.PI)) });
      const midTheta = ((s + 0.5) / segments) * Math.PI * 2;
      normals.push([Math.cos(midTheta), 0, Math.sin(midTheta)]);
    }
    colors.push({ r: 195, g: 205, b: 220 }); normals.push([0, -1, 0]); // bottom cap
    colors.push({ r: 210, g: 200, b: 195 }); normals.push([0, 1, 0]);  // top cap
    return { points: pts, colors, normals };
  }

  // ---- Torus ----
  function generateTorusPoints(): ShapeData {
    const majorR = SHAPE_SCALE * 0.8;
    const minorR = SHAPE_SCALE * 0.35;
    const pts: CubePoint[] = [];
    const segments = 6;
    const majSteps = isMobile ? 20 : 32;
    const minSteps = isMobile ? 10 : 16;
    for (let i = 0; i < majSteps; i++) {
      const phi = (i / majSteps) * Math.PI * 2;
      const seg = Math.min(segments - 1, Math.floor((i / majSteps) * segments));
      for (let j = 0; j <= minSteps; j++) {
        const theta = (j / minSteps) * Math.PI * 2;
        const r = majorR + minorR * Math.cos(theta);
        pts.push({
          x: r * Math.cos(phi),
          y: minorR * Math.sin(theta),
          z: r * Math.sin(phi),
          isEdge: j === 0 || j === minSteps,
          faceIdx: seg, twinkle: Math.random() * Math.PI * 2,
        });
      }
    }
    const colors = [];
    const normals: [number, number, number][] = [];
    for (let s = 0; s < segments; s++) {
      const t = s / segments;
      colors.push({ r: Math.round(200 + 20 * Math.sin(t * Math.PI * 2)), g: Math.round(195 + 20 * Math.cos(t * Math.PI)), b: Math.round(210 + 15 * Math.sin(t * Math.PI * 3)) });
      const midPhi = ((s + 0.5) / segments) * Math.PI * 2;
      normals.push([Math.cos(midPhi), 0, Math.sin(midPhi)]);
    }
    return { points: pts, colors, normals };
  }

  // ---- Cone ----
  function generateConePoints(): ShapeData {
    const R = SHAPE_SCALE * 0.8;
    const H = SHAPE_SCALE * 1.3;
    const pts: CubePoint[] = [];
    const segments = 6;
    const angSteps = isMobile ? 20 : 30;
    const hSteps = isMobile ? 12 : 18;
    // Side surface (radius tapers to 0 at top)
    for (let i = 0; i <= hSteps; i++) {
      const t = i / hSteps;
      const y = H * 0.5 - H * t;
      const r = R * (1 - t);
      if (r < 1 && i < hSteps) continue;
      const count = Math.max(1, Math.floor(angSteps * Math.max(0.1, 1 - t)));
      for (let j = 0; j < count; j++) {
        const theta = (j / count) * Math.PI * 2;
        const seg = Math.min(segments - 1, Math.floor((j / count) * segments));
        pts.push({
          x: r * Math.cos(theta), y, z: r * Math.sin(theta),
          isEdge: i === 0 || i === hSteps || j % Math.floor(count / 4) === 0,
          faceIdx: seg, twinkle: Math.random() * Math.PI * 2,
        });
      }
    }
    // Base cap
    const capSteps = isMobile ? 6 : 10;
    for (let ri = 0; ri <= capSteps; ri++) {
      const r = (ri / capSteps) * R;
      const count = Math.max(1, Math.floor(angSteps * (ri / capSteps)));
      for (let j = 0; j < count; j++) {
        const theta = (j / count) * Math.PI * 2;
        pts.push({
          x: r * Math.cos(theta), y: H * 0.5, z: r * Math.sin(theta),
          isEdge: ri === capSteps,
          faceIdx: segments, twinkle: Math.random() * Math.PI * 2,
        });
      }
    }
    const colors = [];
    const normals: [number, number, number][] = [];
    const slopeAngle = Math.atan2(R, H);
    for (let s = 0; s < segments; s++) {
      const t = s / segments;
      colors.push({ r: Math.round(205 + 15 * Math.cos(t * Math.PI * 2)), g: Math.round(200 + 15 * Math.sin(t * Math.PI * 2)), b: Math.round(195 + 20 * t) });
      const midTheta = ((s + 0.5) / segments) * Math.PI * 2;
      normals.push([Math.cos(midTheta) * Math.cos(slopeAngle), -Math.sin(slopeAngle), Math.sin(midTheta) * Math.cos(slopeAngle)]);
    }
    colors.push({ r: 195, g: 205, b: 215 }); normals.push([0, 1, 0]); // base
    return { points: pts, colors, normals };
  }

  // ---- Shape registry ----
  const allShapes: Record<string, ShapeData> = {
    cube: generateCubePoints(),
    sphere: generateSpherePoints(),
    pyramid: generatePyramidPoints(),
    cylinder: generateCylinderPoints(),
    torus: generateTorusPoints(),
    cone: generateConePoints(),
  };
  let currentShapeName = 'cube';
  let activeShape: ShapeData = allShapes.cube;

  function rotateXMat(p: [number, number, number], a: number): [number, number, number] {
    const c = Math.cos(a), s = Math.sin(a);
    return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
  }

  function rotateYMat(p: [number, number, number], a: number): [number, number, number] {
    const c = Math.cos(a), s = Math.sin(a);
    return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
  }

  function renderShape() {
    const W = pCanvas.width, H = pCanvas.height;
    const cx = W / 2, cy = H / 2;
    const S = SHAPE_SCALE;
    const shape = activeShape;

    pCtx.clearRect(0, 0, W, H);
    pCtx.globalCompositeOperation = 'lighter';

    const now = performance.now();

    // Compute rotated face normals for face brightness
    const rotatedNormals = shape.normals.map(n => {
      let r = rotateXMat(n, cubeRotX);
      r = rotateYMat(r, cubeRotY);
      return r;
    });
    const faceFacing = rotatedNormals.map(n => -n[2]);

    const transformed: { sx: number; sy: number; z: number; isEdge: boolean; faceIdx: number; twinkle: number }[] = [];

    for (const pt of shape.points) {
      let r = rotateXMat([pt.x, pt.y, pt.z], cubeRotX);
      r = rotateYMat(r, cubeRotY);
      transformed.push({
        sx: cx + r[0] * cubeScale,
        sy: cy + r[1] * cubeScale,
        z: r[2],
        isEdge: pt.isEdge,
        faceIdx: pt.faceIdx,
        twinkle: pt.twinkle,
      });
    }

    transformed.sort((a, b) => a.z - b.z);

    for (const pt of transformed) {
      const depthNorm = (pt.z + S) / (2 * S);
      const depthScale = 0.3 + 1.7 * Math.max(0, Math.min(1, depthNorm));
      const depthAlpha = 0.2 + 0.8 * Math.max(0, Math.min(1, depthNorm));
      const twinkleVal = 0.7 + 0.3 * Math.sin(pt.twinkle + now * 0.003);

      const facing = Math.max(0, faceFacing[pt.faceIdx] ?? 0);
      const faceAlpha = 0.15 + 0.85 * facing;

      const fc = shape.colors[pt.faceIdx] ?? shape.colors[0];
      const baseSize = pt.isEdge ? 2.0 : 1.2;
      const size = baseSize * depthScale;
      const alpha = (pt.isEdge ? 1.0 : 0.6) * depthAlpha * twinkleVal * faceAlpha;

      pCtx.globalAlpha = alpha;
      pCtx.fillStyle = `rgb(${fc.r}, ${fc.g}, ${fc.b})`;
      pCtx.beginPath();
      pCtx.arc(pt.sx, pt.sy, size, 0, Math.PI * 2);
      pCtx.fill();
    }

    // Draw subtle zone indicator
    pCtx.globalCompositeOperation = 'source-over';
    const zoneRadius = Math.min(W, H) * 0.15;
    pCtx.globalAlpha = 0.08;
    pCtx.strokeStyle = '#fff';
    pCtx.lineWidth = 1;
    pCtx.setLineDash([6, 6]);
    pCtx.beginPath();
    pCtx.arc(cx, cy, zoneRadius, 0, Math.PI * 2);
    pCtx.stroke();
    pCtx.setLineDash([]);

    pCtx.globalAlpha = 1;
  }

  function processCubeHand(lm: { x: number; y: number }[], W: number, H: number) {
    const palmX = (1 - lm[9].x) * W;
    const palmY = lm[9].y * H;
    const cx = W / 2;
    const cy = H / 2;

    // Zone-crossing swipe rotation
    const zoneRadius = Math.min(W, H) * 0.15;
    const distFromCenter = Math.hypot(palmX - cx, palmY - cy);
    const isInZone = distFromCenter < zoneRadius;

    if (prevPalmX < 0) {
      // First frame: initialize swipe phase
      swipePhase = isInZone ? 'none' : 'outside';
    } else {
      if (swipePhase === 'none') {
        // Waiting for hand to be outside zone first
        if (!isInZone) swipePhase = 'outside';
      } else if (swipePhase === 'outside') {
        if (isInZone) {
          // Hand entered zone from outside — start tracking
          swipePhase = 'crossing';
          swipeEntryPalmX = palmX;
          swipeEntryPalmY = palmY;
          swipeEntryTime = performance.now();
        }
      } else if (swipePhase === 'crossing') {
        if (!isInZone) {
          // Hand exited zone — check if it crossed to the opposite side
          const entryRelX = swipeEntryPalmX - cx;
          const entryRelY = swipeEntryPalmY - cy;
          const exitRelX = palmX - cx;
          const exitRelY = palmY - cy;

          const crossedX = (entryRelX * exitRelX) < 0;
          const crossedY = (entryRelY * exitRelY) < 0;

          if (crossedX || crossedY) {
            // Valid swipe! Calculate impulse from speed
            const elapsed = Math.max(50, performance.now() - swipeEntryTime);
            const swipeDist = Math.hypot(palmX - swipeEntryPalmX, palmY - swipeEntryPalmY);
            const speed = swipeDist / elapsed; // px per ms

            const impulseBase = 0.012;
            const impulseMax = 0.07;
            const impulse = Math.min(impulseMax, impulseBase + speed * 0.01);

            if (crossedX) {
              cubeVelY += (exitRelX > 0 ? 1 : -1) * impulse;
            }
            if (crossedY) {
              cubeVelX += (exitRelY > 0 ? -1 : 1) * impulse;
            }

            // Cap velocity
            const maxVel = 0.1;
            cubeVelX = Math.max(-maxVel, Math.min(maxVel, cubeVelX));
            cubeVelY = Math.max(-maxVel, Math.min(maxVel, cubeVelY));
          }

          swipePhase = 'outside';
        }
      }
    }

    // Detect palm movement speed
    const palmSpeed = prevPalmX >= 0 ? Math.hypot(palmX - prevPalmX, palmY - prevPalmY) : 0;
    const palmStill = palmSpeed < 25; // px per frame — generous for natural hand tremor

    prevPalmX = palmX;
    prevPalmY = palmY;

    // Zoom: only works when palm is stationary
    // pinch 1s → zoom-in mode, open 1s → zoom-out mode
    // Once active: each pinch→open = +10% (in mode), each open→pinch = -10% (out mode)
    const pinchDist = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y);
    const isPinched = pinchDist < 0.06;
    const now = performance.now();

    if (!palmStill) {
      // Palm moving — reset zoom hold timer, don't process zoom
      zoomHoldStart = 0;
    } else {
      if (isPinched !== zoomPinched) {
        const wasPinched = zoomPinched;
        zoomPinched = isPinched;
        zoomHoldStart = now;

        // If zoom mode already active, apply step on each transition
        if (zoomDirection === 'in' && wasPinched && !isPinched) {
          cubeTargetScale = Math.min(3.0, cubeTargetScale * 1.1);
        } else if (zoomDirection === 'out' && !wasPinched && isPinched) {
          cubeTargetScale = Math.max(0.3, cubeTargetScale / 1.1);
        }
      }

      if (zoomDirection === 'none') {
        if (zoomHoldStart > 0 && now - zoomHoldStart >= 1000) {
          zoomDirection = isPinched ? 'in' : 'out';
          zoomHoldStart = 0;
        }
      } else {
        if (zoomDirection === 'in' && !isPinched && zoomHoldStart > 0 && now - zoomHoldStart >= 1000) {
          zoomDirection = 'out';
          zoomHoldStart = 0;
        } else if (zoomDirection === 'out' && isPinched && zoomHoldStart > 0 && now - zoomHoldStart >= 1000) {
          zoomDirection = 'in';
          zoomHoldStart = 0;
        }
      }
    }

    cubeHandActive = true;
  }

  const handState = [
    { gesture: 'none', prevGesture: 'none', smoothX: 0, smoothY: 0, pinchTrail: [] as { x: number; y: number }[] },
    { gesture: 'none', prevGesture: 'none', smoothX: 0, smoothY: 0, pinchTrail: [] as { x: number; y: number }[] },
  ];

  const HAND_COLLISION_SEGS = [
    [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],
    [5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],
    [13,17],[17,18],[18,19],[19,20],[0,17],
    [1,5],[0,9],[5,13],[5,17],[1,9],[9,17],
  ];
  const PALM_POLY_IDX = [0, 1, 5, 9, 13, 17];

  const neonColors = [
    { r: 200, g: 200, b: 210 },
    { r: 190, g: 195, b: 205 },
    { r: 210, g: 210, b: 215 },
  ];

  function resize() {
    pCanvas.width = hCanvas.width = bgCanvas.width = window.innerWidth;
    pCanvas.height = hCanvas.height = bgCanvas.height = window.innerHeight;
  }

  function drawBg() {
    bgCtx.fillStyle = '#06060f';
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
  }

  function closestPointOnSegment(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
    const dx = bx - ax, dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    if (lenSq < 0.001) return { x: ax, y: ay };
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
    return { x: ax + t * dx, y: ay + t * dy };
  }

  function isInsidePolygon(px: number, py: number, verts: { x: number; y: number }[]) {
    let inside = false;
    for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
      if ((verts[i].y > py) !== (verts[j].y > py) &&
        px < (verts[j].x - verts[i].x) * (py - verts[i].y) / (verts[j].y - verts[i].y) + verts[i].x) {
        inside = !inside;
      }
    }
    return inside;
  }

  function repelFromHandSegments(lm: { x: number; y: number }[], W: number, H: number) {
    const SOLID = 42, SOFT = 140;
    const coords: { x: number; y: number }[] = [];
    for (let i = 0; i < 21; i++) {
      coords.push({ x: (1 - lm[i].x) * W, y: lm[i].y * H });
    }
    const palmPoly = PALM_POLY_IDX.map(i => coords[i]);
    const palmCx = palmPoly.reduce((s, v) => s + v.x, 0) / palmPoly.length;
    const palmCy = palmPoly.reduce((s, v) => s + v.y, 0) / palmPoly.length;

    for (const p of particles) {
      if (isInsidePolygon(p.x, p.y, palmPoly)) {
        const dx = p.x - palmCx, dy = p.y - palmCy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.01) {
          const nx = dx / dist, ny = dy / dist;
          p.vx += nx * 8; p.vy += ny * 8;
          p.x += nx * 6; p.y += ny * 6;
        } else {
          const angle = Math.random() * Math.PI * 2;
          p.vx += Math.cos(angle) * 8; p.vy += Math.sin(angle) * 8;
        }
        continue;
      }

      let minDist = Infinity, bestNx = 0, bestNy = 0, bestCx = 0, bestCy = 0;
      for (const [a, b] of HAND_COLLISION_SEGS) {
        const cp = closestPointOnSegment(p.x, p.y, coords[a].x, coords[a].y, coords[b].x, coords[b].y);
        const dx = p.x - cp.x, dy = p.y - cp.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist; bestCx = cp.x; bestCy = cp.y;
          bestNx = dist > 0.01 ? dx / dist : 0;
          bestNy = dist > 0.01 ? dy / dist : 0;
        }
      }

      const toParticleX = p.x - palmCx, toParticleY = p.y - palmCy;
      if (bestNx * toParticleX + bestNy * toParticleY < 0) {
        bestNx = -bestNx; bestNy = -bestNy;
      }

      if (minDist < SOLID && minDist > 0.01) {
        const push = Math.max(0, SOLID - minDist);
        p.x += bestNx * push * 0.5; p.y += bestNy * push * 0.5;
        const dot = p.vx * bestNx + p.vy * bestNy;
        if (dot < 0) { p.vx -= 1.8 * dot * bestNx; p.vy -= 1.8 * dot * bestNy; }
        p.vx += bestNx * 3; p.vy += bestNy * 3;
      } else if (minDist < SOFT) {
        const falloff = (SOFT - minDist) / (SOFT - SOLID);
        const force = falloff * falloff * 4.0;
        p.vx += bestNx * force; p.vy += bestNy * force;
      }
    }
  }

  function spawnParticle(x: number, y: number, type = 'draw') {
    if (particles.length >= MAX_PARTICLES) return;
    const rgb = neonColors[Math.floor(Math.random() * neonColors.length)];
    const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const p: Particle = { x, y, color, rgb, alpha: 1, life: 1, trail: [], shape: 'circle', vx: 0, vy: 0, size: 1, decay: 0, permanent: false, hasTrail: false, z: 0.5 };

    if (type === 'draw') {
      p.vx = (Math.random() - 0.5) * 0.3; p.vy = (Math.random() - 0.5) * 0.3;
      p.size = 0.9 + Math.random() * 1.8; p.decay = 0; p.permanent = true; p.hasTrail = false;
      p.z = 0.05 + Math.random() * 0.95;
    } else if (type === 'scatter') {
      const angle = Math.random() * Math.PI * 2;
      const speed = 5 + Math.random() * 12;
      p.vx = Math.cos(angle) * speed; p.vy = Math.sin(angle) * speed;
      p.size = 1.2 + Math.random() * 2.4; p.decay = 0.012 + Math.random() * 0.015;
      p.hasTrail = true; p.z = 0.3 + Math.random() * 0.7;
    } else if (type === 'star') {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      p.vx = Math.cos(angle) * speed; p.vy = Math.sin(angle) * speed - 1.5;
      p.size = 1.2 + Math.random() * 2.1; p.decay = 0; p.permanent = true;
      p.hasTrail = false; p.twinkle = Math.random() * Math.PI * 2;
      p.z = 0.1 + Math.random() * 0.9;
    }
    particles.push(p);
  }

  function detectGesture(lm: { x: number; y: number }[]) {
    const T = 0.04;
    const indexUp = lm[8].y < lm[6].y - T;
    const middleUp = lm[12].y < lm[10].y - T;
    const ringUp = lm[16].y < lm[14].y - T;
    const pinkyUp = lm[20].y < lm[18].y - T;
    const palmY = lm[9].y;
    const tipsBelowPalm = lm[8].y > palmY && lm[12].y > palmY && lm[16].y > palmY && lm[20].y > palmY;
    const fourFingersDown = !indexUp && !middleUp && !ringUp && !pinkyUp;
    const isFist = fourFingersDown || tipsBelowPalm;
    const thumbUp = lm[4].y < lm[3].y - 0.03 && lm[4].y < lm[5].y - 0.03;
    if (isFist && !thumbUp) return 'fist';
    if (isFist && thumbUp) return 'thumbs';
    const pinchDist = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y);
    if (pinchDist < 0.06) return 'pinch';
    if (indexUp && middleUp && ringUp && pinkyUp) return 'open';
    if (indexUp && !middleUp && !ringUp && !pinkyUp) return 'point';
    if (indexUp && middleUp && !ringUp && !pinkyUp) return 'peace';
    if (indexUp && middleUp && ringUp && !pinkyUp) return 'three';
    return 'other';
  }

  function processHand(lm: { x: number; y: number }[], handIdx: number, W: number, H: number, now: number, handsCount: number) {
    const hs = handState[handIdx];
    const rawX = (1 - lm[8].x) * W, rawY = lm[8].y * H;
    hs.smoothX += (rawX - hs.smoothX) * 0.45;
    hs.smoothY += (rawY - hs.smoothY) * 0.45;
    const palmX = (1 - lm[9].x) * W, palmY = lm[9].y * H;
    hs.prevGesture = hs.gesture;
    hs.gesture = detectGesture(lm);

    // Formation at center with subtle hand-follow offset
    const fCx = W / 2 + (palmX - W / 2) * 0.25;
    const fCy = H / 2 + (palmY - H / 2) * 0.25;
    if (hs.gesture === 'point' && handsCount === 1) {
      textFormation = { cx: fCx, cy: fCy, text: '__SQUARE__' };
    } else if (hs.gesture === 'peace' && handsCount === 1) {
      textFormation = { cx: fCx, cy: fCy, text: '__CIRCLE__' };
    } else if (hs.gesture === 'three' && handsCount === 1) {
      textFormation = { cx: fCx, cy: fCy, text: '__SMILEY__' };
    } else if (hs.gesture === 'fist' || hs.gesture === 'thumbs' || (hs.gesture === 'pinch' && handsCount === 2)) {
      attractTarget = { x: palmX, y: palmY };
    } else if (hs.gesture === 'pinch' && handsCount === 1) {
      const thumbX = (1 - lm[4].x) * W, thumbY = lm[4].y * H;
      const indexX = (1 - lm[8].x) * W, indexY = lm[8].y * H;
      const pinchX = (thumbX + indexX) / 2, pinchY = (thumbY + indexY) / 2;
      const trail = hs.pinchTrail;
      if (trail.length === 0) {
        trail.push({ x: pinchX, y: pinchY });
      } else {
        const last = trail[trail.length - 1];
        const dd = Math.sqrt((pinchX - last.x) ** 2 + (pinchY - last.y) ** 2);
        if (dd > 3) trail.push({ x: pinchX, y: pinchY });
        trail[trail.length - 1] = { x: pinchX, y: pinchY };
      }
      while (trail.length > 50) trail.shift();

      const trailLengths = [0];
      for (let j = 1; j < trail.length; j++) {
        const dx = trail[j].x - trail[j - 1].x, dy = trail[j].y - trail[j - 1].y;
        trailLengths.push(trailLengths[j - 1] + Math.sqrt(dx * dx + dy * dy));
      }
      const totalTrailLen = trailLengths[trailLengths.length - 1] || 1;
      const total = particles.length;
      const halfCount = Math.ceil(total / 2);
      const windTime = now * 0.003;
      const ROW_GAP = 3;

      for (let i = 0; i < total; i++) {
        const p = particles[i];
        const row = i % 2;
        const idx = Math.floor(i / 2);
        const tNorm = halfCount > 1 ? idx / (halfCount - 1) : 0.5;
        const targetDist = (1 - tNorm) * totalTrailLen;
        let segIdx = trail.length - 1;
        for (let j = trail.length - 1; j > 0; j--) {
          if (trailLengths[trail.length - 1] - trailLengths[j] >= targetDist) { segIdx = j; break; }
        }
        const tx = trail[segIdx].x, ty = trail[segIdx].y;
        let perpX = 0, perpY = 1;
        if (segIdx < trail.length - 1) {
          const sdx = trail[segIdx + 1].x - trail[segIdx].x;
          const sdy = trail[segIdx + 1].y - trail[segIdx].y;
          const sLen = Math.sqrt(sdx * sdx + sdy * sdy);
          if (sLen > 0.5) { perpX = -sdy / sLen; perpY = sdx / sLen; }
        }
        const flutter = Math.sin(tNorm * 8 + windTime) * tNorm * 8 + Math.sin(tNorm * 14 + windTime * 1.5) * tNorm * 3;
        const rowOffset = (row === 0 ? 1 : -1) * ROW_GAP;
        const targetX = tx + perpX * (flutter + rowOffset);
        const targetY = ty + perpY * (flutter + rowOffset);
        const dx = targetX - p.x, dy = targetY - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const pull = d > 300 ? 0.07 : d > 100 ? 0.1 : 0.15;
        p.vx += dx * pull; p.vy += dy * pull;
        p.vx *= 0.82; p.vy *= 0.82;
      }
    } else if (hs.gesture === 'open') {
      repelFromHandSegments(lm, W, H);
      if (hs.prevGesture === 'fist' || hs.prevGesture === 'thumbs') {
        let hasNearby = false;
        for (const p of particles) {
          const dx = p.x - palmX, dy = p.y - palmY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 1 && dist < 600) {
            hasNearby = true;
            const distFactor = Math.max(0.1, 1 - dist / 600);
            const force = (20 + Math.random() * 12) * distFactor;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force; p.vy += Math.sin(angle) * force;
          }
        }
        if (hasNearby) blastEffect = { x: palmX, y: palmY, time: now };
      }
    }
    return hs.gesture;
  }

  function onResults(results: { multiHandLandmarks?: { x: number; y: number }[][] }) {
    const now = performance.now();
    hCtx.clearRect(0, 0, hCanvas.width, hCanvas.height);
    const hands = results.multiHandLandmarks;
    if (!hands || hands.length === 0) {
      handState[0].gesture = 'none'; handState[1].gesture = 'none';
      attractTarget = null; twoHandMidpoint = null; textFormation = null; snowMode = false;
      prevPalmX = -1; prevPalmY = -1; cubeHandActive = false;
      zoomPinched = false; zoomHoldStart = 0; zoomDirection = 'none';
      swipePhase = 'none';
      return;
    }

    // Mode 2: Cube rotation
    if (currentMode === 2) {
      const W = hCanvas.width, H = hCanvas.height;
      processCubeHand(hands[0], W, H);
      return;
    }

    const W = hCanvas.width, H = hCanvas.height;
    attractTarget = null; twoHandMidpoint = null; textFormation = null; snowMode = false;

    for (let h = 0; h < hands.length; h++) {
      processHand(hands[h], h, W, H, now, hands.length);
    }

    if (hands.length === 2) {
      const lm0 = hands[0], lm1 = hands[1];
      const g0 = handState[0].gesture, g1 = handState[1].gesture;
      const p0x = (1 - lm0[9].x) * W, p0y = lm0[9].y * H;
      const p1x = (1 - lm1[9].x) * W, p1y = lm1[9].y * H;
      const midX = (p0x + p1x) / 2, midY = (p0y + p1y) / 2;
      const bothPinch = g0 === 'pinch' && g1 === 'pinch';
      const bothFist = g0 === 'fist' && g1 === 'fist';
      const bothOpen = g0 === 'open' && g1 === 'open';
      const bothPeace = g0 === 'peace' && g1 === 'peace';
      const bothPoint = g0 === 'point' && g1 === 'point';
      const bothThree = g0 === 'three' && g1 === 'three';

      // Heart gesture: both hands' thumb tips close + index tips close (forming a heart shape)
      const thumbDist = Math.hypot(lm0[4].x - lm1[4].x, lm0[4].y - lm1[4].y);
      const indexDist = Math.hypot(lm0[8].x - lm1[8].x, lm0[8].y - lm1[8].y);
      const isHeart = thumbDist < 0.08 && indexDist < 0.08;

      // Formation at center with subtle hand-follow offset
      const fX = W / 2 + (midX - W / 2) * 0.25;
      const fY = H / 2 + (midY - H / 2) * 0.25;
      if (isHeart) {
        textFormation = { cx: fX, cy: fY, text: '__HEART__' };
      } else if (bothThree) {
        textFormation = { cx: fX, cy: fY, text: '__SMILEY__' };
      } else if (bothPeace) {
        textFormation = { cx: fX, cy: fY, text: 'KATOV' };
      } else if (bothPoint) {
        if (prevTextGesture !== 'point') {
          let pick = randomTexts[Math.floor(Math.random() * randomTexts.length)];
          while (pick === lastRandomText && randomTexts.length > 1) {
            pick = randomTexts[Math.floor(Math.random() * randomTexts.length)];
          }
          lastRandomText = pick;
        }
        textFormation = { cx: fX, cy: fY, text: lastRandomText };
      } else if (bothFist) {
        const spawnCount = 4;
        for (let s = 0; s < spawnCount; s++) {
          if (particles.length >= MAX_PARTICLES) break;
          const angle = Math.random() * Math.PI * 2;
          const speed = 4 + Math.random() * 10;
          const rgb = neonColors[Math.floor(Math.random() * neonColors.length)];
          particles.push({
            x: midX + (Math.random() - 0.5) * 10, y: midY + (Math.random() - 0.5) * 10,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            size: 0.9 + Math.random() * 1.8, color: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, rgb,
            alpha: 1, life: 1, decay: 0, permanent: true, hasTrail: false, trail: [],
            z: 0.2 + Math.random() * 0.8, shape: 'circle',
          });
        }
      } else if (bothPinch) {
        twoHandMidpoint = { x: fX, y: fY };
      } else if (bothOpen) {
        snowMode = true;
        twoHandMidpoint = null;
        repelFromHandSegments(lm0, W, H);
        repelFromHandSegments(lm1, W, H);
      }

      prevTextGesture = bothThree ? 'three' : bothPeace ? 'peace' : bothPoint ? 'point' : '';
    } else {
      prevTextGesture = '';
    }

    for (let h = hands.length; h < 2; h++) {
      handState[h].gesture = 'none'; handState[h].prevGesture = 'none';
    }
    if (blastEffect) {
      const elapsed = performance.now() - blastEffect.time;
      if (elapsed / 500 >= 1) blastEffect = null;
    }
  }

  let cachedTextPts: { x: number; y: number }[] = [];
  let cachedTextKey = '';

  function updateParticles() {
    const W = pCanvas.width, H = pCanvas.height;

    if (textFormation) {
      if (textFormation.text !== cachedTextKey) {
        if (textFormation.text === '__SQUARE__') {
          cachedTextPts = getSquarePoints(Math.min(W, H) * (isMobile ? 0.3 : 0.35));
        } else if (textFormation.text === '__CIRCLE__') {
          cachedTextPts = getCirclePoints(Math.min(W, H) * (isMobile ? 0.15 : 0.2));
        } else if (textFormation.text === '__SMILEY__') {
          cachedTextPts = getSmileyPoints(Math.min(W, H) * (isMobile ? 0.15 : 0.25));
        } else if (textFormation.text === '__HEART__') {
          cachedTextPts = getHeartPoints(Math.min(W, H) * (isMobile ? 0.18 : 0.28));
        } else {
          cachedTextPts = getTextPoints(textFormation.text, W);
        }
        cachedTextKey = textFormation.text;
        // Clear old targets so particles rearrange to new text
        for (const pp of particles) { delete pp.textTargetX; delete pp.textTargetY; delete pp.textTargetZ; }
      }
      // Spawn extra particles if not enough to cover all points
      const needed = cachedTextPts.length - particles.length;
      if (needed > 0) {
        const cx = textFormation.cx, cy = textFormation.cy;
        for (let s = 0; s < needed && particles.length < MAX_PARTICLES; s++) {
          const rgb = neonColors[Math.floor(Math.random() * neonColors.length)];
          particles.push({
            x: cx + (Math.random() - 0.5) * 40, y: cy + (Math.random() - 0.5) * 40,
            vx: 0, vy: 0, size: 0.9 + Math.random() * 1.2,
            color: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, rgb,
            alpha: 1, life: 1, decay: 0, permanent: true, hasTrail: false, trail: [],
            z: 0.5, shape: 'circle',
          });
        }
      }
    } else {
      cachedTextKey = '';
      cachedTextPts = [];
    }

    // Snow mode: spawn falling particles from top
    if (snowMode) {
      const spawnCount = isMobile ? 15 : 30;
      for (let s = 0; s < spawnCount; s++) {
        if (particles.length >= MAX_PARTICLES) break;
        const rgb = neonColors[Math.floor(Math.random() * neonColors.length)];
        particles.push({
          x: Math.random() * W, y: -10 - Math.random() * 60,
          vx: (Math.random() - 0.5) * 2, vy: 8 + Math.random() * 10,
          size: 0.5 + Math.random() * 1.2, color: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, rgb,
          alpha: 1, life: 1, decay: 0, permanent: false, hasTrail: true, trail: [],
          z: 0.2 + Math.random() * 0.8, shape: 'circle',
        });
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const zF = 0.15 + 0.85 * (p.z || 0.5);

      if (p.hasTrail && p.life > 0.3) {
        p.trail.push({ x: p.x, y: p.y, alpha: p.alpha });
        if (p.trail.length > 8) p.trail.shift();
      }

      // Rain physics: fast falling, settle at bottom
      if (snowMode && !textFormation && !twoHandMidpoint && !attractTarget) {
        if (p.y < H - p.size * 2) {
          p.vy += 0.3;
          p.vx += (Math.random() - 0.5) * 0.15;
          p.vy *= 0.995;
        } else {
          // Settle at bottom
          p.y = H - p.size * 2;
          p.vy = 0;
          p.vx *= 0.9;
        }
      }

      if (textFormation && cachedTextPts.length > 0) {
        if (p.textTargetX === undefined) {
          // Assign each particle to a unique text point (1:1 mapping)
          const ptIndex = i % cachedTextPts.length;
          const pt = cachedTextPts[ptIndex];
          const nx = pt.x / (W * 0.45);
          const wave = Math.sin(nx * Math.PI * 2.5);
          p.textTargetX = pt.x;
          p.textTargetY = pt.y;
          p.textTargetZ = Math.max(0.45, Math.min(0.95, 0.7 + 0.2 * wave + (Math.random() - 0.5) * 0.06));
        }
        if (p.textTargetX !== undefined) {
          const tx = textFormation.cx + p.textTargetX;
          const ty = textFormation.cy + p.textTargetY!;
          const dx = tx - p.x, dy = ty - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = dist > 200 ? 0.06 : dist > 50 ? 0.1 : 0.14;
          p.vx += dx * pull; p.vy += dy * pull;
          p.vx *= 0.82; p.vy *= 0.82;
          p.z = p.z + (p.textTargetZ! - p.z) * 0.05;
        }
        delete p.spherePhi; delete p.sphereTheta; delete p.saturnRole;
      } else if (twoHandMidpoint) {
        delete p.textTargetX; delete p.textTargetY; delete p.textTargetZ;
        const dx = twoHandMidpoint.x - p.x, dy = twoHandMidpoint.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const bodyR = isMobile ? 45 : 80, ringInner = isMobile ? 85 : 150, ringOuter = isMobile ? 125 : 220;
        const sphereZone = ringOuter * 2;
        const tilt = -0.35; // ~20° tilt, tepadan ko'rinish
        const cosT = Math.cos(tilt), sinT = Math.sin(tilt);

        if (dist < sphereZone && p.spherePhi === undefined) {
          p.spherePhi = Math.acos(2 * Math.random() - 1);
          p.sphereTheta = Math.random() * Math.PI * 2;
          p.saturnRole = Math.random() < 0.4 ? 'ring' : 'body';
        }
        if (dist >= sphereZone * 1.3) { delete p.spherePhi; delete p.sphereTheta; delete p.saturnRole; }

        if (p.spherePhi !== undefined) {
          const now = performance.now();
          const theta = (p.sphereTheta ?? 0) + now * 0.0008;
          let targetX: number, targetY: number, targetZ: number;

          if (p.saturnRole === 'ring') {
            const ringR = ringInner + (p.spherePhi / Math.PI) * (ringOuter - ringInner);
            const rx = ringR * Math.cos(theta);
            const ry = 0;
            const rz = ringR * Math.sin(theta);
            targetX = twoHandMidpoint.x + rx;
            targetY = twoHandMidpoint.y + ry * cosT - rz * sinT;
            targetZ = 0.5 + (ry * sinT + rz * cosT) / ringOuter * 0.47;
          } else {
            const phi = p.spherePhi;
            const lx = bodyR * Math.sin(phi) * Math.cos(theta);
            const ly = bodyR * Math.cos(phi);
            const lz = bodyR * Math.sin(phi) * Math.sin(theta);
            targetX = twoHandMidpoint.x + lx;
            targetY = twoHandMidpoint.y + ly * cosT - lz * sinT;
            targetZ = 0.5 + (ly * sinT + lz * cosT) / bodyR * 0.47;
          }

          const influence = Math.max(0.2, 1 - dist / sphereZone);
          const pullRate = (0.04 + 0.08 * influence) * zF;
          p.vx += (targetX - p.x) * pullRate; p.vy += (targetY - p.y) * pullRate;
          p.z = p.z + (targetZ - p.z) * (0.05 + 0.1 * influence);
        } else {
          if (dist > 5) {
            const strength = Math.min(3.5, 600 / (dist + 10)) * zF;
            const angle = Math.atan2(dy, dx);
            const spiralOffset = 0.5 * Math.min(1, 80 / (dist + 20));
            p.vx += Math.cos(angle + spiralOffset) * strength;
            p.vy += Math.sin(angle + spiralOffset) * strength;
          }
        }
        p.vx *= 0.91; p.vy *= 0.91;
      } else if (attractTarget) {
        delete p.spherePhi; delete p.sphereTheta; delete p.saturnRole;
        delete p.textTargetX; delete p.textTargetY; delete p.textTargetZ;
        const dx = attractTarget.x - p.x, dy = attractTarget.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 3) {
          const strength = Math.min(2.0, 130 / (dist + 15)) * zF;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle + 0.4) * strength;
          p.vy += Math.sin(angle + 0.4) * strength;
        }
        p.vx *= 0.92; p.vy *= 0.92;
        if (dist < 30) {
          const orbitAngle = Math.atan2(p.y - attractTarget.y, p.x - attractTarget.x);
          const pushOut = (30 - dist) * 0.1 * zF;
          p.vx += Math.cos(orbitAngle) * pushOut; p.vy += Math.sin(orbitAngle) * pushOut;
          p.vx += Math.cos(orbitAngle + Math.PI / 2) * 0.5 * zF;
          p.vy += Math.sin(orbitAngle + Math.PI / 2) * 0.5 * zF;
        }
      }

      const maxSpeed = 18;
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > maxSpeed) { p.vx = (p.vx / speed) * maxSpeed; p.vy = (p.vy / speed) * maxSpeed; }

      p.x += p.vx; p.y += p.vy;
      const outMargin = 200;
      if (p.x < -outMargin || p.x > W + outMargin || p.y < -outMargin || p.y > H + outMargin) {
        particles.splice(i, 1); continue;
      }

      if (!p.permanent) {
        p.vy += 0.03; p.vx *= 0.992; p.vy *= 0.992;
        p.life -= p.decay; p.alpha = Math.max(0, p.life);
      } else {
        const zFactor = 0.15 + 0.85 * (p.z || 0.5); // near particles drift much more
        p.vx *= 0.93; p.vy *= 0.93;
        p.vx += (Math.random() - 0.5) * 0.08 * zFactor;
        p.vy += ((Math.random() - 0.5) * 0.08 - 0.015) * zFactor;
        if (!textFormation && !twoHandMidpoint && !attractTarget) {
          delete p.textTargetX; delete p.textTargetY; delete p.textTargetZ;
          delete p.spherePhi; delete p.sphereTheta; delete p.saturnRole;
        }
        if (p.katovBaseZ !== undefined && !twoHandMidpoint && !attractTarget && !textFormation) {
          const t = performance.now() * 0.0006;
          const wave = Math.sin((p.katovBaseZ - 0.5) * Math.PI * 2 + t);
          const targetZ = 0.5 + 0.42 * wave;
          p.z = p.z + (targetZ - p.z) * 0.02;
        } else {
          p.z = Math.max(0.02, Math.min(1, (p.z || 0.5) + (Math.random() - 0.5) * 0.012));
        }
      }
      if (p.twinkle !== undefined) p.twinkle += 0.08 + Math.random() * 0.04;
      if (p.life <= 0 && !p.permanent) particles.splice(i, 1);
    }
  }

  function renderParticles() {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    pCtx.globalCompositeOperation = 'lighter';
    particles.sort((a, b) => (a.z || 0.5) - (b.z || 0.5));

    for (const p of particles) {
      const z = p.z || 0.5;
      // Pure 3D perspective: only SIZE conveys depth
      const depthScale = 0.2 + 2.0 * z * z; // far=0.2x, near=2.2x
      const depthAlpha = 0.4 + 0.6 * z;
      const rr = p.rgb.r;
      const gg = p.rgb.g;
      const bb = p.rgb.b;
      const baseAlpha = p.twinkle !== undefined ? p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle)) : p.alpha;
      const effectiveAlpha = baseAlpha * depthAlpha;
      const baseSize = p.permanent ? p.size : p.size * (0.3 + 0.7 * p.alpha);
      const effectiveSize = baseSize * depthScale;

      pCtx.save();
      pCtx.globalAlpha = effectiveAlpha;
      pCtx.fillStyle = `rgb(${rr}, ${gg}, ${bb})`;
      pCtx.beginPath(); pCtx.arc(p.x, p.y, effectiveSize, 0, Math.PI * 2); pCtx.fill();
      pCtx.restore();
    }
    pCtx.globalCompositeOperation = 'source-over';
  }

  function handleCollisions() {
    const len = particles.length;
    if (len < 2) return;
    const cellSize = 14;
    const grid: Record<number, number[]> = Object.create(null);

    for (let i = 0; i < len; i++) {
      const p = particles[i];
      const key = (Math.floor(p.x / cellSize) << 16) | (Math.floor(p.y / cellSize) & 0xffff);
      if (!grid[key]) grid[key] = [];
      grid[key].push(i);
    }

    const keys = Object.keys(grid);
    for (let k = 0; k < keys.length; k++) {
      const cell = grid[Number(keys[k])];
      const cx = Number(keys[k]) >> 16;
      const cy = (Number(keys[k]) << 16) >> 16;
      for (let dx = 0; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy < 0) continue;
          const nKey = ((cx + dx) << 16) | ((cy + dy) & 0xffff);
          const neighbor = grid[nKey];
          if (!neighbor) continue;
          const sameCell = dx === 0 && dy === 0;
          for (let i = 0; i < cell.length; i++) {
            const a = particles[cell[i]];
            const jStart = sameCell ? i + 1 : 0;
            for (let j = jStart; j < neighbor.length; j++) {
              const b = particles[neighbor[j]];
              const ddx = b.x - a.x, ddy = b.y - a.y;
              const distSq = ddx * ddx + ddy * ddy;
              const minDist = a.size + b.size;
              if (distSq < minDist * minDist && distSq > 0.001) {
                const dist = Math.sqrt(distSq);
                const nx = ddx / dist, ny = ddy / dist;
                const overlap = (minDist - dist) * 0.5;
                a.x -= nx * overlap; a.y -= ny * overlap;
                b.x += nx * overlap; b.y += ny * overlap;
                const dvx = a.vx - b.vx, dvy = a.vy - b.vy;
                const dvDotN = dvx * nx + dvy * ny;
                if (dvDotN > 0) {
                  const restitution = 0.7;
                  a.vx -= dvDotN * nx * restitution; a.vy -= dvDotN * ny * restitution;
                  b.vx += dvDotN * nx * restitution; b.vy += dvDotN * ny * restitution;
                }
              }
            }
          }
        }
      }
    }
  }

  function spawnTextParticles() {
    const W = pCanvas.width, H = pCanvas.height;
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = W; tmpCanvas.height = H;
    const tmpCtx = tmpCanvas.getContext('2d')!;
    const fontSize = Math.min(W * 0.108, H * 0.21);
    tmpCtx.font = `900 ${fontSize}px 'Inter', sans-serif`;
    tmpCtx.textAlign = 'center'; tmpCtx.textBaseline = 'alphabetic';
    tmpCtx.fillStyle = '#fff';
    const metrics = tmpCtx.measureText('KATOV');
    const textH = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const baselineY = H / 2 + textH / 2 - metrics.actualBoundingBoxDescent;
    tmpCtx.fillText('KATOV', W / 2, baselineY);

    const imageData = tmpCtx.getImageData(0, 0, W, H);
    const data = imageData.data;
    const points: { x: number; y: number }[] = [];
    const step = 4;
    let textMinX = W, textMaxX = 0, textMinY = H, textMaxY = 0;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const idx = (y * W + x) * 4;
        if (data[idx + 3] > 128) {
          points.push({ x, y });
          if (x < textMinX) textMinX = x; if (x > textMaxX) textMaxX = x;
          if (y < textMinY) textMinY = y; if (y > textMaxY) textMaxY = y;
        }
      }
    }
    const textW = textMaxX - textMinX || 1;
    const textH2 = textMaxY - textMinY || 1;

    for (const pt of points) {
      if (particles.length >= MAX_PARTICLES) break;
      const rgb = neonColors[Math.floor(Math.random() * neonColors.length)];
      const nx = (pt.x - textMinX) / textW;
      const ny = (pt.y - textMinY) / textH2;
      const wave = Math.sin(nx * Math.PI * 2.5);
      const zBase = 0.5 + 0.4 * wave;
      const zNoise = (Math.random() - 0.5) * 0.08;
      const z = Math.max(0.05, Math.min(0.98, zBase + zNoise + ny * 0.1));
      particles.push({
        x: pt.x + (Math.random() - 0.5) * 2, y: pt.y + (Math.random() - 0.5) * 2,
        vx: 0, vy: 0, size: 0.9 + Math.random() * 1.2,
        color: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, rgb,
        alpha: 1, life: 1, decay: 0, permanent: true, hasTrail: false, trail: [],
        z, katovBaseZ: zBase, shape: 'circle',
      });
    }
  }

  let lastAmbientTime = 0;
  function spawnAmbient(now: number) {
    if (now - lastAmbientTime > 2000) {
      lastAmbientTime = now;
      for (let i = 0; i < 2; i++) {
        spawnParticle(Math.random() * pCanvas.width, Math.random() * pCanvas.height, 'draw');
      }
    }
  }

  function loop() {
    if (destroyed) return;
    drawBg();

    if (currentMode === 1) {
      spawnAmbient(performance.now());
      updateParticles();
      if (!isMobile) handleCollisions();
      renderParticles();
    } else {
      // Apply angular velocity (inertia)
      cubeRotX += cubeVelX;
      cubeRotY += cubeVelY;
      // Friction: high values → cube spins longer after swipe
      const friction = cubeHandActive ? 0.99 : 0.985;
      cubeVelX *= friction;
      cubeVelY *= friction;
      // Smooth zoom
      cubeScale += (cubeTargetScale - cubeScale) * 0.3;
      // Gentle auto-spin only when fully stopped and no hand
      if (!cubeHandActive && Math.abs(cubeVelX) < 0.0002 && Math.abs(cubeVelY) < 0.0002) {
        cubeVelY = 0.003;
      }
      cubeHandActive = false;
      renderShape();
    }

    animId = requestAnimationFrame(loop);
  }

  let cameraInstance: { stop: () => void } | null = null;

  return {
    start() {
      resize();
      window.addEventListener('resize', resize);
      loop();

      const Hands = (window as any).Hands;
      const Camera = (window as any).Camera;

      const hands = new Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`,
      });
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 0,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });
      hands.onResults(onResults);

      let frameSkip = 0;
      const camera = new Camera(video, {
        onFrame: async () => {
          if (isMobile) {
            frameSkip++;
            if (frameSkip % 2 !== 0) return; // Process every 2nd frame on mobile
          }
          await hands.send({ image: video });
        },
        width: isMobile ? 640 : 1280,
        height: isMobile ? 480 : 720,
      });
      camera.start();
      cameraInstance = camera;

      spawnTextParticles();
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      cameraInstance?.stop();
      if (video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach(t => t.stop());
        video.srcObject = null;
      }
      particles = [];
    },
    setMode(m: 1 | 2) {
      if (m === currentMode) return;
      currentMode = m;
      if (m === 2) {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        cubeRotX = -0.4;
        cubeRotY = 0.6;
        cubeVelX = 0;
        cubeVelY = 0;
        cubeScale = 1;
        cubeTargetScale = 1;
        prevPalmX = -1;
        prevPalmY = -1;
        zoomPinched = false; zoomHoldStart = 0; zoomDirection = 'none';
        cubeHandActive = false;
        swipePhase = 'none';
        attractTarget = null;
        twoHandMidpoint = null;
        textFormation = null;
        snowMode = false;
      } else {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        prevPalmX = -1;
        prevPalmY = -1;
        particles = [];
        spawnTextParticles();
      }
    },
    setShape(name: string) {
      if (allShapes[name]) {
        currentShapeName = name;
        activeShape = allShapes[name];
      }
    },
  };
}
