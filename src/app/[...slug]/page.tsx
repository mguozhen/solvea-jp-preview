import {
  DEFAULT_OG_IMAGE,
  HTML_LANG_MAP,
  PUBLIC_PAGE_REVALIDATE,
  SITE_WITH_PORTAL,
} from '@/constant/base';
import { getLang, langMap } from '@/i18n';
import { generateHrefLangConfig } from 'components/Header/mod/HrefLang';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { parseJSON } from 'shulex-util';
import { decodePathnameToCanonical, decodeSlugForPath, getPathNameLang } from 'util/common';
import LandingPage from '../mod/LandingPageRender';

const host =
  process.env.APP_ENV === 'production' ? 'https://apps.voc.ai' : 'https://apps-staging.voc.ai';

/** URL searchParams → 拼到 CMS slug 后的 query 串（与后端 `pricingLtd?group=test` 等形式对齐） */
function buildQueryStringForSlug(searchParams?: Record<string, string | string[] | undefined>): string {
  if (!searchParams) return '';
  return Object.entries(searchParams)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}=${Array.isArray(v) ? v[0] : v}`)
    .join('&');
}

/** generateMetadata：有公开内容即可（与老逻辑一致，不校验 post_type） */
function landingPayloadIsUsableForMeta(blogSlugRes: any): boolean {
  if (!blogSlugRes?.data) return false;
  if (blogSlugRes.data?.post_status !== 'public') return false;
  const dataRes = parseJSON(blogSlugRes.data?.post_content) ?? {};
  return !!(dataRes && Object.keys(dataRes).length > 0);
}

/** 页面正文：须为 solveaCxLanding，避免带 query 命中其它类型后不再回退 path */
function landingPayloadIsUsableForPage(blogSlugRes: any): boolean {
  if (!landingPayloadIsUsableForMeta(blogSlugRes)) return false;
  return blogSlugRes.data?.post_type === 'solveaCxLanding';
}

/** 先带 query 查 CMS，不满足 predicate 再仅用 path（老逻辑），避免 utm 等参数导致老落地页 404 */
async function fetchLandingBySlugWithFallback(
  slugPathDecoded: string,
  searchParams: Record<string, string | string[] | undefined> | undefined,
  fetchInit: RequestInit,
  predicate: (blogSlugRes: any) => boolean,
): Promise<any> {
  const qs = buildQueryStringForSlug(searchParams);
  const withQuery = qs ? `${slugPathDecoded}?${qs}` : slugPathDecoded;
  const candidates =
    qs && withQuery !== slugPathDecoded ? [withQuery, slugPathDecoded] : [slugPathDecoded];

  for (const candidate of candidates) {
    const blogSlug = await fetch(`${host}/n/blog/getLandingBySlug?slug=${encodeURIComponent(candidate)}`, {
      ...fetchInit,
      next: { revalidate: PUBLIC_PAGE_REVALIDATE },
    });
    const blogSlugRes = blogSlug ? ((await blogSlug.json()) as any) : {};
    if (predicate(blogSlugRes)) {
      return blogSlugRes;
    }
  }
  return {};
}

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  },
): Promise<Metadata> {
  // read route params
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const lang = getLang();
  // i18nRewriteMiddleware 重写 jp、es、de 语言前缀，所以只对这些语言加回前缀
  // 其他语言（cn, pt, fr）的 slug 中已经包含了语言前缀
  const needsLangPrefix = lang === 'ja-JP' || lang === 'es-ES' || lang === 'de-DE';
  const rawSlugPath = needsLangPrefix
    ? `${langMap[lang]}/${resolvedParams?.slug.join('/')}`
    : `${resolvedParams?.slug.join('/')}`;
  const slugPathDecoded = decodeSlugForPath(rawSlugPath);

  const blogSlugRes = await fetchLandingBySlugWithFallback(
    slugPathDecoded,
    resolvedSearchParams,
    {},
    landingPayloadIsUsableForMeta,
  );

  // 检查是否有数据返回
  if (!blogSlugRes.data) {
    return {
      title: 'Page not found - Solvea AI Employee',
      description: 'Sorry, the page you are looking for does not exist or has been removed.',
    };
  }

  const dataRes = parseJSON(blogSlugRes?.data?.post_content) ?? {};
  const headerList = await headers();
  const rawPathname = headerList.get('voc-pathname') || `/${resolvedParams?.slug?.join('/') || ''}`;
  const pathname = decodePathnameToCanonical(rawPathname);
  const origin = headerList.get('voc-host') || headerList.get('host') || '';
  const currentLang = getPathNameLang(pathname, origin) as keyof typeof HTML_LANG_MAP;
  const ogLocale = (currentLang && HTML_LANG_MAP[currentLang]) || 'en';
  const resolvedTitle = dataRes?.seoTitle || 'Solvea AI Employee';
  const resolvedDesc =
    dataRes?.seoDescription ||
    "Solvea AI, Automate support, cut costs, and scale instantly with Solvea's AI-powered virtual agents.";

  return {
    title: resolvedTitle,
    description: resolvedDesc,
    openGraph: {
      locale: ogLocale,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: (() => {
      const base = generateHrefLangConfig(pathname, lang, SITE_WITH_PORTAL);
      return {
        ...base,
        canonical: dataRes?.canonical || base?.canonical || `${SITE_WITH_PORTAL}${pathname}`,
      };
    })(),
  };
}

async function getData(props?: { slug?: string[]; searchParams?: Record<string, string | string[] | undefined> }) {
  const { slug, searchParams } = props || {};
  if (!slug) {
    notFound();
  }

  try {
    const lang = getLang();
    // i18nRewriteMiddleware 重写 jp、es、de 语言前缀，所以只对这些语言加回前缀
    // 其他语言（cn, pt, fr）的 slug 中已经包含了语言前缀
    const needsLangPrefix = lang === 'ja-JP' || lang === 'es-ES' || lang === 'de-DE';
    const rawSlugPath = needsLangPrefix ? `${langMap[lang]}/${slug.join('/')}` : slug.join('/');
    const slugPathDecoded = decodeSlugForPath(rawSlugPath);

    const blogSlugRes = await fetchLandingBySlugWithFallback(
      slugPathDecoded,
      searchParams,
      { credentials: 'include' },
      landingPayloadIsUsableForPage,
    );

    if (!blogSlugRes?.data) {
      notFound();
    }

    const dataRes = parseJSON(blogSlugRes?.data?.post_content) ?? {};

    if (!dataRes || Object.keys(dataRes).length === 0) {
      notFound();
    }
    return {
      dataRes,
      slug,
    };
  } catch (error) {
    notFound();
  }
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/** 递归遍历组件树，判断是否包含 SolveaSubscribe */
function hasSolveaSubscribe(node: any): boolean {
  if (!node || typeof node !== 'object') return false;
  if (node.type === 'SolveaSubscribe') return true;
  if (Array.isArray(node.subComponents)) {
    return node.subComponents.some(hasSolveaSubscribe);
  }
  return false;
}

/** 递归注入 initialPlanList 到所有 SolveaSubscribe 的 props 中 */
function injectPricingData(node: any, planList: any[]): any {
  if (!node || typeof node !== 'object') return node;
  if (node.type === 'SolveaSubscribe') {
    return { ...node, props: { ...(node.props || {}), initialPlanList: planList } };
  }
  if (Array.isArray(node.subComponents)) {
    return { ...node, subComponents: node.subComponents.map((c: any) => injectPricingData(c, planList)) };
  }
  return node;
}

/** 服务端预取定价套餐列表，缓存 1 小时 */
async function fetchPricingPlanList(): Promise<any[]> {
  try {
    const isProduction = process.env.APP_ENV === 'production';
    const apiUrl = isProduction
      ? 'https://app.solvea.cx/api_v2/plg/commerce/product/listAllPlgOfficialPlan'
      : 'https://apps-staging.solvea.cx/api_v2/plg/commerce/product/listAllPlgOfficialPlan';
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
    const result = await response.json();
    return result?.data ?? [];
  } catch {
    return [];
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedParams || { slug: [] };
  const data = await getData({ slug, searchParams: resolvedSearchParams });
  let dataRes = data?.dataRes;

  // 若页面含定价组件，服务端预取数据以保证 SSR 初始 HTML 中显示真实价格（SEO 友好）
  if (hasSolveaSubscribe(dataRes)) {
    const planList = await fetchPricingPlanList();
    if (planList.length > 0) {
      dataRes = injectPricingData(dataRes, planList);
    }
  }

  return (
    <LandingPage
      styleConfig={dataRes?.headerFooterStyle}
      seoTitle={dataRes?.seoTitle}
      seoDescription={dataRes?.seoDescription}
      canonical={dataRes?.canonical}
      seoKeywords={dataRes?.seoKeywords}
      data={dataRes}
      backgroundColor={dataRes?.backgroundColor}
      theme={dataRes?.theme}
      articleList={dataRes?.articleList}
      isUaMobile={false}
      headerSticky={false}
    />
  );
}
