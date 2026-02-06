'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';

export function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12 md:py-16"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2">
            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight">
              {siteConfig.name}
            </Link>
            <p className="text-muted mt-4 text-sm sm:text-base max-w-md">
              {t('description')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {siteConfig.navigation.slice(0, 4).map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-[#767676] text-xs sm:text-sm hover:text-[#dddddd] transition-colors"
                  >
                    {navT(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-4">
              {t('contact')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="text-[#dddddd] hover:text-[#ffffff] transition-colors"
                >
                  {siteConfig.contact.phoneCode} {siteConfig.contact.phoneNumber}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#dddddd] hover:text-[#ffffff] transition-colors"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#dddddd] hover:text-[#ffffff] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.support}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#dddddd] hover:text-[#ffffff] transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 text-center sm:text-left"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-muted text-xs sm:text-sm">
            &copy; {currentYear} {siteConfig.name}. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
