import styles from './index.module.scss';
import { Nine } from 'pages/mod/svgs/icons';
import i18n from '@/i18n';
import { Button } from 'pages/mod/Button';
import { getLink } from 'util/getLink';

const BG = ({ classname }) => {
  return (
    <svg
      className={classname}
      width="1390"
      height="849"
      viewBox="0 0 1390 849"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.25"
        y="1.25"
        width="1389.5"
        height="847.5"
        stroke="black"
        strokeWidth="0.5"
      />
      <line
        x1="0.34668"
        y1="673.856"
        x2="1389.35"
        y2="673.856"
        stroke="#8F8F83"
        strokeWidth="0.287691"
      />
      <line
        x1="111.144"
        y1="-6.2877e-09"
        x2="111.144"
        y2="849"
        stroke="#8F8F83"
        strokeWidth="0.287691"
      />
      <line
        x1="1062.14"
        y1="-6.2877e-09"
        x2="1062.14"
        y2="849"
        stroke="#8F8F83"
        strokeWidth="0.287691"
      />
      <line
        x1="0.34668"
        y1="138.856"
        x2="1389.35"
        y2="138.856"
        stroke="#8F8F83"
        strokeWidth="0.287691"
      />
      <line
        x1="1.25754e-08"
        y1="791.856"
        x2="1390"
        y2="791.856"
        stroke="#8F8F83"
        strokeWidth="0.287691"
      />
      <rect x="1373" y="654" width="17" height="51" fill="#F07AF9" />
      <rect y="88" width="17" height="51" fill="#F07AF9" />
    </svg>
  );
};

export const Skeptics = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.mbg} only-mobile`}>
        <div className={styles.b1}></div>
        <div className={styles.b2}></div>
      </div>
      <BG classname={`${styles.bg} only-pc`} />
      <div className={styles.header}>
        <Nine color={'#000'} className={styles.svg} />
        <div>{i18n('solvea.Home_midbanner_title')}</div>
      </div>
      <div className={styles.title}>{i18n('solvea.Home_midbanner_desc')}</div>
      <a href={getLink('/contact')} target={'_blank'} className={styles.btn}>
        <Button>{i18n('solvea.Home_midbanner_button')}</Button>
      </a>
    </div>
  );
};
