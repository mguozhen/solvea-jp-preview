import { ReactNode } from 'react';
import styles from './layout.module.scss';

const BANNER_HEIGHT = 32;

export default function GlossaryLayout({ children }: { children: ReactNode }) {
  const homeHref = 'https://app.solvea.cx/#/auth/register';

  return (
    <>
      <a href={homeHref} className={styles.banner}>
        <span className={styles.bannerText}>
          Your AI receptionist, live in 3 minutes. Free to start →
        </span>
      </a>
      <div className={styles.contentWrap} style={{ paddingTop: BANNER_HEIGHT }}>
        {children}
      </div>
    </>
  );
}
