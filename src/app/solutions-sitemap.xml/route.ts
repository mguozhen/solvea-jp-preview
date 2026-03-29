// solutions sitemap：与 Header Navigation_Solutions 保持一致
import { getLastmodBySlug } from '@/util/sitemap';
import { getServerSideSitemap } from 'next-sitemap';

const SOLUTION_PATHS = [
  'solution/retail',
  'industry/furniture',
  'industry/electronics',
  'industry/retail',
  'industry/automotive',
  'solution/hotel',
  'solution/real-estate',
  'solution/medspa',
  'solution/home-services',
  'solution/barber-shop',
  'solution/restaurant',
  'solution/freelancer',
  'solution/software',
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { protocol, host } = url;
  const base = `${protocol}//${process.env.HOST || host}`;

  const entries = await Promise.all(
    SOLUTION_PATHS.map(async (pathname) => ({
      loc: `${base}/${pathname}`,
      lastmod: await getLastmodBySlug(pathname),
    })),
  );

  return getServerSideSitemap(entries);
}
