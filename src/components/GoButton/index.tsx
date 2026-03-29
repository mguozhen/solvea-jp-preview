import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import SvgGo from 'components/Icons/Go';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (_e: any) => void;
  url?: string;
  type?: 'white' | 'black';
}

export default function GoButton(props: PropsWithChildren<Props>) {
  const { children, style, className, onClick, url, type = 'black' } = props;
  return (
    <a
      href={url}
      className={cx(styles.moreBtn, styles?.[type], className)}
      onClick={onClick}
      style={style}
    >
      {children}
      <SvgGo className={styles.goIcon} />
    </a>
  );
}
