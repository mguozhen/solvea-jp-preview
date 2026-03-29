import { IBM_Plex_Mono } from '@next/font/google';
import styles from './index.module.scss';

const IBMPlexMono = IBM_Plex_Mono({
  variable: '--font-family2',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export type Indicator = {
  value: string;
  id?: string;
  desc?: string;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
};
export const SidePanel = ({
  list,
  className,
  type,
}: {
  list: Indicator[];
  className?: string;
  type: 'customer-stories' | 'glossary';
}) => {
  return (
    <div className={`${styles.container} ${className || ''} ${IBMPlexMono.variable}`}>
      {type === 'glossary' ? (
        <nav className={styles.sidebarToc} aria-label="Table of contents">
          <div className={styles.tocHeading}>
            <h3 className={styles.tocTitle}>Table of contents</h3>
          </div>
          <div className={styles.tocSpacer} />
          <div className={styles.tocLinkContent}>
            {list?.map((indicator) => (
              <div
                className={`${styles.tocLinkWrapper} ${
                  indicator.isActive ? styles.activeItem : ''
                }`.trim()}
                key={indicator.id || indicator.value}
              >
                <a
                  href={indicator.id ? `#${indicator.id}` : undefined}
                  className={`${styles.sidebarLink} ${
                    indicator.isActive ? styles.activeItem : ''
                  }`.trim()}
                  onClick={
                    indicator.id && indicator.onClick
                      ? (e) => {
                          e.preventDefault();
                          indicator.onClick?.();
                        }
                      : undefined
                  }
                >
                  {indicator.value}
                </a>
              </div>
            ))}
          </div>
        </nav>
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
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
