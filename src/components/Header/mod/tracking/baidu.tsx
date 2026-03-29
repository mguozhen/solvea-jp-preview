import Script from 'next/script';
import React from 'react';
import { getLang } from '@/i18n';

/**
 * 国内走百度统计
 */
export default function TrackingBaidu() {
  // 非线上环境不加载统计脚本
  if (process.env.JS_ENV !== 'production' || getLang() !== 'zh-CN') {
    return null;
  }

  return (
    <Script
      id="baidu-tongji"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?9b588bce6fa451a0af8d0f15505306ae";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `,
      }}
    />
  );
}
