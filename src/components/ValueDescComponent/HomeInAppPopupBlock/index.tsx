'use client';

import { useClientSize } from 'pages/useClientSize.hook';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { pushGTMEvent } from 'util/document';
import GetStartedBtn from '../GetStartedBtn';
import styles from './index.module.scss';

const AUTO_SHOW_DELAY_MS = 10_000;
const CLOSE_ANIMATION_MS = 230;

export interface HomeDiscordPopupProps {
  creditsLabel?: string;
  creditsAmount?: string;
  creditsAmountPrefix?: string;
  creditsAmountSuffix?: string;
  creditsSub?: string;
  existingNote?: string;
  existingNoteBold?: string;
  headlineHighlight?: string;
  headlineLine1?: string;
  headlineLine1Highlight?: string;
  headlineLine2?: string;
  sub?: string;
  onlineBadge?: string;
  perks?: string[];
  primaryCtaText?: string;
  primaryCtaLink?: string;
  skipText?: string;
  /** 自动弹出延迟（毫秒），默认 10000 */
  autoShowDelayMs?: number;
}

const DISCORD_ICON = (
  <svg width="20" height="15" viewBox="0 0 127.14 96.36" fill="#fff">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const CHECK_ICON = (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CLOSE_ICON = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);


export default function HomeInAppPopupBlock(props: HomeDiscordPopupProps) {
  const {
    creditsLabel = 'Join Discord & unlock',
    creditsAmount = '10,000',
    creditsAmountPrefix = '+',
    creditsAmountSuffix = ' free credits',
    creditsSub = "That's 11k total to explore Solvea",
    existingNote = 'You already have 1,000 credits on your free plan — this adds 10k more',
    existingNoteBold = '1,000 credits',
    headlineLine1 = 'Get',
    headlineLine1Highlight = '10k more credits.',
    headlineLine2 = 'Help us build Solvea right.',
    sub = 'Join our Discord, ask your channel manager for the bonus credits, and be part of a growing community shaping the future of AI customer service.',
    onlineBadge = 'Members are online now — say hi 👋',
    perks = [
      'Ask the channel manager for your 10k credits',
      'Get setup help from our team in real-time',
      'Share feedback & vote on what we build next',
    ],
    primaryCtaText = 'Join Discord & Claim 10k Credits',
    primaryCtaLink = 'https://discord.gg/Q6D5U8GJvE',
    skipText = 'Maybe later',
    autoShowDelayMs = AUTO_SHOW_DELAY_MS,
  } = props;

  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useClientSize().isMobile;

  const close = useCallback(() => {
    pushGTMEvent('discord_popup_close');
    setClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      setClosing(false);
      closeTimeoutRef.current = null;
    }, CLOSE_ANIMATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) close();
    },
    [close],
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if (!isMobile) setVisible(true);
    }, autoShowDelayMs);
    return () => clearTimeout(t);
  }, [autoShowDelayMs, isMobile]);

  // 弹窗展示时推送 GTM 事件
  useEffect(() => {
    if (visible && !closing) {
      pushGTMEvent('discord_popup');
    }
  }, [visible, closing]);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible, close]);

  if (typeof document === 'undefined' || !visible) return null;

  const existingNoteParts = existingNote.split(existingNoteBold);

  const overlay = (
    <div
      className={`${styles.popupOverlay} ${closing ? styles.popupOverlayClosing : ''}`}
      role="dialog"
      aria-modal
      aria-labelledby="homeDiscordPopupTitle"
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.popupCard} ${closing ? styles.popupCardClosing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.popupStrip} aria-hidden />
        <button type="button" className={styles.popupClose} onClick={close} aria-label="Close">
          {CLOSE_ICON}
        </button>
        <div className={styles.popupBody}>
          <div className={styles.creditsHero}>
            <div className={styles.discordIconWrap}>{DISCORD_ICON}</div>
            <div className={styles.creditsText}>
              <div className={styles.creditsLabel}>{creditsLabel}</div>
              <div className={styles.creditsAmount}>
                {creditsAmountPrefix}
                <span className={styles.amountHighlight}>{creditsAmount}</span>
                {creditsAmountSuffix}
              </div>
              <div className={styles.creditsSub}>{creditsSub}</div>
            </div>
          </div>

          {existingNote && (
            <div className={styles.existingNote}>
              <span className={styles.dotCheck}>{CHECK_ICON}</span>
              {existingNoteParts.length === 2 ? (
                <>
                  {existingNoteParts[0]}
                  <strong>{existingNoteBold}</strong>
                  {existingNoteParts[1]}
                </>
              ) : (
                existingNote
              )}
            </div>
          )}

          <h2 id="homeDiscordPopupTitle" className={styles.popupHeadline}>
            {headlineLine1} <span className={styles.orange}>{headlineLine1Highlight}</span>
            {headlineLine2 != null && headlineLine2 !== '' && (
              <>
                <br />
                {headlineLine2}
              </>
            )}
          </h2>

          {sub && <p className={styles.popupSub}>{sub}</p>}

          {onlineBadge && (
            <div className={styles.onlineBadge}>
              <span className={styles.onlineDot} aria-hidden />
              {onlineBadge}
            </div>
          )}

          {perks.length > 0 && (
            <ul className={styles.popupPerks}>
              {perks.map((text, i) => (
                <li key={i} className={styles.perkItem}>
                  <span className={styles.perkCheck}>{CHECK_ICON}</span>
                  {text}
                </li>
              ))}
            </ul>
          )}

          <div className={styles.popupActions}>
            <GetStartedBtn
              link={primaryCtaLink}
              text={primaryCtaText}
              className={styles.btnPrimary}
              type="black"
              id="discord_popup_join"
            />
            <GetStartedBtn
              link={'https://app.solvea.cx/#/auth/register'}
              text="Sign Up"
              className={styles.btnPrimary}
              type="black"
              id="discord_popup_signup"
            />
            <button type="button" className={styles.btnSkip} onClick={close}>
              {skipText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 使用 any 断言避免 @types/react 与 @types/react-dom 中 ReactNode 定义冲突
  return createPortal(overlay as any, document.body);
}
