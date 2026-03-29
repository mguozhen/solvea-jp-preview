import { PUBLIC_PAGE_REVALIDATE, SITE, SITE_WITH_PORTAL } from '@/constant/base';
import { getLink } from '@/util/getLink';
import { generateHrefLangConfig } from 'components/Header/mod/HrefLang';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { InnerPage } from 'pages/customer-stories/mod/InnerPage';
import { StoryCardProps } from 'pages/customer-stories/mod/StoryCard';
import { parseJSON, stringify } from 'shulex-util';
import { decodePathnameToCanonical, decodeSlugForPath } from 'util/common';
import { SLX_HOST } from 'util/services';
import { getData as getList } from '../getData';

export async function generateMetadata({ params }): Promise<Metadata> {
  const headerList = headers();
  const rawPathname = headerList.get('voc-pathname') || `/customer-stories/${params.slug}`;
  const pathname = decodePathnameToCanonical(rawPathname);

  let title, desc;

  const slugRes = decodeSlugForPath(params?.slug) || params?.slug;
  try {
    const lang = headerList.get('voc-lang');
    const dataRes = await fetch(
      `${SLX_HOST}/n/blog/detailData?${stringify({
        slug: encodeURIComponent(`${slugRes}_${lang ?? 'en'}`),
        site: SITE,
        status: 'publish,draft',
      })}`,
      {
        credentials: 'include',
        next: { revalidate: PUBLIC_PAGE_REVALIDATE },
      },
    );
    const blogSlugRes = dataRes ? ((await dataRes.json()) as any) : {};
    const data = blogSlugRes?.data?.[0] ?? {};
    title = data?.meta?.title;
    desc = data?.meta?.desc;
  } catch (error) {}

  return {
    title: title ?? 'Solvea AI Agent',
    description:
      desc ??
      'Solvea AI, Automate support, cut costs, and scale instantly with Solvea’s AI-powered virtual agents.',
    alternates: generateHrefLangConfig(pathname, '', SITE_WITH_PORTAL),
  };
}

async function getData(slug, lang) {
  try {
    const blogRes = await fetch(
      `${SLX_HOST}/n/blog/detailData?${stringify({
        slug: encodeURIComponent(`${slug}_${lang}`),
        site: 'solvea.cx',
        status: 'publish,draft',
      })}`,
      {
        credentials: 'include',
        next: { revalidate: PUBLIC_PAGE_REVALIDATE },
      },
    );
    const blogData = await blogRes.json();
    return parseJSON(blogData?.data?.[0]?.post_content);
  } catch (error) {
    console.log('hyx error', error);
  }
}

async function CustomersDetail(props) {
  const { params } = props;
  const { slug } = await params;
  const headerList = headers();
  const lang = headerList.get('voc-lang') || 'en-US';
  const data = await getData(slug, lang);

  const list = await getList(lang, 'solvea.cx');
  let stories: StoryCardProps[] =
    list?.map((v) => {
      const post = parseJSON(v?.post_excerpt)?.bullets ?? {};
      const keyDecoded = decodeSlugForPath(post?.key);
      return {
        ...post,
        content: parseJSON(parseJSON(v?.post_excerpt)?.content) || {},
        moreUrl: getLink(`/customer-stories/${keyDecoded}`, lang as any),
      };
    }) || [];
  stories = stories.filter((v) => v.key !== slug);

  return <InnerPage data={data} stories={stories} type="customer-stories" />;
}

export default CustomersDetail;
