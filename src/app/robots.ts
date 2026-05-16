import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Major search engines
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },

      // AI / LLM crawlers — explicit ALLOW so content can be cited
      { userAgent: 'GPTBot', allow: '/' },            // OpenAI training
      { userAgent: 'OAI-SearchBot', allow: '/' },     // ChatGPT search
      { userAgent: 'ChatGPT-User', allow: '/' },      // ChatGPT browse
      { userAgent: 'ClaudeBot', allow: '/' },         // Anthropic Claude
      { userAgent: 'Claude-Web', allow: '/' },        // Anthropic browse
      { userAgent: 'anthropic-ai', allow: '/' },      // Anthropic alt
      { userAgent: 'PerplexityBot', allow: '/' },     // Perplexity
      { userAgent: 'Perplexity-User', allow: '/' },   // Perplexity browse
      { userAgent: 'Google-Extended', allow: '/' },   // Google Bard / Gemini training
      { userAgent: 'CCBot', allow: '/' },             // Common Crawl
      { userAgent: 'Applebot-Extended', allow: '/' }, // Apple Intelligence
      { userAgent: 'Bytespider', allow: '/' },        // ByteDance / Doubao
      { userAgent: 'meta-externalagent', allow: '/' },// Meta AI
      { userAgent: 'cohere-ai', allow: '/' },         // Cohere
      { userAgent: 'YouBot', allow: '/' },            // You.com
      { userAgent: 'Diffbot', allow: '/' },           // Diffbot (knowledge graph)
      { userAgent: 'Amazonbot', allow: '/' },         // Amazon Alexa
    ],
    sitemap: 'https://katov.uz/sitemap.xml',
    host: 'https://katov.uz',
  };
}
