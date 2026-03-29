import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { Line } from 'pages/mod/Line';

interface Props {
  partLabel?: string;
  className?: string;
  type?: 'default' | 'themeOne';
}

/**
 * 段落标签
 * @param props
 * @returns {React.ReactNode}
 */
export default function PartLabel(props: Props) {
  const { partLabel, className, type = 'default' } = props;
  if (!partLabel) return null;
  return (
    <>
      <div
        className={cx(styles.partLabel, className, {
          [styles.themeOne]: type === 'themeOne',
        })}
      >
        {partLabel}
      </div>
      {type !== 'default' && <Line />}
    </>
  );
}
