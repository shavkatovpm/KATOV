import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { iconMap } from './icon-map';
import type { IconName } from '@/data/services';

interface ServiceCardProps {
  slug: string;
  icon: IconName;
  title: string;
  description: string;
  basePrice: number;
  priceSuffix: string;
  available: boolean;
  href: string;
  fromLabel: string;
  comingSoonBadge: string;
  cardCta: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  basePrice,
  priceSuffix,
  available,
  href,
  fromLabel,
  comingSoonBadge,
  cardCta,
}: ServiceCardProps) {
  const Icon = iconMap[icon];

  const cardInner = (
    <div
      className={`group relative rounded-2xl p-5 lg:p-6 flex flex-col h-full transition-[border-color] duration-300 ${
        available
          ? 'border border-[var(--color-border)] hover:border-[var(--color-fg)]'
          : 'border border-[var(--color-border)] opacity-70'
      }`}
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon size={28} className="opacity-70" />
        {!available && (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-fg) 8%, transparent)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Clock size={11} />
            {comingSoonBadge}
          </span>
        )}
      </div>

      <h3 className="text-base lg:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-xs lg:text-sm text-muted mb-4 leading-relaxed flex-1">{description}</p>

      <div
        className="mt-auto pt-4 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="text-sm">
          <span className="text-muted">{fromLabel} </span>
          <span className="font-semibold">
            ${basePrice}
            {priceSuffix}
          </span>
        </div>
        {available && (
          <span className="inline-flex items-center gap-1 text-xs lg:text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
            {cardCta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </div>
  );

  if (!available) {
    return <div className="block cursor-not-allowed">{cardInner}</div>;
  }

  return (
    <Link href={href} className="block">
      {cardInner}
    </Link>
  );
}
