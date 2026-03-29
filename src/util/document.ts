import { getHashQuery, getUrlQuery, parse } from 'shulex-util';
import { useLocation, useParams } from 'react-router-dom';
import { head } from 'lodash';

/**
 * 获取当前url查询对象的hooks
 * @param key
 * @param defaultValue
 * @returns
//  */
export default function useUrlQuery(): any {
  const hashLocation = useLocation();
  const params = useParams();
  const hashQuery = parse(hashLocation.search, { decode: true }) as Record<
    string,
    string
  >;
  const urlQuery =
    // eslint-disable-next-line no-restricted-globals
    (parse(location?.search, { decode: true }) as Record<string, string>) ?? {};
  return { location: hashLocation, params, query: hashQuery, urlQuery };
}

// 打开新页面
export const postMessageOpenNewPage = (nextUrl: string) => {
  window.parent.postMessage(
    { type: 'shulex_openPage', nextUrl, newPage: true },
    '*',
  );
};

// 滚动到页面顶部
export const scrollToTop = () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 50);
};

// 判断是否是谷歌内核浏览器
export const checkChrome = () => {
  const u = navigator?.userAgent;
  return u?.indexOf('AppleWebKit') >= 0;
};

// 内嵌跳转抽离
interface WindowOpenParams {
  // 什么都不传时正常调用window.open
  nav?: any; //  在自己系统内打开新页面，被别的地方内嵌时原地跳转
}
export function windowOpen(nextUrl: string, params?: WindowOpenParams) {
  // 是否被内嵌
  const isIframe = getUrlQuery('iframe') ?? getHashQuery('iframe');
  if (isIframe && params?.nav) {
    params?.nav(nextUrl);
  } else if (isIframe) {
    postMessageOpenNewPage(nextUrl);
  } else if (params?.nav) {
    window.open(`#${nextUrl}`);
  } else {
    window.open(nextUrl);
  }
}

export function sendEmail(email: string) {
  const mailtoLink = `mailto:${email}`;
  const hiddenLink = document.createElement('a');
  hiddenLink.href = mailtoLink;
  hiddenLink.style.display = 'none';
  document.body.appendChild(hiddenLink);
  hiddenLink.click();
  document.body.removeChild(hiddenLink);
}

// 获取clientIp
export const getClientIp = () => {
  const node: any = document.getElementById('idev_custom_x21');
  return node?.value;
};

// 当前页面是否在首页
export const checkIsInIndex = () => {
  return ['', '#', '#/'].includes(
    head<any>(window?.location?.hash?.split('?')),
  );
};

// 向 GTM dataLayer 推送自定义事件（如弹窗展示/关闭等）
export const pushGTMEvent = (eventName: string, payload?: Record<string, unknown>) => {
  try {
    (window as any).dataLayer?.push({
      event: eventName,
      ...payload,
    });
  } catch (error) {
    console.warn('pushGTMEvent error:', error);
  }
};

// 填完表单后提交给GTM消息
export const submitFormToGTM = (id: any, isCn?: boolean) => {
  try {
    console.log('send gtm:', id);
    (window as any).dataLayer?.push({
      event: 'hubspot-form-success',
      [isCn ? 'tally-form-guid' : 'hs-form-guid']: id,
    });
  } catch (error) {
    console.log(error);
  }
};

// 填完表单后提交给百度统计
export const submitFormToBaiduTJ = (id: any) => {
  try {
    console.log('send baidu tj:', id);
    (window as any)._hmt?.push(['_trackEvent', 'form', 'submit', 'id', id]);
  } catch (error) {
    console.log(error);
  }
};
