import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  // 品牌列表，传图片或者react节点
  brands?: (React.ReactNode | string)[];
  repeat?: number;
  delay?: boolean;
}

/**
 * 品牌墙滚动
 */
export default function BrandScreen(props: Props) {
  const { className, style, brands, repeat = 4, delay } = props;
  const arr = new Array(repeat).fill(1);
  return (
    <div className={cx(styles.contain, className)} style={style}>
      <div className={cx(styles.scrollContainer)}>
        {/* x3 方便渲染时候不会漏出白边 */}
        {Array.isArray(arr) &&
          arr?.map((i, index) => {
            return (
              <div
                key={index}
                className={cx(styles.items, { [styles.delay]: delay })}
                style={{ animationDuration: `${(brands || []).length * 7}s` }}
              >
                {brands?.map((brand, key) => {
                  return (
                    <div key={`${index}_${key}`} className={styles.brand}>
                      {brand}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
