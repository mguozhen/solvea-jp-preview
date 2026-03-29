import React, { useState } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { Input } from 'antd';
import ActionButton from '../ActionButton';
import { SLX_HOST } from 'util/services';
import i18nOld, { useI18n } from 'util/i18nOld/i18nOld';

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  sum?: string;
}

export default function Advertisement(props: Props) {
  const { className, style, sum } = props;
  const [email, setEmail] = useState('');
  const { locale, shortLang } = useI18n();
  const register =
    locale === 'zh-CN' ? 'cnRegisterOfficial' : 'enRegisterOfficial';
  return (
    <aside className={cx(styles.container, className)} style={style}>
      <div className={styles.title}>
        {locale !== 'en-US' && (
          <p>{i18nOld('homepage.site.headScreen.title')}</p>
        )}
        {locale === 'en-US' && (
          <>
            <p>Boost your business</p>
            <p>with the #1 ChatGPT tool</p>
          </>
        )}
        <p style={{ color: '#FDBB30' }}>
          <b>{i18nOld('homepage.ad.forFree')}</b>
        </p>
      </div>
      <p className={styles.desc}>{i18nOld('homepage.ad.desc')}</p>
      <Input
        style={{ height: 40 }}
        placeholder={i18nOld('homepage.ad.enter')}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <ActionButton
        className={styles.actionBtn}
        title={i18nOld('homepage.startTrial')}
        sum={sum}
        href={
          email
            ? `${SLX_HOST}/account#/${register}?email=${encodeURIComponent(
                email,
              )}&lang=${shortLang}`
            : `${SLX_HOST}/account#/${register}?lang=${shortLang}`
        }
        target="_blank"
        theme="#1570EF"
        hideArrow
      />
      <p className={styles.tip}>{i18nOld('homepage.ad.tip')}</p>
    </aside>
  );
}
