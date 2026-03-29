import React from 'react';
import { headers } from 'next/headers';
import { getData } from './getData';
import { Metadata } from 'next';
import i18n from '@/i18n';
import { getLink } from '@/util/getLink';
import { generateHrefLangConfig } from 'components/Header/mod/HrefLang';
import { SITE_WITH_PORTAL } from '@/constant/base';
import { decodePathnameToCanonical, decodeSlugForPath } from 'util/common';
import { StoriesPage } from 'pages/customer-stories/mod/Page';
import { StoryCardProps } from 'pages/customer-stories/mod/StoryCard';
import { parseJSON } from 'shulex-util';
import { SuccessStoriesHeader } from 'pages/customer-stories/mod/SuccessStoriesHeader';

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const pathname = decodePathnameToCanonical(headerList.get('voc-pathname') || '/customer-stories');
  return {
    title: i18n('solvea.Case_Collection_Meta_Title'),
    description: i18n('solvea.Case_Collection_Meta_Desc'),
    alternates: generateHrefLangConfig(pathname, '', SITE_WITH_PORTAL),
  };
}

export default async function CustomerStoriesPage() {
  const headerList = headers();
  const lang = headerList.get('voc-lang') || 'en-US';
  const data = await getData(lang, 'solvea.cx');
  console.log(data.map((item) => item.menu_order));

  // Sort by menu_order, treating null/undefined/<=0 values as very large numbers to put them at the end
  data.sort((a, b) => {
    const aOrder =
      !a.menu_order || a.menu_order <= 0
        ? Number.MAX_SAFE_INTEGER
        : a.menu_order;
    const bOrder =
      !b.menu_order || b.menu_order <= 0
        ? Number.MAX_SAFE_INTEGER
        : b.menu_order;
    return aOrder - bOrder;
  });

  const stories: StoryCardProps[] = data.map((v) => {
    const post = parseJSON(v?.post_excerpt)?.bullets ?? {};
    const keyDecoded = decodeSlugForPath(post?.key);
    return {
      ...post,
      moreUrl: getLink(`/customer-stories/${keyDecoded}`, lang as any),
    };
  });
  return <StoriesPage data={stories} header={<SuccessStoriesHeader />} />;
}
