'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';

const portfolioItems = [
  { id: '1', title: 'Darslinker', category: "Onlayn ta'limni tizimlashtirish platformasi", url: 'https://darslinker.uz', image: '/portfolio/Darslinker.png' },
  { id: '2', title: 'Getolog', category: 'Yopiq telegram kanallarini avtomatlashtirish', url: 'https://getolog.uz', image: '/portfolio/Getolog.png' },
  { id: '3', title: 'Uzbektype', category: "Tez va to'g'ri yozishni tekshirish", url: 'https://uzbektype.uz', image: '/portfolio/Uzbektype.png' },
];

interface SelectedItem {
  title: string;
  url: string;
}

export function Portfolio() {
  const t = useTranslations('portfolio');
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCardClick = (item: SelectedItem) => {
    setSelectedItem(item);
  };

  const handleConfirm = () => {
    if (selectedItem) {
      window.open(selectedItem.url, '_blank', 'noopener,noreferrer');
      setSelectedItem(null);
    }
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-script text-white">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                onClick={() => handleCardClick({ title: item.title, url: item.url })}
                className="group block relative w-full text-left cursor-pointer"
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-fg) 5%, transparent)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                  />

                  {/* Top left - Title and Description */}
                  <div className="relative z-10 text-left">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 group-hover:opacity-70 transition-opacity">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base opacity-70">
                      {item.category}
                    </p>
                  </div>

                  {/* Bottom right - Arrow icon */}
                  <div className="relative z-10 flex justify-end">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: 'var(--color-border)' }}
                    >
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-colors"
          >
            {t('viewAll')}
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      </div>

      {/* Confirmation Modal - rendered via Portal to body */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedItem && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
              onClick={handleCancel}
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              />

              {/* Modal */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-2xl p-6 sm:p-8"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)'
                }}
              >
                {/* Close button */}
                <button
                  onClick={handleCancel}
                  className="absolute top-4 right-4 p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity"
                >
                  <X size={20} />
                </button>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                    Rostdan ham <span className="text-blue-400">{selectedItem.title}</span> saytiga o&apos;tmoqchimisiz?
                  </h3>

                  {/* Buttons */}
                  <div className="flex gap-3 justify-center mt-6">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-fg) 10%, transparent)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      Yo&apos;q
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="px-6 py-2.5 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Ha
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
