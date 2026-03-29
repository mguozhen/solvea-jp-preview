'use client';

import BatchAnimation, { BatchAnimationTrigger } from '@/components/BatchAnimation';
import OptimizedVideoPlayer from '@/components/VideoPlayer/OptimizedVideoPlayer';
import { getLang, setLang } from '@/i18n';
import BrandIntegration from 'pages/mod/BrandIntegration';
import { HowItWork } from 'pages/mod/HowItWork';
import { Line } from 'pages/mod/Line';
import Performance from 'pages/mod/Performance';
import HeroSection from 'pages/mod/Redefines';
import { Resolution } from 'pages/mod/Resolution';
import ScrollingBrandWall from 'pages/mod/ScrollingBrandWall';
import { Skeptics } from 'pages/mod/Skeptics';
import { Solutions } from 'pages/mod/Solutions';
import { useEffect } from 'react';
import { getPathNameLang } from 'util/common';
import styles from './index.module.scss';

export default function HomeContent() {
  const lang = getLang();
  const isEn = 'en-US' === lang;

  useEffect(() => {
    try {
      const pathname = window.location.pathname || '';
      const origin = window.location.origin || '';
      setLang(getPathNameLang(pathname, origin) as any);
    } catch (error) {
      console.error('Error setting language:', error);
    }

    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  return (
    <main className={`${styles.content} side-fade`}>
      {isEn && (
        <div className={styles.topBanner}>
          <div className={styles.topBannerContent}>
            <span className={styles.topBannerText}>
              Meet our AI Agents that is tailored for your industry
              <div className={styles.topBannerSeparator} />
              <a
                href={'https://solvea.cx/solution'}
                target={'_blank'}
                className={styles.topBannerLink}
              >
                Check it now
              </a>
            </span>
          </div>
        </div>
      )}

      <OptimizedVideoPlayer
        src="https://cdn.shulex-voc.com/assets/1762248874006/homeV.mp4"
        autoPlay={true}
        loop={false}
        muted={true}
        controls={true}
      />

      {/* 第一组：品牌墙区域 - 首屏内容，减少动画延迟 */}
      <BatchAnimationTrigger batchId="brand-section" threshold={0.15} baseDelay={0}>
        <div>
          <BatchAnimation
            animationType="fadeIn"
            delay={0}
            duration={200}
            threshold={0.1}
            batchId="brand-section"
            batchDelay={50}
          >
            <Line />
          </BatchAnimation>

          <BatchAnimation
            animationType="fadeInUp"
            delay={0}
            duration={400}
            threshold={0.15}
            batchId="brand-section"
            batchDelay={50}
          >
            <ScrollingBrandWall />
          </BatchAnimation>

          <BatchAnimation
            animationType="fadeIn"
            delay={0}
            duration={200}
            threshold={0.1}
            batchId="brand-section"
            batchDelay={50}
          >
            <Line />
          </BatchAnimation>

          <BatchAnimation
            animationType="fadeInUp"
            delay={0}
            duration={600}
            threshold={0.2}
            batchId="brand-section"
            batchDelay={100}
          >
            <HeroSection />
          </BatchAnimation>
        </div>
      </BatchAnimationTrigger>

      {/* 第三组：场景和解决方案区域 */}
      <BatchAnimationTrigger batchId="solutions-section" threshold={0.2} baseDelay={0}>
        <div>
          <BatchAnimation
            animationType="fadeInUp"
            delay={0}
            duration={500}
            threshold={0.2}
            batchId="solutions-section"
            batchDelay={150}
          >
            <Solutions />
          </BatchAnimation>
        </div>
      </BatchAnimationTrigger>

      {/* 第四组：性能和功能区域 */}
      <BatchAnimationTrigger batchId="features-section" threshold={0.2} baseDelay={0}>
        <div>
          <BatchAnimation
            animationType="fadeInUp"
            delay={0}
            duration={500}
            threshold={0.2}
            batchId="features-section"
            batchDelay={100}
          >
            <div id="performance">
              <Performance />
            </div>
          </BatchAnimation>

          <BatchAnimation
            animationType="fadeInUp"
            delay={0}
            duration={500}
            threshold={0.2}
            batchId="features-section"
            batchDelay={100}
          >
            <div id="howItWork">
              <HowItWork />
            </div>
          </BatchAnimation>
        </div>
      </BatchAnimationTrigger>

      {/* 第五组：结尾区域 */}
      <BatchAnimationTrigger batchId="footer-section" threshold={0.2} baseDelay={0}>
        <div>
          <BatchAnimation
            animationType="fadeInUp"
            delay={0}
            duration={500}
            threshold={0.2}
            batchId="footer-section"
            batchDelay={150}
          >
            <Skeptics />
          </BatchAnimation>

          <BatchAnimation
            animationType="fadeInUp"
            delay={0}
            duration={500}
            threshold={0.2}
            batchId="footer-section"
            batchDelay={150}
          >
            <BrandIntegration />
          </BatchAnimation>

          <BatchAnimation
            animationType="fadeInUp"
            delay={0}
            duration={500}
            threshold={0.2}
            batchId="footer-section"
            batchDelay={150}
          >
            <Resolution />
          </BatchAnimation>
        </div>
      </BatchAnimationTrigger>
    </main>
  );
}
