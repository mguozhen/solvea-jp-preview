'use client';

import GetStartedBtn from 'components/ValueDescComponent/GetStartedBtn';
import dynamic from 'next/dynamic';
import { LogoFX } from 'pages/mod/svgs/icons';
import { useState } from 'react';
import type { TwilioVoiceConfig } from './TwilioVoice';
import styles from './index.module.scss';

const WebcallModal = dynamic(() => import('./TwilioCallModal'), { ssr: false });

const DEFAULT_MOBILE_URL =
  'https://cdn.shulex-voc.com/shulex/upload/2026-02-26/e402910c-0c2e-4337-b5ca-2ab95e12e692.webp';

interface Props {
  title: string;
  h1?: boolean;
  subTitle: string;
  desc?: string;
  url: string;
  mobileUrl?: string;
  button: {
    text: string;
    link: string;
  };
  signupLink?: {
    text: string;
    link: string;
  };
  valueBullets?: string[];
  webcallButtonText?: string;
  webcallConfig?: {
    modalTitle?: string;
    voice?: TwilioVoiceConfig;
  };
}

export default function HomeFirstBlock(props: Props) {
  const {
    title,
    h1,
    subTitle,
    desc,
    url,
    mobileUrl = DEFAULT_MOBILE_URL,
    button,
    signupLink,
    valueBullets = [],
    webcallButtonText = 'Talk to Solvea ▶',
    webcallConfig,
  } = props;

  const [webcallOpen, setWebcallOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LogoFX className={styles.logo} />

        {h1 ? (
          <h1 className={styles.title}>{title}</h1>
        ) : (
          <div className={styles.title}>{title}</div>
        )}

        <div className={styles.subTitle}>{subTitle}</div>

        {desc ? <div className={styles.desc}>{desc}</div> : null}

        {valueBullets.length > 0 && (
          <ul className={styles.bulletList}>
            {valueBullets.map((bullet, i) => (
              <li key={i} className={styles.bulletItem}>
                {bullet}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.mobileImage}>
          <img
            src={mobileUrl || url}
            alt="Solvea AI Receptionist"
            className={styles.mobileImageImg}
            width={400}
            height={400}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className={styles.ctaRow}>
          <GetStartedBtn
            link={button.link}
            text={button.text}
            type="black"
            className={styles.getStartedBtn}
            id="bannerSignupSMB"
          />
          <button className={styles.webcallBtn} onClick={() => setWebcallOpen(true)}>
            <span className={styles.webcallBtnText}>{webcallButtonText}</span>
          </button>
        </div>

        {signupLink && (
          <a
            href={signupLink.link}
            className={styles.signupLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {signupLink.text}
          </a>
        )}
      </div>

      <div className={styles.right}>
        <picture>
          <source srcSet={mobileUrl} media="(max-width: 768px)" type="image/webp" />
          <img
            src={url}
            alt="AI Receptionist"
            className={styles.image}
            width={600}
            height={450}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      <WebcallModal
        open={webcallOpen}
        onClose={() => setWebcallOpen(false)}
        modalTitle={webcallConfig?.modalTitle}
        voiceConfig={webcallConfig?.voice}
      />
    </div>
  );
}
