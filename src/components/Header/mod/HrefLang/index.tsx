import { Metadata } from 'next';
import { decodePathnameToCanonical } from 'util/common';

/** 本站 solvea.cx 实际支持的语言（英/日/德/西），无中文站点 */
const SITE_LANG_ORDER: Record<string, number> = {
  'en-US': 0,
  'ja-JP': 1,
  'de-DE': 2,
  'es-ES': 3,
};

// 本站语言到路径前缀的映射
const langPathMap: { [key: string]: string } = {
  'en-US': '',
  'ja-JP': 'jp',
  'de-DE': 'de',
  'es-ES': 'es',
};

/** hreflang 集合：本站 4 种语言（无中文站点） */
const HREFLANG_LANGUAGES = ['en-US', 'ja-JP', 'de-DE', 'es-ES'] as const;

/**
 * 各页面实际存在多语言版本的映射。
 * key 为去除语言前缀后的 clean path（如 '/'、'/pricing'）。
 * 当页面使用此常量传入 filterLangKeys 时，只会为列出的语言生成 hreflang 标签，
 * x-default 始终生成并指向英文版本。
 */
export const PAGE_AVAILABLE_LANGS: Record<string, string[]> = {
  '/': ['en-US', 'ja-JP', 'de-DE', 'es-ES'],
  '/agent-for-smb': ['en-US', 'ja-JP', 'de-DE', 'es-ES'],
  '/customer-stories': ['en-US', 'ja-JP', 'de-DE', 'es-ES'],
  '/glossary': ['en-US', 'ja-JP', 'de-DE', 'es-ES'],
  '/pricing': ['en-US', 'ja-JP'],
};

/** 首页等价路径：nginx 将 /agent-for-smb 重定向到根路径并展示首页内容，SEO 上统一用根路径 */
const HOMEPAGE_PATH_SET = new Set(['', '/', '/agent-for-smb', 'agent-for-smb']);

function isHomepagePath(path: string): boolean {
  const p = path.replace(/^\/(jp|fr|pt|es|de|cn)(?=\/|$)/, '').replace(/\/$/, '') || '/';
  return HOMEPAGE_PATH_SET.has(p);
}

/**
 * 根据语言和路径生成完整的 URL（本站 4 种语言）
 */
function generateUrlForLang(
  path: string,
  lang: string,
  domain?: string,
  isXDefault: boolean = false,
): string {
  // 移除路径开头的语言前缀（如 /jp, /es, /de 等）
  let cleanPath = path.replace(/^\/(jp|fr|pt|es|de|cn)(?=\/|$)/, '');
  cleanPath = cleanPath === '/' ? '' : cleanPath;

  const baseUrl = domain || 'https://solvea.cx';

  // 首页（含 /agent-for-smb 重定向到根后的等价）：en-US / x-default 统一用根 URL
  if (isHomepagePath(path)) {
    if (isXDefault || lang === 'en-US') {
      return baseUrl;
    }
    const langPrefix = langPathMap[lang];
    return langPrefix ? `${baseUrl}/${langPrefix}` : `${baseUrl}`;
  }

  if (isXDefault || lang === 'en-US') {
    return `${baseUrl}${cleanPath}`;
  }

  const langPrefix = langPathMap[lang];
  return langPrefix ? `${baseUrl}/${langPrefix}${cleanPath}` : `${baseUrl}${cleanPath}`;
}

/**
 * 生成 hreflang 配置。
 * - 按 clean path 查 PAGE_AVAILABLE_LANGS，命中才注入 languages + x-default
 * - 未命中只返回 canonical
 *
 * @param path 当前页面路径（可含语言前缀，如 /jp/pricing）
 * @param currentLang 当前语言
 * @param domain 域名（可选，默认 https://solvea.cx）
 */
export function generateHrefLangConfig(
  path: string,
  currentLang?: string,
  domain?: string,
): Metadata['alternates'] {
  const pathDecoded = decodePathnameToCanonical(path);
  const canonical = currentLang
    ? generateUrlForLang(pathDecoded, currentLang, domain)
    : generateUrlForLang(pathDecoded, 'en-US', domain);

  const cleanPath = pathDecoded.replace(/^\/(jp|fr|pt|es|de|cn)(?=\/|$)/, '') || '/';
  const langs = PAGE_AVAILABLE_LANGS[cleanPath]
    ?.filter((v) => (HREFLANG_LANGUAGES as readonly string[]).includes(v))
    ?.sort((a, b) => (SITE_LANG_ORDER[a] ?? 99) - (SITE_LANG_ORDER[b] ?? 99));

  if (!langs?.length) {
    return { canonical };
  }

  const languages = Object.fromEntries(
    langs.map((lang) => [lang, generateUrlForLang(pathDecoded, lang, domain)]),
  );
  languages['x-default'] = generateUrlForLang(pathDecoded, 'en-US', domain, true);

  return { canonical, languages };
}

/**
 * 从路径中提取语言代码
 * @param pathname 路径名
 * @returns 语言代码
 */
export function getLangFromPath(pathname: string): string {
  const pathSegments = pathname.split('/').filter(Boolean);
  const langSegment = pathSegments[0];

  const langMap: { [key: string]: string } = {
    cn: 'zh-CN',
    jp: 'ja-JP',
    fr: 'fr-FR',
    pt: 'pt-PT',
    es: 'es-ES',
    de: 'de-DE',
    en: 'en-US',
  };

  return langMap[langSegment] || 'en-US';
}
