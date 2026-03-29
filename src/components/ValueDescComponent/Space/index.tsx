import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

interface SpaceProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Space(props: SpaceProps) {
  const { className, style } = props;
  return <div className={cx(styles.space, className)} style={style} />;
}
