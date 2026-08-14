'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MeltLogo } from '@/components/ui/logo-animations';

/**
 * Melt transition between pages.
 *
 * The expensive part of the melt is feTurbulence, which evaluates Perlin noise
 * per pixel per frame on the CPU. Running it over the viewport would cost
 * roughly 20x what the test page's 240px mark costs and would drop frames on
 * anything but a fast desktop — so the filter never leaves the small logo.
 * The page itself only animates `opacity`, which the compositor handles
 * without repainting, and the mark is mounted solely while a transition runs.
 */

/**
 * Fired the moment a navigation is taken over, so UI that outlives the route
 * (the mobile menu) can dismiss itself from a plain event handler. Reacting to
 * the pathname instead would run the update inside React's route transition,
 * where framer-motion's exit animation never gets to play and the menu stays
 * up over the new page.
 */
export const NAVIGATION_START = 'katov:navigation-start';

const EXIT_MS = 320;
const ENTER_MS = 300;
/** Frees the page again if a navigation never lands (aborted, offline, …). */
const STUCK_MS = 4000;

// The overlay mounts mid-transition, so a plain `opacity` style would paint
// its first frame already opaque. A CSS animation runs from mount instead.
const OVERLAY_KEYFRAMES = `
@keyframes katov-melt-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes katov-melt-out { from { opacity: 1 } to { opacity: 0 } }
`;

type Phase = 'idle' | 'out' | 'in';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Whether this click is a plain left-click navigation we may take over. */
function navigationTarget(event: MouseEvent): string | null {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }

  const anchor = (event.target as Element | null)?.closest?.('a');
  if (!anchor || anchor.hasAttribute('download')) return null;
  if (anchor.target && anchor.target !== '_self') return null;

  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#')) return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  // Same-page jumps keep the site's own smooth-scroll handlers.
  if (url.pathname === window.location.pathname) return null;

  return url.pathname + url.search + url.hash;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const [lastPath, setLastPath] = useState(pathname);
  const target = useRef<string | null>(null);
  const busy = useRef(false);

  // The new route has landed — dissolve back in. Adjusting state during render
  // is React's pattern for reacting to a changed value; an effect would paint
  // one frame of the new page still hidden before correcting itself.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (phase === 'out') setPhase('in');
  }

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (busy.current || event.defaultPrevented || prefersReducedMotion()) return;

      const href = navigationTarget(event);
      if (!href) return;

      // Capture phase on `document`, so this runs before React dispatches the
      // page's own onClick handlers — without stopping propagation they would
      // navigate immediately and cut the exit animation off.
      event.preventDefault();
      event.stopPropagation();

      busy.current = true;
      target.current = href;
      setPhase('out');
      document.dispatchEvent(new CustomEvent(NAVIGATION_START));
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (phase === 'idle') {
      busy.current = false;
      return;
    }

    if (phase === 'in') {
      const done = setTimeout(() => setPhase('idle'), ENTER_MS);
      return () => clearTimeout(done);
    }

    // Navigate once the fade has played, and let go of the page if the route
    // never lands — an aborted navigation must not leave it stuck at opacity 0.
    const go = setTimeout(() => target.current && router.push(target.current), EXIT_MS);
    const stuck = setTimeout(() => setPhase('idle'), STUCK_MS);
    return () => {
      clearTimeout(go);
      clearTimeout(stuck);
    };
  }, [phase, router]);

  const out = phase === 'out';
  const active = phase !== 'idle';

  return (
    <>
      <div
        style={{
          opacity: out ? 0 : 1,
          transition: `opacity ${out ? EXIT_MS : ENTER_MS}ms ${out ? 'ease-in' : 'ease-out'}`,
          // Promoting the layer only while it moves; leaving will-change on
          // permanently keeps a full-page layer in memory for nothing.
          willChange: active ? 'opacity' : undefined,
        }}
      >
        {children}
      </div>

      {active && (
        <div
          aria-hidden="true"
          // Above the fixed header, which sits at 9999.
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{
            pointerEvents: 'none',
            animation: `${out ? 'katov-melt-in' : 'katov-melt-out'} ${
              out ? EXIT_MS : ENTER_MS
            }ms ease-out forwards`,
          }}
        >
          <style>{OVERLAY_KEYFRAMES}</style>
          <MeltLogo
            className="h-[120px] sm:h-[160px] w-auto overflow-visible"
            // A full melt in the time the transition actually lasts, and one
            // less octave of noise than the showcase version.
            cycleMs={1500}
            octaves={2}
          />
        </div>
      )}
    </>
  );
}
