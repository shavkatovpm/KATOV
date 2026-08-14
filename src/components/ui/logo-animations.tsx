'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { LOGO_VIEWBOX, STEM_PATH, CHEVRON_PATH } from '@/components/ui/katov-logo';

const DEFAULT_CLASS = 'h-[200px] sm:h-[240px] w-auto overflow-visible';
const DEFAULT_COLOR = 'var(--color-fg, #dddddd)';

interface LogoAnimationProps {
  /** Overrides the default height; the mark keeps its own aspect ratio. */
  className?: string;
  /** Colour the mark resolves `currentColor` against (nav uses its own token). */
  color?: string;
}

function LogoShapes({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      <path d={STEM_PATH} />
      <path d={CHEVRON_PATH} />
    </g>
  );
}

/**
 * Deterministic 0..1 noise. Math.random() would differ between the server and
 * the client render and break hydration, so anything scattered is derived
 * from its own index instead.
 */
function noise(i: number, salt: number) {
  const v = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return v - Math.floor(v);
}

/* ------------------------------------------------------------------ */
/* Metall skan: a light band sweeps through a mask of the mark.         */
/* ------------------------------------------------------------------ */
export function ScanLogo({ className = DEFAULT_CLASS, color = DEFAULT_COLOR }: LogoAnimationProps) {
  const uid = useId();
  const maskId = `katov-scan-mask-${uid}`;
  const gradId = `katov-scan-grad-${uid}`;

  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} style={{ color }}>
      <defs>
        <mask id={maskId}>
          <path d={STEM_PATH} fill="#fff" />
          <path d={CHEVRON_PATH} fill="#fff" />
        </mask>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="42%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="58%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g mask={`url(#${maskId})`}>
        {/* Dimmed body — the sweep is what lights the letterform up. */}
        <rect x="0" y="0" width="730" height="1172" fill="currentColor" opacity="0.2" />

        {/* Tilted so the band crosses the diagonal chevron edges, not just the stem. */}
        <g transform="rotate(-20 365 586)">
          <motion.rect
            y="-500"
            width="420"
            height="2200"
            fill={`url(#${gradId})`}
            initial={{ x: -900 }}
            animate={{ x: 1100 }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.7, ease: 'easeInOut' }}
          />
          <motion.rect
            y="-500"
            width="180"
            height="2200"
            fill={`url(#${gradId})`}
            opacity="0.6"
            initial={{ x: -700 }}
            animate={{ x: 1200 }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              repeatDelay: 0.3,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </g>
      </g>

      {/* Hairline edge keeps the silhouette readable while the body is dim. */}
      <g fill="none" stroke="currentColor" strokeWidth="5" opacity="0.45">
        <path d={STEM_PATH} />
        <path d={CHEVRON_PATH} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Erish: turbulence displaces the mark until it melts, then pulls it   */
/* back into focus.                                                     */
/* ------------------------------------------------------------------ */
export function MeltLogo({ className = DEFAULT_CLASS, color = DEFAULT_COLOR }: LogoAnimationProps) {
  const turbulence = useRef<SVGFETurbulenceElement>(null);
  const displacement = useRef<SVGFEDisplacementMapElement>(null);
  const filterId = `katov-melt-${useId()}`;

  // Filter primitives take their values from attributes, and Motion has no
  // mixer for those — so drive them straight from the frame loop.
  useAnimationFrame((elapsed) => {
    const phase = (elapsed % 5200) / 5200;
    const swell = (1 - Math.cos(phase * Math.PI * 2)) / 2; // 0 → 1 → 0

    displacement.current?.setAttribute('scale', (swell * 130).toFixed(1));
    turbulence.current?.setAttribute('baseFrequency', (0.006 + swell * 0.016).toFixed(5));
  });

  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} style={{ color }}>
      <defs>
        <filter id={filterId} x="-35%" y="-25%" width="170%" height="150%">
          <feTurbulence
            ref={turbulence}
            type="fractalNoise"
            baseFrequency="0.006"
            numOctaves="3"
            seed="9"
            result="noise"
          />
          <feDisplacementMap
            ref={displacement}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        <LogoShapes fill="currentColor" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Kod yomg'iri: glyph columns fall, visible only inside the mark.      */
/* ------------------------------------------------------------------ */
const RAIN_CHARS = 'KATOV01</>{}#$*+=';

/**
 * Columns fall via CSS rather than a JS animation loop: the browser then owns
 * every column's timeline instead of the main thread writing dozens of
 * transforms per frame, which is what made the mark stutter. Lives with the
 * component instead of globals.css so the rain stays self-contained.
 */
const RAIN_KEYFRAMES = `
@keyframes katov-rain-fall {
  from { transform: translateY(var(--rain-shift, 0px)); }
  to { transform: translateY(0); }
}
.katov-rain-column {
  animation: katov-rain-fall var(--rain-duration, 4s) linear infinite;
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .katov-rain-column { animation: none; }
}
`;

interface RainColumnProps {
  col: number;
  colWidth: number;
  rowHeight: number;
  rows: number;
  fontSize: number;
  fadeId: string;
}

function RainColumn({ col, colWidth, rowHeight, rows, fontSize, fadeId }: RainColumnProps) {
  // One <text> per copy instead of one per glyph: SVG accepts a list of
  // per-character positions, and each x starts a new chunk, so `middle`
  // anchoring still centres every glyph in the column.
  const { glyphs, xs, ys } = useMemo(() => {
    const centre = col * colWidth + colWidth / 2;
    return {
      glyphs: Array.from({ length: rows }, (_, row) => {
        const pick = noise(col * 97 + row, 4);
        return RAIN_CHARS[Math.floor(pick * RAIN_CHARS.length)];
      }).join(''),
      xs: Array.from({ length: rows }, () => centre).join(' '),
      ys: Array.from({ length: rows }, (_, row) => row * rowHeight).join(' '),
    };
  }, [col, colWidth, rowHeight, rows]);

  // The column is rendered twice, stacked, and scrolled by exactly one copy's
  // height — so the loop wraps with no visible seam.
  const height = rows * rowHeight;
  const duration = 3.6 + noise(col, 11) * 3.4;

  return (
    <g
      className="katov-rain-column"
      style={
        {
          '--rain-duration': `${duration.toFixed(2)}s`,
          '--rain-shift': `${-height}px`,
        } as React.CSSProperties
      }
    >
      {[0, 1].map((copy) => (
        <text
          key={copy}
          x={xs}
          y={ys}
          transform={copy ? `translate(0 ${height})` : undefined}
          textAnchor="middle"
          fontSize={fontSize}
          fontFamily="var(--font-geist-mono), monospace"
          // Brightest at the head of the column, fading up the trail.
          fill={`url(#${fadeId})`}
        >
          {glyphs}
        </text>
      ))}
    </g>
  );
}

interface RainFieldProps {
  /** Region the columns cover, in the host SVG's user units. */
  x: number;
  y: number;
  width: number;
  height: number;
  columns: number;
  rowHeight: number;
  fontSize: number;
}

function RainField({ x, y, width, height, columns, rowHeight, fontSize }: RainFieldProps) {
  const colWidth = width / columns;
  const rows = Math.ceil(height / rowHeight);
  const fadeId = `katov-rain-fade-${useId()}`;

  return (
    <g transform={`translate(${x} ${y})`}>
      <style>{RAIN_KEYFRAMES}</style>
      <defs>
        {/* Per-copy bounding box, so the trail fade repeats with the loop. */}
        <linearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      {Array.from({ length: columns }, (_, col) => (
        <RainColumn
          key={col}
          col={col}
          colWidth={colWidth}
          rowHeight={rowHeight}
          rows={rows}
          fontSize={fontSize}
          fadeId={fadeId}
        />
      ))}
    </g>
  );
}

interface RainLogoProps extends LogoAnimationProps {
  /** Fewer, larger columns keep the glyphs readable at small sizes. */
  columns?: number;
  rowHeight?: number;
  fontSize?: number;
  /** Silhouette outline weight — thicker reads better when scaled down. */
  strokeWidth?: number;
  /** Accessible name. Omit where a nearby wordmark already names the link. */
  title?: string;
}

export function RainLogo({
  className = DEFAULT_CLASS,
  color = DEFAULT_COLOR,
  columns = 8,
  rowHeight = 84,
  fontSize = 68,
  strokeWidth = 5,
  title,
}: RainLogoProps) {
  // Two RainLogos on one page would otherwise share a mask id and the second
  // would silently inherit the first one's mask.
  const maskId = `katov-rain-mask-${useId()}`;
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      style={{ color }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <mask id={maskId}>
          <path d={STEM_PATH} fill="#fff" />
          <path d={CHEVRON_PATH} fill="#fff" />
        </mask>
      </defs>

      {reduceMotion ? (
        <LogoShapes fill="currentColor" />
      ) : (
        <>
          <g mask={`url(#${maskId})`}>
            <rect x="0" y="0" width="730" height="1172" fill="currentColor" opacity="0.08" />
            <RainField
              x={0}
              y={0}
              width={730}
              height={1172}
              columns={columns}
              rowHeight={rowHeight}
              fontSize={fontSize}
            />
          </g>

          <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.35">
            <path d={STEM_PATH} />
            <path d={CHEVRON_PATH} />
          </g>
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Kod yomg'iri — matn ichida (hero sarlavhasi uchun).                  */
/* ------------------------------------------------------------------ */

/** User units per em. The SVG is sized in `em`, so it tracks the host font-size. */
const TEXT_EM = 100;
/** Pre-measure width guess for capital Geist Bold; replaced by the real bbox. */
const EST_CAP_WIDTH = 0.66;
const EST_CAP_HEIGHT = 0.72;

interface TextBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RainTextProps {
  children: string;
  className?: string;
  color?: string;
  /** Target column width in user units — smaller means denser rain. */
  columnWidth?: number;
  rowHeight?: number;
  glyphSize?: number;
  strokeWidth?: number;
}

// useLayoutEffect warns when React renders a client component on the server.
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function RainText({
  children,
  className,
  // Unset by default so the mark simply inherits the heading's colour — the
  // hero, footer and nav each use a different foreground token.
  color,
  columnWidth = 7,
  rowHeight = 8,
  glyphSize = 7,
  strokeWidth = 2,
}: RainTextProps) {
  const label = children.toUpperCase();
  const maskId = `katov-raintext-mask-${useId()}`;
  const measureRef = useRef<SVGTextElement>(null);
  const reduceMotion = useReducedMotion();

  // The mark has to fit the glyphs of whatever font actually resolved, so the
  // viewBox comes from a real measurement rather than assumed font metrics.
  const [box, setBox] = useState<TextBox>(() => ({
    x: 0,
    y: -EST_CAP_HEIGHT * TEXT_EM,
    width: label.length * EST_CAP_WIDTH * TEXT_EM,
    height: EST_CAP_HEIGHT * TEXT_EM,
  }));

  useBrowserLayoutEffect(() => {
    let cancelled = false;

    const measure = () => {
      const bbox = measureRef.current?.getBBox();
      if (cancelled || !bbox || !bbox.width || !bbox.height) return;
      setBox({ x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height });
    };

    measure();
    // The webfont usually lands after first paint and changes the metrics.
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [label]);

  // Shared by the measurer, the mask and the outline so all three agree.
  const textProps = {
    x: 0,
    y: 0,
    fontSize: TEXT_EM,
    fontWeight: 700,
    letterSpacing: -0.025 * TEXT_EM, // matches Tailwind's `tracking-tight`
  };

  const columns = Math.max(3, Math.round(box.width / columnWidth));

  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
      style={{ color, width: `${box.width / TEXT_EM}em`, height: `${box.height / TEXT_EM}em` }}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <text {...textProps} ref={measureRef} visibility="hidden">
        {label}
      </text>

      {reduceMotion ? (
        <text {...textProps} fill="currentColor">
          {label}
        </text>
      ) : (
        <>
          <defs>
            <mask id={maskId}>
              <text {...textProps} fill="#fff">
                {label}
              </text>
            </mask>
          </defs>

          <g mask={`url(#${maskId})`}>
            <rect
              x={box.x}
              y={box.y}
              width={box.width}
              height={box.height}
              fill="currentColor"
              opacity="0.1"
            />
            <RainField
              x={box.x}
              // Baselines sit at the bottom of each glyph, so nudge the field
              // down to keep the top row of caps covered.
              y={box.y + rowHeight * 0.3}
              width={box.width}
              height={box.height + rowHeight}
              columns={columns}
              rowHeight={rowHeight}
              fontSize={glyphSize}
            />
          </g>

          <text
            {...textProps}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            opacity="0.4"
          >
            {label}
          </text>
        </>
      )}
    </svg>
  );
}
