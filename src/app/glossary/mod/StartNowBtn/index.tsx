import i18n from '@/i18n';
import styles from './index.module.scss';

const REGISTER_HREF = 'https://app.solvea.cx/#/auth/register';

const CHANNEL_KEYS = [
  'Glossary_cta_channel_phone',
  'Glossary_cta_channel_email',
  'Glossary_cta_channel_sms',
  'Glossary_cta_channel_chat',
] as const;

const FEATURE_KEYS = [
  'Glossary_cta_feature_1',
  'Glossary_cta_feature_2',
  'Glossary_cta_feature_3',
  'Glossary_cta_feature_4',
] as const;

const CheckSvg = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path
      d="M1 5.5l2.5 2.5L9 2"
      stroke="#FF6B2B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StartNowBtn = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.hero}>
          <p className={styles.heroLabel}>{i18n('solvea.Glossary_cta_eyebrow')}</p>
          <p className={styles.heroTitle}>{i18n('solvea.Glossary_cta_headline')}</p>
          <div className={styles.channelRow}>
            {CHANNEL_KEYS.map((key) => (
              <span key={key} className={styles.chip}>
                <span className={styles.chipDot} aria-hidden />
                {i18n(`solvea.${key}`)}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.body}>
          <p className={styles.desc}>{i18n('solvea.Glossary_cta_desc')}</p>

          <ul className={styles.featList}>
            {FEATURE_KEYS.map((key) => (
              <li key={key} className={styles.featItem}>
                <span className={styles.featIcon}>
                  <CheckSvg />
                </span>
                {i18n(`solvea.${key}`)}
              </li>
            ))}
          </ul>

          <a className={styles.btnTry} href={REGISTER_HREF} target="_blank" rel="noreferrer">
            {i18n('solvea.Glossary_cta_button')}
          </a>
          <p className={styles.noCardNote}>{i18n('solvea.Glossary_cta_footer')}</p>
        </div>
      </div>
    </div>
  );
};
