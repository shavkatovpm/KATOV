'use client';

import { useEffect } from 'react';

export function ScrollSnap() {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let isSnapping = false;

    const sections = () => document.querySelectorAll('section[id]');

    const snapToNearestSection = () => {
      if (isSnapping) return;

      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const sectionElements = sections();

      let nearestSection: Element | null = null;
      let minDistance = Infinity;

      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const distanceToTop = Math.abs(scrollY - sectionTop);

        // Check if section is within snap range (40% of viewport)
        if (distanceToTop < viewportHeight * 0.4 && distanceToTop < minDistance) {
          minDistance = distanceToTop;
          nearestSection = section;
        }
      });

      if (nearestSection && minDistance > 10) {
        isSnapping = true;
        const rect = nearestSection.getBoundingClientRect();
        const targetY = scrollY + rect.top;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });

        // Reset snapping flag after animation
        setTimeout(() => {
          isSnapping = false;
        }, 500);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Clear previous timeout
      clearTimeout(scrollTimeout);

      // Only snap if scroll velocity is low (user stopped or slowed down)
      scrollTimeout = setTimeout(() => {
        if (scrollVelocity < 50) {
          snapToNearestSection();
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null;
}
