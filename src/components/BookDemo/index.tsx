import React from 'react';
import styles from './index.module.scss';
import i18n from '@/i18n';
import { getLink } from 'util/getLink';

export default function BookDemo() {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.title}>{i18n('layout.Pricing_Summary')}</div>
        <a href={getLink('/contact')} className={styles.btn}>
          {i18n('layout.Pricing_Contact')}
        </a>
      </div>
      <div className={styles.right}>
        <img
          className={styles.image}
          src="https://cdn.shulex-voc.com/shulex/upload/2025-04-10/ceeeb80f-4d94-4af7-9ce4-6896f700e547.webp"
          alt="bookdemo"
        />
      </div>
    </div>
  );
}
