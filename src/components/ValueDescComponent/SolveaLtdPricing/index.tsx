'use client';

import { fetchLtdLifetimeCouponQuote, getUserInfo } from '@/util/services';
import cx from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';

export type SolveaLtdPricingCoupon = {
  price: number;
  link: string;
};

export type SolveaLtdPricingFaqItem = {
  question: string;
  answer: React.ReactNode;
};

/** 对比表一行；ltd 中可用占位符 `{dollarPrice}`（等于 `$` + fullPrice） */
export type SolveaLtdCompareRow = {
  feature: string;
  free: string;
  basic: string;
  ltd: string;
  /** ltd 单元格：强调数字/文案，或与 free、basic 相同的 ✓ */
  ltdKind?: 'emphasis' | 'check';
  /** 首列是否用 <strong> 包裹 */
  featureStrong?: boolean;
};

function applyTextTemplate(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function formatDollarPrice(fullPrice: number): string {
  return `$${fullPrice}`;
}

/** 含全部属性的默认值类型（供文档、CMS 与合并逻辑使用） */
export type SolveaLtdPricingDefaultValues = {
  className: string | undefined;
  /** 是否展示顶部本地导航（整站已有 Header 时可关） */
  showNav: boolean;
  navPricingHref: string;
  badgeText: string;
  heroTitleLine1: string;
  /** Hero 标题中接在 line1 与高亮词之间的连接文案，如 “for ” */
  heroTitleConnector: string;
  heroTitleHighlight: string;
  heroDescription: string;
  cardLifetimeBadge: string;
  cardLabel: string;
  cardTitle: string;
  cardTagline: string;
  regularPriceLabel: string;
  /** 划线价展示，如 $300/yr */
  regularPriceStrikethrough: string;
  fullPrice: number;
  /** 无优惠券时的结账链接 */
  fullCheckoutLink: string;
  coupons: Record<string, SolveaLtdPricingCoupon>;
  registerHref: string;
  /** 产品内登录（未登录时步骤 1 跳转） */
  loginHref: string;
  features: string[];
  /** 现价旁的货币符号 */
  priceCurrencySymbol: string;
  /** 一次性付费说明（不含前导空格，组件内会加 nbsp） */
  priceOneTimeSuffix: string;
  couponAppliedLabel: string;
  couponDiscountHint: string;
  /** 已应用优惠券时，节省金额前缀，后接 “$” + 数字 */
  saveAmountLead: string;
  couponCodeLabel: string;
  couponInputPlaceholder: string;
  couponApplyButton: string;
  /** Apply 请求进行中时按钮文案 */
  couponApplyingButton: string;
  couponMessageEmpty: string;
  couponMessageInvalid: string;
  /** 占位符：{code}、{amount}（amount 已含 $，如 $299） */
  couponMessageAppliedTemplate: string;
  /** 占位符：{amount}（如 $50）、{pct}（整数百分比） */
  savingsBarTemplate: string;
  /** 占位符：{amount}（如 $499） */
  buyButtonTemplate: string;
  featureListCheckMark: string;
  compareSectionHeading: string;
  compareSectionTitle: string;
  compareColFeature: string;
  compareColFree: string;
  compareColBasic: string;
  compareColBasicPriceNote: string;
  /** 占位符：{dollarPrice}，如 LTD $499 */
  compareColLtdTemplate: string;
  compareRows: SolveaLtdCompareRow[];
  faqSectionHeading: string;
  faqSectionTitle: string;
  faqItems: SolveaLtdPricingFaqItem[];
  faqExpandIcon: string;
  modalTitle: string;
  modalSub: string;
  modalCloseAriaLabel: string;
  modalCloseMark: string;
  modalStep1Number: string;
  modalStep2Number: string;
  modalStep1Title: string;
  modalStep1Desc: string;
  modalStep1Cta: string;
  /** 已登录时步骤 1 按钮文案（非链接、仅展示） */
  modalStep1LoggedInCta: string;
  modalStep2Title: string;
  modalStep2Desc: string;
  modalStep2CtaPrefix: string;
  /** 占位符：{prefix}（同 modalStep2CtaPrefix）、{amount}（如 $499） */
  modalStep2CtaTemplate: string;
  /** 未登录时步骤 2 禁用按钮的 hover/title 提示 */
  modalStep2DisabledHint: string;
  /** 打开登录页后的嵌套弹框标题 */
  modalAfterLoginTitle: string;
  /** 打开登录页后的嵌套弹框说明（任意按钮或关弹均会重新拉取登录态） */
  modalAfterLoginPrompt: string;
  modalAfterLoginPrimaryBtn: string;
  modalAfterLoginSecondaryBtn: string;
};

export type SolveaLtdPricingProps = Partial<SolveaLtdPricingDefaultValues>;

/** 与 {@link SolveaLtdPricingDefaultValues} 一一对应的完整默认配置 */
export const SOLVEA_LTD_PRICING_DEFAULTS: SolveaLtdPricingDefaultValues = {
  className: undefined,
  showNav: true,
  navPricingHref: 'https://solvea.cx/pricing',
  badgeText: 'Limited Time — Lifetime Deal',
  heroTitleLine1: 'Get Solvea AI',
  heroTitleConnector: 'for ',
  heroTitleHighlight: 'Life',
  heroDescription:
    'Your AI agent that handles calls, emails, SMS & live chat — pay once, use forever.',
  cardLifetimeBadge: 'Lifetime Deal',
  cardLabel: 'One-time payment',
  cardTitle: 'Lifetime Access',
  cardTagline: 'Full Basic plan. Zero monthly fees. Forever.',
  regularPriceLabel: 'Regular: ',
  regularPriceStrikethrough: '$300/yr',
  fullPrice: 499,
  fullCheckoutLink: '#',
  coupons: {
    SOLVEA299: { price: 299, link: '#' },
    APPSUMO: { price: 299, link: '#' },
  },
  registerHref: 'https://app.solvea.cx/#/auth/register',
  loginHref: 'https://app.solvea.cx/#/auth/login',
  features: [
    '30,000 AI credits / month',
    'Up to 10 AI agents',
    '500 MB knowledge base',
    '1 free phone number included',
    'Email, Live Chat & Voice channels',
    'Shopify integration',
    'Google Calendar & Sheets',
    'All future Basic plan updates',
  ],
  priceCurrencySymbol: '$',
  priceOneTimeSuffix: 'one-time',
  couponAppliedLabel: 'Coupon applied!',
  couponDiscountHint: 'Have a coupon? Apply below to unlock your discount.',
  saveAmountLead: 'You save $',
  couponCodeLabel: 'Coupon code',
  couponInputPlaceholder: 'Enter code',
  couponApplyButton: 'Apply',
  couponApplyingButton: 'Applying…',
  couponMessageEmpty: 'Please enter a coupon code.',
  couponMessageInvalid: 'Invalid coupon code. Please check and try again.',
  couponMessageAppliedTemplate: 'Code "{code}" applied — {amount} unlocked.',
  savingsBarTemplate: 'You save {amount} ({pct}% off) with this coupon',
  buyButtonTemplate: 'Get Lifetime Access — {amount}',
  featureListCheckMark: '✓',
  compareSectionHeading: 'How it stacks up',
  compareSectionTitle: 'Regular Pricing vs. Lifetime Deal',
  compareColFeature: 'Feature',
  compareColFree: 'Free',
  compareColBasic: 'Basic',
  compareColBasicPriceNote: '$30/mo',
  compareColLtdTemplate: 'LTD {dollarPrice}',
  compareRows: [
    {
      feature: 'Credits / month',
      free: '1,000',
      basic: '30,000',
      ltd: '30,000',
      ltdKind: 'emphasis',
    },
    { feature: 'AI Agents', free: '3', basic: '10', ltd: '10', ltdKind: 'emphasis' },
    {
      feature: 'Knowledge Base',
      free: '50 MB',
      basic: '500 MB',
      ltd: '500 MB',
      ltdKind: 'emphasis',
    },
    { feature: 'Phone Number', free: '✓', basic: '✓', ltd: '✓', ltdKind: 'check' },
    { feature: 'Voice / Email / Chat', free: '✓', basic: '✓', ltd: '✓', ltdKind: 'check' },
    { feature: 'Shopify & Google', free: '✓', basic: '✓', ltd: '✓', ltdKind: 'check' },
    {
      feature: 'Monthly fee',
      free: '$0',
      basic: '$30 / mo',
      ltd: '$0 forever',
      ltdKind: 'emphasis',
    },
    {
      feature: 'Total cost over 2 years',
      free: '$0',
      basic: '$720',
      ltd: '{dollarPrice} once',
      ltdKind: 'emphasis',
      featureStrong: true,
    },
  ],
  faqSectionHeading: 'FAQ',
  faqSectionTitle: 'Common Questions',
  faqExpandIcon: '+',
  faqItems: [
    {
      question: 'What is Solvea?',
      answer:
        'Solvea is a no-code AI receptionist that handles inbound customer communication across every channel — phone calls, SMS, email, WhatsApp, LINE, and live chat — from a single platform. You configure your AI agent once in plain language, and it goes live in under 3 minutes, ready to answer questions, capture leads, book appointments, and resolve tickets automatically.',
    },
    {
      question: 'What channels does Solvea cover?',
      answer:
        'Solvea handles phone calls, SMS, email, WhatsApp, LINE, and live chat — all from one unified inbox. Every conversation, regardless of channel, lands in one place. No toggling between a phone dashboard, an email client, and a chat tool.',
    },
    {
      question: 'What tools does Solvea integrate with?',
      answer:
        'Solvea connects with the tools you already use via one-click integrations: Google Calendar, Google Sheets, HubSpot, Slack, Freshdesk, Zendesk, Shopify, Amazon, eBay, and 17track — no API wrangling required.',
    },
    {
      question: 'What kind of businesses use Solvea?',
      answer:
        "Solvea is built for service-based businesses — medical spas, restaurants, hotels, law firms, barber shops, home services, and real estate. It's trusted by brands like Anker and Dreame, and deployable by a solo operator in minutes. Customers report up to 70% of customer service handled automatically, 80% ticket resolution rates, and 40% cost savings.",
    },
    {
      question: 'How does the Lifetime Deal work?',
      answer:
        'After your one-time payment, sign up on solvea.cx and your Lifetime plan will be activated automatically. You pay once and never see a monthly bill again. The account is yours to keep for life.',
    },
    {
      question: "What's included in the Lifetime Deal?",
      answer:
        'The LTD gives you everything in our Basic plan: 30,000 AI credits per month, up to 10 AI agents, 500 MB knowledge base, 1 free phone number, and full access to all channels and integrations — including Shopify, Google Calendar, and Sheets.',
    },
    {
      question: 'Where do I get a coupon code?',
      answer:
        'Coupon codes are shared exclusively in our community channels — Facebook group, AppSumo, and partner communities. Enter your code on this page before purchasing to unlock the discounted price.',
    },
    {
      question: 'Is Solvea secure and compliant?',
      answer:
        'Yes. Solvea is SOC 2 certified, ISO certified, and verified by Vanta. For businesses in healthcare, legal, or finance where compliance is a hard requirement, Solvea meets it without enterprise contracts or pricing.',
    },
    {
      question: 'Will I receive future updates?',
      answer:
        'Yes. Your LTD account stays on the Basic plan tier and automatically receives all future updates, improvements, and new integrations added to that plan.',
    },
    {
      question: 'What is your refund policy?',
      answer: (
        <>
          We offer a full refund within 14 days of purchase, no questions asked. After 14 days, all
          sales are final and no refunds will be issued. To request a refund, email{' '}
          <a href="mailto:support@solvea.cx">support@solvea.cx</a> within the 14-day window with
          your order details.
        </>
      ),
    },
  ],
  modalTitle: 'Before you purchase',
  modalSub: 'Complete these two steps to get your Lifetime access.',
  modalCloseAriaLabel: 'Close',
  modalCloseMark: '✕',
  modalStep1Number: '1',
  modalStep2Number: '2',
  modalStep1Title: 'Create your Solvea account',
  modalStep1Desc:
    'Sign up for free first — no credit card required. Your Lifetime plan will be linked to this account after purchase.',
  modalStep1Cta: 'Sign in →',
  modalStep1LoggedInCta: 'Signed in',
  modalStep2Title: 'Complete your purchase',
  modalStep2Desc:
    "Once you're registered and logged in, click below to complete your Lifetime Deal purchase.",
  modalStep2CtaPrefix: 'Go to Checkout',
  modalStep2CtaTemplate: '{prefix} — {amount} →',
  modalStep2DisabledHint: 'Sign in to Solvea (step 1) before checkout.',
  modalAfterLoginTitle: 'Finished signing in?',
  modalAfterLoginPrompt:
    'We opened the Solvea sign-in page in a new tab. Tap a button below and we will refresh your login status here.',
  modalAfterLoginPrimaryBtn: "I'm signed in — refresh",
  modalAfterLoginSecondaryBtn: 'Not yet — refresh anyway',
};

export default function SolveaLtdPricing(props: SolveaLtdPricingProps) {
  const {
    className,
    showNav,
    navPricingHref,
    badgeText,
    heroTitleLine1,
    heroTitleConnector,
    heroTitleHighlight,
    heroDescription,
    cardLifetimeBadge,
    cardLabel,
    cardTitle,
    cardTagline,
    regularPriceLabel,
    regularPriceStrikethrough,
    fullPrice,
    fullCheckoutLink,
    coupons,
    loginHref,
    features,
    priceCurrencySymbol,
    priceOneTimeSuffix,
    couponAppliedLabel,
    couponDiscountHint,
    saveAmountLead,
    couponCodeLabel,
    couponInputPlaceholder,
    couponApplyButton,
    couponApplyingButton,
    couponMessageEmpty,
    couponMessageInvalid,
    couponMessageAppliedTemplate,
    savingsBarTemplate,
    buyButtonTemplate,
    featureListCheckMark,
    compareSectionHeading,
    compareSectionTitle,
    compareColFeature,
    compareColFree,
    compareColBasic,
    compareColBasicPriceNote,
    compareColLtdTemplate,
    compareRows,
    faqSectionHeading,
    faqSectionTitle,
    faqExpandIcon,
    faqItems,
    modalTitle,
    modalSub,
    modalCloseAriaLabel,
    modalCloseMark,
    modalStep1Number,
    modalStep2Number,
    modalStep1Title,
    modalStep1Desc,
    modalStep1Cta,
    modalStep1LoggedInCta,
    modalStep2Title,
    modalStep2Desc,
    modalStep2CtaPrefix,
    modalStep2CtaTemplate,
    modalStep2DisabledHint,
    modalAfterLoginTitle,
    modalAfterLoginPrompt,
    modalAfterLoginPrimaryBtn,
    modalAfterLoginSecondaryBtn,
  } = { ...SOLVEA_LTD_PRICING_DEFAULTS, ...props };

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    price: number;
    link?: string;
  } | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [couponApplying, setCouponApplying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [afterLoginPromptOpen, setAfterLoginPromptOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  /** null：弹窗内尚未拉取完 PLG 登录态 */
  const [plgLoggedIn, setPlgLoggedIn] = useState<boolean | null>(null);

  const currentCheckoutLink = useMemo(() => {
    if (!appliedCoupon) return fullCheckoutLink;
    const l = appliedCoupon.link;
    if (l && l !== '#') return l;
    return fullCheckoutLink;
  }, [appliedCoupon, fullCheckoutLink]);

  const currentPrice = appliedCoupon?.price ?? fullPrice;
  const savings = fullPrice - currentPrice;

  const onCouponInputChange = useCallback(
    (value: string) => {
      setCouponInput(value);
      const t = value.trim().toUpperCase();
      if (appliedCoupon && (t === '' || t !== appliedCoupon.code)) {
        setAppliedCoupon(null);
        setCouponMsg(null);
      } else if (couponMsg?.type === 'err') {
        setCouponMsg(null);
      }
    },
    [appliedCoupon, couponMsg?.type],
  );

  const applyCoupon = useCallback(async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponMsg({ type: 'err', text: couponMessageEmpty });
      return;
    }
    setCouponApplying(true);
    try {
      const result = await fetchLtdLifetimeCouponQuote(code);
      if (result.ok) {
        setAppliedCoupon({ code, price: result.price, link: result.link });
        const amount = formatDollarPrice(result.price);
        setCouponMsg({
          type: 'ok',
          text: applyTextTemplate(couponMessageAppliedTemplate, { code, amount }),
        });
        return;
      }
      const entry = result.tryStatic ? coupons[code] : undefined;
      if (entry) {
        setAppliedCoupon({
          code,
          price: entry.price,
          link: entry.link !== '#' ? entry.link : undefined,
        });
        const amount = formatDollarPrice(entry.price);
        setCouponMsg({
          type: 'ok',
          text: applyTextTemplate(couponMessageAppliedTemplate, { code, amount }),
        });
        return;
      }
      setAppliedCoupon(null);
      setCouponMsg({
        type: 'err',
        text: result.message?.trim() ? result.message : couponMessageInvalid,
      });
    } finally {
      setCouponApplying(false);
    }
  }, [
    couponInput,
    coupons,
    couponMessageEmpty,
    couponMessageInvalid,
    couponMessageAppliedTemplate,
  ]);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setAfterLoginPromptOpen(false);
    setModalOpen(false);
  }, []);

  const onOverlayPointerDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) closeModal();
    },
    [closeModal],
  );

  const refreshPlgLogin = useCallback(async () => {
    const data = await getUserInfo();
    setPlgLoggedIn(!!data);
  }, []);

  const closeAfterLoginPromptAndRefresh = useCallback(() => {
    setAfterLoginPromptOpen(false);
    void refreshPlgLogin();
  }, [refreshPlgLogin]);

  useEffect(() => {
    refreshPlgLogin();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (afterLoginPromptOpen) closeAfterLoginPromptAndRefresh();
      else closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [modalOpen, afterLoginPromptOpen, closeModal, closeAfterLoginPromptAndRefresh]);

  const onStep1LoginClick = useCallback(() => {
    window.open(loginHref, '_blank');
    setAfterLoginPromptOpen(true);
  }, [loginHref]);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }, []);

  const savingsPct = useMemo(() => Math.round((savings / fullPrice) * 100), [savings, fullPrice]);

  return (
    <div className={cx(styles.page, className)}>
      {showNav && (
        <nav className={styles.nav}>
          <div className={styles.navLogo}>
            Solvea<span className={styles.navLogoAccent}>.</span>
          </div>
          <a href={navPricingHref} className={styles.navLink}>
            Regular Pricing
          </a>
        </nav>
      )}

      <section className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {badgeText}
        </div>
        <h1 className={styles.heroTitle}>
          {heroTitleLine1}
          <br />
          {heroTitleConnector}
          <em className={styles.heroEm}>{heroTitleHighlight}</em>
        </h1>
        <p className={styles.heroDesc}>{heroDescription}</p>
      </section>

      <div className={styles.offerGrid}>
        <div className={styles.ltdCard}>
          <div className={styles.ltdTopBadge}>{cardLifetimeBadge}</div>
          <div className={styles.cardLabel}>{cardLabel}</div>
          <div className={styles.cardTitle}>{cardTitle}</div>
          <div className={styles.cardTagline}>{cardTagline}</div>

          <div className={styles.priceBlock}>
            <div className={styles.priceOrig}>
              {regularPriceLabel}
              <s>{regularPriceStrikethrough}</s>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.priceCur}>{priceCurrencySymbol}</span>
              <span className={cx(styles.priceAmt, appliedCoupon && styles.priceAmtOn)}>
                {currentPrice}
              </span>
              <span className={styles.priceNote}>&nbsp;{priceOneTimeSuffix}</span>
            </div>
            <div className={styles.priceSublabel}>
              {appliedCoupon ? (
                <span className={styles.priceSublabelOk}>{couponAppliedLabel}</span>
              ) : (
                couponDiscountHint
              )}
              {appliedCoupon ? (
                <>
                  {' '}
                  {saveAmountLead}
                  {savings}
                </>
              ) : null}
            </div>
          </div>

          <div className={styles.couponBox}>
            <div className={styles.couponLbl}>{couponCodeLabel}</div>
            <div className={styles.couponRow}>
              <input
                type="text"
                className={styles.couponInput}
                placeholder={couponInputPlaceholder}
                autoComplete="off"
                value={couponInput}
                onChange={(e) => onCouponInputChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !couponApplying && void applyCoupon()}
              />
              <button
                type="button"
                className={styles.couponBtn}
                onClick={() => void applyCoupon()}
                disabled={couponApplying}
              >
                {couponApplying ? couponApplyingButton : couponApplyButton}
              </button>
            </div>
            {couponMsg ? (
              <div
                className={cx(
                  styles.couponMsg,
                  couponMsg.type === 'ok' ? styles.couponMsgOk : styles.couponMsgErr,
                )}
              >
                {couponMsg.text}
              </div>
            ) : (
              <div className={styles.couponMsg} />
            )}
          </div>

          <div className={cx(styles.savingsBar, appliedCoupon && styles.savingsBarShow)}>
            {appliedCoupon
              ? applyTextTemplate(savingsBarTemplate, {
                  amount: formatDollarPrice(savings),
                  pct: savingsPct,
                })
              : ''}
          </div>

          <ul className={styles.features}>
            {features.map((text) => (
              <li key={text}>
                <span className={styles.fc}>{featureListCheckMark}</span>
                {text}
              </li>
            ))}
          </ul>

          <button type="button" className={styles.btnBlue} onClick={openModal}>
            {applyTextTemplate(buyButtonTemplate, { amount: formatDollarPrice(currentPrice) })}
          </button>
        </div>
      </div>

      <div className={styles.compare}>
        <p className={styles.sectionHeading}>{compareSectionHeading}</p>
        <h2 className={styles.sectionTitle}>{compareSectionTitle}</h2>
        <div className={styles.compareWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>{compareColFeature}</th>
                <th>{compareColFree}</th>
                <th>
                  {compareColBasic} <span className={styles.thSub}>{compareColBasicPriceNote}</span>
                </th>
                <th className={styles.thHl}>
                  {applyTextTemplate(compareColLtdTemplate, {
                    dollarPrice: formatDollarPrice(currentPrice),
                  })}
                </th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.feature}>
                  <td>{row.featureStrong ? <strong>{row.feature}</strong> : row.feature}</td>
                  <td>
                    {row.ltdKind === 'check' ? (
                      <span className={styles.ck}>{row.free}</span>
                    ) : (
                      row.free
                    )}
                  </td>
                  <td>
                    {row.ltdKind === 'check' ? (
                      <span className={styles.ck}>{row.basic}</span>
                    ) : (
                      row.basic
                    )}
                  </td>
                  <td className={styles.tdHl}>
                    {row.ltdKind === 'check' ? (
                      <span className={styles.ck}>{row.ltd}</span>
                    ) : (
                      <span className={styles.cv}>
                        {applyTextTemplate(row.ltd, {
                          dollarPrice: formatDollarPrice(currentPrice),
                        })}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.faq}>
        <p className={cx(styles.sectionHeading, styles.faqHeading)}>{faqSectionHeading}</p>
        <h2 className={cx(styles.sectionTitle, styles.faqTitle)}>{faqSectionTitle}</h2>
        {faqItems.map((item, index) => (
          <div
            key={item.question}
            className={cx(styles.faqItem, openFaqIndex === index && styles.faqItemOpen)}
          >
            <button type="button" className={styles.faqQ} onClick={() => toggleFaq(index)}>
              {item.question}
              <span className={styles.faqIcon}>{faqExpandIcon}</span>
            </button>
            <div className={styles.faqBody}>
              <div
                className={styles.faqA}
                dangerouslySetInnerHTML={{ __html: item.answer as string }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className={cx(styles.modalOverlay, modalOpen && styles.modalOverlayShow)}
        onMouseDown={onOverlayPointerDown}
        role="presentation"
      >
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ltd-modal-title"
        >
          <button
            type="button"
            className={styles.modalClose}
            onClick={closeModal}
            aria-label={modalCloseAriaLabel}
          >
            {modalCloseMark}
          </button>
          <div id="ltd-modal-title" className={styles.modalTitle}>
            {modalTitle}
          </div>
          <div className={styles.modalSub}>{modalSub}</div>
          <div className={styles.modalSteps}>
            <div className={cx(styles.modalStep, plgLoggedIn !== true && styles.modalStepActive)}>
              <div className={styles.stepNum}>{modalStep1Number}</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>{modalStep1Title}</div>
                <div className={styles.stepDesc}>{modalStep1Desc}</div>
                {plgLoggedIn === true ? (
                  <span
                    className={cx(styles.stepBtnPrimary, styles.stepBtnLoggedIn)}
                    aria-live="polite"
                  >
                    {modalStep1LoggedInCta}
                  </span>
                ) : (
                  <div className={styles.stepBtnPrimary} onClick={onStep1LoginClick}>
                    {modalStep1Cta}
                  </div>
                )}
              </div>
            </div>
            <div className={cx(styles.modalStep, plgLoggedIn === true && styles.modalStepActive)}>
              <div className={styles.stepNum}>{modalStep2Number}</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>{modalStep2Title}</div>
                <div className={styles.stepDesc}>{modalStep2Desc}</div>
                {plgLoggedIn === true ? (
                  <a
                    href={currentCheckoutLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.stepBtnOutline}
                  >
                    {applyTextTemplate(modalStep2CtaTemplate, {
                      prefix: modalStep2CtaPrefix,
                      amount: formatDollarPrice(currentPrice),
                    })}
                  </a>
                ) : (
                  <span
                    className={cx(styles.stepBtnOutline, styles.stepBtnDisabled)}
                    aria-disabled="true"
                    title={plgLoggedIn === false ? modalStep2DisabledHint : undefined}
                  >
                    {applyTextTemplate(modalStep2CtaTemplate, {
                      prefix: modalStep2CtaPrefix,
                      amount: formatDollarPrice(currentPrice),
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {afterLoginPromptOpen && (
          <div
            className={styles.modalNestedOverlay}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeAfterLoginPromptAndRefresh();
            }}
            role="presentation"
          >
            <div
              className={styles.modalNested}
              role="dialog"
              aria-modal="true"
              aria-labelledby="ltd-after-login-title"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div id="ltd-after-login-title" className={styles.modalNestedTitle}>
                {modalAfterLoginTitle}
              </div>
              <p className={styles.modalNestedBody}>{modalAfterLoginPrompt}</p>
              <div className={styles.modalNestedActions}>
                <button
                  type="button"
                  className={styles.modalNestedBtnPrimary}
                  onClick={closeAfterLoginPromptAndRefresh}
                >
                  {modalAfterLoginPrimaryBtn}
                </button>
                <button
                  type="button"
                  className={styles.modalNestedBtnSecondary}
                  onClick={closeAfterLoginPromptAndRefresh}
                >
                  {modalAfterLoginSecondaryBtn}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
