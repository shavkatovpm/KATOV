import { Check } from 'lucide-react';
import type { ServiceLocalizedContent } from '@/data/services';

interface ServiceWhyUsProps {
  content: ServiceLocalizedContent;
}

export function ServiceWhyUs({ content }: ServiceWhyUsProps) {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
          {content.whyUsTitle}
        </h2>

        <ul className="space-y-4">
          {content.whyUs.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                style={{
                  backgroundColor: 'var(--color-fg)',
                  color: 'var(--color-bg)',
                }}
              >
                <Check size={14} />
              </div>
              <span className="text-sm sm:text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
