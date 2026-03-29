import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
interface Props {
  title: string;
  data: string[];
  titleColor?: string;
  theme?: 'whiteBackgroundTitle' | 'grayBackground';
  className?: string;
  titleStyle?: React.CSSProperties;
}
export default function BrandWall(props: Props) {
  const { title, data, theme, titleColor, className, titleStyle } = props;

  return (
    <div
      className={cx(
        styles.box,
        className,
        theme === 'whiteBackgroundTitle' && styles.whiteBackgroundTitle,
        theme === 'grayBackground' && styles.grayBackground,
      )}
    >
      {title && (
        <h2
          className={styles.title}
          style={{ color: titleColor, ...titleStyle }}
        >
          {title}
        </h2>
      )}
      <div className={styles.contentBox}>
        <div className={styles.content}>
          {data?.map((v, index) => {
            return (
              <div className={styles.item} key={index}>
                <img src={v} alt="brand" className={styles.brand} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
