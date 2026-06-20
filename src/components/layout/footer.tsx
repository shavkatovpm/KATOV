'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/config/site';
import { Link } from '@/i18n/routing';
import { getServicesCatalog } from '@/data/services';
import type { Locale } from '@/i18n/config';

const catalog = getServicesCatalog();

export function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const isHomePage = pathname === `/${locale}` || pathname === '/';
  const servicesHeading =
    locale === 'ru' ? 'Услуги' : locale === 'en' ? 'Services' : 'Xizmatlar';
  const allServicesLabel =
    locale === 'ru' ? 'Все услуги' : locale === 'en' ? 'All services' : 'Barcha xizmatlar';

  return (
    <footer
      className="py-12 md:py-16"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-4">
            <a
              href={`/${locale}`}
              onClick={(e) => {
                e.preventDefault();
                if (isHomePage) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  router.push(`/${locale}`);
                }
              }}
              className="text-xl sm:text-2xl font-bold tracking-tight cursor-pointer"
            >
              {siteConfig.name}
            </a>
            <p className="text-muted mt-4 text-sm sm:text-base max-w-md">
              {t('description')}
            </p>
          </div>

          {/* Services — all 12, two sub-columns to keep footer compact */}
          <div className="sm:col-span-2 md:col-span-6">
            <h4 className="font-semibold text-sm sm:text-base mb-4">
              {servicesHeading}
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {catalog.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="footer-link text-xs sm:text-sm"
                  >
                    {item.card[locale].title}
                  </Link>
                </li>
              ))}
              <li className="col-span-2 mt-2">
                <Link
                  href="/services"
                  className="footer-link text-xs sm:text-sm font-medium"
                >
                  {allServicesLabel} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + quick nav */}
          <div className="sm:col-span-2 md:col-span-2">
            <h4 className="font-semibold text-sm sm:text-base mb-4">
              {t('contact')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="footer-link"
                >
                  {siteConfig.contact.phoneCode} {siteConfig.contact.phoneNumber}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.support}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Support
                </a>
              </li>
            </ul>
            <ul className="space-y-2 text-xs sm:text-sm mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              {siteConfig.navigation
                .filter((item) => !item.href.startsWith('#') && item.href !== '/services')
                .map((item) => (
                  <li key={item.key}>
                    <Link href={item.href === '/' ? '/' : item.href} className="footer-link">
                      {navT(item.key)}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 text-center sm:text-left"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-muted text-xs sm:text-sm">
            &copy; {currentYear} {siteConfig.name} {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
