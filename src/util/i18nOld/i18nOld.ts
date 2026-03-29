import en_US from './locales/en-US';
import zh_CN from './locales/zh-CN';
import ja_JP from './locales/ja-JP';
import fr_FR from './locales/fr-FR';
import de_DE from './locales/de-DE';
import es_ES from './locales/es-ES';
import pt_PT from './locales/pt-PT';

// import { getCacheItem } from './localCache';
import { get, isObject, isNumber } from 'lodash';
import { getHashQuery } from 'shulex-util';
const isShowKey = getHashQuery('i18nKey');

export const GLOBAL_LANG_CACHE_KEY = 'shulex-voc-global-lang-cache-key';

type Lang = 'en-US' | 'ja-JP' | 'zh-CN' | 'fr-FR' | 'de-DE' | 'es-ES' | 'pt-PT';
type LangShort = 'en' | 'cn' | 'jp' | 'fr' | 'de' | 'es' | 'pt';

export const langMap: Record<Lang, LangShort> = {
  'zh-CN': 'cn',
  'en-US': 'en',
  'ja-JP': 'jp',
  'de-DE': 'de',
  'fr-FR': 'fr',
  'es-ES': 'es',
  'pt-PT': 'pt',
};

export const getShortLangFromUrl = (url: string) => {
  if (url.startsWith('/cn/')) {
    return 'cn';
  } else if (url.startsWith('/jp/')) {
    return 'jp';
  } else if (url.startsWith('/de/')) {
    return 'de';
  } else if (url.startsWith('/fr/')) {
    return 'fr';
  } else if (url.startsWith('/es/')) {
    return 'es';
  } else if (url.startsWith('/pt/')) {
    return 'pt';
  } else {
    return 'en';
  }
};

/**
 * 中文二级页面都是 https://www.shulex.com
 */
const urlMap = {
  'zh-CN': 'https://www.shulex.com',
  'en-US': 'https://www.voc.ai',
  'ja-JP': 'https://www.voc.ai/jp',
  'de-DE': 'https://www.voc.ai/de',
  'fr-FR': 'https://www.voc.ai/fr',
  'es-ES': 'https://www.voc.ai/es',
  'pt-PT': 'https://www.voc.ai/pt',
};

/**
 * 中文首页特殊处理 https://www.shulex.com
 */
const homeMap = {
  'zh-CN': 'https://www.shulex.com',
  'en-US': 'https://www.voc.ai',
  'ja-JP': 'https://www.voc.ai/jp',
  'de-DE': 'https://www.voc.ai/de',
  'fr-FR': 'https://www.voc.ai/fr',
  'es-ES': 'https://www.voc.ai/es',
  'pt-PT': 'https://www.voc.ai/pt',
};

const urlLangMap = {
  'zh-CN': '/cn',
  'en-US': '',
  'ja-JP': '/jp',
  'de-DE': '/de',
  'fr-FR': '/fr',
  'es-ES': '/es',
  'pt-PT': '/pt',
};

// 国际化类型
type LocaleMap = {
  [name: string]: string | LocaleMap | Array<string | LocaleMap>;
};

let _lang: Lang = 'en-US'; // 'en-US';
let _dict: LocaleMap = en_US;

/**
 * 设置语言
 * @param lang 语言标识
 */
export function setLang(lang: Lang) {
  _lang = lang;
  switch (lang) {
    case 'ja-JP':
      _dict = ja_JP;
      break;
    case 'zh-CN':
      _dict = zh_CN;
      break;
    case 'fr-FR':
      _dict = fr_FR;
      break;
    case 'de-DE':
      _dict = de_DE;
      break;
    case 'es-ES':
      _dict = es_ES;
      break;
    case 'pt-PT':
      _dict = pt_PT;
      break;
    default:
      _dict = en_US;
      break;
  }
}

/**
 * 获取当前使用语言code
 * @returns string
 */
export function getLang(): string {
  return _lang;
}

// 确保_dict初始化和_lang一致
setLang(_lang);

// TODO 需要支持含有动态变量的情况，比如: Please enter a valid customer {field} ==>i18n('xxx',{field:'Email'})
/**
 * 获取国际化文案
 * @example
 * i18n('navTab.channel') // Channel
 *
 * setLang('zh_CN');
 * i18n('navTab.channel') // 渠道
 */
export default function i18nOld(
  keyPath: string,
  args?: number | { [key: string]: string | number | undefined }, // 1 | 2 ($i18n.tc)
  fields?: { [key: string]: string | number },
) {
  if (isShowKey) return keyPath;
  let res = (get(_dict, keyPath) || keyPath) as string;
  const num = isNumber(args) ? args : 0;
  const map = isObject(args) ? args : fields;
  if (num) {
    const arr = res.split('|');
    res = arr[+num + 1] || arr[0] || res;
    // console.warn("keyPath", keyPath, num, res.split('|'))
  }
  if (map) {
    Object.entries(map).map(([k, v]) => {
      res = res.replace(new RegExp(`{${k}}`, 'g'), `${v ?? ''}`);
    });
  }
  return res;
}

/**
 * 返回短版本的lang
 * @returns
 */
export function getLangShort() {
  return langMap[getLang()];
}

export function useI18n() {
  return {
    locale: _lang,
    shortLang: langMap[_lang],
    indexUrl: urlMap[_lang],
    isCN: _lang === 'zh-CN',
    isJP: _lang === 'ja-JP',
    i18n: i18nOld,
    urlLang: urlLangMap[_lang],
    homeUrl: homeMap[_lang],
  };
}
