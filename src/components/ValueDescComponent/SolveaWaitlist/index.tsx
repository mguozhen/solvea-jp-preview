import { useEffect, useRef, useState } from 'react';
import { getUrlQuery } from 'shulex-util';
import styles from './index.module.scss';

interface SolveaWaitlistProps {
  tallyFormLink: string;
}

export default function SolveaWaitlist(props: SolveaWaitlistProps) {
  const { tallyFormLink } = props;
  const [iframeSrc, setIframeSrc] = useState<string>('');
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
    let industry = window.location.pathname; // getUrlQuery('industry') ?? localStorage.getItem('industry') ?? '';
    let utm_source = getUrlQuery('utm_source') ?? localStorage.getItem('utm_source') ?? '';
    let utm_medium = getUrlQuery('utm_medium') ?? localStorage.getItem('utm_medium') ?? '';
    let from = getUrlQuery('from') ?? localStorage.getItem('from') ?? '';

    // 构建iframe的src URL，确保只在客户端渲染时访问window对象
    const src = `${tallyFormLink}&industry=${industry}&utm_source=${utm_source}&utm_medium=${utm_medium}&from=${from}`;
    setIframeSrc(src);
    industry && localStorage.setItem('industry', industry as string);
    utm_source && localStorage.setItem('utm_source', utm_source as string);
    utm_medium && localStorage.setItem('utm_medium', utm_medium as string);
    from && localStorage.setItem('from', from as string);
  }, []);

  return (
    <div className={styles.container} id="solvea-waitlist">
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        // height={1000}
        className={styles.iframe}
        frameBorder={'none'}
        marginHeight={0}
        marginWidth={0}
      />
    </div>
  );
}
