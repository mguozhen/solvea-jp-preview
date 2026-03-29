// app/server-sitemap.xml/route.ts
import { SITE, SUPPORT_LANG_LIST } from '@/constant/base';
import { urlLangMap } from '@/i18n';
import { getServerSideSitemap } from 'next-sitemap';
import { parseJSON, stringify } from 'shulex-util';
import { decodeSlugForPath } from 'util/common';
import { getBlogs, SLX_HOST } from 'util/services';

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const url = new URL(request.url);
  const { protocol, host } = url;

  // 获取termid
  const itemMenuRes = await fetch(
    `${SLX_HOST}/wp-admin/n/internal/blog/getMenu?${stringify({
      taxonomyDesc: `customer`,
      taxonomyType: 'customer',
      site: SITE,
    })}`,
    {
      credentials: 'include',
    },
  );
  const menuData = (await itemMenuRes.json())?.data as any;
  const termsList = menuData?.filter((v) => SUPPORT_LANG_LIST.includes(v.name));
  const termIds = termsList?.map((v) => v?.['term_id']);
  const termIdLangMap = {};
  termsList.forEach((v) => {
    termIdLangMap[v?.['term_id']] = v.name;
  });

  // 获取所有文章slug
  const data = (
    await getBlogs({
      categoryIds: termIds,
      taxonomyDescList: 'customer',
      taxonomyType: 'customer',
      pageSize: 999,
      site: SITE,
    })
  )?.list;
  const base = `${protocol}//${process.env.HOST || host}`;
  const entries: { loc: string; lastmod: string }[] = [];

  for (const l of termIds) {
    data
      ?.filter((item) => item?.category_id === l)
      ?.forEach((item) => {
        const slug = decodeSlugForPath(parseJSON(item?.post_excerpt)?.bullets?.key);
        const loc = `${base}${urlLangMap[termIdLangMap[l]]}/customer-stories/${slug}`
          .replace(/:\/\//g, ':--')
          .replace(/\/\//g, '/')
          .replace(/\/$/g, '')
          .replace(/\:\-\-/g, '://');
        const lastmod = item?.editTime || item?.post_date || new Date().toISOString();
        entries.push({ loc, lastmod: new Date(lastmod).toISOString() });
      });
  }

  return getServerSideSitemap(entries);
}
