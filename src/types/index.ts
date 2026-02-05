export interface NavItem {
  title: string;
  href: string;
}

export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  url?: string;
  technologies: string[];
}

export interface PricingPlan {
  id: string;
  nameKey: string;
  price: number;
  currency: string;
  descriptionKey: string;
  features: string[];
  popular?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  author: string;
  tags: string[];
  readingTime: number;
  locale: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
