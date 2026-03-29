import React from 'react';
import styles from './HeroSection.module.scss';
import { Button } from '../Button';
import { Line } from 'pages/mod/Line';
import i18n from '@/i18n';
import StatsContainer from './StatsContainer';
import { Slower } from 'pages/mod/Slower';
import { getLink } from 'util/getLink';
import TextAnimation from '@/components/TextAnimation';

const HeroSection: React.FC = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.content}>
        <div className={styles.textContainerWrapper}>
          <div className={styles.textContainer}>
            <div className={styles.firstLest}>
              <Line direction={'vertical'} />
              <svg
                className={styles.dot}
                width="54"
                height="23"
                viewBox="0 0 54 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="11" width="43" height="23" fill="#F07AF9" />
                <rect x="5" width="6" height="23" fill="#F07AF9" />
                <rect y="17" width="6" height="6" fill="#F07AF9" />
                <rect width="6" height="6" fill="#F07AF9" />
                <path
                  d="M18.496 10.957C18.496 10.3243 18.5653 9.71767 18.704 9.137C18.8513 8.54767 19.0463 8.00167 19.289 7.499C19.5403 6.99633 19.8307 6.54567 20.16 6.147C20.4893 5.73967 20.836 5.39733 21.2 5.12H22.617C22.227 5.39733 21.8587 5.72233 21.512 6.095C21.1653 6.46767 20.862 6.87933 20.602 7.33C20.342 7.78067 20.134 8.26167 19.978 8.773C19.822 9.27567 19.744 9.80433 19.744 10.359V11.555C19.744 12.1097 19.822 12.6427 19.978 13.154C20.134 13.6567 20.342 14.1333 20.602 14.584C20.862 15.0347 21.1653 15.4463 21.512 15.819C21.8587 16.1917 22.227 16.5167 22.617 16.794H21.2C20.836 16.5253 20.4893 16.1873 20.16 15.78C19.8307 15.3727 19.5403 14.9177 19.289 14.415C19.0463 13.9123 18.8513 13.3707 18.704 12.79C18.5653 12.2007 18.496 11.5897 18.496 10.957ZM26.1609 14.376L25.1599 13.687L26.7199 11.581L24.2889 10.762L24.6529 9.644L27.0709 10.463V7.863H28.3189V10.463L30.7369 9.644L31.1009 10.762L28.6699 11.581L30.2299 13.687L29.2289 14.376L27.6949 12.27L26.1609 14.376ZM36.8938 10.957C36.8938 11.5897 36.8202 12.2007 36.6728 12.79C36.5342 13.3707 36.3392 13.9123 36.0878 14.415C35.8452 14.9177 35.5592 15.3727 35.2298 15.78C34.9005 16.1873 34.5538 16.5253 34.1898 16.794H32.7728C33.1628 16.5167 33.5312 16.1917 33.8778 15.819C34.2245 15.4463 34.5278 15.0347 34.7878 14.584C35.0478 14.1333 35.2558 13.6567 35.4118 13.154C35.5678 12.6427 35.6458 12.1097 35.6458 11.555V10.359C35.6458 9.80433 35.5678 9.27567 35.4118 8.773C35.2558 8.26167 35.0478 7.78067 34.7878 7.33C34.5278 6.87933 34.2245 6.46767 33.8778 6.095C33.5312 5.72233 33.1628 5.39733 32.7728 5.12H34.1898C34.5538 5.39733 34.9005 5.73967 35.2298 6.147C35.5592 6.54567 35.8452 6.99633 36.0878 7.499C36.3392 8.00167 36.5342 8.54767 36.6728 9.137C36.8202 9.71767 36.8938 10.3243 36.8938 10.957Z"
                  fill="#0B0B0B"
                />
              </svg>
            </div>
            <TextAnimation
              animationType="fadeInUp"
              delay={0}
              duration={700}
              className={styles.title}
            >
              {i18n('solvea.Home_definition_title')}
            </TextAnimation>
            <TextAnimation
              animationType="fadeInUp"
              delay={200}
              duration={600}
              className={styles.description}
            >
              {i18n('solvea.Home_definition_desc')}
            </TextAnimation>
            <a href={getLink('/contact')} target={'_blank'}>
              <Button className={styles.button}>
                {i18n('solvea.Home_definition_CTA_button')}
              </Button>
            </a>
            <Line className={styles.lineV} direction={'vertical'} />
          </div>
          <Line className={styles.lineH} />
          <div className={styles.right}>
            <Line direction={'vertical'} />
            <div className={styles.graph}>
              <div className={styles.canvasContainer}>
                <Slower />
              </div>
            </div>
            <Line direction={'vertical'} />
          </div>
        </div>
      </div>
      <Line />
      <div className={styles.realTime}>
        <TextAnimation
          animationType="fadeInUp"
          delay={0}
          duration={600}
          className={styles.realTimeData}
        >
          <div className={styles.dot}></div>
          {i18n('solvea.Home_data_title')}
        </TextAnimation>

        <TextAnimation
          animationType="fadeInUp"
          delay={200}
          duration={600}
        >
          {i18n('solvea.Home_data_slogan')
            .split('\n')
            .map((text, index) => (
              <div className={styles.title} key={index}>
                {text}
              </div>
            ))}
        </TextAnimation>
      </div>
      <Line />
      <StatsContainer />
      <Line />
    </div>
  );
};

export default HeroSection;
