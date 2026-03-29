import React from 'react';
import styles from './index.module.scss';
import Storage from '../../Icons/Storage';

interface Props {
  bgUrl: string;
  cardInfo: {
    title: string;
    content: string;
  };
}

export default function SolveaPoster(props: Props) {
  const { cardInfo, bgUrl } = props;

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.title}>
            <Storage className={styles.titleIcon} />
            <span>{cardInfo.title}</span>
          </div>
          <div className={styles.content}>{cardInfo.content}</div>
        </div>
      </div>
    </div>
  );
}
