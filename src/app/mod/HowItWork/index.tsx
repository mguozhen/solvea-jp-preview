import i18n from '@/i18n';
import TextAnimation from 'components/TextAnimation';
import { Lin2, Line1, Line3 } from 'pages/mod/HowItWork/svgs';
import { Nine, Run } from 'pages/mod/svgs/icons';
import { ResponsiveComponent } from 'pages/Responsive';
import styles from './index.module.scss';

export const HowItWork = () => {
  return (
    <div className={`${styles.container} side-fade`} id={'howItWork'}>
      <div className={styles.header}>
        <div>{i18n('solvea.Home_how_title')}</div>
        <div className={styles.title}>
          <TextAnimation animationType="fadeInUp" delay={0} duration={600}>
            {i18n('solvea.Home_how_slogan')}
          </TextAnimation>
        </div>
      </div>
      <div className={`${styles.ci}`}>
        <div className={styles.f1}>
          <ResponsiveComponent
            mobileComponent={
              <Line1 className={styles.line1} lineWidth={230} strokeWidth={3} />
            }
            desktopComponent={
              <Line1 className={styles.line1} lineWidth={568} strokeWidth={6} />
            }
          />
          <div className={`${styles.box} ${styles.box1}`}>
            {i18n('solvea.Home_how_thread1')}
          </div>
        </div>
        <div className={`${styles.box} ${styles.box2}`}>
          <div className={styles.first}>
            <div className={styles.iconContainer}>
              <Run className={styles.icon} />
              <span>{i18n('solvea.Home_how_thread2')}</span>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.desc}>
              {i18n('solvea.Home_how_thread2_desc')}
            </div>
          </div>
        </div>
        <div className={styles.f2}>
          <Lin2 className={styles.line2} />
        </div>
        <div className={`${styles.box} ${styles.box3}`}>
          <div className={styles.first}>
            <div className={styles.iconContainer}>
              <Nine className={styles.icon} />
              <span>{i18n('solvea.Home_how_thread3')}</span>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.desc}>
              {i18n('solvea.Home_how_thread3_desc')
                .split('\n')
                .map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
            </div>
          </div>
        </div>
        <div className={styles.l3crop}>
          <Line3 className={styles.line3} />
        </div>
      </div>
    </div>
  );
};
