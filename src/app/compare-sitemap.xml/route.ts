// compare sitemap：与 Footer Compare 四个链接保持一致
import { getLastmodBySlug } from '@/util/sitemap';
import { getServerSideSitemap } from 'next-sitemap';

const COMPARE_PATHS = ['compare/decagon', 'compare/sierra', 'compare/ada', 'compare/zendesk'];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { protocol, host } = url;
  const base = `${protocol}//${process.env.HOST || host}`;

  const entries = await Promise.all(
    COMPARE_PATHS.map(async (pathname) => ({
      loc: `${base}/${pathname}`,
      lastmod: await getLastmodBySlug(pathname),
    })),
  );

  return getServerSideSitemap(entries);
}
