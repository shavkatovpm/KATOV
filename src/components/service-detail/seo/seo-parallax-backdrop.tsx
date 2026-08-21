'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface SeoParallaxBackdropProps {
  children: ReactNode;
}

// Shared background for the hero + highlights sections together — the
// logo needs to visually span both (sitting behind the hero's text and
// behind the highlights section's heading/gaps alike), not be clipped at
// the hero's own boundary. Scrolls at half the page's speed; the outer
// wrapper's overflow-hidden is the only clip, so it can drift across the
// full combined height of both sections before disappearing.
export function SeoParallaxBackdrop({ children }: SeoParallaxBackdropProps) {
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, (v) => v * 0.5);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[120px] sm:top-[75px] w-[420px] sm:w-[620px] md:w-[760px] opacity-[0.16] z-0"
        style={{ x: '-50%', y: logoY, aspectRatio: '320 / 223' }}
        aria-hidden
      >
        <Image src="/images/google-logo.png" alt="" fill className="object-contain" />
      </motion.div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
