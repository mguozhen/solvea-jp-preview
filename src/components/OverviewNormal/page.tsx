import React from 'react';
import styles from './index.module.scss';
import SvgStarWhite from 'components/Icons/StarWhite';
import GoButton from 'components/GoButton';

interface Props {
  title?: string;
  titlePre?: string;
  goText?: string;
  goUrl?: string;
  backgroundUrl: string;
}

export default function OverviewNormal(props: Props) {
  const { title, titlePre, goText, goUrl, backgroundUrl } = props;
  return (
    <div className={styles.container} style={{ background: `url(${backgroundUrl})`,backgroundSize:'cover' }}>
      <div className={styles.left}>
        <div className={styles.preTitle}>
          <SvgStarWhite className={styles.star} />
          {titlePre}
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.leftFooter}>
          <GoButton type="white" url={goUrl}>
            {goText}
          </GoButton>
        </div>
      </div>
    </div>
  );
}
