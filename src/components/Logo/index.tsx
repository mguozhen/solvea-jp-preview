'use client';
import styles from './index.module.scss';
import SvgShulexCnLogoWhite from 'components/Icons/ShulexCnLogoWhite';
import SvgLogoVocWhite from 'components/Icons/LogoVocWhite';
import React, { useEffect, useState } from 'react';
import { useI18n } from '@/i18n';

export const Logo = () => {
  let { shortLang } = useI18n();
  const [host, setHost] = useState<string>('');

  useEffect(() => {
    setHost(window.location.host?.split('.')?.slice(1)?.join('.') || 'voc.ai');
  }, []);

  return (
    <a
      href={`https://${host}/${shortLang === 'en' ? '' : shortLang}`}
      className={styles.mainIndex}
    >
      {shortLang === 'cn' ? (
        <SvgShulexCnLogoWhite className={styles.logo} />
      ) : (
        <SvgLogoVocWhite className={styles.logo} />
      )}
    </a>
  );
};
