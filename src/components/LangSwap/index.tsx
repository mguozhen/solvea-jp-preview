'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { useI18n } from 'src/i18n';
import {
  ArrowDown,
  China,
  De,
  Es,
  Fr,
  I18N,
  Japan,
  Pt,
} from 'components/Icons';
interface Props {
  className?: string;
  style?: React.CSSProperties;
  placement?: 'top' | 'bottom';
  noBorder?: boolean;
  specMap?: {
    [key: string]: string;
  };
  path?: string;
}
export default function LangSwap(props: Props) {
  const {
    className,
    placement = 'bottom',
    noBorder = false,
    specMap,
  } = props;
  const [show, setShow] = useState(false);
  const [host, setHost] = useState('');
  const { locale } = useI18n();

  const curSelected = useMemo(() => {
    switch (locale) {
      // case 'jp':
      case 'ja-JP':
        return (
          <>
            <span className={styles.iconText}>日本語</span>
            <ArrowDown className={styles.arrow} />
          </>
        );
      // case 'cn':
      case 'zh-CN':
        return (
          <>
            <span className={styles.iconText}>中文</span>
            <ArrowDown className={styles.arrow} />
          </>
        );
      case 'fr-FR':
        return (
          <>
            <span className={styles.iconText}>Français</span>
            <ArrowDown className={styles.arrow} />
          </>
        );
      case 'de-DE':
        return (
          <>
            <span className={styles.iconText}>Deutsch</span>
            <ArrowDown className={styles.arrow} />
          </>
        );
      case 'pt-PT':
        return (
          <>
            <span className={styles.iconText}>Português</span>
            <ArrowDown className={styles.arrow} />
          </>
        );
      case 'es-ES':
        return (
          <>
            <span className={styles.iconText}>Español</span>
            <ArrowDown className={styles.arrow} />
          </>
        );
      case 'en-US':
      default:
        return (
          <>
            {/* <SvgI18N className={styles.icon} /> */}
            <span className={styles.iconText}>English</span>
            <ArrowDown className={styles.arrow} />
          </>
        );
    }
  }, [locale]);
  useEffect(() => {
    setTimeout(() => {
      setHost(window.location.host);
    }, 500);
  }, [locale]);
  if (!host || host.indexOf('shulex.com') >= 0) {
    return null;
  }
  return (
    <div
      className={cx(styles.container, className, {
        [styles.noMargin]: noBorder,
      })}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => {
        // setTimeout(() => {
        setShow(false);
        // }, 2000);
      }}
    >
      <div
        className={cx(styles.selector, {
          [styles.topArrow]: placement === 'top',
          [styles.noBorder]: noBorder,
        })}
      >
        {curSelected}
      </div>
      <div
        className={cx(styles.pop, {
          [styles.show]: show,
          [styles.showTop]: placement === 'top',
        })}
      >
        <ul className={styles.ul}>
          <li>
            <I18N className={styles.icon} />
            <a href={'/'}>English</a>
          </li>
          <li>
            <Japan className={styles.icon} />
            <a href={'/jp'}>日本語</a>
          </li>
          <li>
            <China className={styles.icon} />
            <a href={specMap?.cn || '/cn'}>中文</a>
          </li>
          <li>
            <Fr className={styles.icon} />
            <a href={'/fr'}>Français</a>
          </li>
          <li>
            <De className={styles.icon} />
            <a href={'/de'}>Deutsch</a>
          </li>
          <li>
            <Pt className={styles.icon} />
            <a href={'/pt'}>Português</a>
          </li>
          <li>
            <Es className={styles.icon} />
            <a href={'/es'}>Español</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
