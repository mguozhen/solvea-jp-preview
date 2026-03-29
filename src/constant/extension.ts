import { Lang } from '@/types/user';
import { windowOpen } from 'util/document';
import { GLOBAL_LANG_CACHE_KEY } from '@/i18n';
import { getCacheItem } from 'util/localCache';

// 定期更新最新的插件包本地下载地址
export const localDownload =
  'https://cdn.shulex-voc.com/assets/1742367270450/v1.8.9_ChatGPT-GPT4-for-Amazon-ShopifyShulexVOC.crx';

// 现在两个变量都用应用商店amazon and shopify的地址 引流到流量多的
export const addToChrome =
  'https://chrome.google.com/webstore/detail/chatgpt-for-amazon-shopif/fchbhcjlkcdchcaklpkdofllfoimelgb';

export const addToChromeCn =
  'https://chrome.google.com/webstore/detail/chatgpt-for-amazon-shopif/fchbhcjlkcdchcaklpkdofllfoimelgb?hl=zh-CN';

export const addToEdge =
  'https://microsoftedge.microsoft.com/addons/detail/chatgpt-for-amazon-shop/iocmlphgmfjmciklokijbaoeokbfamil';

export const addToEdgeCn =
  'https://microsoftedge.microsoft.com/addons/detail/chatgpt-for-amazon-shop/iocmlphgmfjmciklokijbaoeokbfamil?hl=zh-CN';

export const addToZiNiao =
  'https://appstore.ziniao.com/plugin/detail/16312716769697/YaMaXunHe-Shopify-De-ChatGPT-GongJu-Shulex-VOC.html';

export const addReviewToChrome =
  'https://chrome.google.com/webstore/detail/chatgpt-for-amazon-shopif/fchbhcjlkcdchcaklpkdofllfoimelgb';

export const addReviewToChromeCn =
  'https://chrome.google.com/webstore/detail/chatgpt-for-amazon-shopif/fchbhcjlkcdchcaklpkdofllfoimelgb?hl=zh-CN';

export const addToChromeFbaCalculator =
  'https://chrome.google.com/webstore/detail/free-amazon-fba-calculato/apjehgalcfgaaiemjmgpjjkannmglbel';

// 使用插件获取的链接
export const openChormeLink = () => {
  const lang = getCacheItem(GLOBAL_LANG_CACHE_KEY) as Lang;
  if (lang === 'zh-CN') {
    windowOpen('https://www.voc.ai/tools/cn/chatgpt-for-amazon');
  } else {
    windowOpen('https://www.voc.ai/tools/chatgpt-for-amazon');
  }
};
