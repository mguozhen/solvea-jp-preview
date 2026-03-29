import i18n from '@/i18n';
import { IBM_Plex_Mono } from '@next/font/google';
import { StartNowBtn } from '../StartNowBtn';
import styles from './index.module.scss';

const IBMPlexMono = IBM_Plex_Mono({
  variable: '--font-family2',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export type Indicator = {
  value: string;
  desc?: string;
  className?: string;
  onClick?: () => void;
};
export const SidePanel = ({
  list,
  className,
  title,
  desc,
  buttonText,
  type,
}: {
  list: Indicator[];
  title?: string;
  desc?: string;
  buttonText?: string;
  className?: string;
  type: 'customer-stories' | 'glossary';
}) => {
  return (
    <div className={`${styles.container} ${className || ''} ${IBMPlexMono.variable}`}>
      {type === 'glossary' ? (
        <div className={`${styles.onThisPage}`}>
          <div className={styles.onThisPageTitle}>{i18n('solvea.Blog_Outline_Title')}</div>
          <div className={styles.indicator}>
            {list?.map((indicator, index) => {
              return (
                <div
                  className={`${styles.indicatorItem} ${indicator.className || ''}`}
                  onClick={indicator.onClick}
                  key={indicator.value}
                >
                  <div className={styles.indicatorItemNumber}>{index + 1}</div>
                  <div className={styles.indicatorItemContent}>
                    <div className={styles.indicatorItemTitle}>{indicator.value}</div>
                    {!!indicator.desc && (
                      <div className={styles.indicatorItemDesc}>{indicator.desc}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.customerStories}>
          <div className={styles.indicator}>
            {list?.map((indicator) => {
              return (
                <div
                  className={`${styles.indicatorItem} ${indicator.className || ''}`}
                  onClick={indicator.onClick}
                  key={indicator.value}
                >
                  <div className={styles.indicatorItemTitle}>{indicator.value}</div>
                  {!!desc && <div className={styles.indicatorItemDesc}>{indicator.desc}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {title && buttonText && (
        <StartNowBtn title={title} desc={desc || ''} buttonText={buttonText} />
      )}
    </div>
  );
};
