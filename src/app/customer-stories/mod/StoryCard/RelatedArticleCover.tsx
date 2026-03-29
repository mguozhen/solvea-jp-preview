'use client';

import cx from 'classnames';
import { useState } from 'react';
import styles from './RelatedArticleCover.module.scss';

export function RelatedArticleCover({ src, brandName }: { src: string; brandName: string }) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  if (!src?.trim() || failed) {
    return (
      <div className={styles.placeholder} aria-hidden>
        <span className={styles.placeholderText}>{brandName}</span>
      </div>
    );
  }

  return (
    <div className={styles.frame}>
      <div
        className={cx(styles.skeleton, ready && styles.skeletonHidden)}
        aria-hidden
      />
      <img
        className={cx(styles.img, ready && styles.imgVisible)}
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        onLoad={() => setReady(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
