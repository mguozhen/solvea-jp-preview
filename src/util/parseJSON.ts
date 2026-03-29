/**
 * 解析json并不会抛出异常
 * @param str 源
 * @returns
 */
// eslint-disable-next-line
export default function parseJSON<ResultType = any>(
  str?: string,
): ResultType | undefined {
  if (!str) {
    return undefined;
  }
  try {
    return JSON.parse(str) as ResultType;
  } catch {
    return undefined;
  }
}
