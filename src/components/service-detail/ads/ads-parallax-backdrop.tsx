'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface AdsParallaxBackdropProps {
  children: ReactNode;
}

// Shared background for the hero + highlights sections together — same
// Google mark as /seo (Google Ads is a Google product, same visual
// family), scrolling at half the page's speed. The next section's own
// opaque background — not a clip on this element — covers it once it
// drifts past the hero.
export function AdsParallaxBackdrop({ children }: AdsParallaxBackdropProps) {
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, (v) => v * 0.5);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[77px] sm:top-[48px] w-[420px] sm:w-[620px] md:w-[760px] opacity-[0.16] z-0"
        style={{ x: '-50%', y: logoY, aspectRatio: '320 / 223' }}
        aria-hidden
      >
        <Image src="/images/google-logo.png" alt="" fill className="object-contain" />
      </motion.div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
