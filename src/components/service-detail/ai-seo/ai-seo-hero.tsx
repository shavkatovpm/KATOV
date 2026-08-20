'use client';

import { motion } from 'framer-motion';
import type { ServiceLocalizedContent } from '@/data/services';

interface AiSeoHeroProps {
  basePrice: number;
  priceSuffix: string;
  content: ServiceLocalizedContent;
  ctaHref: string;
}

// content.h1 is written as "Short keyword phrase: longer descriptive
// clause" everywhere in services.ts. Splitting it lets the short phrase
// read as a bold, concrete headline and the rest as a lighter subhead —
// same <h1> text as before (nothing removed for SEO), just styled in two
// weights instead of one long uniform line.
function splitHeadline(h1: string): [string, string | null] {
  const idx = h1.indexOf(':');
  if (idx === -1) return [h1, null];
  return [h1.slice(0, idx), h1.slice(idx + 1).trim()];
}

// Breaks the subhead onto two lines at whichever candidate connector
// (em-dash or "va"/"и"/"and") sits closest to the midpoint, so the two
// lines come out roughly balanced instead of always splitting on the
// first conjunction — which can leave one line much longer than the other.
function splitSubhead(subhead: string): [string, string | null] {
  const mid = subhead.length / 2;
  const candidates = [' — ', ' va ', ' и ', ' and ']
    .map((c) => ({ c, idx: subhead.indexOf(c) }))
    .filter((x) => x.idx !== -1);
  if (candidates.length === 0) return [subhead, null];

  const best = candidates.reduce((a, b) => (Math.abs(a.idx - mid) <= Math.abs(b.idx - mid) ? a : b));
  // Em-dash is dropped entirely (it reads oddly as a line-leading glyph);
  // conjunction words stay on line two.
  const skip = best.c === ' — ' ? best.c.length : 1;
  return [subhead.slice(0, best.idx), subhead.slice(best.idx + skip)];
}

export function AiSeoHero({ basePrice, priceSuffix, content, ctaHref }: AiSeoHeroProps) {
  const [headline, subheadFull] = splitHeadline(content.h1);
  const [subheadLine1, subheadLine2] = subheadFull ? splitSubhead(subheadFull) : [null, null];

  return (
    <section className="relative section-padding pt-32 sm:pt-40 md:pt-48">
      <div className="relative container-custom max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7"
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
            style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
          >
            <span className="opacity-80">{content.priceLabel}</span>
            <span>
              ${basePrice}
              {content.priceSuffix ? ` ${content.priceSuffix}` : priceSuffix}
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 text-balance"
        >
          <span className="block text-4xl leading-[1.1] sm:text-6xl sm:leading-tight md:text-7xl font-bold">
            {headline}
          </span>{' '}
          {subheadLine1 && (
            <span
              className="inline-block mt-3 rounded-2xl px-3 py-2 sm:px-8 sm:py-5 text-[clamp(0.875rem,4.5vw,3rem)] leading-tight font-semibold"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-bg) 35%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-fg) 14%, transparent)',
                color: 'var(--color-fg)',
                backdropFilter: 'blur(16px) saturate(160%)',
                WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                boxShadow: '0 8px 32px color-mix(in srgb, var(--color-fg) 8%, transparent)',
              }}
            >
              {subheadLine1}
              {subheadLine2 && (
                <>
                  {' '}
                  <br />
                  {subheadLine2}
                </>
              )}
            </span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed mb-9"
          data-aeo-speakable
        >
          {content.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
          >
            {content.ctaPrimary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
