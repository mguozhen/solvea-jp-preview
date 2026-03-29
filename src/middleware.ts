import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { decodePathnameToCanonical, getPathNameLang } from 'util/common';

/** 语种前缀路径重写：/jp/xxx、/de/xxx、/es/xxx → /xxx，供 Next 路由匹配 */
const I18N_LOCALES = ['jp', 'es', 'de'];

/** 多语言路径需重定向到英文版的语种（glossary） */
const LOCALES_REDIRECT_TO_EN = ['jp', 'fr', 'de', 'es'];
const LOCALES_REGEX = LOCALES_REDIRECT_TO_EN.join('|');

/** customer-stories 多语言路径匹配（jp/fr/de/es），但 de 不重定向，保留 /de/customer-stories */
const CS_LOCALES_WITH_DE = ['jp', 'fr', 'de', 'es'];
const CS_LOCALES_REGEX = CS_LOCALES_WITH_DE.join('|');
const CS_LOCALES_REDIRECT_TO_EN = new Set(['jp', 'fr', 'es']);

/** 根路径去尾斜杠 + glossary/customer-stories 多语言重定向到英文并去尾斜杠，合并为一次 301；开发环境不处理根路径去尾 */
const trailingSlashAndGlossaryRedirectMiddleware = () => {
  return async (request: NextRequest, context: any) => {
    // 仅根路径去尾斜杠：solvea.cx/ → solvea.cx
    const { pathname, origin, search } = request.nextUrl;

    // glossary 多语言 → 英文版并去尾斜杠：/jp/glossary、/fr/glossary/xxx/ → /glossary、/glossary/xxx
    const glossaryMatch = pathname.match(new RegExp(`^/(${LOCALES_REGEX})(/glossary(?:/.*)?)/?$`));
    if (glossaryMatch) {
      const rest = glossaryMatch[2];
      const withoutTrailingSlash = rest.endsWith('/') ? rest.slice(0, -1) : rest;
      context.redirectUrl = `${origin}${withoutTrailingSlash}${search}`;
      context.redirectPermanent = true;
      return;
    }

    // customer-stories 多语言 → 英文版并去尾斜杠（仅 jp/fr/es，de 保留）：/jp、/fr、/es → /customer-stories/xxx
    const csMatch = pathname.match(
      new RegExp(`^/(${CS_LOCALES_REGEX})(/customer-stories(?:/.*)?)/?$`),
    );
    if (csMatch && CS_LOCALES_REDIRECT_TO_EN.has(csMatch[1])) {
      const rest = csMatch[2];
      const withoutTrailingSlash = rest.endsWith('/') ? rest.slice(0, -1) : rest;
      context.redirectUrl = `${origin}${withoutTrailingSlash}${search}`;
      context.redirectPermanent = true;
      return;
    }
    if (process.env.NODE_ENV === 'development') return;

    const pathPart = request.url.split('?')[0] || '';
    if (!pathPart.endsWith('/') || (pathname !== '/' && pathname !== '')) return;
    context.redirectUrl = `${origin}${search}`;
    context.redirectPermanent = true;
  };
};

/** customer-stories 仅对指定 slug 做 301：/aosom、/anker、/oceania、/hoome、/holy-stone、/apeman → 对应 -case；/hoome → /euhomy-case */
const CUSTOMER_STORIES_REDIRECT_SLUGS = new Set([
  'aosom',
  'anker',
  'oceania',
  'hoome',
  'holy-stone',
  'apeman',
]);

const toCaseSlug = (slug: string) => (slug === 'hoome' ? 'euhomy-case' : `${slug}-case`);

const customerStoriesCaseRedirectMiddleware = () => {
  return async (request: NextRequest, context: any) => {
    const { pathname } = request.nextUrl;
    const search = request.nextUrl.search;

    // /customer-stories/:slug 且 slug 在允许列表中
    const mainMatch = pathname.match(/^\/customer-stories\/([^/]+)\/?$/);
    if (mainMatch) {
      const slug = mainMatch[1];
      if (CUSTOMER_STORIES_REDIRECT_SLUGS.has(slug)) {
        context.redirectUrl = `${request.nextUrl.origin}/customer-stories/${toCaseSlug(
          slug,
        )}${search}`;
        context.redirectPermanent = true;
        return;
      }
    }

    // /(jp|de|es)/customer-stories/:slug 且 slug 在允许列表中
    const langMatch = pathname.match(/^\/(jp|de|es)\/customer-stories\/([^/]+)\/?$/);
    if (langMatch) {
      const lang = langMatch[1];
      const slug = langMatch[2];
      if (CUSTOMER_STORIES_REDIRECT_SLUGS.has(slug)) {
        context.redirectUrl = `${request.nextUrl.origin}/${lang}/customer-stories/${toCaseSlug(
          slug,
        )}${search}`;
        context.redirectPermanent = true;
      }
    }
  };
};

const i18nRewriteMiddleware = () => {
  return async (request: NextRequest, context: any) => {
    const { pathname } = request.nextUrl;
    const [, firstSegment, ...otherSegments] = pathname.split('/');

    if (I18N_LOCALES.includes(firstSegment)) {
      const url = request.nextUrl.clone();
      url.pathname = '/' + otherSegments.join('/');
      context.rewriteUrl = url;
    }
  };
};

const headerMiddleware = () => {
  return async (request: NextRequest, context: any) => {
    const headers = new Headers(request.headers);
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    // 统一解码 pathname，避免异常多层编码的 URL 被透传到下游
    const pathname = decodePathnameToCanonical(request.nextUrl.pathname) || '/';
    headers.set('voc-pathname', pathname);
    headers.set('voc-origin', request.nextUrl.origin);
    headers.set('voc-host', host || '');
    headers.set('voc-lang', getPathNameLang(pathname, host || ''));
    headers.set('voc-search', request.nextUrl.search);

    context.headers = headers;
  };
};

function chain(functions: any) {
  return async (request: NextRequest) => {
    const host =
      request.headers.get('x-forwarded-host') ||
      request.headers.get('x-host') ||
      request.headers.get('host') ||
      '';
    const context: any = {
      redirectUrl: null,
      redirectPermanent: false,
      rewriteUrl: null,
      headers: null,
      isStaging: host.toLowerCase().includes('staging'),
    };

    for (const fn of functions) {
      await fn(request, context);
      if (context.redirectUrl) {
        const res = NextResponse.redirect(
          context.redirectUrl,
          context.redirectPermanent ? 301 : 307,
        );
        if (context.isStaging) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
        return res;
      }
    }

    const options: any = {};
    if (context.headers) {
      options.request = { headers: context.headers };
    }

    const setNoindexHeader = (response: NextResponse) => {
      if (context.isStaging) {
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      }
      return response;
    };

    if (context.rewriteUrl) {
      return setNoindexHeader(NextResponse.rewrite(context.rewriteUrl, options));
    }

    return setNoindexHeader(NextResponse.next(options));
  };
}

export default chain(
  process.env.APP_ENV === 'local'
    ? [i18nRewriteMiddleware(), headerMiddleware()]
    : [
        trailingSlashAndGlossaryRedirectMiddleware(),
        customerStoriesCaseRedirectMiddleware(),
        i18nRewriteMiddleware(),
        headerMiddleware(),
      ],
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!api|_next|favicon.ico|.*\\..*).*)',
  ],
};
