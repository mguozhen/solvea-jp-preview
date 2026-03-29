import React, { PropsWithChildren } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

interface ContainerProps {
  className?: string;
  style?: React.CSSProperties;
  type?: 'vertical' | 'horizontal';
  padding?: string;
  margin?: string;
  background?: string;
  align?: string;
  fullWidth?: boolean; // 是否拉满横屏
  colomn?: boolean; // 窄屏是否flex colomn
}

export default function Container(props: PropsWithChildren<ContainerProps>) {
  const {
    type = 'vertical',
    className,
    style,
    children,
    padding,
    margin,
    background,
    align,
    fullWidth,
    colomn,
  } = props;
  return (
    <div
      className={cx(
        styles.container,
        {
          [styles.fullWidth]: fullWidth,
          [styles[type]]: true,
          [styles[align as string]]: align ? true : false,
        },
        className,
      )}
      style={{ ...style, padding, margin, background }}
    >
      <div className={cx(styles.inner, { [styles.colomn]: colomn })}>
        {children}
      </div>
    </div>
  );
}
