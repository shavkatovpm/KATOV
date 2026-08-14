'use client';

import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { Portfolio } from '@/components/sections/portfolio';
import { BlogPreview } from '@/components/sections/blog-preview';
import { Contact } from '@/components/sections/contact';

/**
 * Everything below the hero used to sit at `opacity: 0` until the hero's
 * typewriter animation reported completion. That made the whole page body —
 * and every internal link in it — invisible to anything that snapshots the
 * page before a chain of JS timers finishes; in a headless browser it stayed
 * hidden past six seconds. The hero is full-height, so this content is off
 * screen until the visitor scrolls anyway: gating it bought nothing visually
 * and cost the crawler the entire page.
 */
export default function HomeContent() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <BlogPreview />
      <Contact />
    </>
  );
}
