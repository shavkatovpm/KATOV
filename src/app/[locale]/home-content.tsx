'use client';

import { useLocale } from 'next-intl';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { Portfolio } from '@/components/sections/portfolio';
import { HomeProcess } from '@/components/sections/home-process';
import { BlogPreview, type BlogPreviewPost } from '@/components/sections/blog-preview';
import { Contact } from '@/components/sections/contact';
import { ServiceFAQ } from '@/components/service-detail/service-faq';
import { homeFaq } from '@/data/home';
import type { Locale } from '@/i18n/config';

/**
 * Everything below the hero used to sit at `opacity: 0` until the hero's
 * typewriter animation reported completion. That made the whole page body —
 * and every internal link in it — invisible to anything that snapshots the
 * page before a chain of JS timers finishes; in a headless browser it stayed
 * hidden past six seconds. The hero is full-height, so this content is off
 * screen until the visitor scrolls anyway: gating it bought nothing visually
 * and cost the crawler the entire page.
 *
 * Order: offer → services → proof → process & price → FAQ → latest articles → form.
 */
export default function HomeContent({ posts }: { posts: BlogPreviewPost[] }) {
  const locale = useLocale() as Locale;
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <HomeProcess />
      <ServiceFAQ content={homeFaq[locale] ?? homeFaq.uz} />
      <BlogPreview posts={posts} />
      <Contact />
    </>
  );
}
