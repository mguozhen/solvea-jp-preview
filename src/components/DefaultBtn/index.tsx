import React from 'react';
import styles from './index.module.scss';
import { ArrowRight } from 'components/Icons';
import cx from 'classnames';

interface Props {
  children: React.ReactNode;
  href?: string;
  noRightIcon?: boolean;
  className?: string;
}

export default function DefaultBtn(props: Props) {
  const { children, href, noRightIcon, className } = props;
  if (href) {
    return (
      <a href={href} className={cx(styles.link, className)}>
        <div className={styles.btnBox}>
          {children}
          {!noRightIcon && <ArrowRight className={styles.arrowIcon} />}
        </div>
      </a>
    );
  }
  return (
    <div className={cx(styles.btnBox, className)}>
      {children}
      {!noRightIcon && <ArrowRight className={styles.arrowIcon} />}
    </div>
  );
}
