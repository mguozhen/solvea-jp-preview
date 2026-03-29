import i18n from '@/i18n';
import { Button } from 'pages/mod/Button';
import { Nine } from 'pages/mod/svgs/icons';
import { getLink } from 'util/getLink';
import styles from './index.module.scss';

export const Skeptics = () => {
  return (
    <div className={styles.container}>
      <svg
        className={styles.bgsvg}
        width="1440"
        height="875"
        viewBox="0 0 1440 875"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="1" width="1440" height="869" fill="#0D0D0D" />
        <rect x="130.25" y="1.25" width="14.5" height="864.5" stroke="#404040" strokeWidth="0.5" />
        <path d="M130 1V866" stroke="#404040" strokeWidth="0.213579" />
        <path d="M145 1V866" stroke="#404040" strokeWidth="0.213579" />
        <path d="M724 10V875" stroke="#404040" strokeWidth="0.5" />
        <path d="M1440 622L-194 622" stroke="#404040" strokeWidth="0.5" />
        <path d="M1455 145L-179 145" stroke="#404040" strokeWidth="0.213579" />
        <path d="M1455 429L-179 429" stroke="#404040" strokeWidth="0.5" />
        <rect x="413.25" y="3.25" width="18.5" height="864.5" stroke="#404040" strokeWidth="0.5" />
        <path d="M413 3V868" stroke="#404040" strokeWidth="0.213579" />
        <path d="M432 3V868" stroke="#404040" strokeWidth="0.213579" />
        <path d="M990 0V865" stroke="#404040" strokeWidth="0.5" />
        <rect x="1107.25" y="2.25" width="14.5" height="865.5" stroke="#404040" strokeWidth="0.5" />
        <path d="M1107 2V868" stroke="#404040" strokeWidth="0.213579" />
        <path d="M1122 2V868" stroke="#404040" strokeWidth="0.213579" />
        <path d="M1271 5V870" stroke="#404040" strokeWidth="0.5" />
        <rect
          x="1390.25"
          y="125.25"
          width="18.5"
          height="742.5"
          stroke="#404040"
          strokeWidth="0.5"
        />
        <path d="M1390 125V868" stroke="#404040" strokeWidth="0.213579" />
        <path d="M1409 125V868" stroke="#404040" strokeWidth="0.213579" />
        <path
          d="M1271.98 427.542H1276.53V429.985H1271.98V434.527H1269.54V429.985H1265V427.542H1269.54V423H1271.98V427.542Z"
          fill="#404040"
        />
        <path
          d="M990.985 620.542H995.527V622.985H990.985V627.527H988.542V622.985H984V620.542H988.542V616H990.985V620.542Z"
          fill="#57C564"
        />
        <path
          d="M130.985 383.542H135.527V385.985H130.985V390.527H128.542V385.985H124V383.542H128.542V379H130.985V383.542Z"
          fill="#57C564"
        />
        <path
          d="M1271.98 427.542H1276.53V429.985H1271.98V434.527H1269.54V429.985H1265V427.542H1269.54V423H1271.98V427.542Z"
          fill="#57C564"
        />
        <path
          d="M990.985 143.542H995.527V145.985H990.985V150.527H988.542V145.985H984V143.542H988.542V139H990.985V143.542Z"
          fill="#57C564"
        />
        <path
          d="M145.985 137.542H150.527V139.985H145.985V144.527H143.542V139.985H139V137.542H143.542V133H145.985V137.542Z"
          fill="#57C564"
        />
      </svg>

      <div className={styles.textContent}>
        <div className={styles.header}>
          <Nine color={'#F78AFF'} className={styles.svg} />
          <span>{i18n('solvea.Case_study_skeptics')}</span>
        </div>
        <div className={styles.title}>{i18n('solvea.Case_study_see_it')}</div>
        <a href={getLink('/contact')} target={'_blank'} className={styles.btn}>
          <Button>{i18n('solvea.Case_study_talk')}</Button>
        </a>
      </div>
    </div>
  );
};
