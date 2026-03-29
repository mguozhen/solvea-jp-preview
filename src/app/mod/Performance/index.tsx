'use client';

import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import i18n from '@/i18n';
import Lottie from 'lottie-web';
import { Line } from 'pages/mod/Line';
import TextAnimation from '@/components/TextAnimation';

const Performance = () => {
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);

  const content = (string: string) => {
    const arr = string.split('\n');
    if (arr.length > 1) {
      return (
        <ul className={styles.content}>
          {arr.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return <div className={styles.content}>{string}</div>;
  };

  useEffect(() => {
    const config = {
      loop: true,
      autoplay: true,
    };

    const ins = [
      Lottie.loadAnimation({
        ...config,
        container: firstRef.current!,
        path: 'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-689_Solvea-pink-pay-for-what-works_v2.json',
      }),
      Lottie.loadAnimation({
        ...config,
        container: secondRef.current!,
        path: 'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-689_Solvea-green-real-results_v2.json',
      }),
      Lottie.loadAnimation({
        ...config,
        container: threeRef.current!,
        path: 'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-689_Solvea-blue-trust_the_leader_v2.json',
      }),
    ];

    return () => {
      ins.forEach((item) => item.destroy());
    };
  }, []);

  return (
    <div className={styles.container} id={'performance'}>
      <div className={styles.header}>
        <div className={styles.realTimeData}>
          <span className={styles.realTimeDataText}>
            {i18n('solvea.Home_performance_title')}
          </span>
        </div>
        <TextAnimation animationType="fadeInUp" delay={0} duration={600}>
          {i18n('solvea.Home_performance_slogan')
            .split('\n')
            .map((text, index) => (
              <div
                key={`performance-title-${index}-${text}`}
                className={styles.title}
              >
                {text}
              </div>
            ))}
        </TextAnimation>
      </div>
      <div className={styles.demo}>
        <Line className={'only-mobile'} color={'#eee'} />
        <div className={`${styles.box}`}>
          <div className={`${styles.graph}`}>
            <div
              className={`${styles.lottie} ${styles.lottie1}`}
              ref={firstRef}
            ></div>
          </div>
          <Line className={'only-mobile'} color={'#eee'} />
          <div className={`${styles.text}`}>
            <div className={styles.title}>
              {i18n('solvea.Home_performance_section1_title')}
            </div>
            {content(i18n('solvea.Home_performance_section1_desc'))}
          </div>
        </div>
        <Line className={'only-mobile'} color={'#eee'} />
        <div className={`${styles.box}`}>
          <div className={`${styles.graph}`}>
            <div
              className={`${styles.lottie} ${styles.lottie2}`}
              ref={secondRef}
            ></div>
          </div>
          <Line className={'only-mobile'} color={'#eee'} />
          <div className={`${styles.text}`}>
            <div className={styles.title}>
              {i18n('solvea.Home_performance_section2_title')}
            </div>
            {content(i18n('solvea.Home_performance_section2_desc'))}
          </div>
        </div>
        <Line className={'only-mobile'} color={'#eee'} />
        <div className={`${styles.box}`}>
          <div className={`${styles.graph}`}>
            <div
              className={`${styles.lottie} ${styles.lottie3}`}
              ref={threeRef}
            ></div>
          </div>
          <Line className={'only-mobile'} color={'#eee'} />
          <div className={`${styles.text}`}>
            <div className={styles.title}>
              {i18n('solvea.Home_performance_section3_title')}
            </div>
            {content(i18n('solvea.Home_performance_section3_desc'))}
          </div>
        </div>
        <Line className={'only-mobile'} color={'#eee'} />
      </div>
    </div>
  );
};

export default Performance;
