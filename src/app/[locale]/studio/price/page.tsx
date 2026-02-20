'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import Link from 'next/link';

type Step = 'type' | 'features' | 'design' | 'result';

const steps: Step[] = ['type', 'features', 'design', 'result'];

const siteTypes = [
  { id: 'landing', basePrice: 220, baseDays: 7 },
  { id: 'corporate', basePrice: 400, baseDays: 14 },
  { id: 'ecommerce', basePrice: 700, baseDays: 21 },
  { id: 'platform', basePrice: 1700, baseDays: 45 },
];

const features = [
  { id: 'admin', price: 150, daysPercent: 0.2 },
  { id: 'telegram', price: 50, daysPercent: 0.2 },
  { id: 'analytics', price: 25, daysPercent: 0.2 },
  { id: 'seo', price: 25, daysPercent: 0.1 },
  { id: 'multilang', price: 25, daysPercent: 0.2 },
  { id: 'payment', price: 200, fixedDays: 7 },
];

const designTypes = [
  { id: 'simple', multiplier: 1, extraDays: 0 },
  { id: 'medium', multiplier: 1.3, extraDays: 3 },
  { id: 'creative', multiplier: 1.7, extraDays: 7 },
];

export default function PriceCalculator() {
  const t = useTranslations('studio.priceTool');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get('from');
  const backHref = fromUrl && fromUrl.startsWith('/studio/') ? `${fromUrl}?scrollTo=price-cta` : '/studio';
  const [step, setStep] = useState<Step>('type');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  const stepIndex = steps.indexOf(step);

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const type = siteTypes.find(t => t.id === selectedType);
    if (!type) return { price: 0, days: 0 };

    let totalPrice = type.basePrice;
    let totalDays = type.baseDays;

    selectedFeatures.forEach(fId => {
      const feature = features.find(f => f.id === fId);
      if (feature) {
        totalPrice += feature.price;
        if (feature.fixedDays) {
          totalDays += feature.fixedDays;
        } else if (feature.daysPercent) {
          totalDays += Math.ceil(type.baseDays * feature.daysPercent);
        }
      }
    });

    const design = designTypes.find(d => d.id === selectedDesign);
    if (design) {
      totalPrice = Math.round(totalPrice * design.multiplier);
      totalDays += design.extraDays;
    }

    return { price: totalPrice, days: totalDays };
  };

  const reset = () => {
    setStep('type');
    setSelectedType(null);
    setSelectedFeatures([]);
    setSelectedDesign(null);
  };

  const { price, days } = calculateTotal();

  return (
    <div className="h-dvh flex flex-col overflow-hidden px-4 sm:px-6 pt-20 sm:pt-24 pb-6 sm:pb-8">
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="shrink-0">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-muted hover:opacity-70 transition-opacity text-sm mb-4 sm:mb-6"
          >
            <ArrowLeft size={16} />
            {t('back')}
          </Link>

          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {t('title')}
            </h1>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: step === s || stepIndex > i
                      ? 'var(--color-fg)'
                      : 'color-mix(in srgb, var(--color-fg) 10%, transparent)',
                    color: step === s || stepIndex > i
                      ? 'var(--color-bg)'
                      : 'inherit',
                  }}
                >
                  {stepIndex > i ? <Check size={12} /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-8 sm:w-12 h-0.5"
                    style={{
                      backgroundColor: stepIndex > i
                        ? 'var(--color-fg)'
                        : 'var(--color-border)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 flex flex-col">
          <AnimatePresence mode="wait">
            {/* Step 1: Site Type */}
            {step === 'type' && (
              <motion.div
                key="type"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1 min-h-0"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 shrink-0">{t('stepType')}</h2>
                <div className="grid gap-2 sm:gap-3 flex-1 min-h-0 auto-rows-fr">
                  {siteTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className="w-full text-left rounded-xl sm:rounded-2xl px-4 py-3 sm:p-5 transition-all cursor-pointer"
                      style={{
                        backgroundColor: selectedType === type.id
                          ? 'color-mix(in srgb, var(--color-fg) 15%, transparent)'
                          : '#000000',
                        border: `1px solid ${selectedType === type.id ? 'var(--color-fg)' : 'var(--color-border)'}`,
                      }}
                    >
                      <h3 className="font-semibold text-sm sm:text-base mb-0.5">{t(`types.${type.id}.title`)}</h3>
                      <p className="text-muted text-xs sm:text-sm line-clamp-1">{t(`types.${type.id}.description`)}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end mt-4 sm:mt-6 shrink-0">
                  <button
                    onClick={() => selectedType && setStep('features')}
                    disabled={!selectedType}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm font-medium transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: 'var(--color-fg)',
                      color: 'var(--color-bg)',
                    }}
                  >
                    {t('next')}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Features */}
            {step === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1 min-h-0"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 shrink-0">{t('stepFeatures')}</h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-3 flex-1 min-h-0 auto-rows-fr">
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className="w-full text-left rounded-xl sm:rounded-2xl px-3 py-2.5 sm:p-4 transition-all cursor-pointer"
                      style={{
                        backgroundColor: selectedFeatures.includes(feature.id)
                          ? 'color-mix(in srgb, var(--color-fg) 15%, transparent)'
                          : '#000000',
                        border: `1px solid ${selectedFeatures.includes(feature.id) ? 'var(--color-fg)' : 'var(--color-border)'}`,
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-0.5">
                        <div
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center text-xs shrink-0"
                          style={{
                            backgroundColor: selectedFeatures.includes(feature.id)
                              ? 'var(--color-fg)'
                              : 'transparent',
                            border: `1px solid ${selectedFeatures.includes(feature.id) ? 'var(--color-fg)' : 'var(--color-border)'}`,
                            color: selectedFeatures.includes(feature.id) ? 'var(--color-bg)' : 'inherit',
                          }}
                        >
                          {selectedFeatures.includes(feature.id) && <Check size={10} />}
                        </div>
                        <h3 className="font-medium text-xs sm:text-base leading-tight">{t(`features.${feature.id}.title`)}</h3>
                      </div>
                      <p className="text-muted text-[10px] sm:text-sm line-clamp-2 pl-6 sm:pl-8">{t(`features.${feature.id}.description`)}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-4 sm:mt-6 shrink-0">
                  <button
                    onClick={() => setStep('type')}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm font-medium transition-opacity cursor-pointer"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    {t('prev')}
                  </button>
                  <button
                    onClick={() => setStep('design')}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm font-medium transition-opacity flex items-center gap-2 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-fg)',
                      color: 'var(--color-bg)',
                    }}
                  >
                    {t('next')}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Design Type */}
            {step === 'design' && (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1 min-h-0"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 shrink-0">{t('stepDesign')}</h2>
                <div className="grid gap-2 sm:gap-3 flex-1 min-h-0 auto-rows-fr">
                  {designTypes.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => setSelectedDesign(design.id)}
                      className="w-full text-left rounded-xl sm:rounded-2xl px-4 py-3 sm:p-5 transition-all cursor-pointer"
                      style={{
                        backgroundColor: selectedDesign === design.id
                          ? 'color-mix(in srgb, var(--color-fg) 15%, transparent)'
                          : '#000000',
                        border: `1px solid ${selectedDesign === design.id ? 'var(--color-fg)' : 'var(--color-border)'}`,
                      }}
                    >
                      <h3 className="font-semibold text-sm sm:text-base mb-0.5">{t(`designs.${design.id}.title`)}</h3>
                      <p className="text-muted text-xs sm:text-sm line-clamp-1">{t(`designs.${design.id}.description`)}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-4 sm:mt-6 shrink-0">
                  <button
                    onClick={() => setStep('features')}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm font-medium transition-opacity cursor-pointer"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    {t('prev')}
                  </button>
                  <button
                    onClick={() => selectedDesign && setStep('result')}
                    disabled={!selectedDesign}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm font-medium transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: 'var(--color-fg)',
                      color: 'var(--color-bg)',
                    }}
                  >
                    {t('calculate')}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Result */}
            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1 min-h-0"
              >
                <div
                  className="rounded-xl sm:rounded-2xl p-5 sm:p-8 flex flex-col flex-1 min-h-0"
                  style={{
                    backgroundColor: '#000000',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center shrink-0">{t('resultTitle')}</h2>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 shrink-0">
                    <div className="text-center">
                      <p className="text-muted text-xs sm:text-sm mb-1">{t('estimatedPrice')}</p>
                      <p className="text-3xl sm:text-4xl md:text-5xl font-bold">${price.toLocaleString()}</p>
                      <p className="text-muted text-[10px] sm:text-xs mt-1">{t('priceNote')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted text-xs sm:text-sm mb-1">{t('estimatedDays')}</p>
                      <p className="text-3xl sm:text-4xl md:text-5xl font-bold">{days}</p>
                      <p className="text-muted text-[10px] sm:text-xs mt-1">{t('daysNote')}</p>
                    </div>
                  </div>

                  <div className="text-left mb-4 sm:mb-6 flex-1 min-h-0 overflow-auto">
                    <p className="text-xs sm:text-sm font-medium mb-2">{t('selectedItems')}</p>
                    <div className="space-y-1.5">
                      <div className="text-xs sm:text-sm">
                        {t(`types.${selectedType}.title`)}
                      </div>
                      {selectedFeatures.map(fId => (
                        <div key={fId} className="text-xs sm:text-sm text-muted">
                          + {t(`features.${fId}.title`)}
                        </div>
                      ))}
                      {selectedDesign && (
                        <div className="text-xs sm:text-sm text-muted">
                          + {t(`designs.${selectedDesign}.title`)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 sm:gap-3 justify-center shrink-0">
                    <button
                      onClick={reset}
                      className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-opacity flex items-center gap-1.5 sm:gap-2 justify-center cursor-pointer"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <RotateCcw size={14} />
                      {t('restart')}
                    </button>
                    <button
                      onClick={() => {
                        const params = new URLSearchParams({
                          type: selectedType || '',
                          features: selectedFeatures.join(','),
                          design: selectedDesign || '',
                          price: String(price),
                          days: String(days),
                        });
                        window.location.href = `/${locale}?order=${encodeURIComponent(params.toString())}#contact`;
                      }}
                      className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-opacity flex items-center gap-1.5 sm:gap-2 justify-center cursor-pointer"
                      style={{
                        backgroundColor: 'var(--color-fg)',
                        color: 'var(--color-bg)',
                      }}
                    >
                      {t('order')}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
