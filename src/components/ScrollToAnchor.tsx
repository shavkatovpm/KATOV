'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function ScrollToAnchorInner() {
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

// useSearchParams triggers a CSR bailout during static prerender unless
// it's wrapped in Suspense — without this the whole blog post page falls
// back to dynamic rendering.
export default function ScrollToAnchor() {
  return (
    <Suspense fallback={null}>
      <ScrollToAnchorInner />
    </Suspense>
  );
}
