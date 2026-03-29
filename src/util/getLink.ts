import { getLang } from '@/i18n';
import { Lang } from '@/types/user';
import { PAGE_AVAILABLE_LANGS } from 'components/Header/mod/HrefLang';

const langPrefixMap: Record<string, string> = {
  'zh-CN': '/cn',
  'en-US': '',
  'ja-JP': '/jp',
  'de-DE': '/de',
  'fr-FR': '/fr',
  'es-ES': '/es',
  'pt-PT': '/pt',
};

export const getLink = (link: string, lang?: Lang) => {
  const currentLang = lang ?? getLang();
  // 若页面未在 PAGE_AVAILABLE_LANGS 中声明，或声明了但不支持当前语言，则 fallback 到英文
  const availableLangs = PAGE_AVAILABLE_LANGS[link];
  const effectiveLang =
    !availableLangs || !availableLangs.includes(currentLang) ? 'en-US' : currentLang;
  const site = langPrefixMap[effectiveLang] || '';
  if (site === '/') return site;
  return `${site}${link}`;
};
