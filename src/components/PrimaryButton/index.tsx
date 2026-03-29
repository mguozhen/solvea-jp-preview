import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

interface Props {
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
  onClick?: (_e: any) => void;
}

export default function PrimaryButton(props: PropsWithChildren<Props>) {
  const { children, style, className, innerClassName, onClick } = props;
  return (
    <div
      className={cx(styles.container, className)}
      style={style}
      onClick={onClick}
    >
      <div className={cx(styles.inner, innerClassName)}>{children}</div>
    </div>
  );
}
