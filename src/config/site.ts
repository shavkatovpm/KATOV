export const siteConfig = {
  name: 'Katov',
  url: 'https://katov.uz',
  author: 'Katov',
  description: 'Kreativ veb-sayt xizmatlari',

  contact: {
    email: 'hello@katov.uz',
    phone: '+998 33 888 01 33',
    phoneCode: '+998',
    phoneNumber: '33 888 01 33',
    telegram: '@katov_uz',
  },

  social: {
    telegram: 'https://t.me/katov_uz',
    instagram: 'https://instagram.com/katov.uz',
    github: 'https://github.com/katov',
  },

  navigation: [
    { key: 'home', href: '/' },
    { key: 'services', href: '#services' },
    { key: 'contact', href: '#contact' },
  ],
};

export const services = [
  {
    id: 'landing',
    icon: 'Rocket',
    titleKey: 'services.landing.title',
    descriptionKey: 'services.landing.description',
    features: [
      'services.landing.feature1',
      'services.landing.feature2',
      'services.landing.feature3',
    ],
  },
  {
    id: 'corporate',
    icon: 'Building2',
    titleKey: 'services.corporate.title',
    descriptionKey: 'services.corporate.description',
    features: [
      'services.corporate.feature1',
      'services.corporate.feature2',
      'services.corporate.feature3',
    ],
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingCart',
    titleKey: 'services.ecommerce.title',
    descriptionKey: 'services.ecommerce.description',
    features: [
      'services.ecommerce.feature1',
      'services.ecommerce.feature2',
      'services.ecommerce.feature3',
    ],
  },
];

export const pricingPlans = [
  {
    id: 'starter',
    nameKey: 'pricing.starter.name',
    price: 500,
    currency: 'USD',
    descriptionKey: 'pricing.starter.description',
    features: [
      'pricing.starter.feature1',
      'pricing.starter.feature2',
      'pricing.starter.feature3',
      'pricing.starter.feature4',
    ],
  },
  {
    id: 'business',
    nameKey: 'pricing.business.name',
    price: 1500,
    currency: 'USD',
    descriptionKey: 'pricing.business.description',
    features: [
      'pricing.business.feature1',
      'pricing.business.feature2',
      'pricing.business.feature3',
      'pricing.business.feature4',
      'pricing.business.feature5',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    nameKey: 'pricing.enterprise.name',
    price: 3000,
    currency: 'USD',
    descriptionKey: 'pricing.enterprise.description',
    features: [
      'pricing.enterprise.feature1',
      'pricing.enterprise.feature2',
      'pricing.enterprise.feature3',
      'pricing.enterprise.feature4',
      'pricing.enterprise.feature5',
      'pricing.enterprise.feature6',
    ],
  },
];
