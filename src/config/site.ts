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
    { key: 'portfolio', href: '#portfolio' },
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
    id: 'minimal',
    nameKey: 'pricing.minimal.name',
    price: 270,
    currency: 'USD',
    descriptionKey: 'pricing.minimal.description',
    features: [
      'pricing.minimal.feature1',
      'pricing.minimal.feature2',
      'pricing.minimal.feature3',
      'pricing.minimal.feature4',
      'pricing.minimal.feature5',
      'pricing.minimal.feature6',
    ],
  },
  {
    id: 'standart',
    nameKey: 'pricing.standart.name',
    price: 870,
    currency: 'USD',
    descriptionKey: 'pricing.standart.description',
    features: [
      'pricing.standart.feature1',
      'pricing.standart.feature2',
      'pricing.standart.feature3',
      'pricing.standart.feature4',
      'pricing.standart.feature5',
      'pricing.standart.feature6',
      'pricing.standart.feature7',
    ],
    popular: true,
  },
  {
    id: 'individual',
    nameKey: 'pricing.individual.name',
    price: 2700,
    currency: 'USD',
    descriptionKey: 'pricing.individual.description',
    features: [
      'pricing.individual.feature1',
      'pricing.individual.feature2',
      'pricing.individual.feature3',
      'pricing.individual.feature4',
      'pricing.individual.feature5',
      'pricing.individual.feature6',
      'pricing.individual.feature7',
    ],
  },
];
