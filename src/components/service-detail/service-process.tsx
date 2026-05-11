import { Clock } from 'lucide-react';
import type { ServiceLocalizedContent } from '@/data/services';

interface ServiceProcessProps {
  content: ServiceLocalizedContent;
}

export function ServiceProcess({ content }: ServiceProcessProps) {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-5xl">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {content.processTitle}
          </h2>
          <div className="inline-flex items-center gap-2 text-sm text-muted">
            <Clock size={16} className="opacity-70" />
            <span>{content.processTotalDuration}</span>
          </div>
        </div>

        <ol className="space-y-5">
          {content.process.map((step) => (
            <li
              key={step.step}
              className="rounded-2xl p-5 sm:p-6 flex gap-5 sm:gap-6"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold"
                style={{
                  backgroundColor: 'var(--color-fg)',
                  color: 'var(--color-bg)',
                }}
              >
                {step.step}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                  <h3 className="text-base sm:text-lg font-semibold">{step.title}</h3>
                  <span className="text-xs sm:text-sm text-muted">{step.duration}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
