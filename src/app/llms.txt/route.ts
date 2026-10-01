import { getServicesCatalog, servicePath, servicesData } from '@/data/services';
import { getBlogPosts } from '@/lib/blog';
import { siteConfig } from '@/config/site';
import { localizedUrl } from '@/lib/urls';
import { homeProcess } from '@/data/home';

// Generated from the same data the pages render (services catalog, blog
// files, site config), so URLs, prices and contacts can't drift out of sync
// with the site the way the old hand-written public/llms.txt did.
export const dynamic = 'force-static';

function price(basePrice: number, suffix: string) {
  return `$${basePrice}${suffix ? suffix : ''} dan`;
}

export function GET() {
  const catalog = getServicesCatalog().filter((item) => item.available);
  const posts = getBlogPosts('uz');

  const services = catalog
    .map((item) => {
      const card = item.card.uz;
      const duration = servicesData[item.slug]?.content.uz.processTotalDuration;
      const facts = [price(item.basePrice, item.priceSuffix), duration].filter(Boolean).join(', ');
      return `- [${card.title}](${localizedUrl('uz', servicePath(item.slug))}): ${card.description} (${facts})`;
    })
    .join('\n');

  const blog = posts
    .map((post) => `- [${post.title}](${localizedUrl('uz', `/blog/${post.slug}`)}): ${post.description}`)
    .join('\n');

  const process = homeProcess.uz.steps.map((step, i) => `${i + 1}. ${step.title} — ${step.text}`).join('\n');

  const body = `# KATOV

> KATOV — O'zbekistondagi IT xizmatlar agentligi (2024-yildan). Sayt yaratish, SEO, AI SEO (AEO/GEO), Google Ads, Telegram bot, CRM va ERP. Har bir loyiha individual, sayt 3 tilda (o'zbek, rus, ingliz) bo'lishi mumkin, narxlar saytda ochiq.

Site: ${localizedUrl('uz')}
Email: ${siteConfig.contact.email}
Phone: ${siteConfig.contact.phone}
Telegram channel: ${siteConfig.social.telegram}
Telegram support bot: ${siteConfig.social.support}
Instagram: ${siteConfig.social.instagram}
Founded: 2024
Languages: Uzbek, Russian, English
Areas served: Uzbekistan

## Main pages

- [Bosh sahifa](${localizedUrl('uz')})
- [Biz haqimizda](${localizedUrl('uz', '/about')})
- [Barcha xizmatlar](${localizedUrl('uz', '/services')})
- [Portfolio](${localizedUrl('uz', '/portfolio')})
- [Blog](${localizedUrl('uz', '/blog')})
- [Aloqa](${localizedUrl('uz', '/contact')})
- [Narx kalkulyatori](${localizedUrl('uz', '/studio/price')})

## Services

Narxlar boshlang'ich ("dan"), yakuniy narx loyiha hajmiga bog'liq.

${services}

## Process

${process}

## Portfolio

- [Darslinker](https://darslinker.uz) — onlayn ta'limni tizimlashtirish platformasi
- [Getolog](https://getolog.uz) — yopiq Telegram kanallarini avtomatlashtirish
- [StarsJoy](https://starsjoy.uz) — Telegram Stars, Premium va sovg'alar Mini App
- [Unumly](https://unumly.uz) — kunlik rejalashtirish va shaxsiy moliya ilovasi
- [Uzbektype](https://uzbektype.uz) — tez va to'g'ri yozishni tekshirish
- [Yuzinchi](https://yuzinchi.uz) — raqamli marketing agentligi sayti

## Blog (uz)

${blog}

## Languages

- [O'zbekcha](${localizedUrl('uz')}) — asosiy
- [Русский](${localizedUrl('ru')})
- [English](${localizedUrl('en')})

## Optional

- [Sitemap](${localizedUrl('uz', '/sitemap.xml')})
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
