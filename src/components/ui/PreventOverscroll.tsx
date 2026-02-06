'use client';

import { useEffect } from 'react';

export function PreventOverscroll() {
  useEffect(() => {
    let startY = 0;
    let startScrollTop = 0;

    function getScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1) return;
      startY = e.touches[0].clientY;
      startScrollTop = getScrollTop();
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length !== 1) return;

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      const scrollTop = getScrollTop();

      // At top of page and pulling down
      if (scrollTop <= 0 && deltaY > 0) {
        e.preventDefault();
        return;
      }

      // At bottom of page and pulling up
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (isAtBottom && deltaY < 0) {
        e.preventDefault();
        return;
      }
    }

    // Use capture phase to intercept before other handlers
    document.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart, { capture: true } as EventListenerOptions);
      document.removeEventListener('touchmove', handleTouchMove, { capture: true } as EventListenerOptions);
    };
  }, []);

  return null;
}
