/**
 * 页面级埋点
 * @param pageName 输入要埋的页面名称
 */
export function pageLog(_pageName: string) {}

/**
 * 消息事件，比如点击之类的自定义埋点
 * @param eventName 名字
 * @param params 参数
 */
export function sumLog(
  _eventName: string,
  _params?: Record<string, string | number | boolean | undefined>,
) {}

/**
 * 消息事件，比如点击之类的事件埋点
 * @param eventName 名字
 * @param params 参数
 */
export function eventLog(
  _eventName: string,
  _params?: Record<string, string | number | boolean | undefined>,
) {}

/**
 * 手动上报错误
 */
export function errorLog(_error: unknown) {}

/**
 * 设定用户名
 */
export function setUserName(_getUserName: () => string) {}

/**
 * 额外的配置
 */
export function setC1(_c1: string) {}
