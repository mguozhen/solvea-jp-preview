import getTokenDomain from './getTokenDomain';

/**
 * 通用的请求header
 */
export default function getRequestHeader() {
  if (window.location.origin.indexOf('localhost') >= 0) {
    return {};
  }
  return {
    'x-token-domain': getTokenDomain(),
  };
}
