'use client';

import { useId } from 'react';
import type { Locale } from '@/i18n/config';

// Stylised round flag badges (inline SVG — emoji flags don't render on Windows).
// Each flag is a simplified, modern take: soft bands, gloss highlight, inner ring.
function UzFlag() {
  return (
    <>
      <rect width="32" height="32" fill="#f5f7f8" />
      <rect width="32" height="10.5" fill="#1aa6c4" />
      <rect y="21.5" width="32" height="10.5" fill="#22b865" />
      <rect y="10.5" width="32" height="1" fill="#e0344a" />
      <rect y="20.5" width="32" height="1" fill="#e0344a" />
      <circle cx="9" cy="5.6" r="3" fill="#fff" />
      <circle cx="10.2" cy="5.6" r="2.7" fill="#1aa6c4" />
      <circle cx="14.4" cy="4.4" r="0.6" fill="#fff" />
      <circle cx="16.4" cy="4.4" r="0.6" fill="#fff" />
      <circle cx="14.4" cy="6.8" r="0.6" fill="#fff" />
      <circle cx="16.4" cy="6.8" r="0.6" fill="#fff" />
    </>
  );
}

function RuFlag() {
  return (
    <>
      <rect width="32" height="32" fill="#f5f7f8" />
      <rect y="10.67" width="32" height="10.67" fill="#2656c9" />
      <rect y="21.33" width="32" height="10.67" fill="#e0344a" />
    </>
  );
}

function EnFlag() {
  return (
    <>
      <rect width="32" height="32" fill="#f5f7f8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} y={i * 6.4 + 1.6} width="32" height="3.2" fill="#e0344a" />
      ))}
      <rect width="15" height="17.6" fill="#243b8f" />
      {[
        [4, 4],
        [8, 4],
        [12, 4],
        [6, 8.8],
        [10, 8.8],
        [4, 13.6],
        [8, 13.6],
        [12, 13.6],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.8" fill="#fff" />
      ))}
    </>
  );
}

const flags: Record<Locale, () => React.JSX.Element> = {
  uz: UzFlag,
  ru: RuFlag,
  en: EnFlag,
};

interface FlagIconProps {
  locale: Locale;
  className?: string;
}

export function FlagIcon({ locale, className = '' }: FlagIconProps) {
  const Flag = flags[locale];
  const id = useId();
  const clipId = `${id}-clip`;
  const glossId = `${id}-gloss`;
  const shadeId = `${id}-shade`;

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={`h-5 w-5 shrink-0 ${className}`}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
        <radialGradient id={glossId} cx="30%" cy="22%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={shadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <g transform="rotate(-12 16 16) scale(1.15) translate(-2.1 -2.1)">
          <Flag />
        </g>
        <rect width="32" height="32" fill={`url(#${shadeId})`} />
        <rect width="32" height="32" fill={`url(#${glossId})`} />
      </g>
      <circle
        cx="16"
        cy="16"
        r="15.25"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
    </svg>
  );
}
