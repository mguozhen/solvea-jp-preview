'use client';
import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

interface ProductHuntProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export default function ProductHunt(props: ProductHuntProps) {
  const { className, style, width, height } = props;
  const [hasError, setHasError] = useState(false);
  const [inited, setInited] = useState(false);
  useEffect(() => {
    setInited(true);
  }, []);
  const url = useMemo(() => {
    return hasError
      ? 'https://cdn.shulex-voc.com/assets/1699848438041/ph.png'
      : 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=423776&theme=light';
  }, [hasError]);
  if (!inited) {
    return (
      <a
        href="https://www.producthunt.com/posts/voc-ai-chatbot-for-e-commerce"
        target="_blank"
        className={styles.productHunt}
      ></a>
    );
  }
  return (
    <div className={styles.container}>
      <a
        href="https://www.producthunt.com/posts/voc-ai-chatbot-for-e-commerce"
        target="_blank"
        className={styles.productHunt}
      >
        <img
          width={width}
          height={height}
          onError={() => {
            setHasError(true);
          }}
          className={cx(className)}
          style={style}
          src={url}
          alt="VocAI&#0032;Chatbot - Resolve&#0032;80&#0037;&#0032;of&#0032;your&#0032;customer&#0032;support&#0032;questions&#0032;with&#0032;no&#0032;code | Product Hunt"
        />
      </a>
    </div>
  );
}
