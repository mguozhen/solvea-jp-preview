'use client';
import useCnTallyListener from '@/hooks/useCnTallyListener';
import i18n, { getLang } from '@/i18n';
import cx from 'classnames';
import EnForm from 'components/EnForm';
import SubmitedForm from 'components/SubmitedForm';
import { useEffect, useState } from 'react';
import { getUrlQuery } from 'shulex-util';
import { isSubmittedForm } from 'util/common';
import styles from './index.module.scss';

interface BlockItem {
  title: string;
  content: string;
  link: string;
  linkText: string;
}

interface GetStartTexts {
  title?: string;
  desc?: string;
}

interface Props {
  className?: string;
  blockItems?: BlockItem[];
  texts?: GetStartTexts;
}

export default function GetStart(props: Props) {
  const [hasSubmit, setHasSubmit] = useState(false);
  const [iframeSrc, setIframeSrc] = useState<string>('');

  useCnTallyListener();

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
    setHasSubmit(isSubmittedForm());
  }, []);

  const { className, blockItems: propsBlockItems, texts } = props;

  // 默认数据
  const defaultBlockItems: BlockItem[] = [
    {
      title: i18n('layout.Affiliate_Program'),
      content: i18n('layout.Refer_Sale_Commission'),
      link: 'https://www.voc.ai/affiliate-program',
      linkText: i18n('layout.Become_Affiliate'),
    },
    {
      title: i18n('layout.Influencer_Program'),
      content: i18n('layout.Recommend_ON_Social'),
      link: 'https://www.voc.ai/influencer-program',
      linkText: i18n('layout.Join_Now'),
    },
  ];

  // 使用传入的数据或默认数据
  const blockItems = propsBlockItems || defaultBlockItems;

  // 使用传入的文案或默认文案
  const title = texts?.title || i18n('layout.Ready_To_Start');
  const desc = texts?.desc || i18n('layout.Drop_Info_Touch');

  if (getLang() === 'zh-CN') {
    return (
      <div
        className={cx(styles.container, className)}
        style={{ flexDirection: 'column', gap: '20px' }}
      >
        <div className={styles.left}>
          <h2 className={styles.title} style={{ textAlign: 'center' }}>
            {title}
          </h2>
          <div className={styles.desc} style={{ textAlign: 'center' }}>
            {desc}
          </div>
        </div>
        {hasSubmit ? (
          <div className={styles.submitedWrap}>
            <SubmitedForm />
          </div>
        ) : (
          <iframe
            className={styles.right}
            src={iframeSrc}
            style={{
              background: '#fff',
              height: '1000px',
              maxWidth: '1000px',
              width: '100%',
              margin: '0 auto',
            }}
            frameBorder={'none'}
          />
        )}
      </div>
    );
  }
  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.left}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.desc}>{desc}</div>
        {/* <BookDemo className={styles.bookDemo} /> */}

        <div className={styles.blockList}>
          {blockItems.map((item, index) => (
            <div key={index} className={styles.blockItem}>
              <div className={styles.itemTitle}>{item.title}</div>
              <div className={styles.itemContent}>{item.content}</div>
              <a href={item.link} className={styles.itemLink}>
                {item.linkText}
              </a>
            </div>
          ))}
          {/* <div className={cx(styles.blockItem, styles.chromeItem)}>
            <a href="/" className={cx(styles.itemLink, styles.chromeLink)}>
              <Chrome className={styles.chromeIcon} />
              Chrome Extension
            </a>
            <div className={styles.itemContent}>
              Recommend VOC.AI on social media. Earn $1 for every 1000 post
              views.
            </div>
            <div className={styles.itemContent}>
              1. Planning Boards Marketing Report
            </div>
            <div className={styles.itemContent}>
              2. Pet Automatic Feeders Market Report{' '}
            </div>
            <div className={styles.itemContent}>
              3. Portable Power Station VOC Report
            </div>
            <div className={styles.itemContent}>
              4. Under Bed Storage Market Report
            </div>
          </div> */}
        </div>
      </div>

      <div className={styles.right}>{getLang() !== 'zh-CN' && <EnForm />}</div>
    </div>
  );
}
