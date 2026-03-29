import React from 'react';
import i18n from '@/i18n';
import styles from './index.module.scss';
import { Button } from '../../../mod/Button';
import { Caseh1 } from 'pages/mod/svgs/icons';

export const SuccessStoriesHeader = ({
  title,
  desc,
  href,
}: {
  title?: string;
  desc?: string;
  href?: string;
}) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.contentWrapper}>
        <Caseh1 className={styles.geometricShapes} />
        <div className={styles.textContainer}>
          <h1 className={styles.mainTitle}>
            {title || i18n('solvea.Case_Collection_Page_Title')}
          </h1>
          <p className={styles.subtitle}>
            {desc || i18n('solvea.Case_Collection_Page_Desc')}
          </p>
          <a href={href || '/customer-stories#stories'} className={styles.btn}>
            <Button>GET STARTED</Button>
          </a>
        </div>
      </div>
    </div>
  );
};
