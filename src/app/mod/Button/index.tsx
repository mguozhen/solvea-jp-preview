import React from 'react';
import styles from './index.module.scss';
import { Arrow } from 'pages/mod/svgs/icons';
import cx from 'classnames';

export const Button = ({
  children,
  className,
  style,
  classNames,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    content?: string;
    text?: string;
    arrow?: string;
    svg?: string;
  };
}) => {
  return (
    <button className={`${styles.container} ${className}`} style={style}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`${styles.svg} ${classNames?.svg}`}
      >
        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="49"
          stroke="currentColor"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className={cx(styles.content, classNames?.content)}>
        <span className={cx(styles.text, classNames?.text)}>{children}</span>
        <Arrow className={`${cx(styles.arrow, classNames?.arrow)} btn-arrow`} />
      </div>
    </button>
  );
};
