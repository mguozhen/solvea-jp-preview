import { urlLangMap } from '@/i18n';
import { getServerSideSitemap } from 'next-sitemap';
import { decodeSlugForPath } from 'util/common';
import { getBlogs } from 'util/services';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { protocol, host } = url;

  // 获取所有文章slug
  const data = (
    await getBlogs({
      headers: {},
      slug: undefined,
      value: undefined,
      pageNum: 0,
      pageSize: 999,
      taxonomyType: 'glossary',
    })
  )?.list;

  const base = `${protocol}//${process.env.HOST || host}`;
  const prefix = urlLangMap['en-US'] || '';
  const entries: { loc: string; lastmod: string }[] = [];

  data?.forEach((item) => {
    const slug = decodeSlugForPath(item?.slug);
    const loc = `${base}${prefix}/glossary/${slug}`
      .replace(/:\/\//g, ':--')
      .replace(/\/\//g, '/')
      .replace(/\/$/g, '')
      .replace(/\:\-\-/g, '://');
    const lastmod = item?.editTime || item?.post_date || new Date().toISOString();
    entries.push({ loc, lastmod: new Date(lastmod).toISOString() });
  });

  return getServerSideSitemap(entries);
}
