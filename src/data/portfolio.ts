export interface PortfolioItem {
  id: string;
  title: string;
  categoryKey: keyof Record<'darslinker' | 'getolog' | 'uzbektype', string>;
  url: string;
  image: string;
  tags: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'darslinker',
    title: 'Darslinker',
    categoryKey: 'darslinker',
    url: 'https://darslinker.uz',
    image: '/portfolio/Darslinker.png',
    tags: ['landing-page', 'korporativ-sayt', 'admin-panel', 'ui-ux-dizayn'],
  },
  {
    id: 'getolog',
    title: 'Getolog',
    categoryKey: 'getolog',
    url: 'https://getolog.uz',
    image: '/portfolio/Getolog.png',
    tags: ['telegram-bot', 'admin-panel'],
  },
  {
    id: 'uzbektype',
    title: 'Uzbektype',
    categoryKey: 'uzbektype',
    url: 'https://uzbektype.uz',
    image: '/portfolio/Uzbektype.png',
    tags: ['landing-page', 'ui-ux-dizayn', 'portfolio-sayt'],
  },
];

export function getPortfolioForService(serviceSlug: string): PortfolioItem[] {
  return portfolioItems.filter((item) => item.tags.includes(serviceSlug));
}

export function getPortfolioById(id: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.id === id);
}
