'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface AiSeoParallaxBackdropProps {
  children: ReactNode;
}

// Shared background for the hero + highlights sections together — the
// logo needs to visually span both, not be clipped at the hero's own
// boundary. Scrolls at half the page's speed. Which ChatGPT mark renders
// depends on the page background: the black mark reads on the light
// theme's white background, the white mark on the dark theme's black one.
export function AiSeoParallaxBackdrop({ children }: AiSeoParallaxBackdropProps) {
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, (v) => v * 0.5);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Same crop-and-pad process as the Google mark, but the ChatGPT knot's
  // bounding box comes out close to square (unlike Google's wide "G"), so
  // matching container width alone would render it visibly larger. Locking
  // height to each image's real aspect ratio keeps both marks the same size.
  const isDark = resolvedTheme === 'dark';
  const logoSrc = isDark ? '/images/gpt-white.png' : '/images/gpt-black.png';
  const aspectRatio = isDark ? '315 / 340' : '331 / 340';

  return (
    <div className="relative overflow-hidden">
      {mounted && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[161px] sm:top-[101px] w-[210px] sm:w-[310px] md:w-[380px] opacity-[0.16] z-0"
          style={{ x: '-50%', y: logoY, aspectRatio }}
          aria-hidden
        >
          <Image src={logoSrc} alt="" fill className="object-contain" />
        </motion.div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
