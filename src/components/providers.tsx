'use client';

import { ReactNode, useEffect } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Disable scroll during page entrance animation
    document.body.style.overflow = 'hidden';

    // Enable scroll after animation completes (2.5s total)
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
