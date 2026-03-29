'use client';
import i18n from '@/i18n';
import styles from './index.module.scss';
import cx from 'classnames';

interface Props {
  noWrap?: boolean;
}

export default function SubmitedForm(props: Props) {
  const { noWrap } = props;
  return (
    <div className={cx(styles.box, { [styles.noWrap]: noWrap })}>
      <div className={styles.tilte}>{i18n('layout.Submit_Success_Title')}</div>
      <div className={styles.content}>
        <div className={styles.desc}>
          <div className={styles.iconBox}>
            <img
              className={styles.icon}
              src="https://cdn.shulex-voc.com/shulex/upload/2025-07-15/697b92bd-5cac-4f6e-9d12-8ae230c1ecda.png"
              alt=""
            />
          </div>
          <div className={styles.text}>
            {i18n('layout.Submit_Success_Desc')}
          </div>
        </div>
      </div>
    </div>
  );
}
