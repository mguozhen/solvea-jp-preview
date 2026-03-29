import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import BookDemo from 'components/DefaultBtn/bookDemo';
import i18n from '@/i18n';

interface Feature {
  title: string;
  subtitle: string;
  desc: string;
}

interface Props {
  className?: string;
  title?: string;
  features?: Feature[];
  titleColor?: string;
}

export default function AllInOne(props: Props) {
  const { className, title, features, titleColor } = props;
  const defaultData: Feature[] = [
    {
      title: '100%',
      subtitle: i18n('layout.Home_allin_item1_title'),
      desc: i18n('layout.Home_allin_item1_desc'),
    },
    {
      title: '90%',
      subtitle: i18n('layout.Home_allin_item2_title'),
      desc: i18n('layout.Home_allin_item2_desc'),
    },
    {
      title: '1-click',
      subtitle: i18n('layout.Home_allin_item3_title'),
      desc: i18n('layout.Home_allin_item3_desc'),
    },
    {
      title: '10X',
      subtitle: i18n('layout.Home_allin_item4_title'),
      desc: i18n('layout.Home_allin_item4_desc'),
    },
    {
      title: '1,000+',
      subtitle: i18n('layout.Home_allin_item5_title'),
      desc: i18n('layout.Home_allin_item5_desc'),
    },
    {
      title: '24/7',
      subtitle: i18n('layout.Home_allin_item6_title'),
      desc: i18n('layout.Home_allin_item6_desc'),
    },
  ];
  const data = features || defaultData;

  // 使用传入的文案或默认文案
  const defaultTitle = title || i18n('layout.Home_Comprehensive_AI_Customer');
  const subTitle = i18n('layout.Home_Always_Learning');
  const desc = i18n('layout.Home_Always_Learning_desc');

  return (
    <div
      className={cx(styles.container, className)}
      data-aos="fade"
      style={{ maxWidth: 1200 }}
    >
      <h2 className={styles.title} style={{ color: titleColor }}>
        {defaultTitle}
      </h2>
      <div className={styles.content}>
        {data?.map((v, index) => {
          return (
            <div className={styles.item} key={index}>
              <div className={styles.itemValue}>{v.title}</div>
              <div className={styles.itemTitle}>{v.subtitle}</div>
              <div className={styles.itemDesc} title={v.desc}>
                {v.desc}
              </div>
            </div>
          );
        })}
      </div>
      <h3 className={styles.subTitle}>{subTitle}</h3>
      <div className={styles.desc}>{desc}</div>

      <div className={styles.actionBox}>
        <BookDemo theme="black" showArrow />
      </div>
    </div>
  );
}
