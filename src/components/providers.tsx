'use client';

import { ReactNode, useEffect } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Disable scroll during page entrance animation
    document.body.style.overflow = 'hidden';

    // Enable scroll after elements appear (~0.75s typewriter start + ~1.55s typing + 1s pause)
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 3300);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return <>{children}</>;
}
