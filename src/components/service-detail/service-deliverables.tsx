import { Check } from 'lucide-react';
import type { ServiceLocalizedContent } from '@/data/services';

interface ServiceDeliverablesProps {
  content: ServiceLocalizedContent;
}

export function ServiceDeliverables({ content }: ServiceDeliverablesProps) {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
          {content.deliverablesTitle}
        </h2>

        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          {content.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check size={18} className="mt-0.5 shrink-0 opacity-70" />
              <span className="text-sm sm:text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
