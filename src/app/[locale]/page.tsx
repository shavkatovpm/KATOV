'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { Portfolio } from '@/components/sections/portfolio';
// import { BlogPreview } from '@/components/sections/blog-preview';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  const [heroComplete, setHeroComplete] = useState(false);

  return (
    <>
      <Hero onAnimationComplete={() => setHeroComplete(true)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={heroComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <About />
        <Services />
        <Portfolio />
        {/* <BlogPreview /> */}
        <Contact />
      </motion.div>
    </>
  );
}
