'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const plans = [
  { id: 'minimal', price: 270, features: 6, popular: false },
  { id: 'standart', price: 870, features: 7, popular: true },
  { id: 'individual', price: 2700, features: 7, popular: false },
];

export function Services() {
  const t = useTranslations('services');
  const pt = useTranslations('pricing');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [shakeButton, setShakeButton] = useState<string | null>(null);
  const [shakeChevron, setShakeChevron] = useState(false);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: false });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chevronTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const activeCard = hoveredCard || expandedCard;
    if (activeCard) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShakeButton(activeCard);
      }, 12000);
    } else {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setShakeButton(null);
    }
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [hoveredCard, expandedCard]);

  // Mobile chevron animation after 10s idle, restart on card click or view change
  useEffect(() => {
    if (!sectionInView) {
      if (chevronTimerRef.current) clearTimeout(chevronTimerRef.current);
      setShakeChevron(false);
      return;
    }

    if (chevronTimerRef.current) clearTimeout(chevronTimerRef.current);
    setShakeChevron(false);
    chevronTimerRef.current = setTimeout(() => {
      setShakeChevron(true);
    }, 10000);

    return () => {
      if (chevronTimerRef.current) clearTimeout(chevronTimerRef.current);
    };
  }, [expandedCard, sectionInView]);

  const handleCardClick = (planId: string) => {
    if (window.innerWidth < 1024) {
      const newExpanded = expandedCard === planId ? null : planId;
      setExpandedCard(newExpanded);
    }
  };

  useEffect(() => {
    if (expandedCard && cardRefs.current[expandedCard]) {
      setTimeout(() => {
        const element = cardRefs.current[expandedCard];
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.scrollY;
          const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
          window.scrollTo({
            top: middle,
            behavior: 'smooth'
          });
        }
      }, 350);
    }
  }, [expandedCard]);

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-5"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('title')}
          </h2>
          <p className="text-muted text-sm mt-2">{t('subtitle')}</p>
        </motion.div>

        {/* Desktop Cards */}
        <div
          className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch"
          onMouseLeave={() => setHoveredCard(null)}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={hoveredCard === plan.id ? plan.id : `${plan.id}-${hoveredCard || 'default'}`}
              initial={{ opacity: 1, borderColor: 'var(--color-border)', filter: 'blur(0px)' }}
              animate={{
                x: plan.popular ? (hoveredCard === plan.id ? 0 : [0, -2, 2, -2, 2, 0]) : 0,
                filter: hoveredCard && hoveredCard !== plan.id ? 'blur(5px)' : 'blur(0px)',
                opacity: hoveredCard && hoveredCard !== plan.id ? 0 : 1,
                borderColor: hoveredCard === plan.id ? '#dddddd' : 'var(--color-border)',
              }}
              viewport={{ once: true }}
              transition={{
                opacity: {
                  duration: hoveredCard && hoveredCard !== plan.id ? 5 : 0.5,
                  delay: hoveredCard && hoveredCard !== plan.id ? 6 : 0
                },
                x: plan.popular ? { duration: 0.5, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' } : { duration: 0.3 },
                borderColor: { duration: 0.3 },
                filter: {
                  duration: hoveredCard && hoveredCard !== plan.id ? 5 : 0.5,
                  delay: hoveredCard && hoveredCard !== plan.id ? 2 : 0
                },
              }}
              className="relative rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: 'var(--color-bg)',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
              onMouseEnter={() => setHoveredCard(plan.id)}
            >
              <h3 className="text-xl font-semibold mb-3">
                {pt(`${plan.id}.name`)}
              </h3>
              <p className="text-sm mb-2 text-muted">
                {pt(`${plan.id}.description`)}
              </p>
              <p className="text-sm mb-6 text-muted">
                {pt(`${plan.id}.description2`)}
              </p>

              <div className="mb-6">
                <ul className="space-y-2.5">
                  {Array.from({ length: plan.features }).map((_, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 opacity-70" />
                      <span>{pt(`${plan.id}.feature${i + 1}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div>
                  <span className="text-xl font-bold">${plan.price.toLocaleString()}</span>
                  <span className="text-xl ml-0.5 font-bold">{pt('from')}</span>
                </div>

                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  animate={shakeButton === plan.id ? {
                    x: [0, -12, 12, -12, 12, 0],
                  } : {}}
                  transition={{
                    x: { duration: 0.5, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' },
                  }}
                  className="btn-outline inline-block py-2 px-6 text-center text-sm font-medium rounded-full cursor-pointer"
                >
                  {pt('cta')}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div ref={sectionRef} className="lg:hidden grid gap-5">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              ref={(el) => { cardRefs.current[plan.id] = el; }}
              initial={{ opacity: 0, borderColor: 'var(--color-border)' }}
              whileInView={{ opacity: 1 }}
              animate={
                expandedCard === plan.id
                  ? { borderColor: '#dddddd' }
                  : plan.popular && !expandedCard
                    ? { x: [0, -2, 2, -2, 2, 0] }
                    : {}
              }
              viewport={{ once: true }}
              transition={
                expandedCard === plan.id
                  ? { borderColor: { duration: 0.3 } }
                  : plan.popular && !expandedCard
                    ? {
                        opacity: { duration: 0.6, delay: index * 0.1 },
                        x: { duration: 0.5, repeat: Infinity, repeatDelay: 6, delay: 3, ease: 'easeInOut' },
                      }
                    : { duration: 0.6, delay: index * 0.1 }
              }
              className="relative rounded-2xl p-6 cursor-pointer"
              style={{
                backgroundColor: 'var(--color-bg)',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
              onClick={() => handleCardClick(plan.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">
                  {pt(`${plan.id}.name`)}
                </h3>
                <motion.div
                  animate={{
                    rotate: expandedCard === plan.id ? 180 : 0,
                    opacity: !expandedCard && shakeChevron ? [0.5, 1, 0.5] : expandedCard === plan.id ? 1 : 0.5,
                    scale: !expandedCard && shakeChevron ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    rotate: { duration: 0.2 },
                    opacity: !expandedCard && shakeChevron
                      ? { duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut', delay: index * 3 }
                      : { duration: 0.3 },
                    scale: !expandedCard && shakeChevron
                      ? { duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut', delay: index * 3 }
                      : { duration: 0.3 },
                  }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div>
              <p className="text-sm text-muted mb-2">
                {pt(`${plan.id}.description`)}
              </p>
              <p className="text-sm text-muted">
                {pt(`${plan.id}.description2`)}
              </p>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedCard === plan.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="pt-5 mt-5" style={{ borderTop: '1px solid var(--color-border)' }}>
                      <p className="text-sm font-medium mb-3">{pt('includes')}</p>
                      <ul className="space-y-2.5">
                        {Array.from({ length: plan.features }).map((_, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <Check size={16} className="mt-0.5 shrink-0 opacity-70" />
                            <span>{pt(`${plan.id}.feature${i + 1}`)}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-5 mt-5 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
                        <div>
                          <span className="text-lg font-bold">${plan.price.toLocaleString()}</span>
                          <span className="text-lg ml-0.5 font-bold">{pt('from')}</span>
                        </div>

                        <motion.a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const element = document.querySelector('#contact');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          animate={shakeButton === plan.id ? {
                            x: [0, -12, 12, -12, 12, 0],
                          } : {}}
                          transition={{
                            x: { duration: 0.5, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' },
                          }}
                          className="btn-outline inline-block py-2 px-6 text-center text-sm font-medium rounded-full cursor-pointer"
                        >
                          {pt('cta')}
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Free Consultation Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 flex flex-row items-center justify-center gap-2 sm:gap-3"
        >
          <Link
            href="/studio/price"
            className="btn-outline inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-medium transition-colors cursor-pointer"
          >
            {t('calcPrice')}
          </Link>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-outline inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-medium transition-colors cursor-pointer"
          >
            {t('freeConsultation')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
