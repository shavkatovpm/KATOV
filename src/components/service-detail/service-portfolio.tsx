import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { portfolioItems } from '@/data/portfolio';
import type { ServiceLocalizedContent } from '@/data/services';

interface ServicePortfolioProps {
  content: ServiceLocalizedContent;
  categoryLabel: (id: string) => string;
}

export function ServicePortfolio({ content, categoryLabel }: ServicePortfolioProps) {
  const items = portfolioItems;
  if (items.length === 0) return null;

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-custom max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
          {content.portfolioTitle}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative"
            >
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                />

                <div className="relative z-10 text-left">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-2 group-hover:opacity-70 transition-opacity">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-70">{categoryLabel(item.id)}</p>
                </div>

                <div className="relative z-10 flex justify-end">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: 'var(--color-border)' }}
                  >
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
