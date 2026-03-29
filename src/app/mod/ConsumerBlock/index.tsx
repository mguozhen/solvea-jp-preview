'use client';
import React, { useState } from 'react';
import styles from './index.module.scss';
import { Starts } from 'components/Icons';
import cx from 'classnames';
import i18n from '@/i18n';
import BookDemo from 'components/DefaultBtn/bookDemo';

interface StepItem {
  title: string;
  subTitle: string;
  desc: string;
  img: string;
}

interface ConsumerBlockTexts {
  trustedByUser?: string;
  title?: string;
  subTitle?: string;
}

interface Props {
  className?: string;
  stepItems?: StepItem[];
  texts?: ConsumerBlockTexts;
}

export default function ConsumerBlock(props: Props) {
  const { className, stepItems: propsStepItems, texts } = props;

  // 默认数据
  const defaultStepItems: StepItem[] = [
    {
      title: i18n('layout.Home_Custom_step_1_title'),
      subTitle: i18n('layout.Home_Custom_step_1_subTitle'),
      desc: i18n('layout.Home_Custom_step_1_desc'),
      img: 'https://cdn.shulex-voc.com/shulex/upload/2025-04-14/e033073a-9f4b-4f22-9404-1a1ae1465ad3.png',
    },
    {
      title: i18n('layout.Home_Custom_step_2_title'),
      subTitle: i18n('layout.Home_Custom_step_2_subTitle'),
      desc: i18n('layout.Home_Custom_step_2_desc'),
      img: 'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/775fb20a-4096-4946-9f2a-d5c2d113b741.png',
    },
    {
      title: i18n('layout.Home_Custom_step_3_title'),
      subTitle: i18n('layout.Home_Custom_step_3_subTitle'),
      desc: i18n('layout.Home_Custom_step_3_desc'),
      img: 'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/c073ce19-6c4f-4e6a-8ae6-272ea9ee3334.png',
    },
  ];

  // 使用传入的数据或默认数据
  const stepItems = propsStepItems || defaultStepItems;

  // 使用传入的文案或默认文案
  const trustedByUser =
    texts?.trustedByUser || i18n('layout.Home_trusted_by_user');
  const title = texts?.title || i18n('layout.Home_Agent_Drive_Grow');
  const subTitle = texts?.subTitle || i18n('layout.Home_Agent_Drive_Grow_desc');

  const [highlight, setHighlight] = useState(0);

  return (
    <div className={cx(styles.blockContent, className)} data-aos="fade">
      <div className={styles.consumerBox}>
        <img
          className={styles.consumerReviewIcon}
          src="https://cdn.shulex-voc.com/shulex/upload/2025-07-16/c60f8ba5-5b77-4398-a047-0edee72b5e7f.png"
          alt=""
        />
        {/* <Consumer className={styles.consumerReviewIcon} /> */}
        <div className={styles.consumerStarBox}>
          <Starts className={styles.star} />
          <span>{trustedByUser}</span>
        </div>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <h4 className={styles.subTitle}>{subTitle}</h4>
      <BookDemo />

      {stepItems.map((item, index) => {
        return (
          <img
            src={item?.img}
            alt="chatbot"
            key={index}
            className={cx(styles.chatbotImg, {
              [styles.highlightImg]: highlight === index,
            })}
          />
        );
      })}
      <div className={styles.stepList}>
        {stepItems.map((item, index) => (
          <div
            className={cx(styles.stepItem, {
              [styles.highlight]: highlight === index,
            })}
            key={index}
            onMouseEnter={() => setHighlight(index)}
          >
            <span className={styles.stepNum}>0{index + 1}.</span>
            <h3 className={styles.stepTitle}>{item.title}</h3>
            <h4 className={styles.stepSubTitle}>{item.subTitle}</h4>
            <h4 className={styles.stepDesc}>{item.desc}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
