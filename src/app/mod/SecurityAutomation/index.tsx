import React from 'react';
import styles from './index.module.scss';
import { ListItemFinish } from 'components/Icons';
import cx from 'classnames';
import i18n from '@/i18n';
import BookDemo from 'components/DefaultBtn/bookDemo';

interface SecurityAutomationTexts {
  title?: string;
  desc?: string;
  leftSubTitle?: string;
  rightSubTitle?: string;
  rightDesc?: string;
}

interface Props {
  className?: string;
  leftList?: string[];
  title?: string;
  subtitle?: string;
  rightList?: string[];
  texts?: SecurityAutomationTexts;
}

export default function SecurityAutomation(props: Props) {
  const {
    className,
    leftList: propsLeftList,
    rightList: propsRightList,
    texts,
    title,
    subtitle,
  } = props;

  // 默认数据
  const defaultLeftList = [
    i18n('layout.US_Data_Protection_Compliance'),
    i18n('layout.Independently_Developed_LLMs'),
    i18n('layout.Enhanced_AI_Performance'),
    i18n('layout.ISO_27001_Certified'),
  ];

  const defaultRightList = [i18n('layout.Deploy_Across_Platforms')];

  // 使用传入的数据或默认数据
  const leftList = propsLeftList || defaultLeftList;
  const rightList = propsRightList || defaultRightList;

  // 使用传入的文案或默认文案
  const defaultTitle =
    title || i18n('layout.Top-notch_Security_Smarter_Automation');
  const desc = subtitle || i18n('layout.Smart_Team_Solution');
  const leftSubTitle =
    texts?.leftSubTitle || i18n('layout.Enterprise_Grade_Security');
  const rightSubTitle =
    texts?.rightSubTitle || i18n('layout.Seamless_Integration');
  const rightDesc =
    texts?.rightDesc || i18n('layout.Solvea_Effortless_Connection');

  return (
    <div
      className={cx(styles.container, className)}
      data-aos="fade"
      style={{ maxWidth: 1200 }}
    >
      <h2 className={styles.title}>{defaultTitle}</h2>
      <h5 className={styles.desc}>{desc}</h5>
      <div className={styles.content}>
        <div className={styles.left}>
          <h3 className={styles.subTitle}>{leftSubTitle}</h3>
          <div className={styles.listBox}>
            {leftList.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <ListItemFinish className={styles.itemIcon} />
                <div className={styles.itemContent}>{item}</div>
              </div>
            ))}
            <div className={styles.leftBottom}>
              <img
                src="https://cdn.shulex-voc.com/shulex/upload/2025-04-15/45ec97f8-8c9e-43d9-b517-292880529f85.png"
                alt="chatbot"
                className={styles.isoImg}
              />
              <BookDemo />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.subTitle}>{rightSubTitle}</h3>
          <div className={styles.listBox}>
            {rightList.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <ListItemFinish className={styles.itemIcon} />
                <div className={styles.itemContent}>{item}</div>
              </div>
            ))}
          </div>
          <div className={styles.desc}>{rightDesc}</div>
          <div className={styles.imgWrap}>
            <img
              src="https://cdn.shulex-voc.com/shulex/upload/2025-04-15/496c3c8d-19a6-47e5-8d81-b626dcbdccac.png"
              alt="chatbot"
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
