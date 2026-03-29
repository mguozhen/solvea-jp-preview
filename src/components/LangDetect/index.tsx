'use client';
import cx from 'classnames';
import { Close } from 'components/Icons';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface Props {
  className?: string;
  pageLang?: string; // 页面语言
  host?: string;
  origin?: string;
}

export const langMap = {
  ja: 'ja',
  en: 'en',
  zh: 'zh',
  'en-US': 'en',
  'zh-CN': 'zh',
  'ja-JP': 'ja',
  'en-us': 'en',
  'zh-cn': 'zh',
  'ja-jp': 'ja',
  de: 'de', // 德语
  es: 'es', // 西班牙语
  pt: 'pt', // 葡萄牙语
  fr: 'fr', // 法语
  'de-DE': 'de',
  'es-ES': 'es',
  'pt-PT': 'pt',
  'fr-FR': 'fr',
};

export default function LangDetect(props: Props) {
  const { className, pageLang } = props;
  const [host, setHost] = useState('');
  const [close, setClose] = useState(true);
  const [navLang, setNavLang] = useState(''); // 浏览器语言
  useEffect(() => {
    const h = window.location.host;
    setHost(h);
  }, []);
  useEffect(() => {
    setNavLang(navigator.language?.toLowerCase());
    if (langMap[navigator.language] !== langMap[pageLang || '']) {
      setClose(false);
    }
  }, [pageLang]);
  if (!navLang || host.indexOf('vocreview.com') >= 0) {
    return null;
  }
  return (
    <div className={cx(styles.container, className, { [styles.none]: close })}>
      {(navLang === 'en' || navLang === 'en-us') && (
        <>
          <span className={styles.text}>
            Detected that the current browser language is English, our English site:
          </span>
          <a className={styles.a} href="https://solvea.cx">
            https://solvea.cx
          </a>
        </>
      )}

      {(navLang === 'ja' || navLang === 'ja-jp') && (
        <>
          <span className={styles.text}>
            現在のブラウザ言語が日本語であることが検出されました。当社の日本のウェブサイト：
          </span>
          <a className={styles.a} href="https://solvea.cx/jp">
            https://solvea.cx/jp
          </a>
        </>
      )}

      {navLang === 'de' && (
        <>
          {/* German */}
          <span className={styles.text}>
            Die aktuelle Browsersprache wurde als Deutsch erkannt. Unsere deutsche Website:
          </span>
          <a className={styles.a} href="https://solvea.cx/de">
            https://solvea.cx/de
          </a>
        </>
      )}

      {navLang === 'es' && (
        <>
          {/* Spanish */}
          <span className={styles.text}>
            Se ha detectado que el idioma del navegador actual es español. Nuestro sitio en español:
          </span>
          <a className={styles.a} href="https://solvea.cx/es">
            https://solvea.cx/es
          </a>
        </>
      )}

      {navLang === 'pt' && (
        <>
          {/* Portuguese */}
          <span className={styles.text}>
            Detectamos que o idioma do navegador atual é o português. Nosso site em português:
          </span>
          <a className={styles.a} href="https://solvea.cx/pt">
            https://solvea.cx/pt
          </a>
        </>
      )}

      {navLang === 'fr' && (
        <>
          {/* French */}
          <span className={styles.text}>
            Nous avons détecté que la langue du navigateur actuel est le français. Notre site en
            français :
          </span>
          <a className={styles.a} href="https://solvea.cx/fr">
            https://solvea.cx/fr
          </a>
        </>
      )}
      <div className={styles.close}>
        <Close className={styles.icon} onClick={() => setClose(true)} />
      </div>
    </div>
  );
}
