'use client';

import TextAnimation from '@/components/TextAnimation';
import i18n from '@/i18n';
import Lottie, { AnimationItem } from 'lottie-web';
import { useEffect, useRef } from 'react';
import styles from './index.module.scss';

export const Solutions = () => {
  const refs = useRef<HTMLDivElement[]>([]);
  const anis = useRef<AnimationItem[]>([]);

  const arr = [
    [
      {
        icon: 'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-715_Icons_animation-pink.json',
        title: i18n('solvea.Home_solutions_section1'),
      },
      {
        title: i18n('solvea.Home_solutions_section1_title1'),
        desc: i18n('solvea.Home_solutions_section1_desc1'),
      },
      {
        title: i18n('solvea.Home_solutions_section1_title2'),
        desc: i18n('solvea.Home_solutions_section1_desc2'),
      },
      {
        title: i18n('solvea.Home_solutions_section1_title3'),
        desc: i18n('solvea.Home_solutions_section1_desc3'),
      },
    ],
    [
      {
        icon: 'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-715_Icons_animation-blue.json',
        title: i18n('solvea.Home_solutions_section2'),
      },
      {
        title: i18n('solvea.Home_solutions_section2_title1'),
        desc: i18n('solvea.Home_solutions_section2_desc1'),
      },
      {
        title: i18n('solvea.Home_solutions_section2_title2'),
        desc: i18n('solvea.Home_solutions_section2_desc2'),
      },
      {
        title: i18n('solvea.Home_solutions_section2_title3'),
        desc: i18n('solvea.Home_solutions_section2_desc3'),
      },
    ],
    [
      {
        icon: 'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-715_Icons_animation-green.json',
        title: i18n('solvea.Home_solutions_section3'),
      },
      {
        title: i18n('solvea.Home_solutions_section3_title1'),
        desc: i18n('solvea.Home_solutions_section3_desc1'),
      },
      {
        title: i18n('solvea.Home_solutions_section3_title2'),
        desc: i18n('solvea.Home_solutions_section3_desc2'),
      },
      {
        title: i18n('solvea.Home_solutions_section3_title3'),
        desc: i18n('solvea.Home_solutions_section3_desc3'),
      },
    ],
  ];

  useEffect(() => {
    anis.current = arr.map((a, index) => {
      return Lottie.loadAnimation({
        loop: false,
        autoplay: false,
        container: refs.current[index]!,
        path: a[0].icon,
      });
    });
    return () => {
      anis.current.forEach((ins) => ins.destroy());
    };
  }, []);
  return (
    <div className={styles.container} id={'resolution'}>
      <div className={styles.header}>
        {/* <div className={styles.realTimeData}>
        <div className={styles.dot}></div>
        <span>{i18n('solvea.Home_footer_resources1')}</span>
      </div> */}
        {i18n('solvea.Home_solutions_slogan')
          .split('\n')
          .map((text, index) => (
            <div key={index} className={styles.title}>
              <TextAnimation
                key={index}
                animationType="fadeInUp"
                delay={index * 100}
                duration={600}
              >
                {text}
              </TextAnimation>
            </div>
          ))}
      </div>
      <div className={styles.wrapper}>
        {arr.map((a, index) => {
          return (
            <div
              key={index}
              className={`${styles.box} i${index}`}
              onMouseEnter={() => {
                anis.current[index].play();
              }}
              onMouseLeave={() => {
                anis.current[index].stop();
              }}
            >
              {a.map((item, idx) => {
                if (idx) {
                  return (
                    <div key={idx} className={styles.item}>
                      <div className={styles.title}>{item.title}</div>
                      <div className={styles.desc}>{item.desc}</div>
                    </div>
                  );
                }
                return (
                  <div key={idx} className={styles.first}>
                    <div className={styles.iconContainer}>
                      <div
                        ref={(el) => {
                          refs.current[index] = el!;
                        }}
                        className={styles.icon}
                      />
                      <span>{item.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
