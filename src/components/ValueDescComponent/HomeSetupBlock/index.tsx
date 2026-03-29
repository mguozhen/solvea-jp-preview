'use client';

import React from 'react';
import GetStartedBtn from '../GetStartedBtn';
import styles from './index.module.scss';

export interface SetupStep {
  num: number;
  bold: string;
  text: string;
}

/** 普通积分行：带 tag */
export interface CreditStackRowWithTag {
  tag: string;
  tagType: 'base' | 'bonus';
  label: string;
  amount: string;
}

/** 合计行 */
export interface CreditStackRowTotal {
  isTotal: true;
  label: string;
  amount: string;
}

export type CreditStackRow = CreditStackRowWithTag | CreditStackRowTotal;

export interface HomeSetupBlockProps {
  label?: string;
  /** 新版：多行标题，line1 中 {{highlight}} 会被替换为 headlineHighlight（橙色） */
  headlineHighlight?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  headlineLine3?: string;
  /** 旧版：单行标题 + 副标题 */
  headline?: { title: string; subtitle: string };
  /** 积分明细栈（新版） */
  creditStack?: CreditStackRow[];
  body?: string;
  /** 在线状态文案（带绿点） */
  onlineBadge?: string;
  ctaText?: string;
  ctaLink?: string;
  /** 新版卡片：Discord 社区名、链接、积分数 */
  cardName?: string;
  cardSub?: string;
  cardCredits?: string;
  cardCreditsSub?: string;
  steps?: SetupStep[];
  /** 旧版：卡片标题、副标题、名额 */
  cardTitle?: string;
  cardSubtitle?: string;
  spotsLabel?: string;
  spotsCount?: string;
  spotsFilled?: number;
  spotsTotal?: number;
}


const DISCORD_ICON = (
  <svg width="20" height="15" viewBox="0 0 127.14 96.36" fill="#fff">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const DEFAULT_STEPS: SetupStep[] = [
  {
    num: 1,
    bold: 'Join the server',
    text: " — tap the button and you're in instantly, no invite needed",
  },
  {
    num: 2,
    bold: 'Ask the channel manager',
    text: " for your 10,000 bonus credits — they'll add them right away",
  },
  { num: 3, bold: 'Tell us what you think', text: ' — your feedback shapes what we build next' },
  { num: 4, bold: 'Get help anytime', text: ' — team members are active daily' },
];

function renderHeadline(props: HomeSetupBlockProps) {
  const { headlineLine1, headlineLine2, headlineLine3, headlineHighlight, headline } = props;
  if (headlineLine1 != null) {
    const parts: React.ReactNode[] = [];
    const line1 = headlineLine1.replace(/\{\{highlight\}\}/gi, '{{HIGHLIGHT}}');
    const segs = line1.split('{{HIGHLIGHT}}');
    for (let i = 0; i < segs.length; i++) {
      parts.push(segs[i]);
      if (i < segs.length - 1 && headlineHighlight != null) {
        parts.push(
          <span key={i} className={styles.setupHeadlineOrange}>
            {headlineHighlight}
          </span>,
        );
      }
    }
    return (
      <>
        {parts}
        {headlineLine2 != null && (
          <>
            <br />
            {headlineLine2}
          </>
        )}
        {headlineLine3 != null && (
          <>
            <br />
            {headlineLine3}
          </>
        )}
      </>
    );
  }
  return (
    <>
      {headline?.title ?? 'Not sure how\nto get started?'}
      <br />
      <span className={styles.setupHeadlineOrange}>
        {headline?.subtitle ?? "We'll set it up for you."}
      </span>
    </>
  );
}

export default function HomeSetupBlock(props: HomeSetupBlockProps) {
  const {
    label = 'Early access bonus',
    body,
    onlineBadge,
    ctaText = 'Join Discord & Claim 10k Credits',
    ctaLink = 'https://discord.gg/Q6D5U8GJvE',
    cardName = 'Solvea Community',
    cardSub = 'discord.gg/Q6D5U8GJvE',
    cardCredits,
    cardCreditsSub,
    steps = DEFAULT_STEPS,
    creditStack,
    cardTitle,
    cardSubtitle,
    spotsLabel,
    spotsCount,
    spotsFilled = 3,
    spotsTotal = 5,
  } = props;

  const useNewCard =
    props.cardName != null ||
    props.cardCredits != null ||
    props.cardCreditsSub != null ||
    (props.creditStack != null && props.creditStack.length > 0);
  const showSpots = !useNewCard && spotsLabel != null && spotsTotal != null && spotsTotal > 0;
  const spotBlocks =
    showSpots &&
    Array.from({ length: spotsTotal }, (_, i) => (
      <div
        key={i}
        className={`${styles.spotBlock} ${i < (spotsFilled ?? 0) ? styles.filled : styles.open}`}
      />
    ));

  return (
    <section className={styles.setupSection}>
      <div className={styles.setupInner}>
        <div className={styles.setupLeft}>
          <div className={styles.setupLabel}>
            <span className={styles.setupLabelDot} />
            {label}
          </div>
          <h2 className={styles.setupHeadline}>{renderHeadline(props)}</h2>

          {creditStack != null && creditStack.length > 0 && (
            <div className={styles.creditStack}>
              {creditStack.map((row, i) => {
                if ('isTotal' in row && row.isTotal) {
                  return (
                    <React.Fragment key={i}>
                      <div className={styles.creditDivider} aria-hidden />
                      <div className={`${styles.creditRow} ${styles.creditRowTotal}`}>
                        <span className={styles.crLabel}>{row.label}</span>
                        <span className={styles.crAmount}>{row.amount}</span>
                      </div>
                    </React.Fragment>
                  );
                }
                const r = row as CreditStackRowWithTag;
                return (
                  <div key={i} className={styles.creditRow}>
                    <span className={styles.crLabel}>
                      <span
                        className={r.tagType === 'bonus' ? styles.crTagBonus : styles.crTagBase}
                      >
                        {r.tag}
                      </span>
                      {r.label}
                    </span>
                    <span className={styles.crAmount}>{r.amount}</span>
                  </div>
                );
              })}
            </div>
          )}

          {body != null && body !== '' && <p className={styles.setupBody}>{body}</p>}

          {onlineBadge != null && onlineBadge !== '' && (
            <div className={styles.onlineBadge}>
              <span className={styles.onlineDot} aria-hidden />
              {onlineBadge}
            </div>
          )}

          <div className={styles.btnGroup}>
            <GetStartedBtn
              link={ctaLink}
              text={ctaText}
              className={styles.btnPrimary}
              type="black"
            />
            <GetStartedBtn
              link={'https://app.solvea.cx/#/auth/register'}
              text="Sign Up"
              className={styles.btnPrimary}
              type="black"
            />
          </div>
        </div>

        <div className={styles.setupCard}>
          {useNewCard ? (
            <>
              <div className={styles.cardHeaderNew}>
                <div className={styles.chTop}>
                  <div className={styles.chDiscordLogo}>{DISCORD_ICON}</div>
                  <div>
                    <div className={styles.chName}>{cardName}</div>
                    <div className={styles.chSub}>{cardSub}</div>
                  </div>
                </div>
                <div className={styles.chCredits}>{cardCredits ?? '10,000'}</div>
                <div className={styles.chCreditsSub}>
                  {cardCreditsSub ?? 'bonus credits — free for new members'}
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardSteps}>
                  {steps.map((step) => (
                    <div key={step.num} className={styles.stepRow}>
                      <div className={styles.stepNum}>{step.num}</div>
                      <div className={styles.stepText}>
                        <strong>{step.bold}</strong>
                        {step.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <div className={styles.cardTitle}>{cardTitle ?? 'Free Concierge Setup'}</div>
                  <div className={styles.cardSubtitle}>
                    {cardSubtitle ?? 'Available daily · 5 sessions max'}
                  </div>
                </div>
              </div>
              {showSpots && (
                <div className={styles.cardSpots}>
                  <div className={styles.spotsRow}>
                    <span className={styles.spotsLabel}>{spotsLabel}</span>
                    <span className={styles.spotsCount}>{spotsCount}</span>
                  </div>
                  <div className={styles.spotsTrack}>{spotBlocks}</div>
                </div>
              )}
              <div className={styles.cardSteps}>
                {steps.map((step) => (
                  <div key={step.num} className={styles.stepRow}>
                    <div className={styles.stepNum}>{step.num}</div>
                    <div className={styles.stepText}>
                      <strong>{step.bold}</strong>
                      {step.text}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
