/** 全站 JSON-LD 结构化数据常量，用于 SEO 与富摘要 / AI 引用 */

const SITE_URL = 'https://solvea.cx';

const Organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Solvea',
  url: SITE_URL,
  description:
    'Solvea is a no-code AI receptionist that answers phone calls, SMS, email, and live chat so service businesses never miss a customer interaction.',
  image:
    'https://cdn.shulex-voc.com/shulex/upload/2026-03-09/79ecdff6-c845-4697-9d9d-192cae5f6a9c.png',
  sameAs: [
    'https://x.com/SolveaCX',
    'https://www.linkedin.com/company/solvea-cx/',
    'https://www.youtube.com/@SolveaCX',
    'https://discord.gg/Q6D5U8GJvE',
  ],
};

const WebSite = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: 'Solvea',
  inLanguage: 'en-US',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const WebPage = {
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: 'Deploy Your AI Receptionist in Under 3 Minutes | Solvea',
  description:
    'Solvea answers phone calls, emails, SMS and live chats so you never miss a customer. Easy to set up with no code required.',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
};

const BreadcrumbList = {
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/#breadcrumb`,
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Solvea', item: `${SITE_URL}/` }],
};

const SoftwareApplication = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#product`,
  name: 'Solvea AI Receptionist',
  operatingSystem: 'Web-based',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'CustomerServiceApplication',
  description:
    "Solvea's AI receptionist handles inbound calls, SMS, email and live chat, integrates with calendars, CRMs and ecommerce tools, and ships with industry templates for retail, hospitality, medical spa, professional services and more.",
  image:
    'https://cdn.shulex-voc.com/shulex/upload/2026-03-09/79ecdff6-c845-4697-9d9d-192cae5f6a9c.png',
  publisher: { '@id': `${SITE_URL}/#organization` },
  url: `${SITE_URL}/`,
  featureList: [
    'AI answers phone, SMS, email, WhatsApp, and live chat',
    'No-code builder with ready-made industry templates',
    'One-click integrations with Google Calendar, sheets, CRMs, help desks, and ecommerce platforms',
  ],
  audience: {
    '@type': 'BusinessAudience',
  },
};

/** 首页 FAQ 区块对应的结构化数据（与页面展示一致，用于 FAQ 富摘要） */
export const faqPageSchemaItems: { name: string; text: string }[] = [
  {
    name: 'What is Solvea?',
    text: 'Solvea is an AI receptionist that answers phone calls, emails, SMS and live chats so you never miss a customer. It is easy to set up with no code required.',
  },
  {
    name: 'How do I get started with Solvea?',
    text: 'You can deploy your AI receptionist in under 3 minutes. Visit our contact or pricing page to start.',
  },
  {
    name: 'Does Solvea work with my existing tools?',
    text: 'Solvea integrates with popular channels and platforms so you can connect your existing phone, email, and chat systems.',
  },
];

const FAQPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqPageSchemaItems.map((item) => ({
    '@type': 'Question',
    name: item.name,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.text,
    },
  })),
};

// 全站通用
const CommonSchema = [Organization, WebSite];
export const HomepageSchema = [WebPage, BreadcrumbList, SoftwareApplication, FAQPage];
export const SoftWarePageSchema = [WebPage, BreadcrumbList, SoftwareApplication];

export const getSolveaGraphSchema = (schemaArray?: any[]) => {
  return {
    '@context': 'https://schema.org',
    '@graph': [...CommonSchema, ...(schemaArray || [])],
  };
};
