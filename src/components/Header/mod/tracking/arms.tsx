import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export default function TrackingArms() {
  const [host, setHost] = useState('');
  useEffect(() => {
    if (process.env.JS_ENV !== 'production') {
      // 非线上不埋点
      return;
    }
    setTimeout(() => {
      const host = window.location.host;
      setHost(host);
    }, 10);
  }, []);
  if (!host) {
    return null;
  }
  return (
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__bl = {config: {pid:"fz2ha631l7@7f893bab30e1dad",appType:"web",imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",sendResource:true,enableLinkTrace:true,behavior:true,environment:"${
            host === 'site-staging.voc.ai' ? 'pre' : 'prod'
          }",autoSendPerf:false,sample:0,pvSample:0}}`,
        }}
      ></script>
      <script
        type="text/javascript"
        src="https://retcode.alicdn.com/retcode/bl.js"
        crossOrigin=""
        async
      ></script>
    </Head>
  );
}
