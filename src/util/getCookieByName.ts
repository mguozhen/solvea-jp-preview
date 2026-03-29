import getCookies from './getCookies';

/**
 * 获取某个name对应的cookie值
 * @param name 名字
 * @param decode 是否自动decode
 * @returns 返回值
 * @example
 * getCookieByName('_token'); // 'xxxxx'
 */
export default function getCookieByName(name: string, decode?: boolean) {
  return getCookies(decode)[name];
}
