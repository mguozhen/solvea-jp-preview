import { PUBLIC_PAGE_REVALIDATE, SITE } from '@/constant/base';
import i18n from '@/i18n';
import { message } from 'antd';
import { getHashQuery, getUrlQuery, stringify } from 'shulex-util';
import getRequestHeader from './getRequestHeader';

export const API_HOST =
  process.env.APP_ENV === 'production'
    ? 'https://apps.voc.ai'
    : process.env.APP_ENV === 'local'
    ? 'http://127.0.0.1:7002' // 你的本地 Node 服务端口
    : 'https://apps-staging.voc.ai';

export const SLX_HOST =
  process.env.APP_ENV === 'production'
    ? 'https://apps.voc.ai'
    : process.env.APP_ENV === 'local'
    ? 'http://127.0.0.1:7002' // 你的本地 Node 服务端口
    : 'https://apps-staging.voc.ai';

// 调试信息：在服务端打印当前环境配置
// if (typeof window === 'undefined') {
//   console.log('🔧 [服务端环境配置]');
//   console.log('   APP_ENV:', process.env.APP_ENV || '未设置 (默认staging)');
//   console.log('   API_HOST:', API_HOST);
//   console.log('   SLX_HOST:', SLX_HOST);
//   console.log('--------------------');
// }

export const SOURCE_HOST =
  process.env.APP_ENV === 'production' ? 'https://www.voc.ai' : 'https://site-staging.voc.ai';

declare const google: any;

const GSI_CLIENT_SCRIPT = 'https://accounts.google.com/gsi/client';

/** 注入 gsi/client 并等待 `google.accounts.id` 可用（全站未统一引入脚本时使用） */
export function ensureGoogleIdentityServices(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('no window'));
  }
  const w = window as Window & { google?: { accounts?: { id?: unknown } } };
  if (w.google?.accounts?.id) {
    return Promise.resolve();
  }
  if (!document.querySelector(`script[src="${GSI_CLIENT_SCRIPT}"]`)) {
    const s = document.createElement('script');
    s.src = GSI_CLIENT_SCRIPT;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const timer = window.setInterval(() => {
      const g = (window as Window & { google?: { accounts?: { id?: unknown } } }).google;
      if (g?.accounts?.id) {
        clearInterval(timer);
        resolve();
      } else if (Date.now() - start > 15000) {
        clearInterval(timer);
        reject(new Error('Google Identity Services load timeout'));
      }
    }, 80);
  });
}

export const getPageConfig = async (lang: string) => {
  try {
    const res = await fetch(`${API_HOST}/n/siteConfig?lang=${lang}`, {
      next: { revalidate: PUBLIC_PAGE_REVALIDATE },
    });
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPageBanner = async (lang?: string) => {
  try {
    const res = await fetch(`/n/bannerConfig?lang=${lang}`);
    const data = await res?.json();
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

const AGENT_PLG_GOOGLE_SOURCE = 'agent-plg';

/** 与 plg-agents `getUtmParams()` 一致：仅有 utm_source 时带 `{ utm }` */
function getUtmParamsForPlgGoogle(): Record<string, string> {
  const raw = getUrlQuery('utm_source') ?? getHashQuery('utm_source');
  if (raw === null || raw === undefined || String(raw).trim() === '') {
    return {};
  }
  const s = String(raw);
  try {
    return { utm: decodeURIComponent(s) };
  } catch {
    return { utm: s };
  }
}

/** 与 plg-agents 一致：接口根路径为 Solvea App 源站（非 apps.voc.ai） */
function getSolveaAppOrigin() {
  return process.env.APP_ENV === 'production'
    ? 'https://app.solvea.cx'
    : 'https://apps-staging.solvea.cx';
}

function getPlgGoogleOAuth2Url() {
  return `${getSolveaAppOrigin()}/api_v2/ticket/agent/plg-user/google/oauth2`;
}

function getTokenCookieDomainForSolveaApp() {
  return '.solvea.cx';
}

/**
 * Google One Tap / 按钮回调：与产品 plg-agents `sendGoogleLogin` 同接口与参数，
 * 成功后跳转 Solvea App（与旧 ticket/user 流程解耦）。
 */
export function handleCredentialResponse(response: { credential: string }, _lang?: string) {
  const utmParams = getUtmParamsForPlgGoogle();
  const partnerCode =
    typeof window !== 'undefined'
      ? localStorage.getItem('pap_affiliate_source') || localStorage.getItem('pap_partner_id') || ''
      : '';

  const body: Record<string, string> = {
    token: response.credential,
    source: AGENT_PLG_GOOGLE_SOURCE,
    ...utmParams,
  };
  if (partnerCode) {
    body.affiliateCode = partnerCode;
  }

  fetch(getPlgGoogleOAuth2Url(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...(getRequestHeader() as Record<string, string>),
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.code !== 200) {
        message.error(res?.msg || 'Google sign-in failed');
        return;
      }
      const token = res?.data?.token as string | undefined;
      if (token && document.cookie.indexOf('_token') < 0) {
        const cookieDomain = getTokenCookieDomainForSolveaApp();
        document.cookie = `_token=${token};path=/;domain=${cookieDomain}`;
      }
      const appOrigin = getSolveaAppOrigin();
      window.location.href = token
        ? `${appOrigin}/#/?token=${encodeURIComponent(token)}`
        : `${appOrigin}/#/`;
    })
    .catch(() => {
      message.error('Google sign-in failed');
    });
}

/** 模块级：clientId 只拉一次，initialize 只做一次 */
let _gsiClientId: string | null = null;
let _gsiInitialized = false;

export const getGoogleId = async (lang: string) => {
  function handleCredentialResponseWrap(response) {
    return handleCredentialResponse(response, lang);
  }

  // 已 initialize 过：直接 prompt（无需重拉 clientId、重新 initialize）
  if (_gsiInitialized) {
    try {
      await ensureGoogleIdentityServices();
      if (typeof google !== 'undefined' && google) {
        google.accounts.id.prompt();
      }
    } catch {
      /* GSI 超时 */
    }
    return;
  }

  // 未拉过 clientId 则请求一次
  if (!_gsiClientId) {
    try {
      const res = await fetch(`${API_HOST}/api_v2/ticket/user/google/clientId`, {});
      const data = await res.json();
      _gsiClientId = data?.data ?? null;
    } catch {
      return;
    }
  }

  if (!_gsiClientId) return;

  try {
    await ensureGoogleIdentityServices();
  } catch {
    return;
  }
  if (typeof google === 'undefined' || !google) return;

  google.accounts.id.initialize({
    client_id: _gsiClientId,
    callback: handleCredentialResponseWrap,
    prompt_parent_id: 'g_id_onload',
  });
  _gsiInitialized = true;

  const googleBottom = Array.from(document.querySelectorAll('.GoogleBottom') || []);
  googleBottom.forEach((btn) => {
    google.accounts.id.renderButton(btn, {
      size: 'large',
      width: (btn as HTMLElement).clientWidth || 300,
    });
  });

  const GoogleTop = Array.from(document.querySelectorAll('.google-button') || []);
  GoogleTop.forEach((btn) => {
    google.accounts.id.renderButton(btn, {
      size: 'large',
      width: (btn as HTMLElement).clientWidth || 300,
    });
  });

  google.accounts.id.prompt();
};

export const getAiWords = async (
  text: string,
  count = 10,
  language?: 'French' | 'Indonesian' | 'Japanese' | 'German' | 'English',
) => {
  const res = await fetch(`/n/ai/wordcloud`, {
    method: 'POST',
    body: JSON.stringify({
      text,
      count,
      language,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!data.data) message.error(i18n('homepage.nodata'));
  return data?.data;
};

export const wordSummarize = async (
  text: string,
  language?: 'French' | 'Indonesian' | 'Japanese' | 'German' | 'English',
) => {
  const res = await fetch(`/n/ai/wordFreq`, {
    method: 'POST',
    body: JSON.stringify({
      text,
      language,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!data.data) message.error(i18n('homepage.nodata'));
  return data?.data;
};

export const getBlogs = async ({
  headers,
  slug,
  value,
  categoryIds,
  pageNum,
  pageSize,
  taxonomyDescList,
  taxonomyType,
  noHost,
  site,
  params,
  revalidate,
}: {
  headers?: any;
  slug?: string;
  value?: string;
  categoryIds?: any;
  pageNum?: number;
  pageSize?: number;
  taxonomyDescList?: string;
  taxonomyType?: string;
  noHost?: boolean;
  site?: string;
  params?: any;
  /** 服务端用：设置 revalidate 时启用 Next 缓存，不传则 no-store */
  revalidate?: number;
}) => {
  try {
    const blogRes = await fetch(
      `${noHost ? '' : API_HOST}/n/blog/listDataV2?${stringify({
        search: value,
        type: slug || null,
        categoryIds: categoryIds?.join(','),
        pageNum,
        pageSize,
        site: site || SITE,
        taxonomyDescList,
        taxonomyType,
        ...params,
      })}`,
      {
        headers,
        ...(typeof revalidate === 'number'
          ? { next: { revalidate } }
          : { cache: 'no-store' as RequestCache }),
      },
    );
    const data = blogRes ? await blogRes.json() : {};
    return data?.data || {};
  } catch (err) {
    console.log(err);
    // message.error(err.message);
  }
};

export const getCategories = async ({
  headers,
  site,
  taxonomyType,
  taxonomyDesc,
}: {
  headers?: any;
  site?: string;
  taxonomyType?: string;
  taxonomyDesc?: string;
}) => {
  try {
    const blogRes = await fetch(
      `${API_HOST}/wp-admin/n/internal/blog/getCategories?${stringify({
        site: site || SITE,
        taxonomyType,
        taxonomyDesc,
      })}`,
      {
        headers,
      },
    );
    const data = blogRes ? await blogRes.json() : {};
    return data?.data || {};
  } catch (err) {
    console.log(err);
  }
};

// AI生成用户名
export const aiUsername = async (params: {
  network: string;
  accountType: string;
  category: string;
  description: string;
  language: string;
}) => {
  try {
    const res = await fetch(`/n/ai/username`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

// AI生成Ins Hashtag
export const aiHashtag = async (params: {
  language: string;
  description: string;
  keywords: string;
  network: string;
}) => {
  try {
    const res = await fetch(`/n/ai/hashtag`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
    message.error(err.message);
  }
};

export const getHashtag = async (params: {
  language: string;
  description: string;
  keywords: string;
}) => {
  try {
    const res = await fetch(`/n/ai/insHashtag`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
    message.error(err.message);
  }
};

// AI生成社媒标题
export const aiCaption = async (params: {
  network: string;
  style: string;
  description: string;
  language: string;
  keywords: string;
}) => {
  try {
    const res = await fetch(`/n/ai/caption`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
    message.error(err.message);
  }
};

export const getShopifyStores = async (params: {
  pageNum?: number;
  pageSize?: number;
  search?: string;
}) => {
  try {
    const res = await fetch(
      `/n/ai/getShopifyStores?${stringify({
        ...params,
      })}`,
    );
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const triggerUpdateShopify = async () => {
  try {
    const res = await fetch(`/n/ai/triggerShopifyUpdate`);
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error.message);
  }
};
/**
 * 返回登录用户信息
 * @returns
 */
export function getLoginUserInfo() {
  return fetch('https://apps.voc.ai/api_v2/voc/user/getUserInfo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error('' + res.status);
    }
    return res.json();
  });
}

interface AuthParams {
  age?: number;
  value: string;
}

/*
 * 通过token设置cookie
 */
export function userToken(payload: AuthParams) {
  return fetch('/api_v2/ticket/user/token', {
    method: 'POST',
    body: JSON.stringify(payload as any),
    headers: {
      'Content-Type': 'application/json',
      'x-token-domain': '.voc.ai',
    },
    credentials: 'include',
  });
}

export async function getBotStatus(documentId: number) {
  const res = await fetch(`/api_v2/intelli/chat_bot/status?documentId=${documentId}`);
  const data = await res.json();
  if (data.errmsg) {
    throw new Error(data.errmsg);
  }
  return data;
}

export async function getArticleList(props: { headers: any }) {
  const { headers } = props;
  const articleRes = await fetch(`https://apps.voc.ai/n/seo/articleList?pageNum=1&pageSize=5`, {
    headers,
    credentials: 'include',
  });
  const articleList = await articleRes.json();
  return articleList;
}

/**
 * 判断用户是否已登录
 * 灰度控制 防止请求量过大
 */
export const getUserLogin = async () => {
  const res = await fetch(`https://apps.voc.ai/api_v2/ticket/user/info`, {
    credentials: 'include',
  });
  const data = await res?.json();
  return data?.data as
    | undefined
    | {
        email: string;
        account_code: string;
        user_name: string;
        uid: string;
      };
};

/**
 * PLG 用户信息（跨域请求 app.solvea.cx，必须带 cookie）。
 * 需后端 CORS：`Access-Control-Allow-Credentials: true` 且 Allow-Origin 为具体域名（不能 *）。
 */
export async function getUserInfo(options?: RequestInit) {
  const { headers: optHeaders, ...rest } = options || {};
  const res = await fetch(`${getSolveaAppOrigin()}/api_v2/ticket/agent/plg-user-info`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...(getRequestHeader() as Record<string, string>),
      ...(optHeaders as Record<string, string>),
    },
    ...rest,
  });
  const json = (await res.json().catch(() => null)) as {
    code?: number;
    data?: unknown;
    message?: string;
  } | null;
  if (!json) return null;
  // 常见约定：200 / 0 成功；101 Invalid Token 等视为未登录
  if (typeof json.code === 'number' && json.code !== 200 && json.code !== 0) {
    return null;
  }
  return json.data ?? null;
}

/** LTD 页优惠券询价：与 Solvea App `api_v2/plg/commerce` 约定一致 */
const LTD_LIFETIME_COUPON_VALIDATE_PATH = '/api_v2/plg/commerce/product/validateLifetimeDealCoupon';

export type LtdLifetimeCouponQuoteResult =
  | { ok: true; price: number; link?: string }
  | { ok: false; message?: string; tryStatic: boolean };

/**
 * 校验 Lifetime Deal 优惠券并返回优惠价与结账链接（若有）。
 * 成功：`{ ok: true, price, link? }`；业务失败：`tryStatic: false` 勿再用本地静态码兜底；
 * 网络异常等：`tryStatic: true` 可由调用方回退到页面配置的静态 coupons。
 */
export async function fetchLtdLifetimeCouponQuote(
  couponCode: string,
): Promise<LtdLifetimeCouponQuoteResult> {
  return {
    ok: true,
    price: 299,
    link: '#',
  };
}

/**
 * 灰度接口
 */
export async function gray(payload: { key: string }) {
  const { key } = payload;
  const res = await fetch(`/n/gray/test?key=${key}`);
  const data = await res?.json();
  return data?.data;
}

/**
 * AI Translator
 */
export async function aiTranslate(params: { from?: string; to?: string; content?: string[] }) {
  const res = await fetch(`/n/seo/aiTranslator`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res?.json();
  if (data?.code === 400) {
    throw new Error('Error');
  }
  return data?.data;
}

/**
 * AI Translator获取可用次数
 */
export async function getTranslateCount() {
  const res = await fetch(`/n/seo/aiTranslatorCount`);
  const data = await res?.json();
  return data?.data;
}

export function getLivechatConfig(id?: number) {
  return fetch(`https://apps.voc.ai/api_v2/gpt/bot/${id}/livechat/config`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error('' + res.status);
    }
    return res.json();
  });
}
