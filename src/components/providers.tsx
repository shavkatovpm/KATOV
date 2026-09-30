'use client';

import { ReactNode, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Disable scroll during page entrance animation
    document.body.style.overflow = 'hidden';

    // Enable scroll after initial animations (0.5s)
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {/* Inertia-style smooth wheel scrolling; touch devices keep native scroll */}
      <ReactLenis
        root
        options={{ lerp: 0.1, anchors: true, allowNestedScroll: true }}
      >
        {children}
      </ReactLenis>
    </ThemeProvider>
  );
}
