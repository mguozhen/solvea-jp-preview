'use client';

import { useEffect } from 'react';

const PLG_SCRIPT_SRC =
  'https://app.solvea.cx/api_v2/gpt/bots/livechat/embed.js?pid=297&token=c7401e8939284b72aa7261d41d00edcc';
const SLG_SCRIPT_SRC =
  'https://apps.voc.ai/api_v2/gpt/bots/livechat/embed.js?id=23632&token=68960C4AE4B0F4182E5BA6F0';

export function LiveChatScript() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth <= 768) return; // hide on mobile
    const isPlg = localStorage.getItem('currentTab') === 'plg';
    const src = isPlg ? PLG_SCRIPT_SRC : SLG_SCRIPT_SRC;
    const sc = document.createElement('script');
    sc.src = src;
    sc.async = true;
    sc.defer = true;
    document.body.appendChild(sc);
  }, []);

  return null;
}
