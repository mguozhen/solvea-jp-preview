import React from 'react';
import styles from './index.module.scss';
import i18n from '@/i18n';

export default function Flowchart() {
  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div className={styles.title}>{i18n('layout.Solutions_Flowchart')}</div>
        <div className={styles.main}></div>
      </div>
    </div>
  );
}
