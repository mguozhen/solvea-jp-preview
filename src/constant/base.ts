export const SITE = 'solvea.cx';
export const SITE_WITH_PORTAL = `https://${SITE}`;
export const CHINA_SITE = 'solvea.shulex.com';

// 支持的语言
export const SUPPORT_LANG_LIST = ['en-US', 'zh-CN', 'ja-JP', 'de-DE', 'fr-FR', 'es-ES', 'pt-PT'];

export const SUPPORT_LANGS_PATH = ['', 'cn', 'jp', 'de', 'fr', 'es', 'pt'];
export const SUPPORT_LANGS_MAP = {
  '': '',
  cn: 'zh-CN',
  jp: 'ja-JP',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  pt: 'pt-PT',
};

export const HTML_LANG_MAP = {
  'en-US': 'en',
  'zh-CN': 'zh',
  'ja-JP': 'ja',
  'de-DE': 'de',
  'fr-FR': 'fr',
  'es-ES': 'es',
  'pt-PT': 'pt',
};

/** 公共页面（营销/内容）数据与 HTML 的 revalidate 秒数，便于 CDN/ISR 缓存 */
export const PUBLIC_PAGE_REVALIDATE = 60;

export const SITE_URL = 'https://solvea.cx';
export const DEFAULT_OG_IMAGE =
  'https://cdn.shulex-voc.com/shulex/upload/2026-03-09/79ecdff6-c845-4697-9d9d-192cae5f6a9c.png';
