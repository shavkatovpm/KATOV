'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import type { ReactNode } from 'react';

interface SeoParallaxBackdropProps {
  children: ReactNode;
}

// Shared background for the hero + highlights sections together — the
// mark needs to visually span both (sitting behind the hero's text and
// behind the highlights section's heading/gaps alike), not be clipped at
// the hero's own boundary. Scrolls at half the page's speed; the outer
// wrapper's overflow-hidden is the only clip, so it can drift across the
// full combined height of both sections before disappearing.
export function SeoParallaxBackdrop({ children }: SeoParallaxBackdropProps) {
  const { scrollY } = useScroll();
  // The mark's own translateY only partially cancels the page's normal
  // scroll motion, so a *higher* factor here means *less* net movement on
  // screen, not more. 0.55 leaves 45% of scroll speed showing through —
  // enough that the mark has scrolled fully off-screen well before the
  // third section (ForWho) arrives, not lingering the whole way there.
  const logoY = useTransform(scrollY, (v) => v * 0.55);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[165px] sm:top-[105px] w-[260px] sm:w-[380px] md:w-[460px] aspect-square opacity-[0.16] z-0"
        style={{ x: '-50%', y: logoY }}
        aria-hidden
      >
        <motion.div
          className="h-full w-full"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FcGoogle className="h-full w-full" />
        </motion.div>
      </motion.div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
