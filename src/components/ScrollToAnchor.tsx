'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToAnchor() {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get('scrollTo');

  useEffect(() => {
    if (!scrollTo) return;
    const el = document.getElementById(scrollTo);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Clean up URL
    const url = new URL(window.location.href);
    url.searchParams.delete('scrollTo');
    window.history.replaceState({}, '', url.pathname);
  }, [scrollTo]);

  return null;
}
