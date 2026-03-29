import localforage from 'localforage';
import { errorLog } from './trace';

/**
 * 设置大型的本地item
 * @param key key
 * @param value 要存储的值
 */
export function setCacheMassiveItem(key: string, value: string) {
  localforage.setItem(key, value);
}

/**
 * 获取大型的本地item
 * @param key key
 * @param value 要存储的值
 */
export async function getCacheMassiveItem(key: string) {
  try {
    return await localforage.getItem<string>(key);
  } catch (error) {
    errorLog(error);
    return undefined;
  }
}

/**
 * 设置本地item
 * @param key key
 * @param value 要存储的值
 */
export function setCacheItem(key: string, value: string) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem(key, value);
}

/**
 * 获取本地缓存
 * @param key
 * @returns
 */
export function getCacheItem(key: string): string | undefined {
  if (typeof localStorage === 'undefined') {
    return undefined;
  }
  try {
    return localStorage.getItem(key) || undefined;
  } catch (error) {
    errorLog(error);
    return undefined;
  }
}

/**
 * 删除本地缓存
 * @param key key
 */
export function delCacheItem(key: string) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.removeItem(key);
}
