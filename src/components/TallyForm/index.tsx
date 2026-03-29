'use client';
import SubmitedForm from 'components/SubmitedForm';
import { useEffect, useMemo, useState } from 'react';
import { getUrlQuery, parseJSON } from 'shulex-util';
import { isSubmittedForm, logSubmittedForm } from 'util/common';
import { submitFormToBaiduTJ } from 'util/document';

interface Props {
  noSubmitGTM?: boolean;
  className?: any;
}

export default function TallyForm(props: Props) {
  const { noSubmitGTM, className } = props;
  const [iframeSrc, setIframeSrc] = useState<string>('');

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
    const src = `https://tally.so/r/w8KoQo?utm_medium=${utm_medium}&utm_source=${utm_source}&channel_ads=${channel_ads}&source=${source}&bd_vid=${bd_vid}&logidUrl=${encodeURIComponent(
      window.location.href,
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
            submitFormToBaiduTJ?.(parseJSON(event.data)?.payload?.id);
            logSubmittedForm();
            const dom: HTMLDivElement = document.querySelector(
              '#baidu-tj-submit',
            ) as HTMLDivElement;
            if (dom) {
              dom.click();
            }
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

  const hasSubmit = useMemo(() => isSubmittedForm(), []);

  if (hasSubmit) {
    return <SubmitedForm />;
  }

  return (
    <>
      <iframe
        onDoubleClick={() => {
          submitFormToBaiduTJ('123');
        }}
        src={iframeSrc}
        style={{ background: '#fff', height: '1000px' }}
        className={className}
        frameBorder={'none'}
      />
      <div id="baidu-tj-submit" style={{ display: 'none' }}></div>
    </>
  );
}
