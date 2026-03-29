import { brandImageList } from '@/constant/common';

// 语言-国家映射
export const langCountryMap = {
  'en-US': 'us',
  'zh-CN': 'cn',
  'ja-JP': 'jp',
  'de-DE': 'de',
  'fr-FR': 'fr',
  'es-ES': 'es',
  'pt-PT': 'pt',
  en: 'us',
  cn: 'cn',
};

/**
 * 获取邮箱的国家
 * @param email 当前用户邮箱
 * @param country 默认国家
 */
export const getEmailCountry = (email: string, lang?: string) => {
  let isCn = false;
  [
    '163.com',
    '126.com',
    'qq.com',
    'yahoo.com',
    'sina.com',
    'sina.cn',
    'sohu.com',
    '189.com',
    'sogou.com',
    // 特殊判断,调试用
    'cn@shulex-tech.com',
  ].forEach((key) => {
    if (email.toLowerCase().indexOf(key) >= 0) {
      isCn = true;
    }
  });
  if (isCn) {
    return 'cn';
  }

  return langCountryMap[lang as string] || 'us';
};

/**
 * 获取语言对应的国家
 * @param email 当前用户邮箱
 * @param country 默认国家
 */
export const getLangCountry = (lang?: string) => {
  return langCountryMap[lang as string] || 'us';
};

// 停留指定时间
export const sleep = async (waitTime) => {
  return new Promise((resolve) => {
    setTimeout(resolve, waitTime);
  });
};

/**
 * 递归遍历树结构，查找是否存在某个值
 * @param {Array|Object} tree - 树结构（可以是对象数组或单个对象）
 * @param {Function} predicate - 查找条件函数，返回 true 表示找到目标
 * @returns {boolean} - 是否找到目标值
 */
export function findInTree(tree, predicate) {
  try {
    // 如果输入是数组，遍历每个节点
    if (Array.isArray(tree)) {
      return tree.some((node) => findInTree(node, predicate));
    }

    // 如果当前节点满足条件，返回 true
    if (predicate(tree)) {
      return true;
    }

    // 如果当前节点有 children，递归查找子节点
    if (tree.children && tree.children.length > 0) {
      return findInTree(tree.children, predicate);
    }

    // 没有找到，返回 false
    return false;
  } catch (error) {
    return false;
  }
}

// 获取最深的节点
export function getDeepestChild(item) {
  try {
    // 如果当前节点没有 children 或 children 为空，则返回当前节点
    if (!item.children || item.children.length === 0) {
      return item;
    }

    // 递归获取第一个子节点的最深层子级
    return getDeepestChild(item.children[0]);
  } catch (error) {
    return undefined;
  }
}

// 获取路径语言
export function getPathNameLang(pathname, origin?: string) {
  if (origin && origin?.indexOf('shulex.com') !== -1) {
    return 'zh-CN';
  }
  let defaultLang = 'en-US';
  if (
    pathname.indexOf('/cn/') >= 0 ||
    pathname === '/cn' ||
    pathname.indexOf('/cn?') >= 0 ||
    pathname.indexOf('/cn#') >= 0
  ) {
    defaultLang = 'zh-CN';
  } else if (
    pathname.indexOf('/jp/') >= 0 ||
    pathname === '/jp' ||
    pathname.indexOf('/jp?') >= 0 ||
    pathname.indexOf('/jp#') >= 0
  ) {
    defaultLang = 'ja-JP';
  } else if (
    pathname.indexOf('/pt/') >= 0 ||
    pathname === '/pt' ||
    pathname.indexOf('/pt?') >= 0 ||
    pathname.indexOf('/pt#') >= 0
  ) {
    defaultLang = 'pt-PT';
  } else if (
    pathname.indexOf('/de/') >= 0 ||
    pathname === '/de' ||
    pathname.indexOf('/de?') >= 0 ||
    pathname.indexOf('/de#') >= 0
  ) {
    defaultLang = 'de-DE';
  } else if (
    pathname.indexOf('/es/') >= 0 ||
    pathname === '/es' ||
    pathname.indexOf('/es?') >= 0 ||
    pathname.indexOf('/es#') >= 0
  ) {
    defaultLang = 'es-ES';
  } else if (
    pathname.indexOf('/fr/') >= 0 ||
    pathname === '/fr' ||
    pathname.indexOf('/fr?') >= 0 ||
    pathname.indexOf('/fr#') >= 0
  ) {
    defaultLang = 'fr-FR';
  } else {
    defaultLang = 'en-US';
  }
  return defaultLang;
}

export const getBrandItems = (start, end) => {
  return brandImageList?.slice(start, end)?.map((v) => {
    return {
      type: 'icon',
      value: v,
    };
  });
};

// 判断是否已经提交过联系表单
export const isSubmittedForm = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  const submittedForm = localStorage.getItem('voc-submittedForm');
  if (submittedForm) {
    return true;
  }
  return false;
};

// 记录已经提交过联系表单
export const logSubmittedForm = () => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem('voc-submittedForm', 'true');
};

// 获取客服案例的文章有几种语言
export const getSolutionLangs = (allBlogs, slugRes: string) => {
  try {
    const allBlogsList = allBlogs?.list;
    const allLangs = allBlogsList
      ?.filter((v) => v.slug?.split('_')?.[0] === slugRes)
      ?.map((v) => v?.slug?.split('_')?.[1]);
    return allLangs;
  } catch (error) {
    return undefined;
  }
};

/**
 * 安全解码 slug，避免多层 URL 编码导致异常链接。
 * 若 API 或上游返回已编码的 slug，解码后再用于拼接路径，保证只输出一层编码或明文路径。
 * 用于拼 path 时直接使用返回值；用于 query 时应对返回值再做一次 encodeURIComponent。
 */
export function decodeSlugForPath(slug: string | undefined): string {
  if (slug == null || slug === '') return '';
  try {
    let s = slug;
    let prev = '';
    while (prev !== s) {
      prev = s;
      s = decodeURIComponent(s);
    }
    return s;
  } catch {
    return slug;
  }
}

/**
 * 将可能被多次编码的 pathname 解码为规范形式，用于生成 canonical/hreflang 时输出稳定 URL。
 */
export function decodePathnameToCanonical(pathname: string | null | undefined): string {
  if (pathname == null || pathname === '') return '/';
  try {
    let p = pathname;
    let prev = '';
    while (prev !== p) {
      prev = p;
      p = decodeURIComponent(p);
    }
    return p || '/';
  } catch {
    return pathname || '/';
  }
}
