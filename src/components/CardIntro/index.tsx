import React from 'react';
import styles from './index.module.scss';

interface ItemProps {
  title?: string;
  desc?: string;
}

interface Props {
  title: string;
  subTitle?: string;
  goBtnText?: string;
  goBtnUrl?: string;
  data?: ItemProps[];
}
export default function CardIntro(props: Props) {
  const { title, subTitle, goBtnText, goBtnUrl, data } = props;
  return (
    <div className={styles.wrap}>
      <div className={styles.back1}></div>
      <div className={styles.back2}></div>
      <div className={styles.back3}></div>
      <div className={styles.box} data-aos="fade-up">
        <div className={styles.title}>{title}</div>
        {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
        <div className={styles.content}>
          {data?.map((v, index) => {
            return (
              <div className={styles.item} key={index}>
                <div className={styles.itemInner}>
                  <div className={styles.itemTitle}>{v.title}</div>
                  <div className={styles.itemDesc}>{v.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
        {goBtnText && (
          <div className={styles.footer}>
            <a href={goBtnUrl} className={styles.goBtn}>
              {goBtnText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
