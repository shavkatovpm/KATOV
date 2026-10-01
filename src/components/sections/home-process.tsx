'use client';

import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { homeProcess } from '@/data/home';
import type { Locale } from '@/i18n/config';

const CARD = { backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' };

/** Home: 4-step process next to the three starting price tiers. */
export function HomeProcess() {
  const locale = useLocale() as Locale;
  const copy = homeProcess[locale] ?? homeProcess.uz;

  return (
    <section id="process" className="section-padding">
      <div className="container-custom max-w-6xl grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">{copy.title}</h2>
          <ol className="space-y-4">
            {copy.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold"
                  style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted mt-1 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">{copy.pricingTitle}</h2>
          <ul className="space-y-3">
            {copy.tiers.map((tier) => (
              <li key={tier.name}>
                <Link
                  href={tier.href}
                  className="group rounded-2xl p-5 flex items-center justify-between gap-4"
                  style={CARD}
                >
                  <div>
                    <h3 className="font-semibold group-hover:underline underline-offset-4">{tier.name}</h3>
                    <p className="text-sm text-muted mt-1">{tier.text}</p>
                  </div>
                  <span className="shrink-0 text-lg font-bold whitespace-nowrap">{tier.price}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted mt-4">{copy.pricingNote}</p>
          <Link
            href="/studio/price"
            className="btn-outline mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-colors"
          >
            {copy.calcCta}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
