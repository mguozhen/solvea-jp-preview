import { DEFAULT_OG_IMAGE, HTML_LANG_MAP, SITE, SITE_WITH_PORTAL } from '@/constant/base';
import i18n from '@/i18n';
import { Lang } from '@/types/user';
import { generateHrefLangConfig } from 'components/Header/mod/HrefLang';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { StoryCardProps } from 'pages/customer-stories/mod/StoryCard';
import { stringify } from 'querystring';
import { decodePathnameToCanonical, decodeSlugForPath, getPathNameLang } from 'util/common';
import { anchorsAtLevelOnly, extractAnchorsAndModifyHtml } from 'util/docsDeal';
import { getLink } from 'util/getLink';
import { API_HOST, getBlogs, getCategories } from 'util/services';
import { InnerPage } from '../mod/InnerPage';

const GLOSSARY_REVALIDATE = 60;
const RELATED_ARTICLES_COUNT = 6;

interface BlogItem {
  ID: number;
  [key: string]: any;
}

function getRandomRelatedExcludingId(arr: BlogItem[], excludeId: number): StoryCardProps[] {
  let result: BlogItem[] = [];
  const filteredArr = arr.filter((item) => item.ID !== excludeId);

  if (filteredArr.length <= RELATED_ARTICLES_COUNT) {
    result = filteredArr;
  } else {
    const tempArr = filteredArr.slice();
    for (let i = 0; i < RELATED_ARTICLES_COUNT; i++) {
      const randIndex = Math.floor(Math.random() * tempArr.length);
      result.push(tempArr[randIndex]);
      tempArr.splice(randIndex, 1);
    }
  }

  return result.map((item) => ({
    key: item.detailUrl,
    moreUrl: item.detailUrl,
    title: item.post_excerpt,
    productImage: item.twitter_image,
    brandName: item.post_title,
    categoryName: item.categoryName,
    authorName: item.writerName,
  }));
}

/** 仅拉取文章详情，用于 generateMetadata，避免重复请求 categories + getBlogs */
async function getBlogDetailOnly(slugRes: string) {
  const res = await fetch(
    `${API_HOST}/n/blog/detailData?${stringify({
      slug: encodeURIComponent(slugRes),
      site: SITE,
      status: 'publish,draft',
    })}`,
    { next: { revalidate: GLOSSARY_REVALIDATE } },
  );
  const json = res?.ok ? ((await res.json()) as any) : {};
  return json?.data?.[0] ?? null;
}

async function getData(props?: { slug?: string[] }) {
  const { slug } = props ?? {};
  const slugRes = decodeSlugForPath(slug?.join('/')) ?? '';
  const headerList = headers();
  const lang = headerList.get('voc-lang') || 'en-US';

  try {
    const [blogSlugRes, categoriesData, data] = await Promise.all([
      fetch(
        `${API_HOST}/n/blog/detailData?${stringify({
          slug: encodeURIComponent(slugRes),
          site: SITE,
          status: 'publish,draft',
        })}`,
        { next: { revalidate: GLOSSARY_REVALIDATE } },
      ).then((r) => r.json().then((j: any) => j?.data?.[0] ?? {})),
      getCategories({ taxonomyType: 'glossary' }),
      getBlogs({
        headers: {},
        slug: undefined,
        value: undefined,
        pageNum: 0,
        pageSize: 30,
        taxonomyType: 'glossary',
        revalidate: GLOSSARY_REVALIDATE,
      }),
    ]);

    const dataRes = blogSlugRes ?? {};

    return {
      props: {
        dataRes,
        slug,
        otherBlogs: data?.list?.map((v) => {
          const decodedSlug = decodeSlugForPath(v.slug);
          return {
            ...v,
            categoryName: categoriesData?.find((sv) => sv.term_id === v.category_id)?.name,
            detailUrl: getLink(`/glossary/${decodedSlug}`, lang as Lang),
          };
        }),
      },
    };
  } catch (error) {
    console.log('hyx error', error);
    return {
      props: {
        dataRes: '',
        slug,
      },
    };
  }
}

export async function generateMetadata({ params }): Promise<Metadata> {
  let title: string | undefined, desc: string | undefined, twitterImage: string | undefined;
  const headerList = await headers();
  const rawPathname =
    headerList.get('voc-pathname') || `/glossary/${params?.slug?.join('/') ?? ''}`;
  const pathname = decodePathnameToCanonical(rawPathname);
  const origin = headerList.get('voc-host') || '';
  const currentLang = getPathNameLang(pathname, origin) as string;

  const slugRes = decodeSlugForPath(params?.slug?.join('/')) || '';

  try {
    const dataRes = await getBlogDetailOnly(slugRes);
    if (params?.slug?.length && !dataRes?.ID) {
      notFound();
    }
    title = dataRes?.meta?.title;
    desc = dataRes?.meta?.desc;
    twitterImage = dataRes?.twitter_image;
  } catch (error) {}

  const resolvedTitle = title ?? i18n('solvea.Glossary_Collection_Meta_Title');
  const resolvedDesc = desc ?? i18n('solvea.Glossary_Collection_Meta_Desc');
  const ogImage =
    typeof twitterImage === 'string' && twitterImage.startsWith('http')
      ? twitterImage
      : DEFAULT_OG_IMAGE;
  const alternates = generateHrefLangConfig(pathname, currentLang, SITE_WITH_PORTAL);
  const canonicalUrl =
    typeof alternates?.canonical === 'string' ? alternates.canonical : undefined;
  const ogLocale = HTML_LANG_MAP[currentLang as keyof typeof HTML_LANG_MAP] || 'en';

  return {
    title: resolvedTitle,
    description: resolvedDesc,
    alternates,
    openGraph: {
      type: 'article',
      locale: ogLocale,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      title: resolvedTitle,
      description: resolvedDesc,
      siteName: 'Solvea',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDesc,
      images: [ogImage],
    },
  };
}

async function BlogReport(props: { params: { slug: string[] } }) {
  const { params } = props;

  const blogRes = await getData(params);
  const data = blogRes?.props?.dataRes;

  // 有 slug 但接口未返回有效文章时返回 404
  if (params?.slug?.length && !data?.ID) {
    notFound();
  }

  const otherBlogs = getRandomRelatedExcludingId(blogRes?.props?.otherBlogs ?? [], data?.ID);

  const { anchors, modifiedHtml } = extractAnchorsAndModifyHtml(data?.post_content);
  const processedAnchors = anchorsAtLevelOnly(anchors, 2);
  const indicator =
    processedAnchors?.map((v) => {
      return {
        value: v?.text?.replace(/^\d+\.\s*/, '')?.trim(),
      };
    }) || [];

  return (
    <>
      {data?.schemaJsonTrimmed ? (
        <script
          id="glossary-jsonld"
          type="application/ld+json"
          // 直接输出 JSON-LD，放在 body 也能被收录
          dangerouslySetInnerHTML={{ __html: data.schemaJsonTrimmed }}
        />
      ) : null}
      <InnerPage
        data={{
          categoryName: data?.category?.name,
          title: data.post_title,
          contentList: [
            {
              content: modifiedHtml,
            },
          ],
          indicator,
          anchors: processedAnchors,
          renderType: 'html',
          author: {
            name: data.writerName,
            avatar: data.writerAvatar,
            lastUpdated: data.editTime || data.post_date || '',
          },
        }}
        stories={otherBlogs}
        type="glossary"
      />
    </>
  );
}

export default BlogReport;
