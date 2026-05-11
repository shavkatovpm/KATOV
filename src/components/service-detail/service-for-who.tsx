import type { ServiceLocalizedContent } from '@/data/services';

interface ServiceForWhoProps {
  content: ServiceLocalizedContent;
}

export function ServiceForWho({ content }: ServiceForWhoProps) {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
          {content.forWhoTitle}
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {content.forWho.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-3"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-fg) 10%, transparent)',
                }}
              >
                {idx + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
