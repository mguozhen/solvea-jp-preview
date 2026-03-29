'use client';
import SolveaFormSubmited from 'components/SolveaFormSubmited';
import { useEffect, useRef, useState } from 'react';
import { getUrlQuery, parseJSON } from 'shulex-util';
import { logSubmittedForm } from 'util/common';

interface Props {
  noSubmitGTM?: boolean;
  className?: string;
}

export default function JpTallyForm(props: Props) {
  const { noSubmitGTM, className } = props;
  const [iframeSrc, setIframeSrc] = useState<string>('');
  const [hasSubmit, setHasSubmit] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const src = 'https://tally.so/widgets/embed.js';

    if (!document.querySelector('script[src="' + src + '"]')) {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // 构建iframe的src URL，确保只在客户端渲染时访问window对象
    let channel_ads = getUrlQuery('channel_ads') ?? '';
    let source = 'Solvea Website';
    let utm_source = getUrlQuery('utm_source') ?? '';
    let utm_medium = getUrlQuery('utm_medium') ?? '';
    const bd_vid = getUrlQuery('bd_vid') ?? '';
    if (utm_medium === 'paid') {
      source = 'Ads';
    }
    if (bd_vid) {
      channel_ads = 'baidu';
      source = 'Ads';
      utm_source = 'baidu';
    }
    const src = `https://tally.so/embed/3q9poO?transparentBackground=1&dynamicHeight=1&utm_medium=${utm_medium}&utm_source=${utm_source}&channel_ads=${channel_ads}&source=${source}&bd_vid=${bd_vid}&logidUrl=${encodeURIComponent(
      typeof window !== 'undefined' ? window.location.href : '',
    )}`;
    setIframeSrc(src);
  }, []);

  useEffect(() => {
    // 监听跨窗口消息事件
    const handleMessage = (event: MessageEvent) => {
      try {
        // 国内表单
        if (event.origin === 'https://tally.so') {
          if (parseJSON(event.data)?.event === 'Tally.FormSubmitted') {
            logSubmittedForm();
            setHasSubmit(true);
          }
        }
      } catch (error) {
        console.log('hyx error', error);
      }
    };

    if (typeof window !== 'undefined' && !noSubmitGTM) {
      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [noSubmitGTM]);

  if (hasSubmit) {
    return <SolveaFormSubmited noWrap />;
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        height={1000}
        className={className}
        frameBorder={'none'}
        marginHeight={0}
        marginWidth={0}
      />
    </>
  );
}
