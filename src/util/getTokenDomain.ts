/**
 * 返回登录时候登录到哪个根域名上
 */
export default function getTokenDomain() {
  return window.location.origin.match(/(\..*$)/)?.[0] || window.location.host;
}
