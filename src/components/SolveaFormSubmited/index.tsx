'use client';
import i18n from '@/i18n';
import cx from 'classnames';
import { Button } from 'pages/mod/Button';
import { getLink } from 'util/getLink';
import styles from './index.module.scss';

interface Props {
  noWrap?: boolean;
  reportLink?: string;
  title?: string;
  buttonText?: string;
}

export default function SolveaFormSubmited(props: Props) {
  const {
    noWrap,
    reportLink,
    title = i18n('solvea.Contact_Form_Success'),
    buttonText = i18n('solvea.Contact_Form_Success_Button'),
  } = props;

  // 当前host 及 路由
  const currentPath = window.location.pathname;
  console.log('currentPath', currentPath);
  const imgUrlMap = {
    '/industry/retail':
      'https://cdn.shulex-voc.com/shulex/upload/2025-11-28/def66df2-1405-43df-b640-24c2eaa1afc2.webp',
    '/industry/furniture':
      'https://23789577.fs1.hubspotusercontent-na1.net/hubfs/23789577/Untitled%20design.png',
  };
  return (
    <div
      className={cx(styles.box, {
        [styles.noWrap]: noWrap,
        [styles.download]: reportLink,
      })}
    >
      <div className={cx(styles.tilte, { [styles.downloadTitle]: reportLink })}>{title}</div>

      {reportLink && (
        <img
          src={imgUrlMap[currentPath] ?? imgUrlMap['/furniture']}
          alt="download"
          className={styles.downloadImage}
        />
      )}
      <div className={styles.content}>
        <a
          href={reportLink ? reportLink : getLink('/')}
          target={reportLink ? '_blank' : '_self'}
          className={styles.desc}
        >
          <Button className={styles.btn}>{buttonText}</Button>
        </a>
      </div>
    </div>
  );
}
