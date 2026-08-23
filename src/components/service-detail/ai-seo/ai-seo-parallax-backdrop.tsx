'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { SiOpenai } from 'react-icons/si';
import type { ReactNode } from 'react';

interface AiSeoParallaxBackdropProps {
  children: ReactNode;
}

// OpenAI's mark ships monochrome; teal is the color people actually
// associate with ChatGPT, so tinting the knot with it reads as "GPT"
// far faster than a theme-neutral gray would.
const GPT_COLOR = '#10A37F';

// The mark is pinned to one fixed point on screen — it doesn't scroll
// with the page at all, only its own rotation animation runs — and
// fades out via opacity over the first stretch of scroll.
//
// The knot's thin overlapping bands leave a lot of empty space, so the
// base opacity that reads on the dark theme's near-black background
// nearly disappears on the light theme's white one. --ai-seo-mark-opacity
// (globals.css) compensates per theme, in pure CSS; the scroll fade
// multiplies on top of that as a separate layer.
export function AiSeoParallaxBackdrop({ children }: AiSeoParallaxBackdropProps) {
  const { scrollY } = useScroll();
  const fadeOpacity = useTransform(scrollY, [0, 900], [1, 0]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none fixed left-1/2 top-[220px] sm:top-[140px] w-[210px] sm:w-[310px] md:w-[380px] aspect-square -translate-x-1/2 opacity-[var(--ai-seo-mark-opacity)] z-0"
        style={{ color: GPT_COLOR }}
        aria-hidden
      >
        <motion.div className="h-full w-full" style={{ opacity: fadeOpacity }}>
          <motion.div
            className="h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <SiOpenai className="h-full w-full" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
