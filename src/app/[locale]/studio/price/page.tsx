'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import Link from 'next/link';

type Step = 'type' | 'features' | 'design' | 'result';

const steps: Step[] = ['type', 'features', 'design', 'result'];

const siteTypes = [
  { id: 'landing', basePrice: 270, baseDays: 7 },
  { id: 'corporate', basePrice: 600, baseDays: 14 },
  { id: 'ecommerce', basePrice: 1200, baseDays: 21 },
  { id: 'platform', basePrice: 2700, baseDays: 45 },
];

const features = [
  { id: 'admin', price: 200, days: 5 },
  { id: 'telegram', price: 150, days: 3 },
  { id: 'analytics', price: 100, days: 2 },
  { id: 'seo', price: 100, days: 2 },
  { id: 'multilang', price: 150, days: 3 },
  { id: 'payment', price: 200, days: 4 },
];

const designTypes = [
  { id: 'simple', multiplier: 1, extraDays: 0 },
  { id: 'medium', multiplier: 1.3, extraDays: 3 },
  { id: 'creative', multiplier: 1.7, extraDays: 7 },
];

export default function PriceCalculator() {
  const t = useTranslations('studio.priceTool');
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
        totalDays += feature.days;
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
    <div className="section-padding pt-32">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 text-muted hover:opacity-70 transition-opacity mb-10"
          >
            <ArrowLeft size={18} />
            {t('back')}
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-muted text-base sm:text-lg">
              {t('description')}
            </p>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: step === s || stepIndex > i
                      ? 'var(--color-fg)'
                      : 'color-mix(in srgb, var(--color-fg) 10%, transparent)',
                    color: step === s || stepIndex > i
                      ? 'var(--color-bg)'
                      : 'inherit',
                  }}
                >
                  {stepIndex > i ? <Check size={14} /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-12 h-0.5"
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

          <AnimatePresence mode="wait">
            {/* Step 1: Site Type */}
            {step === 'type' && (
              <motion.div
                key="type"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">{t('stepType')}</h2>
                <div className="grid gap-3">
                  {siteTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className="w-full text-left rounded-2xl p-5 transition-all cursor-pointer"
                      style={{
                        backgroundColor: selectedType === type.id
                          ? 'color-mix(in srgb, var(--color-fg) 15%, transparent)'
                          : 'color-mix(in srgb, var(--color-fg) 5%, transparent)',
                        border: `1px solid ${selectedType === type.id ? 'var(--color-fg)' : 'var(--color-border)'}`,
                      }}
                    >
                      <div>
                        <h3 className="font-semibold mb-1">{t(`types.${type.id}.title`)}</h3>
                        <p className="text-muted text-sm">{t(`types.${type.id}.description`)}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => selectedType && setStep('features')}
                    disabled={!selectedType}
                    className="px-6 py-3 rounded-full text-sm font-medium transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
              >
                <h2 className="text-xl font-semibold mb-6">{t('stepFeatures')}</h2>
                <div className="grid gap-3">
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className="w-full text-left rounded-2xl p-5 transition-all cursor-pointer"
                      style={{
                        backgroundColor: selectedFeatures.includes(feature.id)
                          ? 'color-mix(in srgb, var(--color-fg) 15%, transparent)'
                          : 'color-mix(in srgb, var(--color-fg) 5%, transparent)',
                        border: `1px solid ${selectedFeatures.includes(feature.id) ? 'var(--color-fg)' : 'var(--color-border)'}`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center text-xs shrink-0"
                          style={{
                            backgroundColor: selectedFeatures.includes(feature.id)
                              ? 'var(--color-fg)'
                              : 'transparent',
                            border: `1px solid ${selectedFeatures.includes(feature.id) ? 'var(--color-fg)' : 'var(--color-border)'}`,
                            color: selectedFeatures.includes(feature.id) ? 'var(--color-bg)' : 'inherit',
                          }}
                        >
                          {selectedFeatures.includes(feature.id) && <Check size={12} />}
                        </div>
                        <div>
                          <h3 className="font-medium">{t(`features.${feature.id}.title`)}</h3>
                          <p className="text-muted text-sm">{t(`features.${feature.id}.description`)}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep('type')}
                    className="px-6 py-3 rounded-full text-sm font-medium transition-opacity cursor-pointer"
                    style={{
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {t('prev')}
                  </button>
                  <button
                    onClick={() => setStep('design')}
                    className="px-6 py-3 rounded-full text-sm font-medium transition-opacity flex items-center gap-2 cursor-pointer"
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
              >
                <h2 className="text-xl font-semibold mb-6">{t('stepDesign')}</h2>
                <div className="grid gap-3">
                  {designTypes.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => setSelectedDesign(design.id)}
                      className="w-full text-left rounded-2xl p-5 transition-all cursor-pointer"
                      style={{
                        backgroundColor: selectedDesign === design.id
                          ? 'color-mix(in srgb, var(--color-fg) 15%, transparent)'
                          : 'color-mix(in srgb, var(--color-fg) 5%, transparent)',
                        border: `1px solid ${selectedDesign === design.id ? 'var(--color-fg)' : 'var(--color-border)'}`,
                      }}
                    >
                      <div>
                        <h3 className="font-semibold mb-1">{t(`designs.${design.id}.title`)}</h3>
                        <p className="text-muted text-sm">{t(`designs.${design.id}.description`)}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep('features')}
                    className="px-6 py-3 rounded-full text-sm font-medium transition-opacity cursor-pointer"
                    style={{
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {t('prev')}
                  </button>
                  <button
                    onClick={() => selectedDesign && setStep('result')}
                    disabled={!selectedDesign}
                    className="px-6 py-3 rounded-full text-sm font-medium transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
              >
                <div
                  className="rounded-2xl p-8 sm:p-10 text-center"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-fg) 5%, transparent)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <h2 className="text-xl font-semibold mb-8">{t('resultTitle')}</h2>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-muted text-sm mb-2">{t('estimatedPrice')}</p>
                      <p className="text-4xl sm:text-5xl font-bold">${price.toLocaleString()}</p>
                      <p className="text-muted text-xs mt-1">{t('priceNote')}</p>
                    </div>
                    <div>
                      <p className="text-muted text-sm mb-2">{t('estimatedDays')}</p>
                      <p className="text-4xl sm:text-5xl font-bold">{days}</p>
                      <p className="text-muted text-xs mt-1">{t('daysNote')}</p>
                    </div>
                  </div>

                  <div className="text-left mb-8">
                    <p className="text-sm font-medium mb-3">{t('selectedItems')}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{t(`types.${selectedType}.title`)}</span>
                        <span className="font-medium">${siteTypes.find(t => t.id === selectedType)?.basePrice}</span>
                      </div>
                      {selectedFeatures.map(fId => {
                        const feature = features.find(f => f.id === fId);
                        return feature ? (
                          <div key={fId} className="flex items-center justify-between text-sm">
                            <span className="text-muted">+ {t(`features.${fId}.title`)}</span>
                            <span className="font-medium">${feature.price}</span>
                          </div>
                        ) : null;
                      })}
                      {selectedDesign && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted">+ {t(`designs.${selectedDesign}.title`)}</span>
                          <span className="font-medium">
                            {designTypes.find(d => d.id === selectedDesign)?.multiplier === 1
                              ? '—'
                              : `×${designTypes.find(d => d.id === selectedDesign)?.multiplier}`
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={reset}
                      className="px-6 py-3 rounded-full text-sm font-medium transition-opacity flex items-center gap-2 justify-center cursor-pointer"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <RotateCcw size={16} />
                      {t('restart')}
                    </button>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/';
                        setTimeout(() => {
                          const el = document.querySelector('#contact');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 500);
                      }}
                      className="px-6 py-3 rounded-full text-sm font-medium transition-opacity flex items-center gap-2 justify-center cursor-pointer"
                      style={{
                        backgroundColor: 'var(--color-fg)',
                        color: 'var(--color-bg)',
                      }}
                    >
                      {t('contactUs')}
                      <ArrowRight size={16} />
                    </a>
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
