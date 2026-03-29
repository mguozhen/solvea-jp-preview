import { SITE_WITH_PORTAL } from '@/constant/base';
import i18n from '@/i18n';
import { Lang } from '@/types/user';
import { generateHrefLangConfig } from 'components/Header/mod/HrefLang';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { StoryCardProps } from 'pages/customer-stories/mod/StoryCard';
import { SuccessStoriesHeader } from 'pages/customer-stories/mod/SuccessStoriesHeader';
import { Line } from 'pages/mod/Line';
import ScrollingBrandWall from 'pages/mod/ScrollingBrandWall';
import { decodePathnameToCanonical, decodeSlugForPath, getPathNameLang } from 'util/common';
import { getLink } from 'util/getLink';
import { getBlogs, getCategories } from 'util/services';
import styles from './index.module.scss';

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const rawPathname = headerList.get('voc-pathname') || '/glossary';
  const pathname = decodePathnameToCanonical(rawPathname);
  const currentLang = getPathNameLang(pathname, headerList.get('voc-host') as string);

  return {
    title: i18n('solvea.Glossary_Collection_Meta_Title'),
    description: i18n('solvea.Glossary_Collection_Meta_Desc'),
    alternates: generateHrefLangConfig(pathname, currentLang, SITE_WITH_PORTAL),
  };
}

async function getData() {
  try {
    const headerList = headers();
    const lang = headerList.get('voc-lang') || 'en-US';
    // 获取文章列表
    const data = await getBlogs({
      headers: {},
      slug: undefined,
      value: undefined,
      pageNum: 0,
      pageSize: 100, // 第一页多一个
      taxonomyType: 'glossary',
    });
    const categoriesData = await getCategories({
      taxonomyType: 'glossary',
    });
    return {
      ...data,
      list: data?.list?.map((v) => {
        const decodedSlug = decodeSlugForPath(v?.slug);
        const path = `/glossary/${decodedSlug}`;
        return {
          ...v,
          categoryName: categoriesData?.find((sv) => sv.term_id === v.category_id)?.name,
          detailUrl: getLink(path, lang as Lang),
        };
      }),
      categoriesData,
      lang,
    };
  } catch (error) {
    console.log('hyx error', error);
    return {};
  }
}

export default async function Blog() {
  const res = await getData();
  const list: StoryCardProps[] =
    res.list?.map((item) => {
      const decodedSlug = decodeSlugForPath(item.slug);
      const detailUrl = `/glossary/${decodedSlug}`;

      return {
        key: detailUrl,
        moreUrl: detailUrl,
        title: item.post_excerpt,
        productImage: item.twitter_image,
        brandName: item.post_title,
      };
    }) || [];

  const { List } = await import('pages/glossary/mod/List');

  return (
    <main className={`side-fade ${styles.blog}`}>
      <SuccessStoriesHeader
        title={i18n('solvea.Glossary_Collection_Page_Title')}
        desc={i18n('solvea.Glossary_Collection_Page_Desc')}
        href={'/glossary#stories'}
      />
      <Line />
      <ScrollingBrandWall />
      <Line />
      <List list={list} />
    </main>
  );
}
