import React from 'react';
import styles from './index.module.scss';

interface CasesOverviewItem {
  value?: string;
  desc?: string;
}

interface Props {
  brandIconUrl?: string;
  title?: string;
  subTitle?: string;
  list?: CasesOverviewItem[];
}

export default function CasesOverview(props: Props) {
  const { brandIconUrl, title, subTitle, list } = props;
  return (
    <div className={styles.container}>
      <img src={brandIconUrl} alt="brand" className={styles.brandIcon} />
      <div className={styles.textBox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
      <div className={styles.list}>
        {list?.map((v, index) => {
          return (
            <div key={index} className={styles.item}>
              <div className={styles.itemTitle}>{v.value}</div>
              <div className={styles.itemDesc}>{v.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
