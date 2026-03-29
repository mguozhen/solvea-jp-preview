import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { ArrowRight } from 'components/Icons';
import i18n from '@/i18n';
import { getLink } from 'util/getLink';

interface Props {
  className?: string;
  href?: string;
  text?: string;
  theme?: 'black';
  showArrow?: boolean;
}

export default function BookDemo(props: Props) {
  const { className, href, text, theme, showArrow } = props;
  return (
    <a
      className={cx(
        styles.demoBtn,
        {
          [styles.black]: theme === 'black',
        },
        className,
      )}
      href={href || getLink('/contact')}
    >
      {text || i18n('layout.Common_GetStarted')}
      {showArrow && <ArrowRight className={styles.icon} />}
    </a>
  );
}
