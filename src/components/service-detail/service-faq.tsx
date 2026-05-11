import { ChevronDown } from 'lucide-react';
import type { ServiceLocalizedContent } from '@/data/services';

interface ServiceFAQProps {
  content: ServiceLocalizedContent;
}

export function ServiceFAQ({ content }: ServiceFAQProps) {
  return (
    <section id="faq" className="section-padding">
      <div className="container-custom max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
          {content.faqTitle}
        </h2>

        <div className="space-y-3">
          {content.faq.map((item) => (
            <details
              key={item.question}
              name="service-faq"
              className="group rounded-2xl px-5 sm:px-6 py-4"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg font-medium leading-snug">
                  {item.question}
                </h3>
                <ChevronDown
                  size={20}
                  className="shrink-0 opacity-60 transition-transform duration-200 group-open:rotate-180 mt-0.5"
                />
              </summary>
              <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
