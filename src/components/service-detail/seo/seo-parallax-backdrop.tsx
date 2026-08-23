'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import type { ReactNode } from 'react';

interface SeoParallaxBackdropProps {
  children: ReactNode;
}

// The mark is pinned to one fixed point on screen — it doesn't scroll
// with the page at all, only its own breathing animation runs — and
// fades out via opacity over the first stretch of scroll.
export function SeoParallaxBackdrop({ children }: SeoParallaxBackdropProps) {
  const { scrollY } = useScroll();
  const fadeOpacity = useTransform(scrollY, [0, 900], [1, 0]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none fixed left-1/2 top-[165px] sm:top-[105px] w-[260px] sm:w-[380px] md:w-[460px] aspect-square -translate-x-1/2 opacity-[0.16] z-0"
        aria-hidden
      >
        <motion.div className="h-full w-full" style={{ opacity: fadeOpacity }}>
          <motion.div
            className="h-full w-full"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FcGoogle className="h-full w-full" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
