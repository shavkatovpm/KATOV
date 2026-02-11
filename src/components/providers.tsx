'use client';

import { ReactNode, useEffect } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Disable scroll during page entrance animation
    document.body.style.overflow = 'hidden';

    // Enable scroll after initial animations (1.5s)
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return <>{children}</>;
}
