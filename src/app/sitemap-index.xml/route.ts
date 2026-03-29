// app/server-sitemap-index.xml/route.ts
import { getServerSideSitemapIndex } from 'next-sitemap';

export async function GET(request: Request) {
  // Method to source urls from cms
  const url = new URL(request.url);
  const { protocol, host } = url;
  return getServerSideSitemapIndex([
    `${protocol}//${process.env.HOST || host}/sitemap.xml`,
    `${protocol}//${process.env.HOST || host}/customer-stories-sitemap.xml`,
    `${protocol}//${process.env.HOST || host}/glossary-sitemap.xml`,
    `${protocol}//${process.env.HOST || host}/docs/sitemap.xml`,
    `${protocol}//${process.env.HOST || host}/solutions-sitemap.xml`,
    `${protocol}//${process.env.HOST || host}/compare-sitemap.xml`,
  ]);
}
