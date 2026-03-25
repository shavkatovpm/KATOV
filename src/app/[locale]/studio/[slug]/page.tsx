import { redirect } from 'next/navigation';
import { Locale, defaultLocale } from '@/i18n/config';

interface RedirectPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function StudioSlugRedirect({ params }: RedirectPageProps) {
  const { locale, slug } = await params;
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  redirect(`${prefix}/blog/${slug}`);
}
