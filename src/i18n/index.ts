import get from 'lodash/get';
import zh_CN from './cn';
import de_DE from './de';
import en_US from './en';
import es_ES from './es';
import fr_FR from './fr';
import ja_JP from './jp';
import pt_PT from './pt';

import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import { getHashQuery, getUrlQuery } from 'shulex-util';
export const GLOBAL_LANG_CACHE_KEY = 'shulex-voc-global-lang-cache-key';

// 语言
type LangShort = 'en' | 'cn' | 'jp' | 'fr' | 'de' | 'pt' | 'es';
type Lang = 'en-US' | 'zh-CN' | 'ja-JP' | 'fr-FR' | 'de-DE' | 'pt-PT' | 'es-ES';
export const urlLangMap = {
  'zh-CN': '/cn',
  'en-US': '',
  'ja-JP': '/jp',
  'de-DE': '/de',
  'fr-FR': '/fr',
  'es-ES': '/es',
  'pt-PT': '/pt',
};

export const langMap: Record<string, string> = {
  'zh-CN': 'cn',
  'en-US': 'en',
  'ja-JP': 'jp',
  'fr-FR': 'fr',
  'de-DE': 'de',
  'es-ES': 'es',
  'pt-PT': 'pt',
};

const langShortMap: Record<LangShort, Lang> = {
  en: 'en-US',
  cn: 'zh-CN',
  jp: 'ja-JP',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  pt: 'pt-PT',
};

// URL指定的当前语言是什么
export const urlLangSpec: Lang | LangShort | undefined =
  (getUrlQuery('lang') as LangShort) || (getHashQuery('lang') as LangShort) || undefined;
// eslint-disable-next-line no-underscore-dangle, no-nested-ternary
export const urlLangSpecCheck = urlLangSpec
  ? urlLangSpec.indexOf('-') >= 0
    ? (urlLangSpec as Lang)
    : langShortMap[urlLangSpec]
  : undefined;

let _lang = 'en-US';
// eslint-disable-next-line no-underscore-dangle
let _dict: any = en_US;
/**
 * 设置语言
 * @param lang 语言标识
 */
function getTargetDict(lang: string) {
  let targetDict;
  switch (lang) {
    case 'zh-CN':
      targetDict = zh_CN;
      break;
    case 'en-US':
      targetDict = en_US;
      break;
    case 'ja-JP':
      targetDict = ja_JP;
      break;
    case 'fr-FR':
      targetDict = fr_FR;
      break;
    case 'de-DE':
      targetDict = de_DE;
      break;
    case 'es-ES':
      targetDict = es_ES;
      break;
    case 'pt-PT':
      targetDict = pt_PT;
      break;
    default:
      targetDict = en_US;
      break;
  }
  return targetDict;
}

export function setLang(lang: string) {
  _lang = lang;
  _dict = getTargetDict(lang);
}

// 确保_dict初始化和_lang一致
// setLang(_lang);

// TODO 需要支持含有动态变量的情况，比如: Please enter a valid customer {field} ==>i18n('xxx',{field:'Email'})
/**
 * 获取国际化文案
 * @example
 * i18n('navTab.channel') // Channel
 *
 * setLang('zh_CN');
 * i18n('navTab.channel') // 渠道
 */
export default function i18n(
  keyPath: string,
  args?: number | { [key: string]: string | number }, // 1 | 2 ($i18n.tc)
  fields?: { [key: string]: string | number },
  targetLang?: Lang,
) {
  function getText(source, noCode?) {
    let res = (get(source, keyPath) || (noCode ? null : keyPath)) as string;
    if (noCode && !res) {
      return res;
    }
    const num = isNumber(args) ? args : 0;
    const map = isObject(args) ? args : fields;
    if (num) {
      const arr = res.split('|');
      res = arr[+num + 1] || arr[0] || res;
      // console.warn("keyPath", keyPath, num, res.split('|'))
    }
    if (map) {
      // eslint-disable-next-line array-callback-return
      Object.entries(map).map(([k, v]) => {
        res = res.replace(new RegExp(`{${k}}`, 'g'), `${v ?? ''}`);
      });
    }

    // res = res.replace(/<br\/>/g, `\\n`);

    return res;
  }
  // 指定语言
  let targetDict;
  if (targetLang) {
    targetDict = getTargetDict(targetLang);
  }
  // return getText(zh_CN);
  return getText(targetDict ?? _dict, true) || getText(en_US);
}

export function getI18nFromTargetLang(path, lang) {
  return i18n(path, undefined, undefined, lang);
}

/**
 * 获取当前使用语言code
 * @returns string
 */
export function getLang(): string {
  if (typeof window !== 'undefined' && (window as any).__INITIAL_LANG__) {
    const initial = (window as any).__INITIAL_LANG__;
    delete (window as any).__INITIAL_LANG__;
    setLang(initial);
  }
  return _lang;
}

/**
 * 中文首页特殊处理 https://www.shulex.com
 */
export const homeMap = {
  'en-US': 'https://solvea.cx',
  'ja-JP': 'https://solvea.cx/jp',
  'de-DE': 'https://solvea.cx/de',
  'fr-FR': 'https://solvea.cx/fr',
  'es-ES': 'https://solvea.cx/es',
  'pt-PT': 'https://solvea.cx/pt',
};

export function useI18n() {
  return {
    locale: _lang,
    shortLang: langMap[_lang],
    isCN: _lang === 'zh-CN',
    isJP: _lang === 'ja-JP',
    i18n,
    urlLang: urlLangMap[_lang],
    homeUrl: homeMap[_lang],
  };
}
