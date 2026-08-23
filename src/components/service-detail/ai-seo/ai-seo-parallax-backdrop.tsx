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

// Shared background for the hero + highlights sections together — the
// mark needs to visually span both, not be clipped at the hero's own
// boundary. Scrolls at half the page's speed.
//
// The knot's thin overlapping bands leave a lot of empty space, so the
// opacity that reads on the dark theme's near-black background nearly
// disappears on the light theme's white one. --ai-seo-mark-opacity
// (globals.css) compensates per theme, in pure CSS.
export function AiSeoParallaxBackdrop({ children }: AiSeoParallaxBackdropProps) {
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
        className="pointer-events-none absolute left-1/2 top-[220px] sm:top-[140px] w-[210px] sm:w-[310px] md:w-[380px] aspect-square opacity-[var(--ai-seo-mark-opacity)] z-0"
        style={{ x: '-50%', y: logoY, color: GPT_COLOR }}
        aria-hidden
      >
        <motion.div
          className="h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <SiOpenai className="h-full w-full" />
        </motion.div>
      </motion.div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
