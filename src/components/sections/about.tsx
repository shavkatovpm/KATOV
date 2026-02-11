'use client';

import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations('about');

  const title = t('title');
  const description = t('description');
  const description2 = t('description2');
  const featuresTitle = t('featuresTitle');
  const feature4 = t('feature4');
  const featuresIntro = t('featuresIntro');
  const bulletFeatures = [
    t('feature1'),
    t('feature2'),
    t('feature3'),
    t('feature5'),
    t('feature6'),
  ];

  return (
    <section
      id="about"
      className="section-padding md:min-h-screen md:flex md:items-center"
    >
      <div className="container-custom w-full">
        <div className="max-w-3xl md:max-w-6xl mx-auto relative">
          <div
            className="absolute -left-4 sm:-left-6 md:-left-8 top-0 bottom-0 w-px pointer-events-none"
            style={{ backgroundColor: '#dddddd' }}
          />
          <div
            className="absolute -right-4 sm:-right-6 md:-right-8 top-0 bottom-0 w-px pointer-events-none"
            style={{ backgroundColor: '#dddddd' }}
          />
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-10 md:mb-16 text-center">
            {title}
          </h2>

          <p className="text-muted text-base sm:text-lg md:text-2xl lg:text-3xl mb-12 md:mb-20 leading-relaxed text-left">
            {description} {description2}
          </p>

          <p className="text-muted text-sm sm:text-base md:text-xl mb-6 md:mb-10 text-left">
            {featuresTitle}
          </p>

          <div className="mb-8 md:mb-12 text-left">
            <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl">
              {feature4}
            </span>
          </div>

          <p className="text-muted text-sm sm:text-base md:text-xl mb-4 md:mb-6 text-left">
            {featuresIntro}
          </p>

          <div className="flex flex-col gap-2 md:gap-3 text-left">
            {bulletFeatures.map((feat, i) => (
              <span key={i} className="flex items-center gap-3 text-base sm:text-lg md:text-xl lg:text-2xl">
                <span className="text-muted">•</span>
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
