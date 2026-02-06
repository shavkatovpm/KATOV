'use client';

import { useEffect } from 'react';

export function PreventOverscroll() {
  useEffect(() => {
    let startY = 0;

    function handleTouchStart(e: TouchEvent) {
      startY = e.touches[0].clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      const currentY = e.touches[0].clientY;
      const scrollTop = window.scrollY;
      const isAtTop = scrollTop <= 0;
      const isPullingDown = currentY > startY;

      // Prevent overscroll bounce at top
      if (isAtTop && isPullingDown) {
        e.preventDefault();
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
}
