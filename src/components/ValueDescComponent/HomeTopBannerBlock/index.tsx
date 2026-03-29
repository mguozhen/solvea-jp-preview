'use client';

import styles from './index.module.scss';

export interface HomeTopBannerBlockProps {
  pillText?: string;
  textBold?: string;
  textBefore?: string;
  textAfter?: string;
  ctaText?: string;
  ctaLink?: string;
}

const DiscordIcon = () => (
  <svg width="13" height="10" viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const TextContent = ({
  textBefore,
  textBold,
  textAfter,
}: {
  textBefore: string;
  textBold: string;
  textAfter: string;
}) => (
  <>
    {textBefore}
    <strong>{textBold}</strong>
    {textAfter}
  </>
);

export default function HomeTopBannerBlock(props: HomeTopBannerBlockProps) {
  const {
    pillText = 'Free credits',
    textBold = '10,000 bonus credits',
    textBefore = 'Get ',
    textAfter = ' free — join our Discord & ask your channel manager',
    ctaText = 'Claim on Discord',
    ctaLink = 'https://discord.gg/Q6D5U8GJvE',
  } = props;

  return (
    <div className={styles.topBanner} id="creditsBanner" role="banner">
      <div className={styles.bannerInner}>
        {/* 桌面端：单行 pill + 文案 + 分隔 + 按钮 */}
        <div className={styles.bannerDesktopRow}>
          {pillText && (
            <div className={styles.bannerPillRow}>
              <span className={styles.bannerPill}>
                <span className={styles.pillDot} aria-hidden />
                {pillText}
              </span>
            </div>
          )}
          <span className={styles.bannerTextDesktop}>
            <TextContent textBefore={textBefore} textBold={textBold} textAfter={textAfter} />
          </span>
          <span className={styles.bannerSep} aria-hidden />
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              id="discord_top_banner_join"
              className={styles.bannerCta}
            >
              <DiscordIcon />
              {ctaText}
              <ArrowIcon />
            </a>
          )}
        </div>

        {/* 移动端：pill + 文案一起滚动，仅按钮固定右侧 */}
        <div className={styles.bannerTextScrollWrap}>
          <div className={styles.bannerTextScrollTrack} aria-hidden>
            <div className={styles.bannerScrollChunk}>
              {pillText && (
                <span className={styles.bannerPill}>
                  <span className={styles.pillDot} aria-hidden />
                  {pillText}
                </span>
              )}
              <span className={styles.bannerText}>
                <TextContent textBefore={textBefore} textBold={textBold} textAfter={textAfter} />
              </span>
            </div>
            <div className={styles.bannerScrollChunk}>
              {pillText && (
                <span className={styles.bannerPill}>
                  <span className={styles.pillDot} aria-hidden />
                  {pillText}
                </span>
              )}
              <span className={styles.bannerText}>
                <TextContent textBefore={textBefore} textBold={textBold} textAfter={textAfter} />
              </span>
            </div>
          </div>
        </div>
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            id="discord_top_banner_join"
            className={styles.bannerMobileCta}
          >
            <DiscordIcon />
            {ctaText}
            <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
}
