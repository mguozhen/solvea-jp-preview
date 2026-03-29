import { errorLog } from './trace';

export type CookieResult = { [name: string]: string };
/**
 * 获取全部的Cookie
 * @param decode 是否自动decode
 * @returns 返回全部cookie的k-v
 * @example
 * getCookies(); // { _token: 'xxxxx' }
 */
export default function getCookies(decode?: boolean): CookieResult {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`;`);
    return parts.reduce((pre, cur) => {
      const components = cur.split('=');
      if (!components.length) {
        return pre;
      }
      const [name, value] = components;
      if (name) {
        try {
          pre[name.trim()] = decode ? decodeURIComponent(value) : value;
        } catch (error) {
          // 解决decode失败问题，当decode失败，使用原始值
          pre[name.trim()] = value;
          errorLog(error);
        }
      }
      return pre;
    }, {} as CookieResult);
  } catch {
    return {};
  }
}
