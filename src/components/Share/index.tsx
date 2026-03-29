'use client';

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import cx from 'classnames';
import SvgShare from 'components/Icons/Share';
import { Popover, message } from 'antd';
import SvgFacebookGray from '@/components/Icons/FacebookGray';
import SvgTwitterGray from '@/components/Icons/TwitterGray';
import SvgLinkedInGray from '@/components/Icons/LinkedInGray';
import SvgLink from '@/components/Icons/Link';

import styles from './index.module.scss';
import i18nOld from 'util/i18nOld/i18nOld';

interface Props {
  style?: React.CSSProperties;
  classname?: string;
}

function Content() {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  const text = encodeURIComponent('Check out this awesome article!');

  const onCopy = useCallback(() => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        message.success('Copied!');
      })
      .catch((error) => {
        console.error('复制失败:', error);
      });
  }, [url]);

  const onshare = (link?: string) => {
    const width = 550;
    const height = 420;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(
      link,
      'Share article',
      `width=${width}, height=${height}, left=${left}, top=${top}`,
    );
  };

  return (
    <div className={styles.shares}>
      <div className={styles.link} onClick={onCopy}>
        <SvgLink className={styles.icon} />
        <span>Copy Link</span>
      </div>
      <div className={styles.line}></div>
      <div
        className={styles.link}
        onClick={() => {
          onshare(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url,
            )}`,
          );
        }}
      >
        <SvgFacebookGray className={styles.icon} />
        <span>Share on Facebook</span>
      </div>
      <div
        className={styles.link}
        onClick={() => {
          onshare(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url,
            )}&text=${text}`,
          );
        }}
      >
        <SvgTwitterGray className={styles.icon} />
        <span>Share on Twitter</span>
      </div>
      <div
        className={styles.link}
        onClick={() => {
          onshare(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              url,
            )}&title=${text}`,
          );
        }}
      >
        <div className={styles.iconContainer}>
          <SvgLinkedInGray className={styles.icon} />
        </div>
        <span>Share on Linkedin</span>
      </div>
      {/* <div
        className={styles.link}
        onClick={() => {
          onshare(`https://www.quora.com/share?url=${encodeURIComponent(url)}&title=${text}`);
        }}
      >
        <SvgQuoraGray className={styles.icon} />
        <span>Share on Quora</span>
      </div> */}
    </div>
  );
}

export default function Share(props: Props) {
  const { classname, style } = props;
  return (
    <Popover placement="bottom" content={Content} className={styles.share}>
      <div className={cx(styles.container, classname)} style={style}>
        <SvgShare className={styles.icon} />
        <span>{i18nOld('homepage.share')}</span>
      </div>
    </Popover>
  );
}
